import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Guaranteed absolute path regardless of working directory
const DB_PATH = path.resolve(__dirname, 'data/db.json');
const UPLOADS_DIR = path.resolve(__dirname, '../public/uploads');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

function readDb() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      return {};
    }
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('[API Database Read Error]:', err);
    return {};
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[API Database Write Error]:', err);
    return false;
  }
}

// 1. Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Black Grapes Softech Persistent File Database API',
    database_path: DB_PATH
  });
});

// 2. Get All Content
router.get('/all-content', (req, res) => {
  const db = readDb();
  res.json({ success: true, data: db });
});

// 3. Get Module Content
router.get('/content/:module', (req, res) => {
  const { module } = req.params;
  const db = readDb();
  const data = db[module];
  if (data !== undefined) {
    return res.json({ success: true, module, data });
  }
  res.status(404).json({ success: false, message: `Module ${module} not found` });
});

// 4. Update / Save Module Content
router.put('/content/:module', (req, res) => {
  const { module } = req.params;
  const content = req.body;
  const db = readDb();

  db[module] = content;

  // Add audit log
  if (!db.activity_logs) db.activity_logs = [];
  db.activity_logs.unshift({
    id: `log-${Date.now()}`,
    action: 'Updated Module',
    module: module,
    record_id: module,
    user_email: req.headers['x-admin-email'] || 'admin@blackgrapessoftech.com',
    description: `Saved live modifications for module: ${module}`,
    created_at: new Date().toISOString()
  });

  // Limit activity logs to 100 entries
  db.activity_logs = db.activity_logs.slice(0, 100);

  const written = writeDb(db);
  if (written) {
    console.log(`[API] Saved updates to module: ${module}`);
    return res.json({
      success: true,
      message: `Module ${module} updated successfully`,
      data: content
    });
  }
  res.status(500).json({ success: false, message: 'Failed to write to database' });
});

// 5. Inquiries / Leads Submission
router.post('/inquiries', (req, res) => {
  const { name, email, phone, service, message, scope } = req.body;

  if (!name || !phone) {
    return res.status(400).json({
      success: false,
      message: 'Name and phone number are required.'
    });
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

  console.log(`[Black Grapes Lead] Ticket #${ticketId} created for ${name} (${phone})`);

  res.status(201).json({
    success: true,
    message: 'Your inquiry has been successfully submitted! An architect will call you shortly.',
    ticket_id: ticketId,
    data: newEnquiry
  });
});

// 6. Get All Inquiries
router.get('/inquiries', (req, res) => {
  const db = readDb();
  res.json({
    success: true,
    count: (db.enquiries || []).length,
    data: db.enquiries || []
  });
});

// 7. Update Inquiry Status
router.put('/inquiries/:id', (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  const db = readDb();

  const idx = (db.enquiries || []).findIndex((e) => String(e.id) === String(id) || e.ticket_id === id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Inquiry not found' });
  }

  if (status) db.enquiries[idx].status = status;
  if (notes !== undefined) db.enquiries[idx].notes = notes;
  db.enquiries[idx].updated_at = new Date().toISOString();

  writeDb(db);
  res.json({ success: true, data: db.enquiries[idx] });
});

// 8. Delete Inquiry
router.delete('/inquiries/:id', (req, res) => {
  const { id } = req.params;
  const db = readDb();
  db.enquiries = (db.enquiries || []).filter((e) => String(e.id) !== String(id) && e.ticket_id !== id);
  writeDb(db);
  res.json({ success: true, message: 'Inquiry deleted' });
});

// 9. Admin Authentication
router.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();

  const db = readDb();
  const users = db.admin_users || [];
  const foundUser = users.find((u) => u.email.toLowerCase() === cleanEmail);

  const isDefaultAdmin = cleanEmail === 'admin@blackgrapessoftech.com' && (cleanPass === 'admin123' || cleanPass === 'admin@2026');
  const isConfiguredAdmin = foundUser && (cleanPass === 'admin123' || cleanPass === 'admin@2026' || cleanPass.length >= 6);

  if (isDefaultAdmin || isConfiguredAdmin) {
    const session = {
      email: foundUser?.email || cleanEmail,
      role: foundUser?.role || 'super_admin',
      full_name: foundUser?.full_name || 'Lead Administrator',
      token: `bgst_jwt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      expires_at: Date.now() + 86400000 * 7,
      auth_provider: 'file_backend'
    };

    if (foundUser) {
      foundUser.last_login_at = new Date().toISOString();
      writeDb(db);
    }

    return res.json({ success: true, session });
  }

  res.status(401).json({
    success: false,
    message: 'Invalid credentials. Default: admin@blackgrapessoftech.com / admin123'
  });
});

// 10. File / Image Upload
router.post('/upload', express.json({ limit: '25mb' }), (req, res) => {
  try {
    const { fileName, base64Data, altText } = req.body;
    if (!fileName || !base64Data) {
      return res.status(400).json({ success: false, message: 'fileName and base64Data are required' });
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

    res.json({ success: true, url: publicUrl, item: newMedia });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ success: false, message: 'Failed to upload image' });
  }
});

// 11. Media Library
router.get('/media', (req, res) => {
  const db = readDb();
  res.json({ success: true, data: db.media_library || [] });
});

router.delete('/media/:id', (req, res) => {
  const { id } = req.params;
  const db = readDb();
  db.media_library = (db.media_library || []).filter((m) => String(m.id) !== String(id));
  writeDb(db);
  res.json({ success: true, message: 'Media item deleted' });
});

export default router;
