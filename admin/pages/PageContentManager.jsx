import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Layers,
  Save,
  Send,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  ArrowUp,
  ArrowDown,
  Plus,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon,
  Video as VideoIcon,
  Sparkles,
  RefreshCw,
  Sliders,
  Check
} from 'lucide-react';
import {
  getPageSections,
  publishSection,
  updateSectionDraft,
  revertSectionDraft,
  addPageSection,
  deletePageSection,
  duplicatePageSection,
  reorderPageSections,
  toggleSectionVisibility,
  getAllPagesSummary
} from '@backend/dataService';
import { ALL_PAGE_DEFINITIONS } from '@backend/defaultData';
import MediaPickerModal from '../components/MediaPickerModal';

export default function PageContentManager() {
  const { pageSlug: urlPageSlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedPageSlug = urlPageSlug || searchParams.get('page') || 'home';
  const [pagesList, setPagesList] = useState(ALL_PAGE_DEFINITIONS);
  const [sections, setSections] = useState({});
  const [activeSectionKey, setActiveSectionKey] = useState('');
  const [draftContent, setDraftContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Media Picker state
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [mediaPickerFieldKey, setMediaPickerFieldKey] = useState('');
  const [mediaPickerType, setMediaPickerType] = useState('all');

  // Add Section Modal state
  const [addSectionModalOpen, setAddSectionModalOpen] = useState(false);
  const [newSectionKey, setNewSectionKey] = useState('');
  const [newSectionName, setNewSectionName] = useState('');

  useEffect(() => {
    loadPageContent(selectedPageSlug);
  }, [selectedPageSlug]);

  const loadPageContent = async (slug) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const data = await getPageSections(slug);
      setSections(data || {});

      const keys = Object.keys(data || {});
      const firstKey = keys.length > 0 ? keys[0] : '';
      setActiveSectionKey(firstKey);

      if (firstKey && data[firstKey]) {
        const sec = data[firstKey];
        setDraftContent(sec.draft_content || sec.content || {});
      } else {
        setDraftContent({});
      }
    } catch (err) {
      setErrorMessage('Failed to load page sections from server.');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSelectSection = (key) => {
    setActiveSectionKey(key);
    const sec = sections[key];
    if (sec) {
      setDraftContent(sec.draft_content || sec.content || {});
    }
  };

  const handleFieldChange = (fieldKey, value) => {
    setDraftContent((prev) => ({
      ...prev,
      [fieldKey]: value
    }));
  };

  const handleSaveDraft = async () => {
    if (!activeSectionKey) return;
    setSaving(true);
    try {
      await updateSectionDraft(activeSectionKey, draftContent, selectedPageSlug);
      showToast('Draft changes saved successfully.');
      await loadPageContent(selectedPageSlug);
    } catch (e) {
      setErrorMessage('Failed to save draft.');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!activeSectionKey) return;
    setPublishing(true);
    try {
      await publishSection(activeSectionKey, 'admin@blackgrapessoftech.com', selectedPageSlug, draftContent);
      showToast(`Section "${activeSectionKey}" published live!`);
      await loadPageContent(selectedPageSlug);
    } catch (e) {
      setErrorMessage('Failed to publish section.');
    } finally {
      setPublishing(false);
    }
  };

  const handleDiscardDraft = async () => {
    if (!activeSectionKey) return;
    if (window.confirm('Discard all unpublished draft changes for this section?')) {
      await revertSectionDraft(activeSectionKey, selectedPageSlug);
      showToast('Draft discarded. Restored published content.');
      await loadPageContent(selectedPageSlug);
    }
  };

  const handleToggleVisibility = async (secKey) => {
    const res = await toggleSectionVisibility(selectedPageSlug, secKey);
    if (res && res.success) {
      showToast(`Visibility updated for "${secKey}".`);
      await loadPageContent(selectedPageSlug);
    }
  };

  const handleDuplicate = async (secKey) => {
    const res = await duplicatePageSection(selectedPageSlug, secKey);
    if (res && res.success) {
      showToast(`Section duplicated.`);
      await loadPageContent(selectedPageSlug);
    }
  };

  const handleDeleteSection = async (secKey) => {
    if (window.confirm(`Permanently delete section "${secKey}" from this page?`)) {
      const res = await deletePageSection(selectedPageSlug, secKey);
      if (res && res.success) {
        showToast(`Section "${secKey}" deleted.`);
        await loadPageContent(selectedPageSlug);
      }
    }
  };

  const handleMoveSection = async (secKey, direction) => {
    const orderedKeys = Object.keys(sections).sort(
      (a, b) => (sections[a]?.order_index || 0) - (sections[b]?.order_index || 0)
    );
    const idx = orderedKeys.indexOf(secKey);
    if (idx === -1) return;

    if (direction === 'up' && idx > 0) {
      const temp = orderedKeys[idx - 1];
      orderedKeys[idx - 1] = orderedKeys[idx];
      orderedKeys[idx] = temp;
    } else if (direction === 'down' && idx < orderedKeys.length - 1) {
      const temp = orderedKeys[idx + 1];
      orderedKeys[idx + 1] = orderedKeys[idx];
      orderedKeys[idx] = temp;
    } else {
      return;
    }

    await reorderPageSections(selectedPageSlug, orderedKeys);
    showToast('Section order updated.');
    await loadPageContent(selectedPageSlug);
  };

  const handleCreateNewSection = async (e) => {
    e.preventDefault();
    if (!newSectionKey || !newSectionName) return;

    const res = await addPageSection(selectedPageSlug, {
      sectionKey: newSectionKey,
      sectionName: newSectionName,
      content: { title: newSectionName, subtitle: '', description: '' }
    });

    if (res && res.success) {
      showToast(`Section "${newSectionName}" added.`);
      setAddSectionModalOpen(false);
      setNewSectionKey('');
      setNewSectionName('');
      await loadPageContent(selectedPageSlug);
    }
  };

  const openMediaPicker = (fieldKey, type = 'all') => {
    setMediaPickerFieldKey(fieldKey);
    setMediaPickerType(type);
    setMediaPickerOpen(true);
  };

  const handleMediaSelected = (url) => {
    if (mediaPickerFieldKey) {
      handleFieldChange(mediaPickerFieldKey, url);
      showToast('Cloudinary asset applied to field.');
    }
  };

  const activeSection = sections[activeSectionKey] || null;
  const isUnpublished = activeSection?.has_unpublished_changes;

  const sortedSectionKeys = Object.keys(sections).sort(
    (a, b) => (sections[a]?.order_index || 0) - (sections[b]?.order_index || 0)
  );

  const currentPageDef = ALL_PAGE_DEFINITIONS.find((p) => p.slug === selectedPageSlug) || {
    name: selectedPageSlug,
    path: `/${selectedPageSlug}`
  };

  return (
    <div>
      {/* Toast & Error Alerts */}
      {toastMessage && (
        <div className="admin-toast">
          <CheckCircle size={18} color="#10b981" />
          <span>{toastMessage}</span>
        </div>
      )}
      {errorMessage && (
        <div className="admin-toast" style={{ borderColor: '#ef4444' }}>
          <AlertCircle size={18} color="#ef4444" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="admin-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
            <h1 className="admin-page-title" style={{ margin: 0 }}>Universal Website CMS Editor</h1>
            <span
              style={{
                fontSize: '0.75rem',
                padding: '0.2rem 0.65rem',
                borderRadius: '12px',
                background: 'rgba(248, 98, 0, 0.15)',
                color: 'var(--brand-orange)',
                border: '1px solid rgba(248, 98, 0, 0.3)'
              }}
            >
              Page: {currentPageDef.name}
            </span>
          </div>
          <p className="admin-page-sub">
            Add, edit, delete, reorder, and publish dynamic sections across every page of your public website.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a
            href={currentPageDef.path}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <span>View Live Page</span>
            <ExternalLink size={14} />
          </a>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => setAddSectionModalOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Plus size={16} />
            <span>Add Custom Section</span>
          </button>
        </div>
      </div>

      {/* Page Switcher Bar */}
      <div className="admin-card" style={{ padding: '0.85rem 1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Layers size={16} color="var(--brand-orange)" />
          <span>Switch Page:</span>
        </span>

        <select
          className="admin-select"
          style={{ width: 'auto', minWidth: '220px', padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}
          value={selectedPageSlug}
          onChange={(e) => {
            const newSlug = e.target.value;
            navigate(`/admin/pages/${newSlug}`);
          }}
        >
          {ALL_PAGE_DEFINITIONS.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name} ({p.path})
            </option>
          ))}
        </select>

        <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
          Managing <strong>{sortedSectionKeys.length}</strong> sections for route <code>{currentPageDef.path}</code>
        </span>
      </div>

      {/* Main CMS Layout: Left Sections List, Right Section Editor */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(260px, 320px) 1fr', gap: '1.5rem', alignItems: 'start' }}>
        {/* Left Column: Sections Reorder & Selector */}
        <div className="admin-card" style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px solid var(--admin-border)', paddingBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>Page Sections</span>
            <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{sortedSectionKeys.length} sections</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {sortedSectionKeys.map((key, idx) => {
              const sec = sections[key];
              const isActive = key === activeSectionKey;
              const isVisible = sec?.is_visible !== false;
              const hasDraft = sec?.has_unpublished_changes;

              return (
                <div
                  key={key}
                  style={{
                    borderRadius: '8px',
                    padding: '0.65rem 0.75rem',
                    background: isActive ? 'rgba(248, 98, 0, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: isActive ? '1px solid var(--brand-orange)' : '1px solid var(--admin-border)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onClick={() => handleSelectSection(key)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: isActive ? '#fff' : '#cbd5e1' }}>
                      {idx + 1}. {sec?.section_name || key}
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => handleToggleVisibility(key)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: isVisible ? '#10b981' : '#6b7280', padding: '2px' }}
                        title={isVisible ? 'Visible on site' : 'Hidden from site'}
                      >
                        {isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleMoveSection(key, 'up')}
                        disabled={idx === 0}
                        style={{ background: 'transparent', border: 'none', cursor: idx === 0 ? 'default' : 'pointer', color: idx === 0 ? '#4b5563' : '#9ca3af', padding: '2px' }}
                        title="Move Up"
                      >
                        <ArrowUp size={14} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleMoveSection(key, 'down')}
                        disabled={idx === sortedSectionKeys.length - 1}
                        style={{ background: 'transparent', border: 'none', cursor: idx === sortedSectionKeys.length - 1 ? 'default' : 'pointer', color: idx === sortedSectionKeys.length - 1 ? '#4b5563' : '#9ca3af', padding: '2px' }}
                        title="Move Down"
                      >
                        <ArrowDown size={14} />
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem' }}>
                    <span style={{ color: '#9ca3af', fontFamily: 'monospace' }}>{key}</span>
                    {hasDraft ? (
                      <span style={{ color: 'var(--brand-orange)', fontWeight: 600 }}>● Draft</span>
                    ) : (
                      <span style={{ color: '#10b981' }}>✓ Live</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Section Form & Controls */}
        <div className="admin-card" style={{ padding: '1.5rem' }}>
          {activeSection ? (
            <div>
              {/* Active Section Header Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--admin-border)', paddingBottom: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', color: '#fff', margin: 0 }}>
                    {activeSection.section_name || activeSectionKey}
                  </h2>
                  <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                    Section Key: <code>{activeSectionKey}</code> &bull; Status: {isUnpublished ? <strong style={{ color: 'var(--brand-orange)' }}>Unpublished Changes</strong> : <span style={{ color: '#10b981' }}>In Sync with Live</span>}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => handleDuplicate(activeSectionKey)}
                    title="Duplicate Section"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <Copy size={13} />
                    <span>Duplicate</span>
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={handleDiscardDraft}
                    disabled={!isUnpublished}
                    style={{ opacity: isUnpublished ? 1 : 0.5 }}
                  >
                    Discard
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={handleSaveDraft}
                    disabled={saving}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <Save size={14} />
                    <span>{saving ? 'Saving...' : 'Save Draft'}</span>
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={handlePublish}
                    disabled={publishing}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <Send size={14} />
                    <span>{publishing ? 'Publishing...' : 'Publish to Live'}</span>
                  </button>

                  <button
                    type="button"
                    className="admin-btn admin-btn-danger"
                    onClick={() => handleDeleteSection(activeSectionKey)}
                    title="Delete Section"
                    style={{ padding: '0.3rem 0.5rem' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Dynamic Field Form Inputs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {Object.keys(draftContent).map((fieldKey) => {
                  const val = draftContent[fieldKey];
                  const isMediaField = /image|img|banner|photo|logo|avatar|video|media/i.test(fieldKey);
                  const isVideoField = /video/i.test(fieldKey);
                  const isLongText = typeof val === 'string' && (val.length > 70 || /desc|lead|subtitle|p1|p2|vision|paragraph/i.test(fieldKey));
                  const isArrayField = Array.isArray(val);

                  if (isArrayField) {
                    return (
                      <div key={fieldKey} style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--admin-border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                          <label className="admin-label" style={{ margin: 0, textTransform: 'capitalize' }}>
                            {fieldKey.replace(/_/g, ' ')} ({val.length} items)
                          </label>
                          <button
                            type="button"
                            className="btn btn-outline btn-sm"
                            style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}
                            onClick={() => {
                              const sample = typeof val[0] === 'object' && val[0] !== null ? { ...val[0], title: 'New Item' } : 'New Item';
                              handleFieldChange(fieldKey, [...val, sample]);
                            }}
                          >
                            + Add Item
                          </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          {val.map((item, itemIdx) => (
                            <div key={itemIdx} style={{ padding: '0.75rem', borderRadius: '6px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ fontSize: '0.75rem', color: 'var(--brand-orange)', fontWeight: 600 }}>
                                  Item #{itemIdx + 1}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const next = val.filter((_, i) => i !== itemIdx);
                                    handleFieldChange(fieldKey, next);
                                  }}
                                  style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.75rem' }}
                                >
                                  Remove
                                </button>
                              </div>

                              {typeof item === 'object' && item !== null ? (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                                  {Object.keys(item).map((subKey) => (
                                    <div key={subKey}>
                                      <label style={{ fontSize: '0.7rem', color: '#9ca3af', display: 'block', marginBottom: '2px', textTransform: 'capitalize' }}>
                                        {subKey}
                                      </label>
                                      <input
                                        type="text"
                                        className="admin-input"
                                        style={{ height: '34px', fontSize: '0.8rem' }}
                                        value={typeof item[subKey] === 'string' ? item[subKey] : JSON.stringify(item[subKey])}
                                        onChange={(e) => {
                                          const next = [...val];
                                          next[itemIdx] = { ...next[itemIdx], [subKey]: e.target.value };
                                          handleFieldChange(fieldKey, next);
                                        }}
                                      />
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <input
                                  type="text"
                                  className="admin-input"
                                  value={item}
                                  onChange={(e) => {
                                    const next = [...val];
                                    next[itemIdx] = e.target.value;
                                    handleFieldChange(fieldKey, next);
                                  }}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div className="admin-form-group" key={fieldKey} style={{ marginBottom: 0 }}>
                      <label className="admin-label" style={{ textTransform: 'capitalize' }}>
                        {fieldKey.replace(/_/g, ' ')}
                      </label>

                      {isMediaField ? (
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <input
                            type="text"
                            className="admin-input"
                            value={val || ''}
                            onChange={(e) => handleFieldChange(fieldKey, e.target.value)}
                            placeholder="Enter Cloudinary URL or pick from Media Library..."
                          />
                          <button
                            type="button"
                            className="btn btn-outline btn-sm"
                            style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                            onClick={() => openMediaPicker(fieldKey, isVideoField ? 'video' : 'image')}
                          >
                            {isVideoField ? <VideoIcon size={14} /> : <ImageIcon size={14} />}
                            <span>Pick Media</span>
                          </button>
                        </div>
                      ) : isLongText ? (
                        <textarea
                          rows={3}
                          className="admin-textarea"
                          value={val || ''}
                          onChange={(e) => handleFieldChange(fieldKey, e.target.value)}
                        />
                      ) : (
                        <input
                          type="text"
                          className="admin-input"
                          value={val || ''}
                          onChange={(e) => handleFieldChange(fieldKey, e.target.value)}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#9ca3af' }}>
              <Layers size={40} style={{ opacity: 0.3, marginBottom: '0.75rem' }} />
              <p>Select a section on the left to edit its content or add a custom section.</p>
            </div>
          )}
        </div>
      </div>

      {/* Cloudinary Media Picker Modal */}
      <MediaPickerModal
        isOpen={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelectMedia={handleMediaSelected}
        mediaType={mediaPickerType}
      />

      {/* Add Custom Section Modal */}
      {addSectionModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content" style={{ maxWidth: '480px', width: '90%' }}>
            <div className="admin-modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 className="admin-modal-title" style={{ margin: 0 }}>Add New Custom Section</h2>
              <button type="button" className="admin-modal-close-btn" onClick={() => setAddSectionModalOpen(false)}>
                ×
              </button>
            </div>

            <form onSubmit={handleCreateNewSection} style={{ padding: '1.25rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Section Identifier / Key</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. promo_banner, special_offer"
                  className="admin-input"
                  value={newSectionKey}
                  onChange={(e) => setNewSectionKey(e.target.value)}
                />
                <span style={{ fontSize: '0.72rem', color: '#9ca3af', marginTop: '2px', display: 'block' }}>
                  Use lowercase alphanumeric letters and underscores only.
                </span>
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Human-Readable Section Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Festive Promotion Banner"
                  className="admin-input"
                  value={newSectionName}
                  onChange={(e) => setNewSectionName(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setAddSectionModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Create Section
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

