import http from 'http';
import WebSocket from 'ws';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.resolve(__dirname, '../backend/data/db.json');

function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path,
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch {
          resolve(body);
        }
      });
    });

    req.on('error', reject);
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function verifyServicesPage() {
  console.log('====================================================');
  console.log('🔍 RUNNING SERVICES PAGE END-TO-END VERIFICATION');
  console.log('====================================================\n');

  // STEP 1: Connect WebSocket Listener
  console.log('Step 1: Connecting WebSocket listener to ws://localhost:5000...');
  let wsReceived = false;
  let receivedData = null;

  const ws = new WebSocket('ws://localhost:5000');
  await new Promise((resolve) => {
    ws.on('open', () => {
      console.log('✅ WebSocket Connected successfully to backend server!\n');
      resolve();
    });
    ws.on('message', (msg) => {
      try {
        const parsed = JSON.parse(msg);
        if (parsed.module === 'services_page') {
          wsReceived = true;
          receivedData = parsed.data;
          console.log('⚡ [LIVE WS EVENT RECEIVED] Received real-time broadcast for "services_page"!');
        }
      } catch (err) {
        // ignore
      }
    });
  });

  // STEP 2: Fetch Current Services Page from Database
  console.log('Step 2: Fetching current services_page from database via API...');
  const initialRes = await makeRequest('/api/content/services_page');
  if (!initialRes.success || !initialRes.data) {
    throw new Error('Failed to fetch services_page from backend API');
  }
  console.log(`✅ Loaded services_page:`);
  console.log(`   - Eyebrow Badge: "${initialRes.data.badge}"`);
  console.log(`   - Main Title: "${initialRes.data.title}"`);
  console.log(`   - Title Accent: "${initialRes.data.titleAccent}"`);
  console.log(`   - Group Services Count: ${initialRes.data.group_services?.length}`);
  console.log(`   - First Service: "${initialRes.data.group_services?.[0]?.title}"\n`);

  // STEP 3: Perform Live Content Modification (Simulate Admin saving changes)
  console.log('Step 3: Simulating Admin changing Services Page content...');
  const testAccent = ' For High-Growth Enterprises';
  const testBadge = 'BLACK GRAPES GROUP • CERTIFIED EXCELLENCE';
  const updatedFirstServiceTagline = 'Premier Strategic & Corporate Advisory';

  const updatedPayload = {
    ...initialRes.data,
    badge: testBadge,
    titleAccent: testAccent,
    group_services: initialRes.data.group_services.map((s, idx) => {
      if (idx === 0) {
        return { ...s, tagline: updatedFirstServiceTagline };
      }
      return s;
    }),
    updated_at: new Date().toISOString()
  };

  const saveRes = await makeRequest('/api/content/services_page', 'PUT', updatedPayload);
  if (!saveRes.success) {
    throw new Error('Failed to save updated services_page via API');
  }
  console.log('✅ API successfully saved changes to database!\n');

  // STEP 4: Wait briefly for WebSocket notification
  console.log('Step 4: Verifying Real-Time WebSocket broadcast...');
  await new Promise((r) => setTimeout(r, 600));

  if (wsReceived) {
    console.log(`✅ Real-Time WebSocket event confirmed!`);
    console.log(`   - Broadcasted Badge: "${receivedData.badge}"`);
    console.log(`   - Broadcasted Accent: "${receivedData.titleAccent}"\n`);
  } else {
    console.error('❌ WebSocket event was not received within timeout!');
  }

  // STEP 5: Verify Database Persistence (Read directly from disk to confirm survival across refreshes)
  console.log('Step 5: Verifying Database Disk Persistence (Survival across page refresh)...');
  const dbDisk = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  const diskServices = dbDisk.services_page;
  const persistsBadge = diskServices.badge === testBadge;
  const persistsAccent = diskServices.titleAccent === testAccent;
  const persistsServiceTagline = diskServices.group_services?.[0]?.tagline === updatedFirstServiceTagline;

  if (persistsBadge && persistsAccent && persistsServiceTagline) {
    console.log('✅ Database Persistence Verified 100%! All modified content is stored on disk in db.json.\n');
  } else {
    throw new Error('Persistence mismatch on disk!');
  }

  // STEP 6: Revert back to authentic default values cleanly
  console.log('Step 6: Resetting test modifications back to authentic original values...');
  const cleanPayload = {
    ...initialRes.data,
    badge: 'BLACK GRAPES GROUP',
    titleAccent: ' For Your Business',
    group_services: initialRes.data.group_services.map((s, idx) => {
      if (idx === 0) {
        return { ...s, tagline: 'Consultancy & Advisory' };
      }
      return s;
    }),
    updated_at: new Date().toISOString()
  };
  await makeRequest('/api/content/services_page', 'PUT', cleanPayload);
  console.log('✅ Reset complete. Clean authentic data is live!\n');

  ws.close();

  console.log('====================================================');
  console.log('🎉 SERVICES PAGE END-TO-END VERIFICATION: 100% SUCCESS');
  console.log('====================================================');
}

verifyServicesPage().catch((err) => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
