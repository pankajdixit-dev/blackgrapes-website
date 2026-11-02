/**
 * Real-Time Synchronization Engine for Black Grapes Softech (Backend / Admin / Client)
 */

import { io } from 'socket.io-client';

const SOCKET_SERVER_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000';

class RealtimeSyncManager {
  constructor() {
    this.socket = null;
    this.channel = null;
    this.init();
  }

  init() {
    if (typeof window === 'undefined') return;

    try {
      if ('BroadcastChannel' in window) {
        this.channel = new BroadcastChannel('bgst_realtime_bus');
        this.channel.onmessage = (event) => {
          this.triggerLocal(event.data);
        };
      }
    } catch (err) {}

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

    try {
      this.socket = io(SOCKET_SERVER_URL, {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1500,
        timeout: 5000
      });

      this.socket.on('content_updated', (data) => {
        this.triggerLocal(data);
      });
    } catch (err) {}
  }

  broadcast(payload) {
    if (typeof window === 'undefined') return;

    if (this.channel) {
      try {
        this.channel.postMessage(payload);
      } catch (err) {}
    }

    this.triggerLocal(payload);
  }

  triggerLocal(payload) {
    if (typeof window === 'undefined') return;
    const event = new CustomEvent('bgst_content_updated', { detail: payload });
    window.dispatchEvent(event);
  }
}

export const realtimeSync = new RealtimeSyncManager();
export default realtimeSync;
