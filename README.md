# Runflow Test Agent

A comprehensive test agent for the Runflow execution engine, demonstrating SDK integration and multi-tool capabilities.

## Features

- 🌤️ **Weather Tool**: Get weather information for any city
- 🧮 **Calculator Tool**: Perform mathematical calculations  
- 🔄 **Echo Mode**: Echo back messages for testing
- 💬 **General Chat**: Handle general conversations

## Usage Examples

### Weather Request
```json
{
  "message": "What's the weather in London?",
  "type": "weather"
}
```

### Calculation Request  
```json
{
  "message": "Calculate 15 * 7",
  "type": "calculation"
}
```

### Echo Request
```json
{
  "message": "Hello Runflow!",
  "type": "echo"
}
```

### General Request
```json
{
  "message": "Hello, how are you?",
  "type": "general"
}
```

## Response Format

All responses include:
- `type`: Response type
- `message`: Human-readable message
- `agent`: Agent identifier
- `timestamp`: ISO timestamp
- `executionContext`: Execution metadata

## Development

```bash
npm install
npm run dev
```

## Deployment

This agent is designed to be deployed on the Runflow execution engine via Git URL deployment.

### Deploy via Runflow API

```bash
curl -X POST http://localhost:3100/api/v1/projects/deploy/git \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "runflow-test-agent",
    "name": "Runflow Test Agent", 
    "tenantId": "test-tenant",
    "gitUrl": "https://github.com/RunFlow-Clients/runflow-test-agent.git",
    "branch": "main"
  }'
```

### Execute Agent

```bash
curl -X POST http://localhost:3100/api/v1/execute \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "runflow-test-agent",
    "input": {
      "message": "What\'s the weather in São Paulo?",
      "type": "weather"
    }
  }'
```