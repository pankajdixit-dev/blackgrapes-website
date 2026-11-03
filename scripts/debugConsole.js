import http from 'http';
import { exec, execSync } from 'child_process';

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

// Start Edge with remote debugging
const proc = exec(`"${edgePath}" --headless --remote-debugging-port=9222 --disable-gpu http://localhost:5173/softech-services`);

setTimeout(async () => {
  try {
    const listRes = await fetch('http://127.0.0.1:9222/json');
    const tabs = await listRes.json();
    console.log('Open tabs:', tabs.map(t => ({ title: t.title, url: t.url, ws: t.webSocketDebuggerUrl })));
  } catch (err) {
    console.error('Error fetching tabs:', err);
  } finally {
    try { proc.kill(); } catch {}
    process.exit(0);
  }
}, 3000);

