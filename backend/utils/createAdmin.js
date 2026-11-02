import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import { connectDB } from '../config/db.js';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const createInitialAdmin = async () => {
  console.log('🍇 [Black Grapes] Initializing Super Admin Seeder...');

  const isConnected = await connectDB();
  if (!isConnected) {
    console.log('⚠️ Could not establish connection with MongoDB. Please verify your MONGO_URI in backend/.env');
    process.exit(1);
  }

  const name = process.argv[2] || process.env.ADMIN_NAME || 'Black Grapes Administrator';
  const email = (process.argv[3] || process.env.ADMIN_EMAIL || 'admin@blackgrapessoftech.com').toLowerCase().trim();
  const password = process.argv[4] || process.env.ADMIN_PASSWORD || 'BlackGrapes@2026';

  try {
    const existing = await Admin.findOne({ email });

    if (existing) {
      console.log(`ℹ️ Admin user already exists with email: ${email}`);
      console.log(`Updating password for existing administrator...`);
      existing.password = password; // pre-save hook will hash it
      existing.name = name;
      await existing.save();
      console.log(`✅ Admin credentials updated successfully!`);
    } else {
      await Admin.create({
        name,
        email,
        password,
        role: 'superadmin',
      });
      console.log(`✅ Super Admin created successfully!`);
    }

    console.log('--------------------------------------------------');
    console.log(`🔑 Login Email:    ${email}`);
    console.log(`🔑 Login Password: ${password}`);
    console.log('--------------------------------------------------');
    console.log('⚠️ Important: Keep these credentials confidential.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating administrator:', error.message);
    process.exit(1);
  }
};

createInitialAdmin();

