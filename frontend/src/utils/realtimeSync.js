/**
 * Real-Time Synchronization Engine for Black Grapes Softech
 * Provides real-time event broadcasting and multi-tab sync via:
 * 1. WebSockets (Socket.io)
 * 2. BroadcastChannel API (cross-tab real-time sync)
 * 3. LocalStorage storage event fallback
 */

import { io } from 'socket.io-client';

const SOCKET_SERVER_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000';

class RealtimeSyncManager {
  constructor() {
    this.socket = null;
    this.channel = null;
    this.listeners = new Set();
    this.init();
  }

  init() {
    if (typeof window === 'undefined') return;

    // 1. Cross-Tab Real-time BroadcastChannel
    try {
      if ('BroadcastChannel' in window) {
        this.channel = new BroadcastChannel('bgst_realtime_bus');
        this.channel.onmessage = (event) => {
          this.triggerLocal(event.data);
        };
      }
    } catch (err) {
      console.warn('[Sync] BroadcastChannel init notice:', err.message);
    }

    // 2. Storage event listener (fallback for older browsers or cross-tab sync)
    window.addEventListener('storage', (event) => {
      if (event.key && event.key.startsWith('bg_page_sections_')) {
        const pageSlug = event.key.replace('bg_page_sections_', '');
        this.triggerLocal({
          type: 'storage_sync',
          module: 'page_sections',
          pageSlug,
          timestamp: new Date().toISOString()
        });
      }
    });

    // 3. Socket.io WebSocket Connection
    try {
      this.socket = io(SOCKET_SERVER_URL, {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1500,
        timeout: 5000
      });

      this.socket.on('connect', () => {
        console.log('[WebSocket] Real-Time Sync Connected: ' + this.socket.id);
      });

      this.socket.on('content_updated', (data) => {
        console.log('[WebSocket] Real-time content_updated received:', data);
        this.triggerLocal(data);
      });

      this.socket.on('disconnect', () => {
        console.log('[WebSocket] Real-Time Sync Disconnected');
      });
    } catch (err) {
      console.warn('[WebSocket] Init notice:', err.message);
    }
  }

  // Broadcast to other tabs & backend
  broadcast(payload) {
    if (typeof window === 'undefined') return;

    // Send through BroadcastChannel to all other tabs
    if (this.channel) {
      try {
        this.channel.postMessage(payload);
      } catch (err) {}
    }

    // Trigger on current tab window
    this.triggerLocal(payload);
  }

  // Trigger local CustomEvent
  triggerLocal(payload) {
    if (typeof window === 'undefined') return;
    const event = new CustomEvent('bgst_content_updated', { detail: payload });
    window.dispatchEvent(event);
  }
}

export const realtimeSync = new RealtimeSyncManager();
export default realtimeSync;
