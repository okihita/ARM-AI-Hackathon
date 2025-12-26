import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import DatabaseService from './src/DatabaseService';
import LlamaService from './src/LlamaService';

export default class App extends React.Component {
  state = {
    log: 'G-CAV-RN Test App\n\n',
    progress: 0,
    downloading: false,
    modelStatus: 'checking',
  };

  componentDidMount() {
    console.log('App mounted!');
    this.checkModelStatus();
  }

  checkModelStatus = async () => {
    this.addLog('🔍 Checking model status...\n');
    const status = await LlamaService.checkModel();
    this.addLog(status.message);
    this.setState({ modelStatus: status.status });
  };

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
    if (this.state.downloading) {
      this.addLog('⚠️ Download already in progress...\n');
      return;
    }
    
    this.setState({ downloading: true });
    this.addLog('🔵 Downloading model (2.2GB)...');
    const result = await LlamaService.downloadModel((p) => this.setState({ progress: p }));
    this.addLog(result);
    this.setState({ progress: 0, downloading: false, modelStatus: 'ready' });
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

  runBenchmark = async () => {
    this.addLog('🔵 Running GPU benchmark (3 tests)...');
    this.addLog('This will take ~2 minutes...\n');
    const result = await LlamaService.benchmark('What is artificial intelligence?');
    this.addLog(result);
  };

  clearLog = () => {
    this.setState({ log: 'G-CAV-RN Test App\n\n', progress: 0 });
  };

  render() {
    const { progress, downloading, modelStatus } = this.state;
    const downloadDisabled = downloading || modelStatus === 'ready';
    
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.log}>
          <Text style={styles.logText}>{this.state.log}</Text>
        </ScrollView>
        {progress > 0 && progress < 100 && (
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
            <Text style={styles.progressText}>{progress.toFixed(1)}%</Text>
          </View>
        )}
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
        <TouchableOpacity 
          style={[styles.btn, downloadDisabled && styles.btnDisabled]} 
          onPress={this.downloadModel}
          disabled={downloadDisabled}>
          <Text style={styles.btnText}>
            {downloading ? '⏳ Downloading...' : modelStatus === 'ready' ? '✅ Model Ready' : 'Download Model (2.2GB)'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={this.loadModel}>
          <Text style={styles.btnText}>Load Model</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={this.testInference}>
          <Text style={styles.btnText}>Test Inference</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor: '#f80' }]} onPress={this.runBenchmark}>
          <Text style={styles.btnText}>🚀 GPU Benchmark</Text>
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
  progressContainer: { 
    height: 40, 
    backgroundColor: '#222', 
    margin: 8, 
    borderRadius: 8, 
    overflow: 'hidden',
    justifyContent: 'center',
  },
  progressBar: { 
    position: 'absolute',
    height: '100%', 
    backgroundColor: '#0a0',
  },
  progressText: { 
    color: '#fff', 
    textAlign: 'center', 
    fontWeight: 'bold',
    zIndex: 1,
  },
  btn: { backgroundColor: '#333', padding: 16, margin: 8, borderRadius: 8 },
  btnDisabled: { backgroundColor: '#555', opacity: 0.5 },
  btnClear: { backgroundColor: '#600' },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
