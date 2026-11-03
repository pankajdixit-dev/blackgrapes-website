import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.resolve(__dirname, '../backend/data/db.json');

async function safePut(url, payload) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Connection': 'close',
          'x-admin-email': 'admin@blackgrapessoftech.com'
        },
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch (err) {
      if (attempt === 3) throw err;
      await new Promise(r => setTimeout(r, 500));
    }
  }
}

async function runStep(name, fn) {
  console.log(`\n======================================================`);
  console.log(`▶ STEP: ${name}`);
  console.log(`======================================================`);
  await fn();
}

async function main() {
  console.log('🏁 Starting Mandatory Services Page End-to-End Test (Steps A through F)\n');

  // Load existing db
  const originalDb = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  const originalServicesPage = originalDb.services_page || {};
  const originalTitle = "Services Built Specifically";
  const originalAccent = " For Your Business";

  // --- STEP A & B: Change Services Page heading in Admin to "BG TEST 123", Save and Publish ---
  await runStep('A & B. Change Services Page heading to "BG TEST 123" & Save/Publish', async () => {
    const payload = {
      ...originalServicesPage,
      title: "BG TEST 123",
      titleAccent: " Verified Accent",
      updated_at: new Date().toISOString()
    };

    // Save to Express Backend port 5000
    const json5000 = await safePut('http://localhost:5000/api/content/services_page', payload);
    console.log('[Port 5000 PUT Response]:', json5000.success ? 'HTTP 200 OK - Saved successfully' : 'Failed');

    // Save to Vite Dev Server port 5173
    const json5173 = await safePut('http://localhost:5173/api/content/services_page', payload);
    console.log('[Port 5173 PUT Response]:', json5173.success ? 'HTTP 200 OK - Saved successfully' : 'Failed');
  });

  // --- STEP C: Read value directly from active database ---
  await runStep('C. Read value directly from active database on disk', async () => {
    const currentDb = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    console.log(`[Disk Read db.json]: services_page.title = "${currentDb.services_page.title}"`);
    console.log(`[Disk Read db.json]: services_page.titleAccent = "${currentDb.services_page.titleAccent}"`);
    if (currentDb.services_page.title !== "BG TEST 123") {
      throw new Error(`Verification failed: Expected "BG TEST 123" but found "${currentDb.services_page.title}"`);
    }
  });

  // --- STEP D: Open public Services Page and verify "BG TEST 123" appears ---
  await runStep('D. Open public Services Page (http://localhost:5173/services) & verify DOM', async () => {
    const dumpPath = path.resolve(__dirname, 'test_dom_step_d.html');
    execSync(`cmd.exe /c "\"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe\" --headless --disable-gpu --run-all-compositor-stages-before-draw --virtual-time-budget=5000 --dump-dom http://localhost:5173/services > \"${dumpPath}\""`);
    
    const html = fs.readFileSync(dumpPath, 'utf-8');
    const h1Match = html.match(/<h1[^>]*black-hero-title[^>]*>([\s\S]*?)<\/h1>/i);
    const h1Clean = h1Match ? h1Match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : 'NONE';
    console.log(`[Rendered Public DOM H1]: "${h1Clean}"`);
    if (!h1Clean.includes("BG TEST 123")) {
      throw new Error(`DOM does not contain "BG TEST 123"! Found: ${h1Clean}`);
    }
    console.log('✅ DOM Verification SUCCESS: "BG TEST 123" is rendered on live public website!');
  });

  // --- STEP E: Refresh the browser and verify it still appears ---
  await runStep('E. Refresh the browser and verify it still appears', async () => {
    const dumpPath2 = path.resolve(__dirname, 'test_dom_step_e.html');
    execSync(`cmd.exe /c "\"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe\" --headless --disable-gpu --run-all-compositor-stages-before-draw --virtual-time-budget=5000 --dump-dom http://localhost:5173/services > \"${dumpPath2}\""`);
    
    const html2 = fs.readFileSync(dumpPath2, 'utf-8');
    const h1Match2 = html2.match(/<h1[^>]*black-hero-title[^>]*>([\s\S]*?)<\/h1>/i);
    const h1Clean2 = h1Match2 ? h1Match2[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : 'NONE';
    console.log(`[Post-Refresh DOM H1]: "${h1Clean2}"`);
    if (!h1Clean2.includes("BG TEST 123")) {
      throw new Error(`Post-refresh DOM does not contain "BG TEST 123"! Found: ${h1Clean2}`);
    }
    console.log('✅ Persistence Verification SUCCESS: "BG TEST 123" persists after full refresh!');
  });

  // --- STEP F: Restore original heading through Admin and verify restored heading appears publicly ---
  await runStep('F. Restore original heading through Admin and verify public rendering', async () => {
    const restoredPayload = {
      ...originalServicesPage,
      title: originalTitle,
      titleAccent: originalAccent,
      updated_at: new Date().toISOString()
    };

    await safePut('http://localhost:5000/api/content/services_page', restoredPayload);
    await safePut('http://localhost:5173/api/content/services_page', restoredPayload);

    // Check disk
    const restoredDb = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    console.log(`[Disk Read db.json]: services_page.title = "${restoredDb.services_page.title}"`);

    // Verify DOM
    const dumpPath3 = path.resolve(__dirname, 'test_dom_step_f.html');
    execSync(`cmd.exe /c "\"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe\" --headless --disable-gpu --run-all-compositor-stages-before-draw --virtual-time-budget=5000 --dump-dom http://localhost:5173/services > \"${dumpPath3}\""`);
    
    const html3 = fs.readFileSync(dumpPath3, 'utf-8');
    const h1Match3 = html3.match(/<h1[^>]*black-hero-title[^>]*>([\s\S]*?)<\/h1>/i);
    const h1Clean3 = h1Match3 ? h1Match3[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : 'NONE';
    console.log(`[Restored Public DOM H1]: "${h1Clean3}"`);
    if (!h1Clean3.includes("Services Built Specifically")) {
      throw new Error(`DOM does not contain restored heading! Found: ${h1Clean3}`);
    }
    console.log('✅ Restoration Verification SUCCESS: Original heading successfully restored and rendered live!');
  });

  console.log('\n🎉 ALL 6 VERIFICATION STEPS (A - F) COMPLETED WITH 100% SUCCESS!');
}

main().catch(err => {
  console.error('\n❌ TEST RUN FAILED:', err);
  process.exit(1);
});
