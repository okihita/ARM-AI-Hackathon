import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import DatabaseService from './src/DatabaseService';
import LlamaService from './src/LlamaService';

export default function App() {
  const [log, setLog] = useState('G-CAV-RN Test App\n\n');
  const [progress, setProgress] = useState(0);

  const addLog = (msg: string) => setLog(prev => `${prev}${msg}\n\n`);

  const testSQLite = async () => {
    addLog('🔵 Testing SQLite...');
    const result = await DatabaseService.test();
    addLog(result);
  };

  const downloadModel = async () => {
    addLog('🔵 Downloading model (2.2GB)...');
    setProgress(0);
    const result = await LlamaService.downloadModel((p) => setProgress(p));
    addLog(result);
    setProgress(0);
  };

  const loadModel = async () => {
    addLog('🔵 Loading model...');
    const result = await LlamaService.initialize();
    addLog(result);
  };

  const testInference = async () => {
    addLog('🔵 Running inference...');
    const result = await LlamaService.inference('What is React Native? Answer in 50 words.');
    addLog(result);
  };

  const clearLog = () => {
    setLog('G-CAV-RN Test App\n\n');
    setProgress(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.log}>
        <Text style={styles.logText}>{log}</Text>
        {progress > 0 && (
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
            <Text style={styles.progressText}>{progress.toFixed(1)}%</Text>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.btn} onPress={testSQLite}>
        <Text style={styles.btnText}>Test SQLite</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={downloadModel}>
        <Text style={styles.btnText}>Download Model (2.2GB)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={loadModel}>
        <Text style={styles.btnText}>Load Model</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={testInference}>
        <Text style={styles.btnText}>Test Inference</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn, styles.btnClear]} onPress={clearLog}>
        <Text style={styles.btnText}>Clear</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  log: { flex: 1, padding: 16 },
  logText: { color: '#0f0', fontFamily: 'Courier', fontSize: 12 },
  progressBar: { height: 30, backgroundColor: '#333', borderRadius: 4, marginTop: 8, position: 'relative' },
  progressFill: { height: '100%', backgroundColor: '#0f0', borderRadius: 4 },
  progressText: { position: 'absolute', width: '100%', textAlign: 'center', lineHeight: 30, color: '#fff', fontWeight: 'bold' },
  btn: { backgroundColor: '#333', padding: 16, margin: 8, borderRadius: 8 },
  btnClear: { backgroundColor: '#600' },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
