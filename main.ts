// Very Simple Runflow SDK Test
import { Agent } from '@runflow-ai/sdk';

// Simple agent without complex features
const simpleAgent = new Agent({
  name: 'Simple Test Agent',
  instructions: 'You are a simple test agent',
  model: {
    provider: 'openai',
    model: 'gpt-4'
  }
});

export async function main(input: any): Promise<any> {
  console.log('🚀 Simple SDK Test - Starting...');
  console.log('📥 Input:', JSON.stringify(input));
  
  // Just return a simple response without calling complex SDK methods
  const response = {
    message: `Hello! I received your message: "${input.message || 'No message'}". This is a simple SDK test.`,
    agent: simpleAgent.name,
    model: simpleAgent.model,
    timestamp: new Date().toISOString(),
    input: input
  };
  
  console.log('📤 Response:', JSON.stringify(response));
  console.log('✅ Simple SDK Test - Completed');
  
  return response;
}

export default main;
