import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import AdminUser from '../models/AdminUser.js';
import Service from '../models/Service.js';
import SiteSettings from '../models/SiteSettings.js';
import { defaultServices, defaultSiteSettings } from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedDatabase = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!uri || uri.includes('<username>')) {
    console.error('❌ MONGODB_URI is not set or has placeholders in .env file!');
    process.exit(1);
  }

  try {
    console.log('Connecting to MongoDB Atlas Cluster...');
    await mongoose.connect(uri);
    console.log('Connected!');

    // 1. Seed Default Admin User
    const adminEmail = (process.env.DEFAULT_ADMIN_EMAIL || 'admin@blackgrapessoftech.com').toLowerCase();
    const existingAdmin = await AdminUser.findOne({ email: adminEmail });

    if (!existingAdmin) {
      await AdminUser.create({
        name: process.env.DEFAULT_ADMIN_NAME || 'Black Grapes Admin',
        email: adminEmail,
        password: process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@12345',
        role: 'superadmin'
      });
      console.log(`✅ Default Superadmin seeded: ${adminEmail}`);
    } else {
      console.log(`ℹ️ Admin user ${adminEmail} already exists.`);
    }

    // 2. Seed Services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany(defaultServices);
      console.log(`✅ Seeded ${defaultServices.length} default enterprise services.`);
    } else {
      console.log(`ℹ️ Services already exist (${serviceCount} records).`);
    }

    // 3. Seed Site Settings
    const existingSettings = await SiteSettings.findOne();
    if (!existingSettings) {
      await SiteSettings.create(defaultSiteSettings);
      console.log('✅ Default Site Settings seeded.');
    } else {
      console.log('ℹ️ Site Settings already configured.');
    }

    console.log('\n🎉 MongoDB database seeding completed successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeder Error:', error);
    process.exit(1);
  }
};

seedDatabase();
