import { saveAs } from 'file-saver'
import JSZip from 'jszip'

export async function generateStandalonePackage(agent, config) {
  const zip = new JSZip()

  // Add main server file
  zip.file('server.js', generateServerCode(agent))
  
  // Add agent implementation
  zip.file(`agents/${agent.type}.js`, generateAgentCode(agent))
  
  // Add configuration
  zip.file('config.json', JSON.stringify(config, null, 2))
  
  // Add package.json
  zip.file('package.json', generatePackageJson(agent))
  
  // Add README
  zip.file('README.md', generateReadme(agent))

  // Add start script
  zip.file('start.sh', generateStartScript())
  
  // Generate the zip file
  const content = await zip.generateAsync({ type: 'blob' })
  saveAs(content, `${agent.name.toLowerCase()}-standalone.zip`)
}

function generateServerCode(agent) {
  return `const express = require('express');
const cors = require('cors');
const { createAgent } = require('./agents/${agent.type}.js');

const app = express();
const port = process.env.PORT || 3000;

// Load configuration
const config = require('./config.json');

// Middleware
app.use(express.json());
app.use(cors({
  origin: config.security.cors,
  methods: ['GET', 'POST'],
}));

// API Key middleware
if (config.security.apiKey) {
  app.use((req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== process.env.API_KEY) {
      return res.status(401).json({ error: 'Invalid API key' });
    }
    next();
  });
}

// Create agent instance
const agent = createAgent({
  name: '${agent.name}',
  type: '${agent.type}',
  config: config
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', agent: '${agent.name}', type: '${agent.type}' });
});

// Agent interaction endpoint
app.post('/query', async (req, res) => {
  try {
    const { input } = req.body;
    const response = await agent.process(input);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(\`Agent server running on port \${port}\`);
  console.log(\`Agent Name: ${agent.name}\`);
  console.log(\`Agent Type: ${agent.type}\`);
});`
}

function generateAgentCode(agent) {
  const agentImplementations = {
    chatbot: `
class ChatbotAgent {
  constructor(config) {
    this.config = config;
    this.name = config.name;
  }

  async process(input) {
    // Basic response logic - replace with your actual chatbot implementation
    if (input.toLowerCase().includes('hello')) {
      return 'Hello! How can I help you today?';
    }
    if (input.toLowerCase().includes('bye')) {
      return 'Goodbye! Have a great day!';
    }
    return \`I understand you're saying: "\${input}". How can I assist you?\`;
  }
}`,
    scheduler: `
class SchedulerAgent {
  constructor(config) {
    this.config = config;
    this.name = config.name;
    this.appointments = new Map();
  }

  async process(input) {
    // Basic scheduling logic - replace with your actual scheduling implementation
    if (input.toLowerCase().includes('schedule')) {
      return 'I can help you schedule an appointment. What date and time works for you?';
    }
    if (input.toLowerCase().includes('appointment')) {
      return 'I'll check the available slots. Please provide your preferred date and time.';
    }
    return 'I can help you manage your schedule. What would you like to do?';
  }
}`,
    analyzer: `
class AnalyzerAgent {
  constructor(config) {
    this.config = config;
    this.name = config.name;
  }

  async process(input) {
    // Basic analysis logic - replace with your actual analysis implementation
    if (input.toLowerCase().includes('analyze')) {
      return 'I can help analyze your data. What specific metrics would you like to focus on?';
    }
    if (input.toLowerCase().includes('report')) {
      return 'I can generate a detailed report. What information should I include?';
    }
    return 'I can help you analyze data and generate insights. What would you like to know?';
  }
}`
  }

  return `
${agentImplementations[agent.type]}

module.exports = {
  createAgent: (config) => new ${agent.type.charAt(0).toUpperCase() + agent.type.slice(1)}Agent(config)
};`
}

function generatePackageJson(agent) {
  return JSON.stringify({
    name: agent.name.toLowerCase(),
    version: '1.0.0',
    description: `Standalone ${agent.type} agent`,
    main: 'server.js',
    scripts: {
      start: 'node server.js'
    },
    dependencies: {
      express: '^4.18.2',
      cors: '^2.8.5'
    }
  }, null, 2)
}

function generateReadme(agent) {
  return `# ${agent.name} - Standalone Agent

## Description
${agent.description}

## Setup Instructions

1. Install Dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Configure Environment:
   - Copy \`.env.example\` to \`.env\`
   - Set your API key if enabled in config.json

3. Start the Agent:
   \`\`\`bash
   npm start
   \`\`\`
   Or use the provided start script:
   \`\`\`bash
   ./start.sh
   \`\`\`

## API Endpoints

- Health Check: GET /health
- Query Agent: POST /query
  \`\`\`json
  {
    "input": "Your query here"
  }
  \`\`\`

## Configuration

Edit \`config.json\` to modify:
- Security settings
- CORS origins
- Agent-specific settings

## Support
For support or questions, please refer to the documentation or contact support.`
}

function generateStartScript() {
  return `#!/bin/bash
export PORT=3000
export API_KEY=\${API_KEY:-"default-key-change-me"}

echo "Starting ${agent.name} agent..."
npm start`
}
