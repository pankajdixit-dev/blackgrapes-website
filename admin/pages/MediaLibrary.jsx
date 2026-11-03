import React, { useState, useEffect } from 'react';
import {
  Image as ImageIcon,
  Upload,
  Trash2,
  Copy,
  Check,
  Search,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { getMediaLibrary, uploadMediaItem, deleteMediaItem } from '@backend/dataService';

export default function MediaLibrary() {
  const [mediaList, setMediaList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    const list = await getMediaLibrary();
    setMediaList(list);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    for (let i = 0; i < files.length; i++) {
      await uploadMediaItem(files[i]);
    }
    setUploading(false);
    showToast('Image(s) uploaded successfully to media storage.');
    await loadMedia();
  };

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    showToast('Asset URL copied to clipboard.');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id, filename) => {
    if (window.confirm(`Delete media asset "${filename}"?`)) {
      await deleteMediaItem(id);
      showToast('Media asset removed.');
      await loadMedia();
    }
  };

  const filtered = mediaList.filter((m) =>
    (m.filename || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {toastMessage && (
        <div className="admin-toast">
          <CheckCircle size={18} color="#10b981" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Media Storage & Asset Library</h1>
          <p className="admin-page-sub">
            Upload and manage photos, logos, and banners stored in public/uploads.
          </p>
        </div>

        <label className="admin-btn admin-btn-primary" style={{ cursor: 'pointer' }}>
          <Upload size={16} />
          <span>{uploading ? 'Uploading Asset...' : 'Upload Image'}</span>
          <input
            type="file"
            accept="image/*"
            multiple
            disabled={uploading}
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      <div className="admin-card" style={{ padding: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Search size={18} color="#9ca3af" />
          <input
            type="text"
            className="admin-input"
            style={{ border: 'none', background: 'transparent' }}
            placeholder="Search media files by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Grid of Media Assets */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1.25rem'
        }}
      >
        {filtered.map((item) => (
          <div
            key={item.id}
            className="admin-card"
            style={{
              padding: '0.75rem',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div
              style={{
                width: '100%',
                height: '140px',
                borderRadius: '8px',
                overflow: 'hidden',
                background: 'rgba(0, 0, 0, 0.4)',
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                src={item.file_url}
                alt={item.alt_text || item.filename}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div>
              <strong
                style={{
                  display: 'block',
                  color: '#fff',
                  fontSize: '0.85rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
                title={item.filename}
              >
                {item.filename}
              </strong>
              <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>
                {item.file_size ? `${Math.round(item.file_size / 1024)} KB` : 'Asset'}
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                marginTop: '0.75rem',
                borderTop: '1px solid var(--admin-border)',
                paddingTop: '0.5rem'
              }}
            >
              <button
                onClick={() => handleCopy(item.file_url, item.id)}
                className="admin-btn admin-btn-secondary"
                style={{ flex: 1, padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
                title="Copy URL"
              >
                {copiedId === item.id ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={() => handleDelete(item.id, item.filename)}
                className="admin-btn admin-btn-danger"
                style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
                title="Delete image"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

