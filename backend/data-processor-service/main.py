#!/usr/bin/env python3
"""Wrapper service to trigger data processor job."""

import os
import subprocess
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/', methods=['POST'])
def trigger_job():
    """Receive CloudEvent and trigger job."""
    try:
        # Get CloudEvent data
        event = request.get_json()
        
        # Execute the job
        result = subprocess.run(
            ['gcloud', 'run', 'jobs', 'execute', 'data-processor-job', 
             '--region=us-central1', '--wait'],
            capture_output=True,
            text=True
        )
        
        return jsonify({
            'status': 'triggered',
            'event': event,
            'job_output': result.stdout
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port)
