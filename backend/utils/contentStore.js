import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPageDefaultSections } from '../defaultData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');
const STORE_FILE = path.join(DATA_DIR, 'content_store.json');

// In-memory cache for ultra-fast access
let memoryCache = {};

// Ensure data directory and store file exist
function initStore() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(STORE_FILE)) {
      const raw = fs.readFileSync(STORE_FILE, 'utf8');
      memoryCache = JSON.parse(raw);
    } else {
      memoryCache = {};
      fs.writeFileSync(STORE_FILE, JSON.stringify(memoryCache, null, 2), 'utf8');
    }
  } catch (err) {
    console.warn('[ContentStore] Warning initializing store:', err.message);
    memoryCache = {};
  }
}

initStore();

/**
 * Get stored sections for a page slug from local file / memory cache
 */
export function getServerStoredSections(pageSlug) {
  try {
    if (fs.existsSync(STORE_FILE)) {
      const raw = fs.readFileSync(STORE_FILE, 'utf8');
      memoryCache = JSON.parse(raw);
    }
  } catch (err) {}
  if (memoryCache && memoryCache[pageSlug]) {
    return memoryCache[pageSlug];
  }
  return null;
}

/**
 * Save sections for a page slug to local file and memory cache
 */
export function saveServerStoredSections(pageSlug, sections) {
  try {
    if (!memoryCache) memoryCache = {};
    memoryCache[pageSlug] = sections;

    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    fs.writeFileSync(STORE_FILE, JSON.stringify(memoryCache, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('[ContentStore] Error saving store file:', err.message);
    return false;
  }
}

/**
 * Get all stored pages summary
 */
export function getAllStoredPages() {
  return memoryCache || {};
}

export default {
  getServerStoredSections,
  saveServerStoredSections,
  getAllStoredPages
};

