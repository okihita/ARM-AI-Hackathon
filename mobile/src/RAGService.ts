/**
 * RAGService - Orchestrates Retrieval-Augmented Generation
 * MVP: Complete offline RAG pipeline
 */

import DatabaseService from './DatabaseService';
import LlamaService from './LlamaService';

export class RAGService {
  async query(userQuery: string): Promise<string> {
    console.log(`[RAG] Processing query: ${userQuery}`);
    
    // 1. Retrieve relevant context
    const results = await DatabaseService.query(userQuery);
    console.log(`[RAG] Retrieved ${results.length} results`);
    
    // 2. Build context
    const context = results.map(r => r.text).join('\n\n');
    
    // 3. Construct prompt
    const prompt = `<|system|>You are a helpful civic assistant. Answer based only on the provided context.

Context:
${context}
<|end|>
<|user|>${userQuery}<|end|>
<|assistant|>`;
    
    // 4. Generate response
    const response = await LlamaService.completion(prompt);
    console.log(`[RAG] Generated response`);
    
    return response;
  }

  async init(): Promise<void> {
    console.log('[RAG] Initializing services...');
    await DatabaseService.init('/path/to/data.sqlite');
    await LlamaService.init('/path/to/model.gguf');
    console.log('[RAG] Ready');
  }
}

export default new RAGService();
