// Runflow SDK Hello World - Proper Implementation
import { Agent, createTool } from '@runflow-ai/sdk';
import { z } from 'zod';

// Create a simple greeting tool
const greetingTool = createTool({
  id: 'greeting',
  description: 'Generate personalized greetings',
  inputSchema: z.object({
    name: z.string().describe('Name of the person to greet'),
    language: z.enum(['en', 'pt', 'es']).optional().describe('Language for greeting')
  }),
  outputSchema: z.object({
    greeting: z.string(),
    language: z.string()
  }),
  execute: async ({ context }) => {
    const { name, language = 'en' } = context;
    
    const greetings = {
      en: `Hello ${name}! Welcome to Runflow!`,
      pt: `Olá ${name}! Bem-vindo ao Runflow!`,
      es: `¡Hola ${name}! ¡Bienvenido a Runflow!`
    };
    
    return {
      greeting: greetings[language] || greetings.en,
      language: language
    };
  }
});

// Create the agent with proper configuration
const helloAgent = new Agent({
  name: 'Hello World Agent',
  instructions: 'You are a friendly greeting agent. Use the greeting tool when users provide their name, otherwise respond with a general welcome message.',
  model: {
    provider: 'openai',
    model: 'gpt-4'
  },
  tools: {
    greeting: greetingTool
  }
});

// Main function - entry point for Runflow execution engine
export async function main(input: any): Promise<any> {
  console.log('🚀 [Hello World Agent] Starting execution...');
  console.log('📥 [Hello World Agent] Input received:', JSON.stringify(input, null, 2));
  
  try {
    // Process the input using the agent
    const result = await helloAgent.process(input, {
      projectId: 'hello-world-test',
      tenantId: 'test-tenant'
    });
    
    console.log('✅ [Hello World Agent] Processing completed');
    console.log('📤 [Hello World Agent] Result:', JSON.stringify(result, null, 2));
    
    return result;
    
  } catch (error) {
    console.error('❌ [Hello World Agent] Error during processing:', error);
    
    // Return a fallback response
    return {
      message: 'Hello! I encountered an error, but I\'m still here to help. Welcome to Runflow!',
      metadata: {
        error: error.message,
        fallback: true,
        timestamp: new Date().toISOString()
      }
    };
  }
}

// Export default for compatibility
export default main;
