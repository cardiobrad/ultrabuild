const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const gamesRouter = require('./games');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'ULTRABUILD is running',
    gameEnginesAvailable: ['Phaser', 'Three.js', 'Babylon.js', 'WebSocket'],
    timestamp: new Date().toISOString()
  });
});

app.get('/api/status', (req, res) => {
  res.json({
    system: 'ULTRABUILD',
    version: '1.0.0',
    status: 'operational',
    timestamp: new Date().toISOString(),
    features: [
      'Code Generation',
      'Game Generation (All Types)',
      'Deployment',
      'Self-Healing',
      'Manus Integration'
    ],
    gameTypes: ['2D', '3D', 'Multiplayer', 'Card', 'Board', 'RPG', 'Strategy']
  });
});

app.post('/api/generate', (req, res) => {
  const { projectName, type } = req.body;
  res.json({
    success: true,
    project: { name: projectName, type: type || 'web', status: 'ready' }
  });
});

// Game generation routes
app.use('/api/games', gamesRouter);

app.get('/', (req, res) => {
  res.json({
    name: 'ULTRABUILD',
    version: '1.0.0',
    description: 'World\'s Most Advanced Autonomous Code & Game Generation System',
    features: [
      'Code Generation',
      'Game Generation (All Types)',
      'Deployment',
      'Self-Healing',
      'Manus Integration'
    ],
    gameTypes: ['2D', '3D', 'Multiplayer', 'Card', 'Board', 'RPG', 'Strategy'],
    endpoints: {
      health: '/api/health',
      status: '/api/status',
      generate: 'POST /api/generate',
      games: {
        types: 'GET /api/games/types',
        '2d': 'POST /api/games/generate/2d',
        '3d': 'POST /api/games/generate/3d',
        multiplayer: 'POST /api/games/generate/multiplayer',
        card: 'POST /api/games/generate/card',
        board: 'POST /api/games/generate/board',
        rpg: 'POST /api/games/generate/rpg',
        strategy: 'POST /api/games/generate/strategy'
      }
    }
  });
});

module.exports = app;
