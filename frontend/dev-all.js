import { spawn } from 'child_process';

console.log('\x1b[35m%s\x1b[0m', '==================================================');
console.log('\x1b[35m%s\x1b[0m', '  🚀 Starting Black Grapes Softech Full Stack Ecosystem');
console.log('\x1b[35m%s\x1b[0m', '  1. Backend API & WebSockets (Port 5000)');
console.log('\x1b[35m%s\x1b[0m', '  2. Public Website           (Port 5173)');
console.log('\x1b[35m%s\x1b[0m', '  3. Control Center Admin     (Port 5174)');
console.log('\x1b[35m%s\x1b[0m', '==================================================\n');

function runProcess(name, cmd, args, color) {
  const isWin = process.platform === 'win32';
  const proc = spawn(isWin && cmd.startsWith('npm') ? `${cmd}.cmd` : cmd, args, {
    shell: true,
    stdio: 'pipe'
  });

  proc.stdout.on('data', (d) => {
    const lines = d.toString().split('\n');
    lines.forEach((l) => {
      if (l.trim()) {
        console.log(`${color}[${name}]\x1b[0m ${l}`);
      }
    });
  });

  proc.stderr.on('data', (d) => {
    const lines = d.toString().split('\n');
    lines.forEach((l) => {
      if (l.trim()) {
        console.error(`${color}[${name} ERR]\x1b[0m ${l}`);
      }
    });
  });

  proc.on('close', (code) => {
    console.log(`${color}[${name}] exited with code ${code}\x1b[0m`);
  });

  return proc;
}

const backend = runProcess('BACKEND', 'node', ['backend/server.js'], '\x1b[36m');
setTimeout(() => {
  const frontend = runProcess('FRONTEND', 'npm', ['run', 'dev'], '\x1b[32m');
  const admin = runProcess('ADMIN', 'npm', ['run', 'dev:admin'], '\x1b[33m');

  const cleanExit = () => {
    try { backend.kill(); } catch (e) {}
    try { frontend.kill(); } catch (e) {}
    try { admin.kill(); } catch (e) {}
    process.exit();
  };

  process.on('SIGINT', cleanExit);
  process.on('SIGTERM', cleanExit);
}, 1500);
