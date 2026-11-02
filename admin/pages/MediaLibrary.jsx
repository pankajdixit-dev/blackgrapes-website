import React, { useState, useEffect } from 'react';
import {
  Image as ImageIcon,
  Video as VideoIcon,
  Upload,
  Trash2,
  Copy,
  Check,
  Search,
  CheckCircle,
  ExternalLink,
  Cloud,
  Film,
  AlertTriangle,
  Layers,
  Info
} from 'lucide-react';
import {
  getMediaLibrary,
  uploadMediaItem,
  deleteMediaItem,
  checkMediaUsage,
  assignMediaItem
} from '@backend/dataService';
import { ALL_PAGE_DEFINITIONS } from '@backend/defaultData';

export default function MediaLibrary() {
  const [mediaList, setMediaList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTypeFilter, setActiveTypeFilter] = useState('all'); // 'all', 'image', 'video'
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [assignPage, setAssignPage] = useState('');
  const [assignSection, setAssignSection] = useState('');
  const [isAssigning, setIsAssigning] = useState(false);
  const [deleteWarning, setDeleteWarning] = useState(null); // { item, usage }

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    const list = await getMediaLibrary();
    setMediaList(list || []);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    let successCount = 0;
    for (let i = 0; i < files.length; i++) {
      const res = await uploadMediaItem(files[i]);
      if (res && res.success) successCount++;
    }
    setUploading(false);
    showToast(`${successCount} asset(s) uploaded successfully to Cloudinary / storage.`);
    await loadMedia();
  };

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    showToast('Asset URL copied to clipboard.');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const initiateDelete = async (item) => {
    const id = item._id || item.id;
    const usageRes = await checkMediaUsage(id);
    if (usageRes && usageRes.inUse) {
      setDeleteWarning({ item, usage: usageRes.usedIn });
    } else {
      if (window.confirm(`Delete media asset "${item.filename || item.originalName}"?`)) {
        await executeDelete(id);
      }
    }
  };

  const executeDelete = async (id) => {
    await deleteMediaItem(id);
    setDeleteWarning(null);
    if (selectedAsset && (selectedAsset._id === id || selectedAsset.id === id)) {
      setSelectedAsset(null);
    }
    showToast('Media asset removed.');
    await loadMedia();
  };

  const handleSaveAssignment = async () => {
    if (!selectedAsset) return;
    setIsAssigning(true);
    const id = selectedAsset._id || selectedAsset.id;
    await assignMediaItem(id, assignPage, assignSection);
    setIsAssigning(false);
    showToast('Asset assignment updated.');
    await loadMedia();
    setSelectedAsset((prev) => ({ ...prev, assignedPage: assignPage, assignedSection: assignSection }));
  };

  const openAssetDetails = (item) => {
    setSelectedAsset(item);
    setAssignPage(item.assignedPage || '');
    setAssignSection(item.assignedSection || '');
  };

  const filtered = mediaList.filter((m) => {
    const query = searchQuery.toLowerCase();
    const nameMatch = (m.filename || m.originalName || '').toLowerCase().includes(query);
    const pageMatch = (m.assignedPage || '').toLowerCase().includes(query);
    if (!nameMatch && !pageMatch) return false;

    if (activeTypeFilter === 'image') return m.resourceType !== 'video';
    if (activeTypeFilter === 'video') return m.resourceType === 'video';
    return true;
  });

  return (
    <div>
      {toastMessage && (
        <div className="admin-toast">
          <CheckCircle size={18} color="#10b981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="admin-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem' }}>
            <h1 className="admin-page-title" style={{ margin: 0 }}>Cloudinary Media & Video Library</h1>
            <span
              style={{
                fontSize: '0.72rem',
                padding: '0.2rem 0.6rem',
                borderRadius: '12px',
                background: 'rgba(248, 98, 0, 0.15)',
                color: 'var(--brand-orange)',
                border: '1px solid rgba(248, 98, 0, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Cloud size={12} />
              <span>Cloud Storage Ready</span>
            </span>
          </div>
          <p className="admin-page-sub">
            Upload, preview, manage, and assign high-resolution images & videos stored directly in Cloudinary.
          </p>
        </div>

        <label className="admin-btn admin-btn-primary" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Upload size={16} />
          <span>{uploading ? 'Uploading to Cloud...' : 'Upload Image / Video'}</span>
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            disabled={uploading}
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      {/* Toolbar: Search & Filter Tabs */}
      <div className="admin-card" style={{ padding: '0.85rem 1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '240px' }}>
          <Search size={18} color="#9ca3af" />
          <input
            type="text"
            className="admin-input"
            style={{ border: 'none', background: 'transparent', paddingLeft: 0 }}
            placeholder="Search assets by filename or assigned page..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            className={`btn btn-sm ${activeTypeFilter === 'all' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTypeFilter('all')}
          >
            All ({mediaList.length})
          </button>
          <button
            type="button"
            className={`btn btn-sm ${activeTypeFilter === 'image' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTypeFilter('image')}
          >
            <ImageIcon size={14} style={{ marginRight: '4px' }} />
            Images ({mediaList.filter((m) => m.resourceType !== 'video').length})
          </button>
          <button
            type="button"
            className={`btn btn-sm ${activeTypeFilter === 'video' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTypeFilter('video')}
          >
            <VideoIcon size={14} style={{ marginRight: '4px' }} />
            Videos ({mediaList.filter((m) => m.resourceType === 'video').length})
          </button>
        </div>
      </div>

      {/* Media Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
          gap: '1.25rem'
        }}
      >
        {filtered.length === 0 ? (
          <div className="admin-card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3.5rem 1rem', color: '#9ca3af' }}>
            <Cloud size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
            <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>No Media Assets Found</h3>
            <p style={{ fontSize: '0.85rem' }}>Click &ldquo;Upload Image / Video&rdquo; above to upload assets directly to Cloudinary.</p>
          </div>
        ) : (
          filtered.map((item) => {
            const id = item._id || item.id;
            const isVideo = item.resourceType === 'video';
            const mediaUrl = item.url || item.file_url;

            return (
              <div
                key={id || mediaUrl}
                className="admin-card"
                style={{
                  padding: '0.75rem',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: selectedAsset?._id === id ? '1px solid var(--brand-orange)' : '1px solid var(--admin-border)',
                  transition: 'border-color 0.2s ease'
                }}
              >
                {/* Media Preview Container */}
                <div
                  onClick={() => openAssetDetails(item)}
                  style={{
                    width: '100%',
                    height: '145px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    background: '#090812',
                    marginBottom: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                  title="Click to view full asset details and assignment"
                >
                  {isVideo ? (
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <Film size={36} color="var(--brand-orange)" />
                      <span style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: '6px' }}>Video Asset</span>
                    </div>
                  ) : (
                    <img
                      src={mediaUrl}
                      alt={item.originalName || item.filename}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.currentTarget.src = '/images/services-infograph.png';
                      }}
                    />
                  )}

                  <span
                    style={{
                      position: 'absolute',
                      top: '6px',
                      left: '6px',
                      background: 'rgba(0,0,0,0.75)',
                      backdropFilter: 'blur(4px)',
                      color: isVideo ? 'var(--brand-orange)' : '#10b981',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '0.65rem',
                      fontWeight: 600
                    }}
                  >
                    {isVideo ? '🎬 VIDEO' : '🖼️ IMAGE'}
                  </span>
                </div>

                {/* Metadata */}
                <div>
                  <strong
                    style={{
                      display: 'block',
                      color: '#fff',
                      fontSize: '0.85rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer'
                    }}
                    title={item.filename || item.originalName}
                    onClick={() => openAssetDetails(item)}
                  >
                    {item.originalName || item.filename}
                  </strong>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                    <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>
                      {item.size ? `${Math.round(item.size / 1024)} KB` : 'Cloud Asset'}
                    </span>
                    {item.assignedPage && (
                      <span style={{ fontSize: '0.65rem', color: 'var(--brand-orange)', background: 'rgba(248, 98, 0, 0.1)', padding: '1px 5px', borderRadius: '4px' }}>
                        {item.assignedPage}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
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
                    onClick={() => handleCopy(mediaUrl, id)}
                    className="admin-btn admin-btn-secondary"
                    style={{ flex: 1, padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
                    title="Copy URL to Clipboard"
                  >
                    {copiedId === id ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                    <span>{copiedId === id ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={() => openAssetDetails(item)}
                    className="admin-btn admin-btn-secondary"
                    style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
                    title="Inspect & Assign"
                  >
                    <Info size={13} />
                  </button>

                  <button
                    onClick={() => initiateDelete(item)}
                    className="admin-btn admin-btn-danger"
                    style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
                    title="Delete media from Cloudinary"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Asset Details & Page Assignment Modal */}
      {selectedAsset && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content" style={{ maxWidth: '650px', width: '90%' }}>
            <div className="admin-modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 className="admin-modal-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Cloud size={20} color="var(--brand-orange)" />
                <span>Asset Details & Page Assignment</span>
              </h2>
              <button type="button" className="admin-modal-close-btn" onClick={() => setSelectedAsset(null)}>
                ×
              </button>
            </div>

            <div style={{ padding: '1.25rem' }}>
              {/* Preview */}
              <div style={{ maxHeight: '280px', borderRadius: '8px', overflow: 'hidden', background: '#0a0914', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                {selectedAsset.resourceType === 'video' ? (
                  <video
                    src={selectedAsset.url || selectedAsset.file_url}
                    controls
                    style={{ maxWidth: '100%', maxHeight: '280px' }}
                  />
                ) : (
                  <img
                    src={selectedAsset.url || selectedAsset.file_url}
                    alt={selectedAsset.originalName || selectedAsset.filename}
                    style={{ maxWidth: '100%', maxHeight: '280px', objectFit: 'contain' }}
                  />
                )}
              </div>

              {/* Asset URL & Metadata */}
              <div className="admin-form-group">
                <label className="admin-label">Cloudinary Media URL</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    readOnly
                    className="admin-input"
                    value={selectedAsset.url || selectedAsset.file_url || ''}
                  />
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => handleCopy(selectedAsset.url || selectedAsset.file_url, 'modal')}
                  >
                    Copy
                  </button>
                </div>
              </div>

              {/* Assignment Form */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                <div className="admin-form-group">
                  <label className="admin-label">Assign to Website Page</label>
                  <select
                    className="admin-select"
                    value={assignPage}
                    onChange={(e) => setAssignPage(e.target.value)}
                  >
                    <option value="">-- No Page Assigned --</option>
                    {(ALL_PAGE_DEFINITIONS || []).map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.name} ({p.path})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Section Key / Slot</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. hero, banner, showcase"
                    value={assignSection}
                    onChange={(e) => setAssignSection(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => setSelectedAsset(null)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  disabled={isAssigning}
                  onClick={handleSaveAssignment}
                >
                  {isAssigning ? 'Saving...' : 'Save Assignment'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Warning Safety Modal */}
      {deleteWarning && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content" style={{ maxWidth: '500px', width: '90%', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
            <div className="admin-modal-header" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444' }}>
              <AlertTriangle size={22} />
              <h2 className="admin-modal-title" style={{ color: '#ef4444', margin: 0 }}>
                Active Media Asset In Use!
              </h2>
            </div>
            <div style={{ padding: '1.25rem' }}>
              <p style={{ color: '#e2e8f0', fontSize: '0.9rem', marginBottom: '1rem' }}>
                <strong>&ldquo;{deleteWarning.item.originalName || deleteWarning.item.filename}&rdquo;</strong> is currently referenced in your live website content:
              </p>
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.25)', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem', maxHeight: '140px', overflowY: 'auto' }}>
                {deleteWarning.usage.map((u, i) => (
                  <div key={i} style={{ fontSize: '0.8rem', color: '#fca5a5', marginBottom: '4px' }}>
                    • {u.title} ({u.type})
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.82rem', color: '#9ca3af' }}>
                Deleting this file from Cloudinary will cause broken media links in the referenced pages above. Are you sure you want to proceed?
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setDeleteWarning(null)}>
                  Cancel (Keep Asset)
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-danger"
                  onClick={() => executeDelete(deleteWarning.item._id || deleteWarning.item.id)}
                >
                  Force Delete Anyway
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
