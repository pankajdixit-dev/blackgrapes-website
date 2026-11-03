import WebSocket from 'ws';
import { exec } from 'child_process';
import os from 'os';
import path from 'path';

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const tempProfile = path.join(os.tmpdir(), `edge_test_profile_${Date.now()}`);
const proc = exec(`"${edgePath}" --headless --remote-debugging-port=9222 --disable-gpu --user-data-dir="${tempProfile}" http://localhost:5173/softech-services`);

async function main() {
  await new Promise(r => setTimeout(r, 2000));
  const listRes = await fetch('http://127.0.0.1:9222/json');
  const tabs = await listRes.json();
  const pageTab = tabs.find(t => t.url.includes('5173'));
  if (!pageTab) {
    console.log('No page tab found!');
    proc.kill();
    return;
  }

  const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
  ws.on('open', () => {
    ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
    ws.send(JSON.stringify({ id: 2, method: 'Log.enable' }));
    ws.send(JSON.stringify({ id: 3, method: 'Page.enable' }));
  });

  ws.on('message', (msg) => {
    const data = JSON.parse(msg);
    if (data.method === 'Runtime.consoleAPICalled') {
      console.log(`[Console ${data.params.type}]:`, data.params.args.map(a => a.value || a.description).join(' '));
    }
    if (data.method === 'Runtime.exceptionThrown') {
      console.log(`[Exception]:`, data.params.exceptionDetails.text, data.params.exceptionDetails.exception?.description);
    }
  });

  setTimeout(() => {
    try { proc.kill(); } catch {}
    process.exit(0);
  }, 4000);
}

main().catch(console.error);
