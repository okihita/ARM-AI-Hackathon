#!/usr/bin/env python3
"""Package builder service - creates sqlite-vec database."""

import sqlite3
import numpy as np
import gzip
import os
from datetime import datetime
from flask import Flask, jsonify

app = Flask(__name__)


def create_sample_database():
    """Create a sample sqlite-vec database with civic data."""
    db_path = '/tmp/data.sqlite'
    
    # Remove existing database
    if os.path.exists(db_path):
        os.remove(db_path)
    
    # Create database
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Create metadata table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS civic_data (
            id INTEGER PRIMARY KEY,
            text_chunk TEXT,
            source_doc TEXT,
            agency_name TEXT
        )
    ''')
    
    # Insert sample data
    sample_data = [
        (1, "City Hall is open Monday-Friday 9AM-5PM", "city_hall_hours.txt", "City Hall"),
        (2, "Sanitation pickup is every Tuesday and Friday", "sanitation_schedule.txt", "Sanitation Dept"),
        (3, "Building permits can be obtained at the Planning Office", "permits_info.txt", "Planning Dept"),
        (4, "Emergency services dial 911 for immediate assistance", "emergency_info.txt", "Emergency Services"),
        (5, "Public library hours: Mon-Sat 10AM-8PM, Sun 12PM-6PM", "library_hours.txt", "Public Library")
    ]
    
    cursor.executemany(
        'INSERT INTO civic_data (id, text_chunk, source_doc, agency_name) VALUES (?, ?, ?, ?)',
        sample_data
    )
    
    # For MVP, we'll add vector table structure later
    # For now, just create the basic database
    
    conn.commit()
    conn.close()
    
    return db_path


def compress_database(db_path):
    """Compress the database file."""
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    output_path = f'/tmp/data.sqlite.v{timestamp}.gz'
    
    with open(db_path, 'rb') as f_in:
        with gzip.open(output_path, 'wb') as f_out:
            f_out.writelines(f_in)
    
    return output_path


@app.route('/build', methods=['POST'])
def build_package():
    """Build and compress the data package."""
    try:
        print("Building data package...")
        
        # Create database
        db_path = create_sample_database()
        print(f"Database created: {db_path}")
        
        # Compress
        compressed_path = compress_database(db_path)
        print(f"Compressed: {compressed_path}")
        
        # Get file size
        size_mb = os.path.getsize(compressed_path) / (1024 * 1024)
        
        return jsonify({
            'status': 'success',
            'database_path': db_path,
            'compressed_path': compressed_path,
            'size_mb': round(size_mb, 2)
        })
    
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint."""
    return jsonify({'status': 'healthy'})


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port)
