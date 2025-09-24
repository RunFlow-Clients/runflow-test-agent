// Simple Working Test
console.log('🚀 Starting simple test...');

export async function main(input: any): Promise<any> {
  console.log('📥 Input received:', JSON.stringify(input, null, 2));
  
  const result = {
    success: true,
    message: `Hello! You said: "${input.message || 'nothing'}"`,
    timestamp: new Date().toISOString(),
    inputReceived: input,
    testData: {
      numbers: [1, 2, 3, 4, 5],
      calculation: 2 + 2,
      greeting: 'Hello from Runflow!'
    }
  };
  
  console.log('📤 Returning result:', JSON.stringify(result, null, 2));
  console.log('✅ Test completed successfully');
  
  return result;
}

export default main;
