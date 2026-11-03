import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import errorHandler from './middleware/errorHandler.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import logRoutes from './routes/logRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import contentRoutes from './routes/contentRoutes.js';

// Models for auto-seed check
import AdminUser from './models/AdminUser.js';
import Service from './models/Service.js';
import SiteSettings from './models/SiteSettings.js';
import { defaultServices, defaultSiteSettings } from './utils/seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Environment variables from root .env or backend/.env
dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT']
  }
});
app.set('io', io);

io.on('connection', (socket) => {
  socket.on('content_updated', (data) => {
    socket.broadcast.emit('content_updated', data);
  });
  socket.on('disconnect', () => {});
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads folder
const uploadsDir = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsDir));

// Welcome / Root API Info
app.get('/api', (req, res) => {
  res.json({
    name: 'Black Grapes Softech REST API Engine',
    version: '1.0.0',
    database: 'MongoDB Atlas',
    status: 'online',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      enquiries: '/api/enquiries',
      services: '/api/services',
      projects: '/api/projects',
      testimonials: '/api/testimonials',
      team: '/api/team',
      blogs: '/api/blogs',
      settings: '/api/settings',
      logs: '/api/logs',
      media: '/api/media',
      content: '/api/content'
    }
  });
});

// Mount Routes
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/content', contentRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Connect to MongoDB and auto-seed initial data if empty
connectDB().then(async (connected) => {
  if (connected) {
    try {
      // Auto-seed admin user if none exists
      const adminCount = await AdminUser.countDocuments();
      if (adminCount === 0) {
        const defaultEmail = (process.env.DEFAULT_ADMIN_EMAIL || 'admin@blackgrapessoftech.com').toLowerCase();
        await AdminUser.create({
          name: process.env.DEFAULT_ADMIN_NAME || 'Black Grapes Admin',
          email: defaultEmail,
          password: process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@12345',
          role: 'superadmin'
        });
        console.log('\x1b[36m%s\x1b[0m', `[Auto-Seed] Initial superadmin created: ${defaultEmail} (Password: Admin@12345)`);
      }

      // Auto-seed services if none exist
      const serviceCount = await Service.countDocuments();
      if (serviceCount === 0) {
        await Service.insertMany(defaultServices);
        console.log('\x1b[36m%s\x1b[0m', `[Auto-Seed] Initial ${defaultServices.length} enterprise services seeded into MongoDB.`);
      }

      // Auto-seed site settings if none exist
      const settingsCount = await SiteSettings.countDocuments();
      if (settingsCount === 0) {
        await SiteSettings.create(defaultSiteSettings);
        console.log('\x1b[36m%s\x1b[0m', '[Auto-Seed] Initial Site Settings configured in MongoDB.');
      }
    } catch (seedErr) {
      console.warn('[Auto-Seed Warning]', seedErr.message);
    }
  }
});

// Handle Port Conflict gracefully
httpServer.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\x1b[31m[Port Error] Port ${PORT} is already in use by another process.\x1b[0m`);
    console.log(`\x1b[33mTo free port ${PORT}, run in PowerShell:\x1b[0m`);
    console.log(`\x1b[36m  Get-Process -Id (Get-NetTCPConnection -LocalPort ${PORT}).OwningProcess | Stop-Process -Force\x1b[0m`);
    console.log(`\x1b[33mor simply run:\x1b[0m \x1b[36mnpx kill-port ${PORT}\x1b[0m`);
    process.exit(1);
  } else {
    throw err;
  }
});

// Start Server with WebSockets
httpServer.listen(PORT, () => {
  console.log('\x1b[35m%s\x1b[0m', `======================================================`);
  console.log('\x1b[32m%s\x1b[0m', `  🚀 Black Grapes Softech Backend Server is Running!`);
  console.log('\x1b[36m%s\x1b[0m', `  📡 Local API URL : http://localhost:${PORT}/api`);
  console.log('\x1b[36m%s\x1b[0m', `  ⚡ Real-Time WS  : ws://localhost:${PORT} (Active)`);
  console.log('\x1b[36m%s\x1b[0m', `  🩺 Health Check  : http://localhost:${PORT}/api/health`);
  console.log('\x1b[35m%s\x1b[0m', `======================================================`);
});

export { io, httpServer };
export default app;

