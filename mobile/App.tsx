import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DatabaseService from './src/DatabaseService';
import LlamaService from './src/LlamaService';

export default class App extends React.Component {
  state = {
    log: 'G-CAV-RN Test App\n\n',
    progress: 0,
  };

  componentDidMount() {
    console.log('App mounted!');
    this.addLog('App started');
  }

  addLog = (msg: string) => {
    console.log(msg);
    this.setState({ log: this.state.log + msg + '\n\n' });
  };

  testSQLite = async () => {
    console.log('testSQLite called');
    this.addLog('🔵 Testing SQLite...');
    const result = await DatabaseService.test();
    this.addLog(result);
  };

  testTouch = () => {
    console.log('testTouch called');
    this.addLog('✅ Touch works!');
  };

  downloadModel = async () => {
    this.addLog('🔵 Downloading model (2.2GB)...');
    const result = await LlamaService.downloadModel((p) => this.setState({ progress: p }));
    this.addLog(result);
    this.setState({ progress: 0 });
  };

  loadModel = async () => {
    this.addLog('🔵 Loading model...');
    const result = await LlamaService.initialize();
    this.addLog(result);
  };

  testInference = async () => {
    this.addLog('🔵 Running inference...');
    const result = await LlamaService.inference('What is React Native? Answer in 50 words.');
    this.addLog(result);
  };

  clearLog = () => {
    this.setState({ log: 'G-CAV-RN Test App\n\n', progress: 0 });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.log}>
          <Text style={styles.logText}>{this.state.log}</Text>
        </ScrollView>
        <TouchableOpacity 
          style={[styles.btn, { backgroundColor: '#0a0' }]} 
          onPress={this.testTouch}
          onPressIn={() => console.log('Touch IN')}
          onPressOut={() => console.log('Touch OUT')}>
          <Text style={styles.btnText}>TEST TOUCH</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={this.testSQLite}>
          <Text style={styles.btnText}>Test SQLite</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={this.downloadModel}>
          <Text style={styles.btnText}>Download Model (2.2GB)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={this.loadModel}>
          <Text style={styles.btnText}>Load Model</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={this.testInference}>
          <Text style={styles.btnText}>Test Inference</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnClear]} onPress={this.clearLog}>
          <Text style={styles.btnText}>Clear</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  log: { flex: 1, padding: 16 },
  logText: { color: '#0f0', fontFamily: 'Courier', fontSize: 12 },
  btn: { backgroundColor: '#333', padding: 16, margin: 8, borderRadius: 8 },
  btnClear: { backgroundColor: '#600' },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
