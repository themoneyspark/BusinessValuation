from fastapi import FastAPI, APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
import aiofiles
import hashlib


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create uploads directory
UPLOADS_DIR = ROOT_DIR / "uploads" / "profile_pictures"
UPLOADS_DIR.mkdir(parents=True, exist_ok=True)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class ProfilePictureUpload(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    filename: str
    file_path: str
    file_size: int
    content_type: str
    uploaded_at: datetime = Field(default_factory=datetime.utcnow)
    user_id: str

class ChunkUploadResponse(BaseModel):
    chunk_index: int
    total_chunks: int
    uploaded: bool
    file_id: Optional[str] = None

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Profile Picture Upload Endpoints
@api_router.post("/profile/upload-chunk", response_model=ChunkUploadResponse)
async def upload_profile_picture_chunk(
    chunk: UploadFile = File(...),
    chunk_index: int = Form(...),
    total_chunks: int = Form(...),
    filename: str = Form(...),
    user_id: str = Form(default="admin")  # Default for admin user
):
    try:
        # Validate file type
        allowed_types = ["image/jpeg", "image/jpg", "image/png", "image/gif"]
        if chunk.content_type not in allowed_types:
            raise HTTPException(status_code=400, detail="Invalid file type")
        
        # Create a unique file ID based on filename and user_id
        file_id = hashlib.md5(f"{user_id}_{filename}".encode()).hexdigest()
        temp_file_path = UPLOADS_DIR / f"{file_id}_temp"
        
        # Read chunk data
        chunk_data = await chunk.read()
        
        # Append chunk to temporary file
        async with aiofiles.open(temp_file_path, "ab") as f:
            await f.write(chunk_data)
        
        # If this is the last chunk, finalize the upload
        if chunk_index == total_chunks - 1:
            final_file_path = UPLOADS_DIR / f"{file_id}_{filename}"
            
            # Move temp file to final location
            temp_file_path.rename(final_file_path)
            
            # Get file size
            file_size = final_file_path.stat().st_size
            
            # Save to database
            profile_picture = ProfilePictureUpload(
                filename=filename,
                file_path=str(final_file_path),
                file_size=file_size,
                content_type=chunk.content_type,
                user_id=user_id
            )
            
            await db.profile_pictures.insert_one(profile_picture.dict())
            
            return ChunkUploadResponse(
                chunk_index=chunk_index,
                total_chunks=total_chunks,
                uploaded=True,
                file_id=file_id
            )
        
        return ChunkUploadResponse(
            chunk_index=chunk_index,
            total_chunks=total_chunks,
            uploaded=False
        )
        
    except Exception as e:
        logger.error(f"Error uploading chunk: {str(e)}")
        raise HTTPException(status_code=500, detail="Upload failed")

@api_router.get("/profile/picture/{user_id}")
async def get_profile_picture(user_id: str = "admin"):
    try:
        # Find the latest profile picture for the user
        picture = await db.profile_pictures.find_one(
            {"user_id": user_id},
            sort=[("uploaded_at", -1)]
        )
        
        if not picture:
            raise HTTPException(status_code=404, detail="Profile picture not found")
        
        file_path = Path(picture["file_path"])
        if not file_path.exists():
            raise HTTPException(status_code=404, detail="File not found")
        
        return FileResponse(
            path=file_path,
            media_type=picture["content_type"],
            filename=picture["filename"]
        )
        
    except Exception as e:
        logger.error(f"Error retrieving profile picture: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to retrieve profile picture")

@api_router.delete("/profile/picture/{user_id}")
async def delete_profile_picture(user_id: str = "admin"):
    try:
        # Find and delete the profile picture
        picture = await db.profile_pictures.find_one(
            {"user_id": user_id},
            sort=[("uploaded_at", -1)]
        )
        
        if picture:
            # Delete file from filesystem
            file_path = Path(picture["file_path"])
            if file_path.exists():
                file_path.unlink()
            
            # Delete from database
            await db.profile_pictures.delete_one({"_id": picture["_id"]})
        
        return {"message": "Profile picture deleted successfully"}
        
    except Exception as e:
        logger.error(f"Error deleting profile picture: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete profile picture")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
