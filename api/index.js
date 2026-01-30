const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ULTRABUILD is running' });
});

app.get('/api/status', (req, res) => {
  res.json({
    system: 'ULTRABUILD',
    version: '1.0.0',
    status: 'operational',
    timestamp: new Date().toISOString(),
    features: ['Code Generation', 'Deployment', 'Self-Healing', 'Manus Integration']
  });
});

app.post('/api/generate', (req, res) => {
  const { projectName, type } = req.body;
  res.json({
    success: true,
    project: { name: projectName, type: type || 'web', status: 'ready' }
  });
});

app.get('/', (req, res) => {
  res.json({ name: 'ULTRABUILD', version: '1.0.0' });
});

module.exports = app;
