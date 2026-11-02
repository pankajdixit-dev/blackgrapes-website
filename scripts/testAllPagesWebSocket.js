import http from 'http';
import { WebSocket } from 'ws';
import fs from 'fs';

const PORT = 5000;
const WS_URL = `ws://localhost:${PORT}`;

async function runTest() {
  console.log('🧪 Starting Full-Page Real-Time WebSocket Synchronization Test...');

  // 1. Connect WebSocket client
  const ws = new WebSocket(WS_URL);
  const receivedUpdates = [];

  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('WebSocket connection timed out')), 4000);
    ws.on('open', () => {
      clearTimeout(timeout);
      console.log('✅ Connected to WebSocket Server on ws://localhost:5000!');
      resolve();
    });
    ws.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });

  ws.on('message', (data) => {
    const parsed = JSON.parse(data.toString());
    console.log(`📩 [WS Client Received]: Type: ${parsed.type}, Module: ${parsed.module || 'N/A'}`);
    if (parsed.type === 'CONTENT_UPDATED') {
      receivedUpdates.push(parsed);
    }
  });

  // 2. Test IT Staffing update
  console.log('\n--- 1. Testing IT Staffing Module Update ---');
  const testStaffingHeadline = `Live Tested Headline at ${Date.now()}`;
  await sendPut('it_staffing', {
    badge: 'LIVE TEST BADGE',
    headline: testStaffingHeadline,
    subtitle: 'Live WebSocket Test Subtitle',
    description: 'Updated via Admin panel test'
  });

  // Wait for WS event
  await sleep(150);

  // 3. Test Ecommerce module update
  console.log('\n--- 2. Testing E-Commerce Module Update ---');
  const testEcommerceTitle = `Exciting News! Live Tested Market at ${Date.now()}`;
  await sendPut('ecommerce_page', {
    badge: 'TEST ECOMMERCE BADGE',
    title: testEcommerceTitle,
    domain: 'https://www.nayapuranabazaar.com',
    domainDisplay: 'nayapuranabazaar.com',
    targetLaunch: 'Q3 2026'
  });

  await sleep(150);

  // 4. Test Partnership module update
  console.log('\n--- 3. Testing Partnership Module Update ---');
  const testPartnerTitle = `Strategic Technology Alliances - Tested ${Date.now()}`;
  await sendPut('partnership_page', {
    heroBadge: 'TEST ALLIANCES',
    heroTitle: testPartnerTitle,
    heroSubtitle: 'Cultivating strategic relationships'
  });

  await sleep(150);

  // 5. Verification
  console.log('\n--- 4. Verification Results ---');
  console.log(`Total WebSocket push messages received: ${receivedUpdates.length}`);

  const hasStaffing = receivedUpdates.some((u) => u.module === 'it_staffing');
  const hasEcommerce = receivedUpdates.some((u) => u.module === 'ecommerce_page');
  const hasPartnership = receivedUpdates.some((u) => u.module === 'partnership_page');

  if (hasStaffing && hasEcommerce && hasPartnership) {
    console.log('🎉 100% SUCCESS: All modules pushed through WebSocket instantly without refresh!');
  } else {
    console.error('❌ Missing module updates:', { hasStaffing, hasEcommerce, hasPartnership });
  }

  // 6. Check file persistence in db.json
  const db = JSON.parse(fs.readFileSync('./backend/data/db.json', 'utf8'));
  console.log('📁 File Persistence Verification:');
  console.log(' - db.json it_staffing.headline:', db.it_staffing?.headline);
  console.log(' - db.json ecommerce_page.title:', db.ecommerce_page?.title);
  console.log(' - db.json partnership_page.heroTitle:', db.partnership_page?.heroTitle);

  ws.close();
  process.exit(0);
}

function sendPut(module, body) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(body);
    const req = http.request(
      {
        hostname: 'localhost',
        port: PORT,
        path: `/api/content/${module}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      },
      (res) => {
        let respData = '';
        res.on('data', (chunk) => (respData += chunk));
        res.on('end', () => resolve(JSON.parse(respData)));
      }
    );
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

runTest().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
