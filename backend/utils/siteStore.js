import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  DEFAULT_SERVICES,
  DEFAULT_PROJECTS,
  DEFAULT_TESTIMONIALS,
  DEFAULT_TEAM_MEMBERS,
  DEFAULT_BLOG_POSTS,
  DEFAULT_SITE_SETTINGS
} from '../defaultData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJsonFile(filename, fallback) {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf8');
      const parsed = JSON.parse(raw);
      if (parsed) return parsed;
    }
  } catch (err) {
    console.warn(`[SiteStore] Error reading ${filename}:`, err.message);
  }
  return fallback;
}

function writeJsonFile(filename, data) {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`[SiteStore] Error writing ${filename}:`, err.message);
    return false;
  }
}

// 1. Settings
export const getStoredSettings = () => readJsonFile('site_settings.json', DEFAULT_SITE_SETTINGS);
export const saveStoredSettings = (data) => writeJsonFile('site_settings.json', data);

// 2. Services
export const getStoredServices = () => readJsonFile('services_store.json', DEFAULT_SERVICES);
export const saveStoredServices = (data) => writeJsonFile('services_store.json', data);

// 3. Projects
export const getStoredProjects = () => readJsonFile('projects_store.json', DEFAULT_PROJECTS);
export const saveStoredProjects = (data) => writeJsonFile('projects_store.json', data);

// 4. Testimonials
export const getStoredTestimonials = () => readJsonFile('testimonials_store.json', DEFAULT_TESTIMONIALS);
export const saveStoredTestimonials = (data) => writeJsonFile('testimonials_store.json', data);

// 5. Team
export const getStoredTeam = () => readJsonFile('team_store.json', DEFAULT_TEAM_MEMBERS);
export const saveStoredTeam = (data) => writeJsonFile('team_store.json', data);

// 6. Blogs
export const getStoredBlogs = () => readJsonFile('blogs_store.json', DEFAULT_BLOG_POSTS);
export const saveStoredBlogs = (data) => writeJsonFile('blogs_store.json', data);

export default {
  getStoredSettings,
  saveStoredSettings,
  getStoredServices,
  saveStoredServices,
  getStoredProjects,
  saveStoredProjects,
  getStoredTestimonials,
  saveStoredTestimonials,
  getStoredTeam,
  saveStoredTeam,
  getStoredBlogs,
  saveStoredBlogs
};
