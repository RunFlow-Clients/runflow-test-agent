# Runflow SDK Hello World

This is a simple Hello World agent demonstrating proper usage of the Runflow SDK.

## Features

- ✅ Proper Agent configuration
- ✅ Custom tool creation with Zod validation
- ✅ Error handling
- ✅ Structured input/output
- ✅ TypeScript support

## Usage

The agent responds to greetings and can use a custom greeting tool when names are provided.

## Test Examples

```json
{"message": "Hello there!"}
{"message": "Hi, my name is John"}
{"message": "Olá, meu nome é Maria", "metadata": {"language": "pt"}}
```
