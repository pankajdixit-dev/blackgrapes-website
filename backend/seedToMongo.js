import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import fs from 'fs';
import ModuleContent from './models/ModuleContent.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const DB_FILE_PATH = path.resolve(__dirname, 'data/db.json');

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI not found in backend/.env');
    process.exit(1);
  }

  const masked = uri.replace(/:[^:]*@/, ':****@');
  console.log(`Connecting to MongoDB Atlas (${masked})...`);

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000, family: 4 });
    console.log(`✅ Connected to MongoDB Atlas! DB: "${mongoose.connection.name}"`);

    if (!fs.existsSync(DB_FILE_PATH)) {
      console.error(`❌ db.json file not found at ${DB_FILE_PATH}`);
      process.exit(1);
    }

    const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
    const localDb = JSON.parse(raw);
    const keys = Object.keys(localDb);

    console.log(`Seeding ${keys.length} modules into collection "modulecontents"...`);

    for (const key of keys) {
      const data = localDb[key];
      await ModuleContent.findOneAndUpdate(
        { module: key },
        { data, updated_at: new Date() },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
      );
      console.log(`  ✓ Synced module: "${key}"`);
    }

    console.log(`\n🎉 Successfully migrated all website & admin modules to MongoDB Atlas!`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error(`❌ Migration failed:`, err.message);
    if (err.message && (err.message.includes('whitelist') || err.message.includes('SSL') || err.message.includes('alert number 80'))) {
      console.log('\n👉 Whitelist your IP in MongoDB Atlas:');
      console.log('   Atlas Dashboard -> Network Access -> Add IP Address: 0.0.0.0/0 (Allow Anywhere)');
    }
    process.exit(1);
  }
}

seed();

