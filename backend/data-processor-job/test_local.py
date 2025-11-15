#!/usr/bin/env python3
"""Local test for data processor without GCP dependencies."""

import json
import base64
import os

# Mock GCS event
mock_event = {
    "bucket": "test-bucket",
    "name": "test-file.txt"
}

# Encode as it would come from Pub/Sub
message_data = json.dumps(mock_event).encode('utf-8')
encoded_message = base64.b64encode(message_data).decode('utf-8')

pubsub_message = {
    "message": {
        "data": encoded_message
    }
}

# Set environment variable as Cloud Run would
os.environ['CE_DATA'] = json.dumps(pubsub_message)

# Mock the storage client for local testing
class MockBlob:
    def __init__(self, content):
        self.content = content
    
    def download_as_bytes(self):
        return self.content.encode('utf-8')

class MockBucket:
    def blob(self, name):
        return MockBlob(f"Sample text content from {name}")

class MockStorageClient:
    def bucket(self, name):
        return MockBucket()

# Monkey patch for local testing
import sys
sys.modules['google.cloud'] = type(sys)('google.cloud')
sys.modules['google.cloud.storage'] = type(sys)('google.cloud.storage')
sys.modules['google.cloud'].storage = sys.modules['google.cloud.storage']
sys.modules['google.cloud.storage'].Client = MockStorageClient

# Now import and run main
from main import main

if __name__ == "__main__":
    print("=== LOCAL TEST ===")
    main()
    print("=== TEST COMPLETE ===")
