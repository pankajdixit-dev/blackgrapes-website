import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ModuleContent from './models/ModuleContent.js';
import Enquiry from './models/Enquiry.js';
import ActivityLog from './models/ActivityLog.js';
import MediaItem from './models/MediaItem.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE_PATH = path.resolve(__dirname, 'data/db.json');

// Mongoose Configuration
mongoose.set('bufferCommands', false);

let isConnected = false;
let connectionError = null;
let retryTimer = null;
let migrationDone = false;

// Read local JSON file safely
export function readLocalDb() {
  try {
    if (!fs.existsSync(DB_FILE_PATH)) return {};
    const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('[dbService] Local DB read error:', err.message);
    return {};
  }
}

// Write local JSON file safely
export function writeLocalDb(data) {
  try {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[dbService] Local DB write error:', err.message);
    return false;
  }
}

// Connect to MongoDB Atlas
export async function connectToMongo() {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('<username>') || uri.includes('<password>')) {
    const msg = 'MONGODB_URI not found or invalid in .env';
    console.warn('\x1b[33m%s\x1b[0m', `[MongoDB] ${msg}`);
    connectionError = msg;
    isConnected = false;
    return false;
  }

  try {
    const maskedUri = uri.replace(/:[^:]*@/, ':****@');
    console.log(`[MongoDB] Connecting to Atlas cluster (${maskedUri})...`);

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      family: 4
    });

    isConnected = true;
    connectionError = null;
    const dbName = mongoose.connection.name;
    const host = mongoose.connection.host;
    console.log('\x1b[32m%s\x1b[0m', `✅ [MongoDB Atlas Connected] Host: ${host} | Database: "${dbName}"`);

    // Clear any retry timer
    if (retryTimer) {
      clearInterval(retryTimer);
      retryTimer = null;
    }

    // Automatically synchronize/seed local data into MongoDB Atlas
    await seedAllToMongo();

    return true;
  } catch (err) {
    isConnected = false;
    connectionError = err.message;
    console.error('\x1b[31m%s\x1b[0m', `⚠️ [MongoDB Connection Warning] ${err.message}`);

    if (err.message && (err.message.includes('whitelist') || err.message.includes('SSL') || err.message.includes('alert number 80'))) {
      console.log('\x1b[33m%s\x1b[0m', '👉 [Action Required] Please whitelist your IP in MongoDB Atlas:');
      console.log('\x1b[33m%s\x1b[0m', '   Atlas Dashboard -> Network Access -> Add IP Address: 0.0.0.0/0 (Allow Anywhere) or your public IP');
      console.log('\x1b[33m%s\x1b[0m', '   (The server is auto-retrying in background; will connect automatically once added!)');
    }

    // Schedule background auto-retry every 12 seconds
    if (!retryTimer) {
      retryTimer = setInterval(async () => {
        if (!isConnected) {
          console.log('[MongoDB Auto-Retry] Attempting background reconnect to Atlas...');
          await connectToMongo();
        }
      }, 12000);
    }

    return false;
  }
}

// Seed all data from db.json into MongoDB Atlas collections
export async function seedAllToMongo() {
  if (!isConnected || migrationDone) return;

  try {
    const localDb = readLocalDb();
    const keys = Object.keys(localDb);
    console.log(`[MongoDB Migration] Checking and syncing ${keys.length} modules to MongoDB Atlas...`);

    let count = 0;
    for (const key of keys) {
      if (key === 'activity_logs' || key === 'enquiries' || key === 'admin_users' || key === 'media_library') {
        // Special collections can be synced as both ModuleContent and separate if desired
      }

      await ModuleContent.findOneAndUpdate(
        { module: key },
        { data: localDb[key], updated_at: new Date() },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      count++;
    }

    migrationDone = true;
    console.log('\x1b[32m%s\x1b[0m', `✨ [MongoDB Migration Complete] Successfully seeded ${count} modules to MongoDB Atlas!`);
  } catch (err) {
    console.error('[MongoDB Migration Error]:', err.message);
  }
}

// -------------------------------------------------------------
// MODULE CONTENT CRUD (Database First)
// -------------------------------------------------------------

export async function getModule(moduleName) {
  if (isConnected) {
    try {
      const doc = await ModuleContent.findOne({ module: moduleName }).lean();
      if (doc && doc.data !== undefined) {
        return doc.data;
      }
      // If module not in MongoDB yet, load from local and immediately save to MongoDB
      const localDb = readLocalDb();
      if (localDb[moduleName] !== undefined) {
        await ModuleContent.create({ module: moduleName, data: localDb[moduleName] });
        return localDb[moduleName];
      }
    } catch (err) {
      console.error(`[dbService] Mongo getModule error for ${moduleName}:`, err.message);
    }
  }

  // Fallback to local db.json
  const localDb = readLocalDb();
  return localDb[moduleName];
}

export async function saveModule(moduleName, data, userEmail = 'admin@blackgrapessoftech.com') {
  // 1. Save to MongoDB Atlas if connected
  if (isConnected) {
    try {
      await ModuleContent.findOneAndUpdate(
        { module: moduleName },
        { data, updated_at: new Date() },
        { upsert: true, new: true }
      );
      console.log(`[MongoDB] Successfully saved module "${moduleName}" to MongoDB Atlas`);
    } catch (err) {
      console.error(`[MongoDB] Save error for "${moduleName}":`, err.message);
    }
  }

  // 2. Always persist to local db.json as backup
  const localDb = readLocalDb();
  localDb[moduleName] = data;

  if (!localDb.activity_logs) localDb.activity_logs = [];
  localDb.activity_logs.unshift({
    id: `log-${Date.now()}`,
    action: 'Updated Module',
    module: moduleName,
    record_id: moduleName,
    user_email: userEmail,
    description: `Saved live modifications for module: ${moduleName}`,
    created_at: new Date().toISOString()
  });
  localDb.activity_logs = localDb.activity_logs.slice(0, 100);

  writeLocalDb(localDb);

  return data;
}

export async function getAllContent() {
  if (isConnected) {
    try {
      const docs = await ModuleContent.find({}).lean();
      if (docs && docs.length > 0) {
        const result = {};
        for (const doc of docs) {
          result[doc.module] = doc.data;
        }
        return result;
      }
    } catch (err) {
      console.error('[dbService] Mongo getAllContent error:', err.message);
    }
  }

  return readLocalDb();
}

// -------------------------------------------------------------
// INQUIRIES / LEADS CRUD
// -------------------------------------------------------------

export async function createInquiry(inquiryData) {
  const ticketId = `BG-${Math.floor(100000 + Math.random() * 900000)}`;
  const record = {
    id: `enq-${Date.now()}`,
    ticket_id: ticketId,
    name: inquiryData.name,
    email: inquiryData.email || '',
    phone: inquiryData.phone,
    service_required: inquiryData.service || 'General Consultation',
    project_scope: inquiryData.scope || inquiryData.message || '',
    status: 'new',
    notes: '',
    created_at: new Date().toISOString()
  };

  if (isConnected) {
    try {
      await Enquiry.create({
        fullName: record.name,
        email: record.email,
        phone: record.phone,
        service: record.service_required,
        message: record.project_scope,
        status: 'pending'
      });
    } catch (err) {
      console.warn('[dbService] Mongo Enquiry create warning:', err.message);
    }
  }

  // Save in db.json enquiries list
  const localDb = readLocalDb();
  if (!localDb.enquiries) localDb.enquiries = [];
  localDb.enquiries.unshift(record);
  writeLocalDb(localDb);

  return record;
}

export async function getInquiries() {
  const localDb = readLocalDb();
  return localDb.enquiries || [];
}

export async function updateInquiry(id, status, notes) {
  const localDb = readLocalDb();
  if (!localDb.enquiries) localDb.enquiries = [];

  const idx = localDb.enquiries.findIndex((e) => String(e.id) === String(id) || e.ticket_id === id);
  if (idx === -1) return null;

  if (status) localDb.enquiries[idx].status = status;
  if (notes !== undefined) localDb.enquiries[idx].notes = notes;
  localDb.enquiries[idx].updated_at = new Date().toISOString();

  writeLocalDb(localDb);
  return localDb.enquiries[idx];
}

export async function deleteInquiry(id) {
  const localDb = readLocalDb();
  if (!localDb.enquiries) localDb.enquiries = [];
  localDb.enquiries = localDb.enquiries.filter((e) => String(e.id) !== String(id) && e.ticket_id !== id);
  writeLocalDb(localDb);
  return true;
}

// -------------------------------------------------------------
// STATUS HELPER
// -------------------------------------------------------------

export function getStatus() {
  return {
    mongodb_connected: isConnected,
    database_name: mongoose.connection.name || 'blackgrapes',
    host: mongoose.connection.host || null,
    error: connectionError,
    storage_mode: isConnected ? 'mongodb_atlas' : 'local_json_fallback'
  };
}

export default {
  connectToMongo,
  seedAllToMongo,
  getModule,
  saveModule,
  getAllContent,
  createInquiry,
  getInquiries,
  updateInquiry,
  deleteInquiry,
  getStatus,
  readLocalDb,
  writeLocalDb
};

