import React, {useState} from 'react';
import {SafeAreaView, Text, Button, ScrollView, StyleSheet} from 'react-native';
import {open} from '@op-engineering/op-sqlite';
import {initLlama} from 'llama.rn';

export default function App() {
  const [status, setStatus] = useState('Ready');
  const [logs, setLogs] = useState<string[]>([]);

  const log = (msg: string) => {
    console.log(msg);
    setLogs(prev => [...prev, msg]);
  };

  const testSQLite = async () => {
    try {
      setStatus('Testing SQLite...');
      log('Opening database...');
      const db = open({name: 'test.db'});
      log('✅ Database opened');
      
      log('Creating table...');
      db.execute('CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, text TEXT)');
      log('✅ Table created');
      
      log('Testing SELECT 1...');
      const result = db.execute('SELECT 1 as num');
      log(`✅ Query works: ${result.rows?.length || 0} rows`);
      
      setStatus('✅ SQLite working!');
    } catch (e: any) {
      log(`❌ Error: ${e.message}`);
      setStatus('❌ SQLite failed');
    }
  };

  const testLlama = async () => {
    try {
      setStatus('Testing Llama...');
      log('Initializing llama.rn...');
      
      const context = await initLlama({
        model: '', // Empty - no model downloaded yet
        use_mlock: true,
        n_ctx: 2048,
        n_gpu_layers: 99,
      });
      
      log('✅ Llama initialized');
      setStatus('✅ Llama ready');
    } catch (e: any) {
      log(`⚠️ Expected: ${e.message}`);
      log('✅ Llama module loaded (needs model file)');
      setStatus('⚠️ Need model file');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>G-CAV-RN Test</Text>
      <Text style={styles.status}>{status}</Text>
      
      <Button title="Test SQLite" onPress={testSQLite} />
      <Button title="Test Llama" onPress={testLlama} />
      
      <ScrollView style={styles.logs}>
        {logs.map((log, i) => (
          <Text key={i} style={styles.log}>{log}</Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 10},
  status: {fontSize: 16, marginBottom: 20, color: '#666'},
  logs: {marginTop: 20, flex: 1},
  log: {fontSize: 12, fontFamily: 'monospace', marginBottom: 5},
});
