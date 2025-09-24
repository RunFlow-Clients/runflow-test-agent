// Simple Runflow Hello World Agent
import { Agent } from '@runflow-ai/sdk';

class HelloAgent extends Agent {
  constructor() {
    super({
      name: 'Hello Agent',
      description: 'Simple hello world agent',
      version: '1.0.0'
    });
  }
}

export async function main(input: any): Promise<any> {
  console.log('🚀 Hello World from Runflow!');
  console.log('📥 Input received:', input);
  
  return {
    message: 'Hello World from Runflow!',
    input: input,
    timestamp: new Date().toISOString(),
    agent: 'HelloAgent'
  };
}

export default main;
