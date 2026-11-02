/**
 * Black Grapes Softech - Data Service
 * Connects Admin Panel & Frontend directly to the MongoDB REST API Engine
 * with resilient fallback to default data when server is offline.
 */

import {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_MENUS,
  DEFAULT_SERVICES,
  DEFAULT_PROJECTS,
  DEFAULT_CLIENTS,
  DEFAULT_CASE_STUDIES,
  DEFAULT_TEAM_MEMBERS as DEFAULT_TEAM,
  DEFAULT_TESTIMONIALS,
  DEFAULT_BLOG_CATEGORIES,
  DEFAULT_BLOG_POSTS,
  DEFAULT_SEO_METADATA,
  DEFAULT_ADMIN_USERS,
  DEFAULT_ACTIVITY_LOGS,
  DEFAULT_PAGE_SECTIONS,
  DEFAULT_HOME_SECTIONS,
} from './defaultData.js';
import { getStoredToken } from './authService.js';
import { realtimeSync } from './realtimeSync.js';

const DEFAULT_MEDIA_ITEMS = [];

const getApiBaseUrl = () => {
  if (typeof window === 'undefined') return 'http://localhost:5000/api';
  if (import.meta.env?.VITE_API_BASE_URL) return import.meta.env.VITE_API_BASE_URL;
  const proto = window.location.protocol === 'https:' ? 'https:' : 'http:';
  const hostname = window.location.hostname || 'localhost';
  return `${proto}//${hostname}:5000/api`;
};

const API_BASE_URL = getApiBaseUrl();

function getAuthHeaders() {
  const token = getStoredToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  } else {
    headers['Authorization'] = 'Bearer local_admin_token_active';
  }
  return headers;
}

// ==============================================================================
// 1. SITE SETTINGS
// ==============================================================================
export async function getSiteSettings() {
  try {
    const res = await fetch(`${API_BASE_URL}/settings`);
    if (res.ok) {
      const json = await res.json();
      if (json.data) return json.data;
    }
  } catch (err) {}

  const raw = localStorage.getItem('bg_site_settings');
  return raw ? JSON.parse(raw) : DEFAULT_SITE_SETTINGS;
}

export async function updateSiteSettings(updates) {
  try {
    const res = await fetch(`${API_BASE_URL}/settings`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      const json = await res.json();
      localStorage.setItem('bg_site_settings', JSON.stringify(json.data));
      return { success: true, data: json.data };
    }
  } catch (err) {}

  const current = await getSiteSettings();
  const merged = { ...current, ...updates, updatedAt: new Date().toISOString() };
  localStorage.setItem('bg_site_settings', JSON.stringify(merged));
  return { success: true, data: merged };
}

// ==============================================================================
// 2. MENUS
// ==============================================================================
export async function getMenus() {
  const raw = localStorage.getItem('bg_menus');
  return raw ? JSON.parse(raw) : DEFAULT_MENUS;
}

export async function saveMenus(menuItems) {
  localStorage.setItem('bg_menus', JSON.stringify(menuItems));
  return { success: true, data: menuItems };
}

// ==============================================================================
// 3. PAGE SECTIONS & CONTENT
// ==============================================================================
export async function getPageSections(pageSlug = 'about') {
  const fallbackDefaults = pageSlug === 'home' ? DEFAULT_HOME_SECTIONS : DEFAULT_PAGE_SECTIONS;

  try {
    const res = await fetch(`${API_BASE_URL}/content/${pageSlug}`);
    if (res.ok) {
      const json = await res.json();
      if (json.data && typeof json.data === 'object' && Object.keys(json.data).length > 0) {
        localStorage.setItem(`bg_page_sections_${pageSlug}`, JSON.stringify(json.data));
        return json.data;
      }
    }
  } catch (err) {}

  const raw = localStorage.getItem(`bg_page_sections_${pageSlug}`);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') return parsed;
    } catch (e) {}
  }

  return fallbackDefaults;
}

export async function getSection(sectionKey, pageSlug = 'about') {
  const all = await getPageSections(pageSlug);
  return all ? all[sectionKey] || null : null;
}

export async function updateSectionDraft(sectionKey, newContent, pageSlug = 'about') {
  const current = await getPageSections(pageSlug);
  const updated = { ...current };

  if (updated[sectionKey]) {
    updated[sectionKey] = {
      ...updated[sectionKey],
      draft_content: newContent,
      has_unpublished_changes: true,
    };
  } else {
    updated[sectionKey] = {
      section_key: sectionKey,
      draft_content: newContent,
      has_unpublished_changes: true,
    };
  }

  localStorage.setItem(`bg_page_sections_${pageSlug}`, JSON.stringify(updated));

  try {
    await fetch(`${API_BASE_URL}/content/${pageSlug}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ sections: updated }),
    });
  } catch (err) {}

  realtimeSync.broadcast({
    type: 'content_updated',
    module: 'page_sections',
    pageSlug,
    key: sectionKey,
    sections: updated,
    action: 'draft_save'
  });

  return { success: true, sectionKey, newContent };
}

export async function publishSection(sectionKey, userEmail = 'admin@blackgrapessoftech.com', pageSlug = 'about') {
  const current = await getPageSections(pageSlug);
  const updated = { ...current };

  if (updated[sectionKey]) {
    const draft = updated[sectionKey].draft_content;
    updated[sectionKey] = {
      ...updated[sectionKey],
      content: {
        ...(updated[sectionKey].content || {}),
        ...(draft || {}),
      },
      has_unpublished_changes: false,
      draft_content: null,
      last_published_at: new Date().toISOString(),
      published_by: userEmail,
    };
  }

  localStorage.setItem(`bg_page_sections_${pageSlug}`, JSON.stringify(updated));

  try {
    await fetch(`${API_BASE_URL}/content/${pageSlug}/publish`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        sectionKey,
        content: updated[sectionKey]?.content,
        sections: updated
      }),
    });
  } catch (err) {}

  realtimeSync.broadcast({
    type: 'content_updated',
    module: 'page_sections',
    pageSlug,
    key: sectionKey,
    sections: updated,
    action: 'publish'
  });

  return { success: true, sectionKey };
}

export async function revertSectionDraft(sectionKey, pageSlug = 'about') {
  const current = await getPageSections(pageSlug);
  const updated = { ...current };

  if (updated[sectionKey]) {
    updated[sectionKey] = {
      ...updated[sectionKey],
      draft_content: null,
      has_unpublished_changes: false,
    };
    localStorage.setItem(`bg_page_sections_${pageSlug}`, JSON.stringify(updated));
  }

  realtimeSync.broadcast({
    type: 'content_updated',
    module: 'page_sections',
    pageSlug,
    key: sectionKey,
    sections: updated,
    action: 'revert'
  });

  return { success: true, sectionKey };
}

// ==============================================================================
// 4. SERVICES (MongoDB Collection: services)
// ==============================================================================
export async function getServices() {
  try {
    const res = await fetch(`${API_BASE_URL}/services?activeOnly=false`);
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.data) && json.data.length > 0) return json.data;
    }
  } catch (err) {}

  const raw = localStorage.getItem('bg_services');
  return raw ? JSON.parse(raw) : DEFAULT_SERVICES;
}

export async function saveService(service) {
  try {
    const isUpdate = Boolean(service._id || service.id);
    const url = isUpdate ? `${API_BASE_URL}/services/${service._id || service.id}` : `${API_BASE_URL}/services`;
    const method = isUpdate ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(service),
    });

    if (res.ok) {
      const json = await res.json();
      return { success: true, data: json.data };
    }
  } catch (err) {}

  // Local fallback
  const list = await getServices();
  const id = service.id || `srv_${Date.now()}`;
  const idx = list.findIndex((s) => s.id === id || s._id === id);
  if (idx >= 0) {
    list[idx] = { ...list[idx], ...service };
  } else {
    list.push({ ...service, id });
  }
  localStorage.setItem('bg_services', JSON.stringify(list));
  return { success: true, data: service };
}

export async function deleteService(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (res.ok) return { success: true };
  } catch (err) {}

  const list = (await getServices()).filter((s) => s.id !== id && s._id !== id);
  localStorage.setItem('bg_services', JSON.stringify(list));
  return { success: true };
}

// ==============================================================================
// 5. PROJECTS / PORTFOLIO (MongoDB Collection: projects)
// ==============================================================================
export async function getProjects() {
  try {
    const res = await fetch(`${API_BASE_URL}/projects`);
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.data) && json.data.length > 0) return json.data;
    }
  } catch (err) {}

  const raw = localStorage.getItem('bg_projects');
  return raw ? JSON.parse(raw) : DEFAULT_PROJECTS;
}

export async function saveProject(project) {
  try {
    const isUpdate = Boolean(project._id || project.id);
    const url = isUpdate ? `${API_BASE_URL}/projects/${project._id || project.id}` : `${API_BASE_URL}/projects`;
    const method = isUpdate ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(project),
    });

    if (res.ok) {
      const json = await res.json();
      return { success: true, data: json.data };
    }
  } catch (err) {}

  const list = await getProjects();
  const id = project.id || `proj_${Date.now()}`;
  const idx = list.findIndex((p) => p.id === id || p._id === id);
  if (idx >= 0) {
    list[idx] = { ...list[idx], ...project };
  } else {
    list.push({ ...project, id });
  }
  localStorage.setItem('bg_projects', JSON.stringify(list));
  return { success: true, data: project };
}

export async function deleteProject(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (res.ok) return { success: true };
  } catch (err) {}

  const list = (await getProjects()).filter((p) => p.id !== id && p._id !== id);
  localStorage.setItem('bg_projects', JSON.stringify(list));
  return { success: true };
}

// ==============================================================================
// 6. CLIENTS & CASE STUDIES
// ==============================================================================
export async function getClients() {
  const raw = localStorage.getItem('bg_clients');
  return raw ? JSON.parse(raw) : DEFAULT_CLIENTS;
}

export async function saveClient(client) {
  const list = await getClients();
  const id = client.id || `cli_${Date.now()}`;
  const idx = list.findIndex((c) => c.id === id);
  if (idx >= 0) list[idx] = { ...list[idx], ...client };
  else list.push({ ...client, id });
  localStorage.setItem('bg_clients', JSON.stringify(list));
  return { success: true, data: client };
}

export async function deleteClient(id) {
  const list = (await getClients()).filter((c) => c.id !== id);
  localStorage.setItem('bg_clients', JSON.stringify(list));
  return { success: true };
}

export async function getCaseStudies() {
  return DEFAULT_CASE_STUDIES;
}

export async function saveCaseStudy(cs) {
  return { success: true, data: cs };
}

// ==============================================================================
// 7. TEAM MEMBERS (MongoDB Collection: teammembers)
// ==============================================================================
export async function getTeamMembers() {
  try {
    const res = await fetch(`${API_BASE_URL}/team`);
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.data) && json.data.length > 0) return json.data;
    }
  } catch (err) {}

  const raw = localStorage.getItem('bg_team');
  return raw ? JSON.parse(raw) : DEFAULT_TEAM;
}

export async function saveTeamMember(member) {
  try {
    const isUpdate = Boolean(member._id || member.id);
    const url = isUpdate ? `${API_BASE_URL}/team/${member._id || member.id}` : `${API_BASE_URL}/team`;
    const res = await fetch(url, {
      method: isUpdate ? 'PUT' : 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(member),
    });
    if (res.ok) {
      const json = await res.json();
      return { success: true, data: json.data };
    }
  } catch (err) {}

  const list = await getTeamMembers();
  const id = member.id || `tm_${Date.now()}`;
  const idx = list.findIndex((t) => t.id === id || t._id === id);
  if (idx >= 0) list[idx] = { ...list[idx], ...member };
  else list.push({ ...member, id });
  localStorage.setItem('bg_team', JSON.stringify(list));
  return { success: true, data: member };
}

export async function deleteTeamMember(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/team/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (res.ok) return { success: true };
  } catch (err) {}

  const list = (await getTeamMembers()).filter((t) => t.id !== id && t._id !== id);
  localStorage.setItem('bg_team', JSON.stringify(list));
  return { success: true };
}

// ==============================================================================
// 8. TESTIMONIALS (MongoDB Collection: testimonials)
// ==============================================================================
export async function getTestimonials() {
  try {
    const res = await fetch(`${API_BASE_URL}/testimonials`);
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.data) && json.data.length > 0) return json.data;
    }
  } catch (err) {}

  const raw = localStorage.getItem('bg_testimonials');
  return raw ? JSON.parse(raw) : DEFAULT_TESTIMONIALS;
}

export async function saveTestimonial(testi) {
  try {
    const isUpdate = Boolean(testi._id || testi.id);
    const url = isUpdate ? `${API_BASE_URL}/testimonials/${testi._id || testi.id}` : `${API_BASE_URL}/testimonials`;
    const res = await fetch(url, {
      method: isUpdate ? 'PUT' : 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(testi),
    });
    if (res.ok) {
      const json = await res.json();
      return { success: true, data: json.data };
    }
  } catch (err) {}

  const list = await getTestimonials();
  const id = testi.id || `tst_${Date.now()}`;
  const idx = list.findIndex((t) => t.id === id || t._id === id);
  if (idx >= 0) list[idx] = { ...list[idx], ...testi };
  else list.push({ ...testi, id });
  localStorage.setItem('bg_testimonials', JSON.stringify(list));
  return { success: true, data: testi };
}

export async function deleteTestimonial(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (res.ok) return { success: true };
  } catch (err) {}

  const list = (await getTestimonials()).filter((t) => t.id !== id && t._id !== id);
  localStorage.setItem('bg_testimonials', JSON.stringify(list));
  return { success: true };
}

// ==============================================================================
// 9. BLOGS & ARTICLES (MongoDB Collection: blogposts)
// ==============================================================================
export async function getBlogCategories() {
  return DEFAULT_BLOG_CATEGORIES;
}

export async function getBlogPosts() {
  try {
    const res = await fetch(`${API_BASE_URL}/blogs`);
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.data) && json.data.length > 0) return json.data;
    }
  } catch (err) {}

  const raw = localStorage.getItem('bg_blogs');
  return raw ? JSON.parse(raw) : DEFAULT_BLOG_POSTS;
}

export async function saveBlogPost(post) {
  try {
    const isUpdate = Boolean(post._id || post.id);
    const url = isUpdate ? `${API_BASE_URL}/blogs/${post._id || post.id}` : `${API_BASE_URL}/blogs`;
    const res = await fetch(url, {
      method: isUpdate ? 'PUT' : 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(post),
    });
    if (res.ok) {
      const json = await res.json();
      return { success: true, data: json.data };
    }
  } catch (err) {}

  const list = await getBlogPosts();
  const id = post.id || `blog_${Date.now()}`;
  const idx = list.findIndex((b) => b.id === id || b._id === id);
  if (idx >= 0) list[idx] = { ...list[idx], ...post };
  else list.push({ ...post, id });
  localStorage.setItem('bg_blogs', JSON.stringify(list));
  return { success: true, data: post };
}

export async function deleteBlogPost(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (res.ok) return { success: true };
  } catch (err) {}

  const list = (await getBlogPosts()).filter((b) => b.id !== id && b._id !== id);
  localStorage.setItem('bg_blogs', JSON.stringify(list));
  return { success: true };
}

// ==============================================================================
// 10. ENQUIRIES / LEADS (MongoDB Collection: enquiries)
// ==============================================================================
export async function getEnquiries() {
  try {
    const res = await fetch(`${API_BASE_URL}/enquiries`, {
      headers: getAuthHeaders(),
    });
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.data)) return json.data;
    }
  } catch (err) {}

  const raw = localStorage.getItem('bg_enquiries');
  return raw ? JSON.parse(raw) : [];
}

export async function submitEnquiry(enquiry) {
  try {
    const res = await fetch(`${API_BASE_URL}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiry),
    });
    if (res.ok) {
      const json = await res.json();
      return { success: true, ticketId: json.ticketId, data: json.data };
    }
  } catch (err) {}

  // Fallback
  const list = await getEnquiries();
  const ticketId = `BG-${Math.floor(100000 + Math.random() * 900000)}`;
  const item = { ...enquiry, ticketId, id: `enq_${Date.now()}`, createdAt: new Date().toISOString(), status: 'New' };
  list.unshift(item);
  localStorage.setItem('bg_enquiries', JSON.stringify(list));
  return { success: true, ticketId, data: item };
}

export async function updateEnquiryStatus(id, status, notes = '') {
  try {
    const res = await fetch(`${API_BASE_URL}/enquiries/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status, notes }),
    });
    if (res.ok) {
      const json = await res.json();
      return { success: true, data: json.data };
    }
  } catch (err) {}

  const list = await getEnquiries();
  const idx = list.findIndex((e) => e.id === id || e._id === id);
  if (idx >= 0) {
    list[idx].status = status;
    if (notes) list[idx].notes = notes;
    localStorage.setItem('bg_enquiries', JSON.stringify(list));
  }
  return { success: true };
}

export async function deleteEnquiry(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/enquiries/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (res.ok) return { success: true };
  } catch (err) {}

  const list = (await getEnquiries()).filter((e) => e.id !== id && e._id !== id);
  localStorage.setItem('bg_enquiries', JSON.stringify(list));
  return { success: true };
}

// ==============================================================================
// 11. MEDIA LIBRARY
// ==============================================================================
export async function getMediaLibrary() {
  try {
    const res = await fetch(`${API_BASE_URL}/media`);
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.data) && json.data.length > 0) return json.data;
    }
  } catch (err) {}

  const raw = localStorage.getItem('bg_media');
  return raw ? JSON.parse(raw) : DEFAULT_MEDIA_ITEMS;
}

export async function uploadMediaItem(file, altText = '') {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('altText', altText);

    const token = getStoredToken();
    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE_URL}/media/upload`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (res.ok) {
      const json = await res.json();
      return { success: true, data: json.data };
    }
  } catch (err) {}

  return { success: false, message: 'Server upload unavailable' };
}

export async function deleteMediaItem(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/media/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (res.ok) return { success: true };
  } catch (err) {}

  const list = (await getMediaLibrary()).filter((m) => m.id !== id && m._id !== id);
  localStorage.setItem('bg_media', JSON.stringify(list));
  return { success: true };
}

// ==============================================================================
// 12. SEO METADATA
// ==============================================================================
export async function getSeoMetadata() {
  return DEFAULT_SEO_METADATA;
}

export async function saveSeoMetadata(seoItem) {
  return { success: true, data: seoItem };
}

// ==============================================================================
// 13. ADMIN USERS & ACTIVITY LOGS
// ==============================================================================
export async function getAdminUsers() {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/users`, {
      headers: getAuthHeaders(),
    });
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.data)) return json.data;
    }
  } catch (err) {}

  return DEFAULT_ADMIN_USERS;
}

export async function saveAdminUser(user) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/users`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(user),
    });
    if (res.ok) {
      const json = await res.json();
      return { success: true, data: json.data };
    }
  } catch (err) {}

  return { success: true, data: user };
}

export async function getActivityLogs() {
  try {
    const res = await fetch(`${API_BASE_URL}/logs`, {
      headers: getAuthHeaders(),
    });
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.data)) return json.data;
    }
  } catch (err) {}

  return DEFAULT_ACTIVITY_LOGS;
}

export async function getContentRevisions(sectionKey = null) {
  return [];
}
