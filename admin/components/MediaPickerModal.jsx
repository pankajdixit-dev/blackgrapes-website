import React, { useState, useEffect } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Video as VideoIcon,
  Search,
  Check,
  CheckCircle,
  Film
} from 'lucide-react';
import { getMediaLibrary, uploadMediaItem } from '@backend/dataService';

export default function MediaPickerModal({ isOpen, onClose, onSelectMedia, mediaType = 'all' }) {
  const [mediaList, setMediaList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(mediaType); // 'all', 'image', 'video'
  const [isUploading, setIsUploading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadMedia();
      setSelectedItem(null);
      setActiveFilter(mediaType);
    }
  }, [isOpen, mediaType]);

  const loadMedia = async () => {
    const list = await getMediaLibrary();
    setMediaList(list || []);
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const res = await uploadMediaItem(file);
    setIsUploading(false);

    if (res.success) {
      showToast('Media uploaded to cloud storage.');
      await loadMedia();
      if (res.data) {
        setSelectedItem(res.data);
      }
    } else {
      showToast(res.message || 'Upload failed');
    }
  };

  const handleConfirmSelect = () => {
    if (selectedItem && onSelectMedia) {
      onSelectMedia(selectedItem.url, selectedItem);
      onClose();
    }
  };

  if (!isOpen) return null;

  const filteredMedia = mediaList.filter((m) => {
    const matchesSearch = (m.filename || m.originalName || '')
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (activeFilter === 'image') return m.resourceType !== 'video';
    if (activeFilter === 'video') return m.resourceType === 'video';
    return true;
  });

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal-content" style={{ maxWidth: '850px', width: '90%', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div className="admin-modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 className="admin-modal-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ImageIcon size={20} color="var(--brand-orange)" />
              <span>Select Cloudinary Asset</span>
            </h2>
            <p className="admin-modal-sub" style={{ margin: 0 }}>
              Choose an existing image or video from Cloudinary storage, or upload a new asset.
            </p>
          </div>
          <button type="button" className="admin-modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Toolbar: Search, Filters & Upload */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', padding: '1rem 1.5rem', borderBottom: '1px solid var(--admin-border)' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
            <Search size={16} color="#9ca3af" style={{ position: 'absolute', left: '10px', top: '10px' }} />
            <input
              type="text"
              placeholder="Search assets by filename..."
              className="admin-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2rem', height: '36px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button
              type="button"
              className={`btn btn-sm ${activeFilter === 'all' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveFilter('all')}
            >
              All Assets
            </button>
            <button
              type="button"
              className={`btn btn-sm ${activeFilter === 'image' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveFilter('image')}
            >
              Images
            </button>
            <button
              type="button"
              className={`btn btn-sm ${activeFilter === 'video' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveFilter('video')}
            >
              Videos
            </button>
          </div>

          <label className="btn btn-primary btn-sm" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0 }}>
            <Upload size={14} />
            <span>{isUploading ? 'Uploading...' : 'Upload New'}</span>
            <input
              type="file"
              accept={activeFilter === 'video' ? 'video/*' : 'image/*,video/*'}
              disabled={isUploading}
              onChange={handleUpload}
              style={{ display: 'none' }}
            />
          </label>
        </div>

        {toastMsg && (
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#10b981', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 1.5rem 0.5rem', borderRadius: '6px', fontSize: '0.85rem' }}>
            <CheckCircle size={16} />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Media Grid */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.85rem' }}>
          {filteredMedia.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 1rem', color: '#9ca3af' }}>
              <ImageIcon size={40} style={{ opacity: 0.3, marginBottom: '0.75rem' }} />
              <p>No media assets found matching your filter.</p>
            </div>
          ) : (
            filteredMedia.map((item) => {
              const isSelected = selectedItem?._id === item._id || selectedItem?.id === item.id || selectedItem?.url === item.url;
              const isVideo = item.resourceType === 'video';

              return (
                <div
                  key={item._id || item.id || item.url}
                  onClick={() => setSelectedItem(item)}
                  style={{
                    position: 'relative',
                    aspectRatio: '1',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: isSelected ? '2px solid var(--brand-orange)' : '1px solid var(--admin-border)',
                    boxShadow: isSelected ? '0 0 15px rgba(248, 98, 0, 0.4)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {isVideo ? (
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0a0914' }}>
                      <Film size={28} color="var(--brand-orange)" />
                      <span style={{ fontSize: '0.65rem', color: '#e2e8f0', marginTop: '4px', textAlign: 'center', padding: '0 4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
                        {item.filename}
                      </span>
                    </div>
                  ) : (
                    <img
                      src={item.url}
                      alt={item.originalName || item.filename}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.currentTarget.src = '/images/services-infograph.png';
                      }}
                    />
                  )}

                  {isSelected && (
                    <div style={{ position: 'absolute', top: '6px', right: '6px', background: 'var(--brand-orange)', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}

                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.75)', padding: '2px 6px', fontSize: '0.65rem', color: '#e2e8f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {isVideo ? '🎬 Video' : '🖼️ Image'}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        <div className="admin-modal-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', borderTop: '1px solid var(--admin-border)' }}>
          <div style={{ fontSize: '0.82rem', color: '#9ca3af' }}>
            {selectedItem ? (
              <span>Selected: <strong style={{ color: '#fff' }}>{selectedItem.originalName || selectedItem.filename}</strong></span>
            ) : (
              <span>Select an asset from the library above.</span>
            )}
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              disabled={!selectedItem}
              onClick={handleConfirmSelect}
            >
              Select Asset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

