import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.resolve(__dirname, '../backend/data/db.json');

function request(urlStr, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function debugFlow() {
  console.log('--- STEP 1: Check port 5173 GET /api/content/services_page ---');
  const getRes = await request('http://localhost:5173/api/content/services_page');
  console.log('GET status:', getRes.status);
  console.log('GET current title:', getRes.data?.data?.title);
  console.log('GET current titleAccent:', getRes.data?.data?.titleAccent);

  console.log('\n--- STEP 2: Check port 5173 PUT /api/content/services_page with BG TEST 123 ---');
  const updatePayload = {
    ...getRes.data.data,
    title: 'BG TEST 123',
    titleAccent: ' Verified Accent'
  };
  const putRes = await request('http://localhost:5173/api/content/services_page', 'PUT', updatePayload);
  console.log('PUT status:', putRes.status);
  console.log('PUT response:', putRes.data);

  console.log('\n--- STEP 3: Read backend/data/db.json directly from disk ---');
  const dbDisk = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  console.log('Disk title:', dbDisk.services_page?.title);
  console.log('Disk titleAccent:', dbDisk.services_page?.titleAccent);

  console.log('\n--- STEP 4: Check port 5173 GET again to simulate browser refresh ---');
  const getRes2 = await request('http://localhost:5173/api/content/services_page');
  console.log('GET 2 status:', getRes2.status);
  console.log('GET 2 title:', getRes2.data?.data?.title);
  console.log('GET 2 titleAccent:', getRes2.data?.data?.titleAccent);
}

debugFlow().catch(console.error);

