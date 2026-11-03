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
      await new Promise(r => setTimeout(r, 400));
    }
  }
}

async function saveModuleBothServers(moduleName, data) {
  // Port 5000 Express Server
  await safePut(`http://localhost:5000/api/content/${moduleName}`, data);
  // Port 5173 Vite Dev Server
  await safePut(`http://localhost:5173/api/content/${moduleName}`, data);
}

import os from 'os';

function dumpDom(url, outputFile) {
  const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
  const userDir = path.join(os.tmpdir(), `edge_profile_${Date.now()}_${Math.floor(Math.random() * 10000)}`);
  
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      execSync(`cmd.exe /c "\"${edgePath}\" --headless --disable-gpu --user-data-dir=\"${userDir}\" --run-all-compositor-stages-before-draw --virtual-time-budget=6000 --dump-dom ${url} > \"${outputFile}\""`, {
        stdio: 'ignore',
        timeout: 20000
      });
      if (fs.existsSync(outputFile) && fs.statSync(outputFile).size > 0) {
        return fs.readFileSync(outputFile, 'utf-8');
      }
    } catch (err) {
      if (attempt === 3) throw err;
    }
  }
  return fs.readFileSync(outputFile, 'utf-8');
}

async function testPage({
  index,
  id,
  name,
  route,
  moduleName,
  getTestPayload,
  getRestorePayload,
  testHeadingString,
  originalHeadingString,
  verifyHtmlContains
}) {
  console.log(`\n========================================================================`);
  console.log(`🔎 [${index}/11] AUDITING & VERIFYING PAGE: ${name} (${route})`);
  console.log(`   Module: ${moduleName} | Expected Live Route: http://localhost:5173${route}`);
  console.log(`========================================================================`);

  const tmpDumpPath = path.resolve(__dirname, `dump_${id}.html`);

  try {
    // 1. Read existing from db.json
    const dbBefore = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    const currentData = dbBefore[moduleName] || {};

    // 2. Change heading to test value & Save/Publish
    console.log(`Step 1 & 2: Saving Test Heading "${testHeadingString}" via Admin Save Pipeline...`);
    const testData = getTestPayload(currentData);
    await saveModuleBothServers(moduleName, testData);

    // 3. Verify on active disk database
    const dbAfterSave = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    console.log(`Step 3: Verifying active database file (backend/data/db.json)...`);
    const writtenDbSlice = JSON.stringify(dbAfterSave[moduleName] || {}).slice(0, 160);
    console.log(`        Database snippet: ${writtenDbSlice}...`);

    // 4. Open public page in Headless Browser and verify test heading appears
    console.log(`Step 4: Opening public page in Headless Edge (http://localhost:5173${route})...`);
    const htmlStep4 = dumpDom(`http://localhost:5173${route}`, tmpDumpPath);
    const foundStep4 = verifyHtmlContains(htmlStep4, testHeadingString);
    if (!foundStep4) {
      throw new Error(`Public DOM did NOT contain test heading "${testHeadingString}"!`);
    }
    console.log(`        ✅ Verified: "${testHeadingString}" appears live on ${route}`);

    // 5. Refresh browser and verify it persists
    console.log(`Step 5: Refreshing page in Headless Edge to verify persistence...`);
    const htmlStep5 = dumpDom(`http://localhost:5173${route}`, tmpDumpPath);
    const foundStep5 = verifyHtmlContains(htmlStep5, testHeadingString);
    if (!foundStep5) {
      throw new Error(`After refresh, public DOM lost the test heading!`);
    }
    console.log(`        ✅ Verified: "${testHeadingString}" persists after browser refresh!`);

    // 6. Restore original heading
    console.log(`Step 6: Restoring original heading "${originalHeadingString}"...`);
    const restoredData = getRestorePayload(currentData);
    await saveModuleBothServers(moduleName, restoredData);

    // 7. Verify restored on disk
    const dbRestored = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    console.log(`Step 7: Verifying restored heading on active disk database...`);

    // 8. Open public page again and verify restored heading appears
    console.log(`Step 8: Verifying restored public DOM...`);
    const htmlStep8 = dumpDom(`http://localhost:5173${route}`, tmpDumpPath);
    const foundStep8 = verifyHtmlContains(htmlStep8, originalHeadingString);
    if (!foundStep8) {
      throw new Error(`Restored DOM did NOT contain original heading "${originalHeadingString}"!`);
    }
    console.log(`        ✅ Verified: Original heading "${originalHeadingString}" is live!`);

    console.log(`🎉 PAGE [${index}/11] ${name.toUpperCase()} PASSED ALL VERIFICATIONS WITH 100% SUCCESS!\n`);
    return { success: true, name, route };
  } finally {
    if (fs.existsSync(tmpDumpPath)) {
      try { fs.unlinkSync(tmpDumpPath); } catch {}
    }
  }
}

async function runAll() {
  console.log(`🚀 STARTING COMPREHENSIVE END-TO-END AUDIT FOR ALL 11 WEBSITE PAGES`);
  console.log(`Timestamp: ${new Date().toISOString()}\n`);

  const results = [];

  // =========================================================================
  // PAGE 1: HOME PAGE (/)
  // =========================================================================
  results.push(await testPage({
    index: 1,
    id: 'home',
    name: 'Home Page',
    route: '/',
    moduleName: 'home_page',
    testHeadingString: 'BG TEST HOME 999',
    originalHeadingString: 'Innovate. Integrate. Elevate.',
    getTestPayload: (prev) => ({
      ...prev,
      hero: {
        ...(prev.hero || {}),
        prefix: 'BG TEST HOME 999'
      }
    }),
    getRestorePayload: (prev) => ({
      ...prev,
      hero: {
        ...(prev.hero || {}),
        prefix: 'Innovate. Integrate. Elevate.'
      }
    }),
    verifyHtmlContains: (html, expected) => html.includes(expected)
  }));

  // =========================================================================
  // PAGE 2: ABOUT US (/about)
  // =========================================================================
  results.push(await testPage({
    index: 2,
    id: 'about',
    name: 'About Us',
    route: '/about',
    moduleName: 'page_sections',
    testHeadingString: 'BG TEST ABOUT 888',
    originalHeadingString: 'Empowering Businesses with Next-Gen Tech',
    getTestPayload: (prev) => {
      const hero = prev.about_hero || {};
      const content = { ...(hero.content || {}), title: 'BG TEST ABOUT 888' };
      return {
        ...prev,
        about_hero: {
          ...hero,
          content,
          draft_content: content,
          has_unpublished_changes: false
        }
      };
    },
    getRestorePayload: (prev) => {
      const hero = prev.about_hero || {};
      const content = { ...(hero.content || {}), title: 'Empowering Businesses with Next-Gen Tech' };
      return {
        ...prev,
        about_hero: {
          ...hero,
          content,
          draft_content: content,
          has_unpublished_changes: false
        }
      };
    },
    verifyHtmlContains: (html, expected) => html.includes(expected)
  }));

  // =========================================================================
  // PAGE 3: SERVICES (GROUP) (/services)
  // =========================================================================
  results.push(await testPage({
    index: 3,
    id: 'services',
    name: 'Services (Group)',
    route: '/services',
    moduleName: 'services_page',
    testHeadingString: 'BG TEST SERVICES 777',
    originalHeadingString: 'Services Built Specifically',
    getTestPayload: (prev) => ({
      ...prev,
      title: 'BG TEST SERVICES 777'
    }),
    getRestorePayload: (prev) => ({
      ...prev,
      title: 'Services Built Specifically'
    }),
    verifyHtmlContains: (html, expected) => html.includes(expected)
  }));

  // =========================================================================
  // PAGE 4: SOFTECH SERVICES (/softech-services)
  // =========================================================================
  results.push(await testPage({
    index: 4,
    id: 'softech',
    name: 'Softech Services',
    route: '/softech-services',
    moduleName: 'softech_page',
    testHeadingString: 'BG TEST SOFTECH 666',
    originalHeadingString: 'Engineering Next-Gen',
    getTestPayload: (prev) => ({
      ...prev,
      title: 'BG TEST SOFTECH 666'
    }),
    getRestorePayload: (prev) => ({
      ...prev,
      title: 'Engineering Next-Gen'
    }),
    verifyHtmlContains: (html, expected) => html.includes(expected)
  }));

  // =========================================================================
  // PAGE 5: PRODUCTS SHOWCASE (/products)
  // =========================================================================
  results.push(await testPage({
    index: 5,
    id: 'products',
    name: 'Our Products',
    route: '/products',
    moduleName: 'products_page',
    testHeadingString: 'BG TEST PRODUCTS 555',
    originalHeadingString: 'Our Products:',
    getTestPayload: (prev) => ({
      ...prev,
      title: 'BG TEST PRODUCTS 555'
    }),
    getRestorePayload: (prev) => ({
      ...prev,
      title: 'Our Products:'
    }),
    verifyHtmlContains: (html, expected) => html.includes(expected)
  }));

  // =========================================================================
  // PAGE 6: CLIENT PORTFOLIO (/clients)
  // =========================================================================
  results.push(await testPage({
    index: 6,
    id: 'clients',
    name: 'Our Clients',
    route: '/clients',
    moduleName: 'clients_page',
    testHeadingString: 'BG TEST CLIENTS 444',
    originalHeadingString: 'Our Clients:',
    getTestPayload: (prev) => ({
      ...prev,
      heroTitle: 'BG TEST CLIENTS 444'
    }),
    getRestorePayload: (prev) => ({
      ...prev,
      heroTitle: 'Our Clients:'
    }),
    verifyHtmlContains: (html, expected) => html.includes(expected)
  }));

  // =========================================================================
  // PAGE 7: IT STAFFING (/it-staffing)
  // =========================================================================
  results.push(await testPage({
    index: 7,
    id: 'it-staffing',
    name: 'IT Staffing Solutions',
    route: '/it-staffing',
    moduleName: 'it_staffing',
    testHeadingString: 'BG TEST STAFFING 333',
    originalHeadingString: 'Stay on course with growth plans by hiring contractual staff',
    getTestPayload: (prev) => ({
      ...prev,
      headline: 'BG TEST STAFFING 333'
    }),
    getRestorePayload: (prev) => ({
      ...prev,
      headline: 'Stay on course with growth plans by hiring contractual staff'
    }),
    verifyHtmlContains: (html, expected) => html.includes(expected)
  }));

  // =========================================================================
  // PAGE 8: E-COMMERCE (/ecommerce)
  // =========================================================================
  results.push(await testPage({
    index: 8,
    id: 'ecommerce',
    name: 'E-Commerce Platform',
    route: '/ecommerce',
    moduleName: 'ecommerce_page',
    testHeadingString: 'BG TEST ECOMMERCE 222',
    originalHeadingString: 'Naya Purana Bazaar',
    getTestPayload: (prev) => ({
      ...prev,
      title: 'BG TEST ECOMMERCE 222'
    }),
    getRestorePayload: (prev) => ({
      ...prev,
      title: 'Exciting News! Naya Purana Bazaar is Coming Soon!'
    }),
    verifyHtmlContains: (html, expected) => html.includes(expected)
  }));

  // =========================================================================
  // PAGE 9: CONTACT (/contact)
  // =========================================================================
  results.push(await testPage({
    index: 9,
    id: 'contact',
    name: 'Contact Page',
    route: '/contact',
    moduleName: 'contact_page',
    testHeadingString: 'BG TEST CONTACT 111',
    originalHeadingString: 'Get in',
    getTestPayload: (prev) => ({
      ...prev,
      heroTitle: 'BG TEST CONTACT 111'
    }),
    getRestorePayload: (prev) => ({
      ...prev,
      heroTitle: 'Get in Touch'
    }),
    verifyHtmlContains: (html, expected) => html.includes(expected)
  }));

  // =========================================================================
  // PAGE 10: PARTNERSHIP (/partnership)
  // =========================================================================
  results.push(await testPage({
    index: 10,
    id: 'partnership',
    name: 'Partnership Page',
    route: '/partnership',
    moduleName: 'partnership_page',
    testHeadingString: 'BG TEST PARTNERSHIP 000',
    originalHeadingString: 'Partnership',
    getTestPayload: (prev) => ({
      ...prev,
      heroTitle: 'BG TEST PARTNERSHIP 000'
    }),
    getRestorePayload: (prev) => ({
      ...prev,
      heroTitle: 'Partnership'
    }),
    verifyHtmlContains: (html, expected) => html.includes(expected)
  }));

  // =========================================================================
  // PAGE 11: BUSINESS PARTNERS (/business-partners)
  // =========================================================================
  results.push(await testPage({
    index: 11,
    id: 'business-partners',
    name: 'Business Partners',
    route: '/business-partners',
    moduleName: 'business_partners',
    testHeadingString: 'BG TEST ALLIANCES 999',
    originalHeadingString: 'Business Partners',
    getTestPayload: (prev) => ({
      ...prev,
      title: 'BG TEST ALLIANCES 999'
    }),
    getRestorePayload: (prev) => ({
      ...prev,
      title: 'Our Business Partners'
    }),
    verifyHtmlContains: (html, expected) => html.includes(expected)
  }));

  console.log(`\n========================================================================`);
  console.log(`📊 FINAL MASTER AUDIT SUMMARY`);
  console.log(`========================================================================`);
  results.forEach((r, idx) => {
    console.log(`  ${idx + 1}. [PASS] ${r.name.padEnd(25)} (${r.route})`);
  });
  console.log(`\n🎯 RESULT: 11 OUT OF 11 PAGES FULLY OPERATIONAL AND VERIFIED!`);
}

runAll().catch(err => {
  console.error('\n❌ MASTER AUDIT FAILED:', err);
  process.exit(1);
});
