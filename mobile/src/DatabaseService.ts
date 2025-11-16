import { open } from '@op-engineering/op-sqlite';

class DatabaseService {
  async test(): Promise<string> {
    try {
      const db = open({ name: 'test.db' });
      db.execute('CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, value TEXT)');
      db.execute('SELECT 1');
      return '✅ SQLite working';
    } catch (error) {
      return `❌ SQLite error: ${error}`;
    }
  }
}

export default new DatabaseService();
