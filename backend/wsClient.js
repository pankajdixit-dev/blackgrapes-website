// Real-Time WebSocket Client for Black Grapes Softech
// Enables millisecond-level instant synchronization between Admin Panel and Live Website

let socket = null;
let reconnectTimer = null;
const listeners = new Set();
let isConnecting = false;

// Determine WebSocket URL
function getWsUrl() {
  if (typeof window === 'undefined') return 'ws://localhost:5000';
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const hostname = window.location.hostname || 'localhost';
  // Backend server runs on port 5000
  return `${protocol}//${hostname}:5000`;
}

export function initWebSocket() {
  if (typeof window === 'undefined') return;
  if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
    return;
  }

  const wsUrl = getWsUrl();

  try {
    isConnecting = true;
    socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      isConnecting = false;
      console.log(`%c[WebSocket Connected]%c Real-time link to ${wsUrl} is LIVE!`, 'color: #10b981; font-weight: bold;', 'color: #38bdf8;');
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === 'CONTENT_UPDATED') {
          console.log(`%c[WebSocket Update Received]%c Module: "${message.module}"`, 'color: #ff6b00; font-weight: bold;', 'color: #fff;', message.data);
          
          // 1. Dispatch custom window event
          window.dispatchEvent(new CustomEvent('bgst_content_updated', {
            detail: { module: message.module, data: message.data, timestamp: message.timestamp }
          }));

          // 2. Notify all direct listeners
          for (const callback of listeners) {
            try {
              callback(message.module, message.data);
            } catch (err) {
              console.error('[WS Listener Error]:', err);
            }
          }
        }
      } catch (err) {
        console.error('[WS Message Parse Error]:', err);
      }
    };

    socket.onclose = () => {
      isConnecting = false;
      // Auto-reconnect every 2 seconds
      if (!reconnectTimer) {
        reconnectTimer = setTimeout(() => {
          reconnectTimer = null;
          initWebSocket();
        }, 2000);
      }
    };

    socket.onerror = () => {
      isConnecting = false;
      // error handled by onclose
    };
  } catch {
    isConnecting = false;
    if (!reconnectTimer) {
      reconnectTimer = setTimeout(() => {
        reconnectTimer = null;
        initWebSocket();
      }, 3000);
    }
  }
}

// Subscribe to real-time updates for a specific module or all modules
export function subscribeToWebSocket(moduleName, onUpdate) {
  if (typeof window === 'undefined') return () => {};

  initWebSocket();

  const handler = (updatedModule, data) => {
    if (!moduleName || updatedModule === moduleName) {
      onUpdate(data);
    }
  };

  listeners.add(handler);

  return () => {
    listeners.delete(handler);
  };
}

// Broadcast an update to all connected clients via WebSocket
export function sendWsBroadcast(moduleName, data) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({
      type: 'BROADCAST_UPDATE',
      module: moduleName,
      data
    }));
  }
}

// Automatically initialize WebSocket client on load in browser
if (typeof window !== 'undefined') {
  initWebSocket();
}

