// Minimal Runflow SDK Test - Just Import
console.log('🚀 Starting minimal SDK test...');

// Import SDK components
import { Agent } from '@runflow-ai/sdk';

console.log('✅ SDK imported successfully');

export async function main(input: any): Promise<any> {
  console.log('📥 Minimal SDK Test - Input:', JSON.stringify(input));
  
  try {
    console.log('🤖 Creating agent...');
    
    // Just create an agent instance - don't call complex methods
    const agent = new Agent({
      name: 'Minimal Test Agent',
      instructions: 'Simple test agent',
      model: {
        provider: 'openai',
        model: 'gpt-4'
      }
    });
    
    console.log('✅ Agent created successfully:', agent.name);
    
    const result = {
      success: true,
      message: 'SDK imported and agent created successfully!',
      sdkTest: {
        agentName: agent.name,
        agentInstructions: agent.instructions,
        agentModel: agent.model,
        sdkImported: true
      },
      input: input,
      timestamp: new Date().toISOString()
    };
    
    console.log('📤 Minimal SDK Test - Result:', JSON.stringify(result, null, 2));
    console.log('✅ Minimal SDK test completed');
    
    return result;
    
  } catch (error) {
    console.error('❌ Minimal SDK Test error:', error);
    
    return {
      success: false,
      error: error.message,
      stack: error.stack,
      message: 'SDK test failed during execution',
      timestamp: new Date().toISOString()
    };
  }
}

export default main;
