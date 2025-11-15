/**
 * LlamaService - Handles on-device LLM inference
 * MVP: Mock responses for testing
 */

export class LlamaService {
  private initialized: boolean = false;

  async init(modelPath: string): Promise<void> {
    console.log(`Loading model: ${modelPath}`);
    this.initialized = true;
  }

  async embedding(text: string): Promise<number[]> {
    // MVP: Return mock embedding vector
    return new Array(768).fill(0).map(() => Math.random());
  }

  async completion(prompt: string, options?: {stream?: boolean}): Promise<string> {
    // MVP: Return mock response
    console.log(`Generating completion for: ${prompt.substring(0, 50)}...`);
    
    if (options?.stream) {
      // Simulate streaming
      return 'Based on the civic information, City Hall is open Monday through Friday from 9AM to 5PM.';
    }
    
    return 'Based on the civic information, City Hall is open Monday through Friday from 9AM to 5PM.';
  }

  isReady(): boolean {
    return this.initialized;
  }
}

export default new LlamaService();
