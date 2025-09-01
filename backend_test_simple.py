#!/usr/bin/env python3
"""
Simplified Backend API Testing for Profile Picture Upload Functionality
"""

import requests
import os
from pathlib import Path
import json
from PIL import Image
import io

# Get backend URL from frontend .env file
def get_backend_url():
    frontend_env_path = Path("/app/frontend/.env")
    if frontend_env_path.exists():
        with open(frontend_env_path, 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    return "http://localhost:8001"

BASE_URL = get_backend_url()
API_BASE = f"{BASE_URL}/api"

def create_test_image(format_type="JPEG", size=(100, 100)):
    """Create a test image file"""
    img = Image.new('RGB', size, color='red')
    img_bytes = io.BytesIO()
    img.save(img_bytes, format=format_type)
    img_bytes.seek(0)
    return img_bytes.getvalue()

def upload_file_in_chunks(file_data, filename, user_id="admin", chunk_size=1024):
    """Upload file using chunked upload"""
    total_size = len(file_data)
    total_chunks = (total_size + chunk_size - 1) // chunk_size
    
    # Determine content type from filename
    content_type = 'application/octet-stream'
    if filename.lower().endswith(('.jpg', '.jpeg')):
        content_type = 'image/jpeg'
    elif filename.lower().endswith('.png'):
        content_type = 'image/png'
    elif filename.lower().endswith('.gif'):
        content_type = 'image/gif'
    
    print(f"Uploading {filename} in {total_chunks} chunks")
    
    for chunk_index in range(total_chunks):
        start = chunk_index * chunk_size
        end = min(start + chunk_size, total_size)
        chunk_data = file_data[start:end]
        
        files = {
            'chunk': (f'chunk_{chunk_index}', chunk_data, content_type)
        }
        data = {
            'chunk_index': chunk_index,
            'total_chunks': total_chunks,
            'filename': filename,
            'user_id': user_id
        }
        
        try:
            response = requests.post(f"{API_BASE}/profile/upload-chunk", files=files, data=data)
            
            if response.status_code != 200:
                return False, f"Chunk {chunk_index} failed: {response.status_code} - {response.text}"
            
            result = response.json()
            
            # If this is the last chunk, return the file_id
            if chunk_index == total_chunks - 1:
                if result.get('uploaded'):
                    return True, result.get('file_id')
                else:
                    return False, "Final chunk not marked as uploaded"
                    
        except Exception as e:
            return False, f"Exception during chunk {chunk_index}: {str(e)}"
    
    return False, "Upload completed but no file_id returned"

def run_tests():
    """Run simplified tests"""
    print("=" * 60)
    print("PROFILE PICTURE API TESTING (SIMPLIFIED)")
    print("=" * 60)
    print(f"Testing against: {API_BASE}")
    print()
    
    results = []
    
    # Test 1: Basic connectivity
    print("1. Testing basic connectivity...")
    try:
        response = requests.get(f"{API_BASE}/", timeout=10)
        if response.status_code == 200:
            print("✅ API is accessible")
            results.append(("Basic Connectivity", True))
        else:
            print(f"❌ API returned {response.status_code}")
            results.append(("Basic Connectivity", False))
    except Exception as e:
        print(f"❌ Connection failed: {str(e)}")
        results.append(("Basic Connectivity", False))
    
    # Test 2: Valid image uploads
    print("\n2. Testing valid image uploads...")
    test_cases = [
        ("test.jpg", "JPEG", "image/jpeg"),
        ("test.png", "PNG", "image/png"),
        ("test.gif", "GIF", "image/gif")
    ]
    
    for filename, format_type, content_type in test_cases:
        try:
            image_data = create_test_image(format_type)
            success, result = upload_file_in_chunks(image_data, filename)
            
            if success:
                print(f"✅ Successfully uploaded {filename} (file_id: {result})")
                results.append((f"Upload {format_type}", True))
            else:
                print(f"❌ Failed to upload {filename}: {result}")
                results.append((f"Upload {format_type}", False))
                
        except Exception as e:
            print(f"❌ Exception during {filename} upload: {str(e)}")
            results.append((f"Upload {format_type}", False))
    
    # Test 3: Invalid file type
    print("\n3. Testing invalid file type rejection...")
    try:
        text_data = b"This is not an image file"
        files = {'chunk': ('test.txt', text_data, 'text/plain')}
        data = {
            'chunk_index': 0,
            'total_chunks': 1,
            'filename': 'test.txt',
            'user_id': 'admin'
        }
        
        response = requests.post(f"{API_BASE}/profile/upload-chunk", files=files, data=data)
        
        if response.status_code == 400:
            print("✅ Correctly rejected invalid file type")
            results.append(("Invalid File Type", True))
        else:
            print(f"❌ Should have rejected invalid file type, got {response.status_code}")
            results.append(("Invalid File Type", False))
            
    except Exception as e:
        print(f"❌ Exception during invalid file test: {str(e)}")
        results.append(("Invalid File Type", False))
    
    # Test 4: Get profile picture
    print("\n4. Testing profile picture retrieval...")
    try:
        response = requests.get(f"{API_BASE}/profile/picture/admin")
        
        if response.status_code == 200:
            content_type = response.headers.get('content-type', '')
            if 'image' in content_type:
                print(f"✅ Successfully retrieved profile picture ({content_type}, {len(response.content)} bytes)")
                results.append(("Get Profile Picture", True))
            else:
                print(f"❌ Retrieved file but wrong content type: {content_type}")
                results.append(("Get Profile Picture", False))
        else:
            print(f"❌ Failed to retrieve profile picture: {response.status_code}")
            results.append(("Get Profile Picture", False))
            
    except Exception as e:
        print(f"❌ Exception during retrieval: {str(e)}")
        results.append(("Get Profile Picture", False))
    
    # Test 5: Get non-existent profile picture
    print("\n5. Testing non-existent user profile picture...")
    try:
        response = requests.get(f"{API_BASE}/profile/picture/nonexistent_user")
        
        if response.status_code == 404:
            print("✅ Correctly returned 404 for non-existent user")
            results.append(("Get Nonexistent Profile", True))
        else:
            print(f"❌ Should return 404, got {response.status_code}")
            results.append(("Get Nonexistent Profile", False))
            
    except Exception as e:
        print(f"❌ Exception during test: {str(e)}")
        results.append(("Get Nonexistent Profile", False))
    
    # Test 6: Delete profile picture
    print("\n6. Testing profile picture deletion...")
    try:
        response = requests.delete(f"{API_BASE}/profile/picture/admin")
        
        if response.status_code == 200:
            # Verify it's actually deleted
            get_response = requests.get(f"{API_BASE}/profile/picture/admin")
            if get_response.status_code == 404:
                print("✅ Successfully deleted profile picture")
                results.append(("Delete Profile Picture", True))
            else:
                print("❌ Delete returned success but file still retrievable")
                results.append(("Delete Profile Picture", False))
        else:
            print(f"❌ Delete failed: {response.status_code}")
            results.append(("Delete Profile Picture", False))
            
    except Exception as e:
        print(f"❌ Exception during deletion: {str(e)}")
        results.append(("Delete Profile Picture", False))
    
    # Test 7: File storage verification
    print("\n7. Testing file storage...")
    try:
        # Upload a test file first
        image_data = create_test_image("JPEG")
        success, file_id = upload_file_in_chunks(image_data, "storage_test.jpg")
        
        if success:
            # Check if file exists in uploads directory
            uploads_dir = Path("/app/backend/uploads/profile_pictures")
            
            if uploads_dir.exists():
                files_in_dir = list(uploads_dir.glob("*storage_test.jpg"))
                if files_in_dir:
                    print(f"✅ File found in uploads directory: {files_in_dir[0].name}")
                    results.append(("File Storage", True))
                else:
                    print("❌ File not found in uploads directory")
                    results.append(("File Storage", False))
            else:
                print("❌ Uploads directory does not exist")
                results.append(("File Storage", False))
        else:
            print(f"❌ Could not upload test file: {file_id}")
            results.append(("File Storage", False))
            
    except Exception as e:
        print(f"❌ Exception during storage test: {str(e)}")
        results.append(("File Storage", False))
    
    # Summary
    print("\n" + "=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    
    passed = sum(1 for _, success in results if success)
    total = len(results)
    
    print(f"Total Tests: {total}")
    print(f"Passed: {passed}")
    print(f"Failed: {total - passed}")
    print(f"Success Rate: {(passed/total)*100:.1f}%")
    
    if total - passed > 0:
        print("\nFAILED TESTS:")
        for test_name, success in results:
            if not success:
                print(f"  ❌ {test_name}")
    
    return results

if __name__ == "__main__":
    run_tests()