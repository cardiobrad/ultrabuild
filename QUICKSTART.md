# 🚀 ULTRABUILD Quick Start (5 minutes)

## Installation

```bash
# 1. Extract the ZIP
unzip ultrabuild.zip
cd ultrabuild

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
http://localhost:5173
```

## Usage

### Via API

```bash
# Generate a project
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Awesome Game",
    "type": "game",
    "features": ["player", "enemies", "scoring"],
    "techStack": ["Phaser 3", "Express"]
  }'

# Deploy project
curl -X POST http://localhost:3000/api/deploy \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "proj-xxx",
    "target": "vercel"
  }'

# Heal code
curl -X POST http://localhost:3000/api/heal \
  -H "Content-Type: application/json" \
  -d '{
    "code": "your code here",
    "language": "typescript"
  }'
```

### Via Telegram Bot (ClawdBot)

```
/build MyProject game
/status
/stats
/heal
/think "analyze this code"
/test
/generate template
```

## Project Types

- `game` - Games (Phaser, Three.js, Babylon.js)
- `website` - Websites (React, Next.js, Vue)
- `app` - Mobile apps (React Native, Flutter)
- `ai-system` - AI systems (LangChain, LlamaIndex)
- `business-software` - Business apps (CRM, ERP)
- `data-tool` - Data tools (Dashboards, Analytics)
- `security-tool` - Security tools
- `api` - REST/GraphQL APIs
- `cli` - Command-line tools

## Features

- ✅ Instant project generation
- ✅ Production-ready code
- ✅ Self-healing errors
- ✅ Auto-deployment
- ✅ 70+ free AI providers
- ✅ Telegram control
- ✅ Template marketplace
- ✅ Zero cost forever

## Deployment

### Vercel
```bash
vercel deploy --prod
```

### GitHub
```bash
git push origin main
```

### Docker
```bash
docker build -t ultrabuild .
docker run -p 3000:3000 ultrabuild
```

### AWS
```bash
eb create ultrabuild-env
eb deploy
```

## Configuration

Create `.env` file:

```
MANUS_API_URL=https://api.manus.im
MANUS_API_KEY=your-key
VERCEL_TOKEN=your-token
GITHUB_TOKEN=your-token
TELEGRAM_BOT_TOKEN=your-token
PORT=3000
```

## Cost

**£0/month forever**

- Infrastructure: £0 (Vercel free)
- AI APIs: £0 (70+ free providers)
- Database: £0 (Supabase free)
- Telegram: £0 (free API)

## Next Steps

1. Generate your first project
2. Deploy to Vercel
3. Share with friends
4. Start monetizing templates
5. Build an empire

---

**Happy building! 🎉**
