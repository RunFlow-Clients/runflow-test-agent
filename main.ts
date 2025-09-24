// Runflow Test Agent - Complete SDK Integration
import { Agent, createTool } from '@runflow-ai/sdk';
import { z } from 'zod';
import axios from 'axios';

// Tool para buscar informações sobre clima
const weatherTool = createTool({
  name: 'get_weather',
  description: 'Get weather information for a city',
  parameters: z.object({
    city: z.string().describe('The city name'),
    country: z.string().optional().describe('The country code (optional)')
  }),
  execute: async ({ city, country }) => {
    try {
      // Simulação de API de clima (você pode usar uma API real)
      const location = country ? `${city}, ${country}` : city;
      
      return {
        location,
        temperature: Math.floor(Math.random() * 35) + 5, // 5-40°C
        condition: ['sunny', 'cloudy', 'rainy', 'snowy'][Math.floor(Math.random() * 4)],
        humidity: Math.floor(Math.random() * 100),
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`Failed to get weather for ${city}: ${error.message}`);
    }
  }
});

// Tool para fazer cálculos
const calculatorTool = createTool({
  name: 'calculate',
  description: 'Perform mathematical calculations',
  parameters: z.object({
    expression: z.string().describe('Mathematical expression to evaluate'),
    operation: z.enum(['add', 'subtract', 'multiply', 'divide']).optional()
  }),
  execute: async ({ expression, operation }) => {
    try {
      // Avaliação segura de expressões matemáticas simples
      const sanitized = expression.replace(/[^0-9+\-*/().\s]/g, '');
      const result = Function(`"use strict"; return (${sanitized})`)();
      
      return {
        expression: sanitized,
        result,
        operation: operation || 'evaluate',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`Invalid mathematical expression: ${expression}`);
    }
  }
});

// Agente principal
class TestAgent extends Agent {
  constructor() {
    super({
      name: 'Runflow Test Agent',
      description: 'A comprehensive test agent for the Runflow execution engine',
      version: '1.0.0',
      tools: [weatherTool, calculatorTool]
    });
  }

  async processMessage(input: any): Promise<any> {
    const { message, type = 'general', context = {} } = input;

    console.log(`🤖 [TestAgent] Processing message: ${message}`);
    console.log(`📋 [TestAgent] Type: ${type}, Context:`, context);

    // Diferentes tipos de processamento baseado no tipo
    switch (type) {
      case 'weather':
        return await this.handleWeatherRequest(message, context);
      
      case 'calculation':
        return await this.handleCalculationRequest(message, context);
      
      case 'echo':
        return this.handleEchoRequest(message, context);
      
      default:
        return this.handleGeneralRequest(message, context);
    }
  }

  private async handleWeatherRequest(message: string, context: any) {
    // Extrair cidade da mensagem (simulação simples)
    const cityMatch = message.match(/weather.*?in\s+([a-zA-Z\s]+)/i);
    const city = cityMatch ? cityMatch[1].trim() : context.city || 'São Paulo';

    const weather = await weatherTool.execute({ city });

    return {
      type: 'weather_response',
      message: `The weather in ${weather.location} is ${weather.condition} with ${weather.temperature}°C and ${weather.humidity}% humidity.`,
      data: weather,
      agent: 'TestAgent',
      timestamp: new Date().toISOString(),
      executionContext: {
        inputMessage: message,
        detectedCity: city,
        toolUsed: 'get_weather'
      }
    };
  }

  private async handleCalculationRequest(message: string, context: any) {
    // Extrair expressão matemática da mensagem
    const mathMatch = message.match(/calculate\s+(.+)/i) || message.match(/(\d+[\+\-\*/]\d+)/);
    const expression = mathMatch ? mathMatch[1].trim() : context.expression || '2+2';

    const calculation = await calculatorTool.execute({ expression });

    return {
      type: 'calculation_response',
      message: `The result of ${calculation.expression} is ${calculation.result}`,
      data: calculation,
      agent: 'TestAgent',
      timestamp: new Date().toISOString(),
      executionContext: {
        inputMessage: message,
        detectedExpression: expression,
        toolUsed: 'calculate'
      }
    };
  }

  private handleEchoRequest(message: string, context: any) {
    return {
      type: 'echo_response',
      message: `Echo: ${message}`,
      originalMessage: message,
      context,
      agent: 'TestAgent',
      timestamp: new Date().toISOString(),
      executionContext: {
        mode: 'echo',
        toolUsed: 'none'
      }
    };
  }

  private handleGeneralRequest(message: string, context: any) {
    const responses = [
      `Hello! I'm the Runflow Test Agent. You said: "${message}"`,
      `Greetings! I received your message: "${message}"`,
      `Hi there! Processing your request: "${message}"`,
      `Welcome to Runflow! Your message "${message}" has been received.`
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    return {
      type: 'general_response',
      message: randomResponse,
      suggestions: [
        'Try asking about weather: "What\'s the weather in London?"',
        'Try a calculation: "Calculate 15 * 7"',
        'Try echo mode: Send with type "echo"'
      ],
      capabilities: {
        weather: 'Get weather information for any city',
        calculator: 'Perform mathematical calculations',
        echo: 'Echo back your messages',
        general: 'Handle general conversations'
      },
      agent: 'TestAgent',
      timestamp: new Date().toISOString(),
      executionContext: {
        inputMessage: message,
        responseType: 'general',
        toolsAvailable: ['get_weather', 'calculate']
      }
    };
  }
}

// Função principal exportada (required by Runflow)
export async function main(input: any): Promise<any> {
  console.log('🚀 [TestAgent] Starting execution with input:', input);

  try {
    const agent = new TestAgent();
    const result = await agent.processMessage(input);

    console.log('✅ [TestAgent] Execution completed successfully');
    console.log('📤 [TestAgent] Result:', result);

    return result;

  } catch (error) {
    console.error('❌ [TestAgent] Execution failed:', error);
    
    return {
      type: 'error_response',
      message: 'Sorry, I encountered an error while processing your request.',
      error: error.message,
      agent: 'TestAgent',
      timestamp: new Date().toISOString(),
      executionContext: {
        inputReceived: input,
        errorType: error.constructor.name
      }
    };
  }
}

// Exportação adicional para compatibilidade
export default main;