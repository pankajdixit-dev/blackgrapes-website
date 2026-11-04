import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly configure dotenv from backend/.env
dotenv.config({ path: path.resolve(__dirname, '.env') });

import express from 'express';
import cors from 'cors';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import apiRouter from './apiRouter.js';
import { connectToMongo } from './dbService.js';

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Serve static uploaded files
const uploadsPath = path.resolve(__dirname, '../public/uploads');
app.use('/uploads', express.static(uploadsPath));

// ==========================================
// REAL-TIME WEBSOCKET SERVER
// ==========================================
const wss = new WebSocketServer({ server });
const clients = new Set();

wss.on('connection', (ws, req) => {
  clients.add(ws);
  const clientIp = req.socket.remoteAddress;
  console.log(`[WebSocket] Client connected from ${clientIp}. Total active: ${clients.size}`);

  // Send immediate confirmation
  ws.send(JSON.stringify({
    type: 'WS_CONNECTED',
    message: 'Black Grapes Softech Real-Time WebSocket Channel Active',
    active_clients: clients.size,
    timestamp: Date.now()
  }));

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      if (data.type === 'BROADCAST_UPDATE') {
        broadcastContentUpdate(data.module, data.data, ws);
      }
    } catch (err) {
      console.error('[WebSocket] Message parsing error:', err);
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log(`[WebSocket] Client disconnected. Total active: ${clients.size}`);
  });

  ws.on('error', (err) => {
    console.error('[WebSocket] Client error:', err);
    clients.delete(ws);
  });
});

export function broadcastContentUpdate(module, data, senderWs = null) {
  const payload = JSON.stringify({
    type: 'CONTENT_UPDATED',
    module,
    data,
    timestamp: Date.now()
  });

  console.log(`⚡ [WebSocket Broadcast] Pushing update for "${module}" to ${clients.size} clients!`);

  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  }
}

// Make broadcast function accessible in Express request handlers
app.locals.broadcastContentUpdate = broadcastContentUpdate;

// Mount REST API
app.use('/api', apiRouter);

// Fallback health check
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    name: 'Black Grapes Softech Backend Server with Real-Time WebSocket',
    ws_clients_count: clients.size,
    endpoints: {
      health: '/api/health',
      dbStatus: '/api/db-status',
      allContent: '/api/all-content',
      inquiries: '/api/inquiries'
    }
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\x1b[31m[Port Busy] Port ${PORT} is already in use by another process. Please close the other process first.\x1b[0m`);
    process.exit(1);
  } else {
    console.error('[Server Error]:', err.message);
  }
});

server.listen(PORT, async () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Black Grapes Softech Backend Server RUNNING!`);
  console.log(`🌐 HTTP URL: http://localhost:${PORT}`);
  console.log(`⚡ WebSocket URL: ws://localhost:${PORT}`);
  console.log(`📁 Local DB: ${path.resolve(__dirname, 'data/db.json')}`);
  console.log(`☁️  MongoDB Atlas: ${process.env.MONGODB_URI ? 'Configured in .env' : 'NOT CONFIGURED'}`);
  console.log(`======================================================\n`);

  // Initialize MongoDB Atlas connection
  await connectToMongo();
});
