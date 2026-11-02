import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Guaranteed absolute path regardless of working directory
const DB_PATH = path.resolve(__dirname, 'data/db.json');
const UPLOADS_DIR = path.resolve(__dirname, '../public/uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

function readDb() {
  try {
    if (!fs.existsSync(DB_PATH)) return {};
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('[API Middleware Read Error]:', err);
    return {};
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[API Middleware Write Error]:', err);
    return false;
  }
}

export function createApiMiddleware() {
  return (req, res, next) => {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = url.pathname;

    // Only process requests under /api
    if (!pathname.startsWith('/api')) {
      return next();
    }

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-email');

    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      return res.end();
    }

    const sendJson = (status, obj) => {
      res.statusCode = status;
      res.end(JSON.stringify(obj));
    };

    const getBody = () => {
      return new Promise((resolve) => {
        let body = '';
        req.on('data', (chunk) => (body += chunk));
        req.on('end', () => {
          try {
            resolve(body ? JSON.parse(body) : {});
          } catch {
            resolve({});
          }
        });
      });
    };

    // Route: GET /api/health
    if (pathname === '/api/health' && req.method === 'GET') {
      return sendJson(200, {
        status: 'online',
        timestamp: new Date().toISOString(),
        service: 'Black Grapes Softech Dev API Middleware',
        database_path: DB_PATH
      });
    }

    // Route: GET /api/all-content
    if (pathname === '/api/all-content' && req.method === 'GET') {
      return sendJson(200, { success: true, data: readDb() });
    }

    // Route: GET /api/content/:module
    if (pathname.startsWith('/api/content/') && req.method === 'GET') {
      const moduleName = pathname.replace('/api/content/', '').replace(/\/$/, '');
      const db = readDb();
      const data = db[moduleName];
      if (data !== undefined) {
        return sendJson(200, { success: true, module: moduleName, data });
      }
      return sendJson(404, { success: false, message: `Module ${moduleName} not found` });
    }

    // Route: PUT /api/content/:module
    if (pathname.startsWith('/api/content/') && req.method === 'PUT') {
      const moduleName = pathname.replace('/api/content/', '').replace(/\/$/, '');
      getBody().then((content) => {
        const db = readDb();
        db[moduleName] = content;

        if (!db.activity_logs) db.activity_logs = [];
        db.activity_logs.unshift({
          id: `log-${Date.now()}`,
          action: 'Updated Module',
          module: moduleName,
          record_id: moduleName,
          user_email: req.headers['x-admin-email'] || 'admin@blackgrapessoftech.com',
          description: `Saved live modifications for module: ${moduleName}`,
          created_at: new Date().toISOString()
        });
        db.activity_logs = db.activity_logs.slice(0, 100);

        writeDb(db);
        console.log(`[Vite API Middleware] Saved updates to module: ${moduleName}`);
        sendJson(200, { success: true, message: `Module ${moduleName} updated`, data: content });
      });
      return;
    }

    // Route: POST /api/inquiries
    if (pathname === '/api/inquiries' && req.method === 'POST') {
      getBody().then((body) => {
        const { name, email, phone, service, message, scope } = body;
        if (!name || !phone) {
          return sendJson(400, { success: false, message: 'Name and phone are required.' });
        }

        const db = readDb();
        if (!db.enquiries) db.enquiries = [];

        const ticketId = `BG-${Math.floor(100000 + Math.random() * 900000)}`;
        const newEnquiry = {
          id: `enq-${Date.now()}`,
          ticket_id: ticketId,
          name,
          email: email || '',
          phone,
          service_required: service || 'General Consultation',
          project_scope: scope || message || '',
          status: 'new',
          notes: '',
          created_at: new Date().toISOString()
        };

        db.enquiries.unshift(newEnquiry);
        writeDb(db);
        console.log(`[Vite API Middleware] New Inquiry Lead: #${ticketId} from ${name} (${phone})`);
        sendJson(201, {
          success: true,
          message: 'Inquiry successfully submitted! An architect will call you shortly.',
          ticket_id: ticketId,
          data: newEnquiry
        });
      });
      return;
    }

    // Route: GET /api/inquiries
    if (pathname === '/api/inquiries' && req.method === 'GET') {
      const db = readDb();
      return sendJson(200, {
        success: true,
        count: (db.enquiries || []).length,
        data: db.enquiries || []
      });
    }

    // Route: PUT /api/inquiries/:id
    if (pathname.startsWith('/api/inquiries/') && req.method === 'PUT') {
      const id = pathname.replace('/api/inquiries/', '');
      getBody().then((body) => {
        const db = readDb();
        const idx = (db.enquiries || []).findIndex((e) => String(e.id) === String(id) || e.ticket_id === id);
        if (idx === -1) {
          return sendJson(404, { success: false, message: 'Inquiry not found' });
        }
        if (body.status) db.enquiries[idx].status = body.status;
        if (body.notes !== undefined) db.enquiries[idx].notes = body.notes;
        db.enquiries[idx].updated_at = new Date().toISOString();
        writeDb(db);
        sendJson(200, { success: true, data: db.enquiries[idx] });
      });
      return;
    }

    // Route: DELETE /api/inquiries/:id
    if (pathname.startsWith('/api/inquiries/') && req.method === 'DELETE') {
      const id = pathname.replace('/api/inquiries/', '');
      const db = readDb();
      db.enquiries = (db.enquiries || []).filter((e) => String(e.id) !== String(id) && e.ticket_id !== id);
      writeDb(db);
      return sendJson(200, { success: true, message: 'Inquiry deleted' });
    }

    // Route: POST /api/auth/login
    if (pathname === '/api/auth/login' && req.method === 'POST') {
      getBody().then((body) => {
        const cleanEmail = (body.email || '').trim().toLowerCase();
        const cleanPass = (body.password || '').trim();

        const db = readDb();
        const users = db.admin_users || [];
        const foundUser = users.find((u) => u.email.toLowerCase() === cleanEmail);

        const isDefault = cleanEmail === 'admin@blackgrapessoftech.com' && (cleanPass === 'admin123' || cleanPass === 'admin@2026');
        const isUserMatch = foundUser && (cleanPass === 'admin123' || cleanPass === 'admin@2026' || cleanPass.length >= 6);

        if (isDefault || isUserMatch) {
          const session = {
            email: foundUser?.email || cleanEmail,
            role: foundUser?.role || 'super_admin',
            full_name: foundUser?.full_name || 'Lead Administrator',
            token: `token_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
            expires_at: Date.now() + 86400000 * 7,
            auth_provider: 'file_backend'
          };
          if (foundUser) {
            foundUser.last_login_at = new Date().toISOString();
            writeDb(db);
          }
          return sendJson(200, { success: true, session });
        }

        sendJson(401, {
          success: false,
          message: 'Invalid credentials. Default: admin@blackgrapessoftech.com / admin123'
        });
      });
      return;
    }

    // Route: POST /api/upload
    if (pathname === '/api/upload' && req.method === 'POST') {
      getBody().then((body) => {
        try {
          const { fileName, base64Data, altText } = body;
          if (!fileName || !base64Data) {
            return sendJson(400, { success: false, message: 'fileName and base64Data required' });
          }

          const cleanBase64 = base64Data.replace(/^data:image\/\w+;base64,/, '');
          const buffer = Buffer.from(cleanBase64, 'base64');
          const safeName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9._-]/g, '')}`;
          const filePath = path.join(UPLOADS_DIR, safeName);

          fs.writeFileSync(filePath, buffer);
          const publicUrl = `/uploads/${safeName}`;

          const db = readDb();
          if (!db.media_library) db.media_library = [];

          const newMedia = {
            id: `med-${Date.now()}`,
            name: fileName,
            url: publicUrl,
            file_type: fileName.endsWith('.png') ? 'image/png' : 'image/jpeg',
            file_size: buffer.length,
            alt_text: altText || fileName,
            uploaded_at: new Date().toISOString()
          };

          db.media_library.unshift(newMedia);
          writeDb(db);

          sendJson(200, { success: true, url: publicUrl, item: newMedia });
        } catch (err) {
          console.error('[API Middleware Upload Error]:', err);
          sendJson(500, { success: false, message: 'Upload failed' });
        }
      });
      return;
    }

    // Route: GET /api/media
    if (pathname === '/api/media' && req.method === 'GET') {
      const db = readDb();
      return sendJson(200, { success: true, data: db.media_library || [] });
    }

    next();
  };
}
