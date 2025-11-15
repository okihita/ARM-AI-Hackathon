/**
 * DatabaseService - Handles sqlite-vec operations
 * MVP: Basic query interface
 */

export class DatabaseService {
  private dbPath: string = '';

  async init(path: string): Promise<void> {
    this.dbPath = path;
    console.log(`Database initialized: ${path}`);
  }

  async query(text: string): Promise<Array<{text: string; source: string}>> {
    // MVP: Return mock data
    const mockResults = [
      {
        text: 'City Hall is open Monday-Friday 9AM-5PM',
        source: 'city_hall_hours.txt'
      },
      {
        text: 'Sanitation pickup is every Tuesday and Friday',
        source: 'sanitation_schedule.txt'
      }
    ];
    
    console.log(`Query: ${text}`);
    return mockResults;
  }

  async close(): Promise<void> {
    console.log('Database closed');
  }
}

export default new DatabaseService();
