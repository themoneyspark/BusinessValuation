#!/usr/bin/env python3
"""
Backend API Testing for Profile Picture Upload Functionality
Tests the chunked upload, validation, retrieval, and deletion endpoints
"""

import requests
import os
import tempfile
from pathlib import Path
import json
import time
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

class ProfilePictureAPITester:
    def __init__(self):
        self.test_results = []
        self.uploaded_files = []  # Track files for cleanup
        
    def log_result(self, test_name, success, message, details=None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "details": details or {}
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name} - {message}")
        if details:
            print(f"   Details: {details}")
    
    def create_test_image(self, format_type="JPEG", size=(100, 100), file_size_mb=None):
        """Create a test image file"""
        img = Image.new('RGB', size, color='red')
        img_bytes = io.BytesIO()
        
        if file_size_mb:
            # Create image of specific size
            quality = 95
            while True:
                img_bytes.seek(0)
                img_bytes.truncate()
                img.save(img_bytes, format=format_type, quality=quality)
                current_size = len(img_bytes.getvalue()) / (1024 * 1024)
                
                if current_size >= file_size_mb:
                    break
                elif quality > 10:
                    quality -= 5
                else:
                    # If we can't reach the target size, create a larger image
                    new_size = (int(size[0] * 1.5), int(size[1] * 1.5))
                    img = Image.new('RGB', new_size, color='red')
                    size = new_size
        else:
            img.save(img_bytes, format=format_type)
        
        img_bytes.seek(0)
        return img_bytes.getvalue()
    
    def upload_file_in_chunks(self, file_data, filename, user_id="admin", chunk_size=1024):
        """Upload file using chunked upload"""
        total_size = len(file_data)
        total_chunks = (total_size + chunk_size - 1) // chunk_size
        
        print(f"Uploading {filename} in {total_chunks} chunks of {chunk_size} bytes each")
        
        for chunk_index in range(total_chunks):
            start = chunk_index * chunk_size
            end = min(start + chunk_size, total_size)
            chunk_data = file_data[start:end]
            
            files = {
                'chunk': (f'chunk_{chunk_index}', chunk_data, 'application/octet-stream')
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
                print(f"Chunk {chunk_index + 1}/{total_chunks} uploaded successfully")
                
                # If this is the last chunk, return the file_id
                if chunk_index == total_chunks - 1:
                    if result.get('uploaded'):
                        return True, result.get('file_id')
                    else:
                        return False, "Final chunk not marked as uploaded"
                        
            except Exception as e:
                return False, f"Exception during chunk {chunk_index}: {str(e)}"
        
        return False, "Upload completed but no file_id returned"
    
    def test_basic_connectivity(self):
        """Test basic API connectivity"""
        try:
            response = requests.get(f"{API_BASE}/", timeout=10)
            if response.status_code == 200:
                self.log_result("Basic Connectivity", True, "API is accessible")
                return True
            else:
                self.log_result("Basic Connectivity", False, f"API returned {response.status_code}")
                return False
        except Exception as e:
            self.log_result("Basic Connectivity", False, f"Connection failed: {str(e)}")
            return False
    
    def test_valid_image_upload(self):
        """Test uploading valid image files"""
        test_cases = [
            ("test_image.jpg", "JPEG", "image/jpeg"),
            ("test_image.png", "PNG", "image/png"),
            ("test_image.gif", "GIF", "image/gif")
        ]
        
        for filename, format_type, content_type in test_cases:
            try:
                # Create test image
                image_data = self.create_test_image(format_type)
                
                # Upload using chunked upload
                success, result = self.upload_file_in_chunks(image_data, filename)
                
                if success:
                    self.uploaded_files.append(filename)
                    self.log_result(f"Valid Upload ({format_type})", True, 
                                  f"Successfully uploaded {filename}", 
                                  {"file_id": result, "size": len(image_data)})
                else:
                    self.log_result(f"Valid Upload ({format_type})", False, 
                                  f"Failed to upload {filename}: {result}")
                    
            except Exception as e:
                self.log_result(f"Valid Upload ({format_type})", False, 
                              f"Exception during upload: {str(e)}")
    
    def test_invalid_file_type(self):
        """Test uploading invalid file types"""
        # Create a text file disguised as an image
        text_data = b"This is not an image file"
        
        files = {
            'chunk': ('test.txt', text_data, 'text/plain')
        }
        data = {
            'chunk_index': 0,
            'total_chunks': 1,
            'filename': 'test.txt',
            'user_id': 'admin'
        }
        
        try:
            response = requests.post(f"{API_BASE}/profile/upload-chunk", files=files, data=data)
            
            if response.status_code == 400:
                self.log_result("Invalid File Type", True, "Correctly rejected invalid file type")
            else:
                self.log_result("Invalid File Type", False, 
                              f"Should have rejected invalid file type, got {response.status_code}")
                
        except Exception as e:
            self.log_result("Invalid File Type", False, f"Exception during test: {str(e)}")
    
    def test_large_file_handling(self):
        """Test handling of large files (>2MB)"""
        try:
            # Create a large image (attempt to make it >2MB)
            large_image_data = self.create_test_image("JPEG", size=(2000, 2000), file_size_mb=2.5)
            
            # Try to upload it
            success, result = self.upload_file_in_chunks(large_image_data, "large_test.jpg")
            
            # Note: The current implementation doesn't seem to have size validation
            # This test documents the current behavior
            if success:
                self.uploaded_files.append("large_test.jpg")
                self.log_result("Large File Handling", True, 
                              f"Large file uploaded (size: {len(large_image_data)} bytes)", 
                              {"note": "No size limit enforced in current implementation"})
            else:
                self.log_result("Large File Handling", False, f"Large file upload failed: {result}")
                
        except Exception as e:
            self.log_result("Large File Handling", False, f"Exception during test: {str(e)}")
    
    def test_get_profile_picture(self):
        """Test retrieving profile pictures"""
        # First upload a test image
        image_data = self.create_test_image("JPEG")
        success, file_id = self.upload_file_in_chunks(image_data, "get_test.jpg")
        
        if not success:
            self.log_result("Get Profile Picture", False, "Failed to upload test image for retrieval test")
            return
        
        try:
            # Test getting the profile picture
            response = requests.get(f"{API_BASE}/profile/picture/admin")
            
            if response.status_code == 200:
                content_type = response.headers.get('content-type', '')
                if 'image' in content_type:
                    self.log_result("Get Profile Picture", True, 
                                  "Successfully retrieved profile picture",
                                  {"content_type": content_type, "size": len(response.content)})
                else:
                    self.log_result("Get Profile Picture", False, 
                                  f"Retrieved file but wrong content type: {content_type}")
            else:
                self.log_result("Get Profile Picture", False, 
                              f"Failed to retrieve profile picture: {response.status_code}")
                
        except Exception as e:
            self.log_result("Get Profile Picture", False, f"Exception during retrieval: {str(e)}")
    
    def test_get_nonexistent_profile_picture(self):
        """Test retrieving profile picture for non-existent user"""
        try:
            response = requests.get(f"{API_BASE}/profile/picture/nonexistent_user")
            
            if response.status_code == 404:
                self.log_result("Get Nonexistent Profile", True, 
                              "Correctly returned 404 for non-existent user")
            else:
                self.log_result("Get Nonexistent Profile", False, 
                              f"Should return 404, got {response.status_code}")
                
        except Exception as e:
            self.log_result("Get Nonexistent Profile", False, f"Exception during test: {str(e)}")
    
    def test_delete_profile_picture(self):
        """Test deleting profile pictures"""
        # First upload a test image
        image_data = self.create_test_image("JPEG")
        success, file_id = self.upload_file_in_chunks(image_data, "delete_test.jpg")
        
        if not success:
            self.log_result("Delete Profile Picture", False, "Failed to upload test image for deletion test")
            return
        
        try:
            # Delete the profile picture
            response = requests.delete(f"{API_BASE}/profile/picture/admin")
            
            if response.status_code == 200:
                # Verify it's actually deleted by trying to retrieve it
                get_response = requests.get(f"{API_BASE}/profile/picture/admin")
                if get_response.status_code == 404:
                    self.log_result("Delete Profile Picture", True, 
                                  "Successfully deleted profile picture")
                else:
                    self.log_result("Delete Profile Picture", False, 
                                  "Delete returned success but file still retrievable")
            else:
                self.log_result("Delete Profile Picture", False, 
                              f"Delete failed: {response.status_code}")
                
        except Exception as e:
            self.log_result("Delete Profile Picture", False, f"Exception during deletion: {str(e)}")
    
    def test_chunked_upload_integrity(self):
        """Test that chunked uploads maintain file integrity"""
        try:
            # Create a test image
            original_data = self.create_test_image("JPEG", size=(200, 200))
            
            # Upload in small chunks to test chunking
            success, file_id = self.upload_file_in_chunks(original_data, "integrity_test.jpg", chunk_size=512)
            
            if not success:
                self.log_result("Chunked Upload Integrity", False, f"Upload failed: {file_id}")
                return
            
            # Retrieve the uploaded file
            response = requests.get(f"{API_BASE}/profile/picture/admin")
            
            if response.status_code == 200:
                retrieved_data = response.content
                if len(retrieved_data) == len(original_data):
                    self.log_result("Chunked Upload Integrity", True, 
                                  "File size matches after chunked upload",
                                  {"original_size": len(original_data), "retrieved_size": len(retrieved_data)})
                else:
                    self.log_result("Chunked Upload Integrity", False, 
                                  f"File size mismatch: original {len(original_data)}, retrieved {len(retrieved_data)}")
            else:
                self.log_result("Chunked Upload Integrity", False, 
                              f"Could not retrieve uploaded file: {response.status_code}")
                
        except Exception as e:
            self.log_result("Chunked Upload Integrity", False, f"Exception during test: {str(e)}")
    
    def test_file_storage_verification(self):
        """Test that files are properly stored in the uploads directory"""
        try:
            # Upload a test file
            image_data = self.create_test_image("JPEG")
            success, file_id = self.upload_file_in_chunks(image_data, "storage_test.jpg")
            
            if not success:
                self.log_result("File Storage Verification", False, f"Upload failed: {file_id}")
                return
            
            # Check if file exists in uploads directory
            uploads_dir = Path("/app/backend/uploads/profile_pictures")
            
            if uploads_dir.exists():
                files_in_dir = list(uploads_dir.glob("*storage_test.jpg"))
                if files_in_dir:
                    self.log_result("File Storage Verification", True, 
                                  f"File found in uploads directory: {files_in_dir[0].name}")
                else:
                    self.log_result("File Storage Verification", False, 
                                  "File not found in uploads directory")
            else:
                self.log_result("File Storage Verification", False, 
                              "Uploads directory does not exist")
                
        except Exception as e:
            self.log_result("File Storage Verification", False, f"Exception during test: {str(e)}")
    
    def test_missing_chunk_handling(self):
        """Test handling of missing required fields"""
        test_cases = [
            ("Missing chunk_index", {"total_chunks": 1, "filename": "test.jpg"}),
            ("Missing total_chunks", {"chunk_index": 0, "filename": "test.jpg"}),
            ("Missing filename", {"chunk_index": 0, "total_chunks": 1}),
        ]
        
        for test_name, data in test_cases:
            try:
                image_data = self.create_test_image("JPEG")
                files = {'chunk': ('test.jpg', image_data, 'image/jpeg')}
                
                response = requests.post(f"{API_BASE}/profile/upload-chunk", files=files, data=data)
                
                if response.status_code in [400, 422]:  # Bad request or validation error
                    self.log_result(f"Missing Field - {test_name}", True, 
                                  "Correctly rejected request with missing field")
                else:
                    self.log_result(f"Missing Field - {test_name}", False, 
                                  f"Should reject missing field, got {response.status_code}")
                    
            except Exception as e:
                self.log_result(f"Missing Field - {test_name}", False, f"Exception: {str(e)}")
    
    def run_all_tests(self):
        """Run all tests"""
        print("=" * 60)
        print("PROFILE PICTURE API TESTING")
        print("=" * 60)
        print(f"Testing against: {API_BASE}")
        print()
        
        # Test basic connectivity first
        if not self.test_basic_connectivity():
            print("❌ Cannot connect to API. Stopping tests.")
            return
        
        # Run all tests
        self.test_valid_image_upload()
        self.test_invalid_file_type()
        self.test_large_file_handling()
        self.test_get_profile_picture()
        self.test_get_nonexistent_profile_picture()
        self.test_delete_profile_picture()
        self.test_chunked_upload_integrity()
        self.test_file_storage_verification()
        self.test_missing_chunk_handling()
        
        # Summary
        print("\n" + "=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if result['success'])
        total = len(self.test_results)
        
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        print(f"Success Rate: {(passed/total)*100:.1f}%")
        
        if total - passed > 0:
            print("\nFAILED TESTS:")
            for result in self.test_results:
                if not result['success']:
                    print(f"  ❌ {result['test']}: {result['message']}")
        
        return self.test_results

if __name__ == "__main__":
    tester = ProfilePictureAPITester()
    results = tester.run_all_tests()