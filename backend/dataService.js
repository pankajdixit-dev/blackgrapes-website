import {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_HOME_PAGE,
  DEFAULT_MENUS,
  DEFAULT_PAGE_SECTIONS,
  DEFAULT_SERVICES,
  DEFAULT_PROJECTS,
  DEFAULT_CLIENTS,
  DEFAULT_CASE_STUDIES,
  DEFAULT_TESTIMONIALS,
  DEFAULT_TEAM_MEMBERS,
  DEFAULT_BLOG_CATEGORIES,
  DEFAULT_BLOG_POSTS,
  DEFAULT_ENQUIRIES,
  DEFAULT_SEO_METADATA,
  DEFAULT_ADMIN_USERS,
  DEFAULT_ACTIVITY_LOGS
} from './defaultData';
import { sendWsBroadcast } from './wsClient';

const STORAGE_KEYS = {
  SETTINGS: 'bgst_site_settings',
  HOME: 'bgst_home_page',
  MENUS: 'bgst_menus',
  PAGE_SECTIONS: 'bgst_page_sections',
  SERVICES: 'bgst_services',
  PROJECTS: 'bgst_projects',
  CLIENTS: 'bgst_clients',
  CASE_STUDIES: 'bgst_case_studies',
  TESTIMONIALS: 'bgst_testimonials',
  TEAM: 'bgst_team_members',
  BLOG_CATS: 'bgst_blog_categories',
  BLOG_POSTS: 'bgst_blog_posts',
  ENQUIRIES: 'bgst_enquiries',
  MEDIA: 'bgst_media_library',
  SEO: 'bgst_seo_metadata',
  USERS: 'bgst_admin_users',
  LOGS: 'bgst_activity_logs',
  REVISIONS: 'bgst_content_revisions'
};

// Event Dispatcher for instantaneous frontend updates upon publishing
export function notifyContentUpdated(moduleName, details = {}) {
  try {
    const payload = { module: moduleName, timestamp: Date.now(), data: details, ...details };
    // 1. Local window custom event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('bgst_content_updated', { detail: payload }));
    }
    // 2. Real-time WebSocket broadcast across ports 5173, 5174 and 5000
    sendWsBroadcast(moduleName, details);
  } catch {
    // ignore
  }
}

// Local storage helpers
function getLocal(key, defaultVal) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch {
    return defaultVal;
  }
}

function setLocal(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {
    // ignore
  }
}

function getApiUrl(endpoint) {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  if (typeof window !== 'undefined' && window.location.hostname) {
    return `http://${window.location.hostname}:5000${cleanEndpoint}`;
  }
  return `http://localhost:5000${cleanEndpoint}`;
}

// API Helpers with dual-connection (Server port 5000 first, fallback to local origin)
async function fetchModuleApi(moduleName, defaultVal) {
  // 1. Try central backend server on port 5000
  try {
    const res = await fetch(getApiUrl(`/api/content/${moduleName}`));
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data !== undefined) {
        setLocal(`bgst_${moduleName}`, json.data);
        return json.data;
      }
    }
  } catch {
    // try relative url
  }

  // 2. Try relative Vite dev server
  try {
    const res2 = await fetch(`/api/content/${moduleName}`);
    if (res2.ok) {
      const json = await res2.json();
      if (json.success && json.data !== undefined) {
        setLocal(`bgst_${moduleName}`, json.data);
        return json.data;
      }
    }
  } catch {
    // fallback
  }

  return getLocal(`bgst_${moduleName}`, defaultVal);
}

async function saveModuleApi(moduleName, data) {
  setLocal(`bgst_${moduleName}`, data);
  const userEmail = typeof localStorage !== 'undefined' 
    ? localStorage.getItem('bgst_current_admin_email') || 'admin@blackgrapessoftech.com'
    : 'admin@blackgrapessoftech.com';

  const bodyStr = JSON.stringify(data);

  // 1. Save to central backend server port 5000
  try {
    await fetch(getApiUrl(`/api/content/${moduleName}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-email': userEmail },
      body: bodyStr
    });
  } catch {
    // ignore
  }

  // 2. Also save to local dev origin if different
  try {
    await fetch(`/api/content/${moduleName}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-email': userEmail },
      body: bodyStr
    });
  } catch {
    // ignore
  }

  // 3. Broadcast over WebSocket
  sendWsBroadcast(moduleName, data);
}

// Check Backend API Health
export async function checkBackendHealth() {
  try {
    const res = await fetch(getApiUrl('/api/health'));
    if (res.ok) {
      const data = await res.json();
      return { connected: true, service: data.service || 'Persistent JSON Database' };
    }
  } catch {
    // try relative
    try {
      const res2 = await fetch('/api/health');
      if (res2.ok) {
        const data2 = await res2.json();
        return { connected: true, service: data2.service || 'Persistent JSON Database' };
      }
    } catch {
      // offline
    }
  }
  return { connected: true, service: 'Local Offline Cache' };
}

// ==========================================
// 1. SITE SETTINGS
// ==========================================
export async function getSiteSettings() {
  return await fetchModuleApi('site_settings', DEFAULT_SITE_SETTINGS);
}

export async function updateSiteSettings(updates) {
  const current = await getSiteSettings();
  const merged = { ...current, ...updates, updated_at: new Date().toISOString() };
  await saveModuleApi('site_settings', merged);
  logActivity('Settings Saved', 'Site Settings', 'general', 'Updated global site settings');
  notifyContentUpdated('site_settings', merged);
  return merged;
}

// ==========================================
// 2. HOME PAGE (Hero, Clock, Why Choose Us, CTA)
// ==========================================
export async function getHomePage() {
  return await fetchModuleApi('home_page', DEFAULT_HOME_PAGE);
}

export async function updateHomePage(updates) {
  const current = await getHomePage();
  const merged = { ...current, ...updates, updated_at: new Date().toISOString() };
  await saveModuleApi('home_page', merged);
  logActivity('Home Page Published', 'Home Page', 'home_page', 'Saved live modifications for Home Page');
  notifyContentUpdated('home_page', merged);
  return merged;
}

// ==========================================
// 3. MENUS
// ==========================================
export async function getMenus() {
  return await fetchModuleApi('menus', DEFAULT_MENUS);
}

export async function saveMenus(menuItems) {
  await saveModuleApi('menus', menuItems);
  logActivity('Menus Updated', 'Navigation Menus', 'menus', `Saved ${menuItems.length} menu items`);
  notifyContentUpdated('menus', menuItems);
  return menuItems;
}

// ==========================================
// 4. PAGE SECTIONS (About & Custom Sections)
// ==========================================
export async function getPageSections(pageSlug = 'about') {
  const allSections = await fetchModuleApi('page_sections', DEFAULT_PAGE_SECTIONS);
  if (!pageSlug) return allSections;
  const filtered = {};
  for (const [key, sec] of Object.entries(allSections)) {
    if (sec.page === pageSlug || sec.page_name === pageSlug || !sec.page) {
      filtered[key] = sec;
    }
  }
  return filtered;
}

export async function getSection(sectionKey) {
  const sections = await fetchModuleApi('page_sections', DEFAULT_PAGE_SECTIONS);
  return sections[sectionKey] || DEFAULT_PAGE_SECTIONS[sectionKey] || null;
}

export async function updateSectionDraft(sectionKey, newContent) {
  const sections = { ...(await fetchModuleApi('page_sections', DEFAULT_PAGE_SECTIONS)) };
  const current = sections[sectionKey] || DEFAULT_PAGE_SECTIONS[sectionKey];

  if (!current) return null;

  sections[sectionKey] = {
    ...current,
    draft_content: newContent,
    has_unpublished_changes: true,
    updated_at: new Date().toISOString()
  };

  await saveModuleApi('page_sections', sections);
  logActivity('Draft Saved', 'Page Sections', sectionKey, `Saved draft changes for: ${current.section_name}`);
  return sections[sectionKey];
}

export async function publishSection(sectionKey, userEmail = 'admin@blackgrapessoftech.com') {
  const sections = { ...(await fetchModuleApi('page_sections', DEFAULT_PAGE_SECTIONS)) };
  const current = sections[sectionKey] || DEFAULT_PAGE_SECTIONS[sectionKey];

  if (!current) return null;

  const publishedContent = current.draft_content || current.content;

  sections[sectionKey] = {
    ...current,
    content: publishedContent,
    draft_content: publishedContent,
    has_unpublished_changes: false,
    updated_at: new Date().toISOString()
  };

  // Record Revision
  const revisions = getLocal(STORAGE_KEYS.REVISIONS, []);
  const newRev = {
    id: `rev-${Date.now()}`,
    section_key: sectionKey,
    section_name: current.section_name,
    version: revisions.filter((r) => r.section_key === sectionKey).length + 1,
    content: publishedContent,
    published_by: userEmail,
    created_at: new Date().toISOString()
  };
  revisions.unshift(newRev);
  setLocal(STORAGE_KEYS.REVISIONS, revisions.slice(0, 50));

  await saveModuleApi('page_sections', sections);
  logActivity('Published', 'Page Sections', sectionKey, `Published live updates for: ${current.section_name}`);
  notifyContentUpdated('page_sections', { sectionKey, content: publishedContent });
  return sections[sectionKey];
}

export async function revertSectionDraft(sectionKey) {
  const sections = { ...(await fetchModuleApi('page_sections', DEFAULT_PAGE_SECTIONS)) };
  const current = sections[sectionKey];
  if (!current) return null;

  sections[sectionKey] = {
    ...current,
    draft_content: current.content,
    has_unpublished_changes: false,
    updated_at: new Date().toISOString()
  };

  await saveModuleApi('page_sections', sections);
  logActivity('Draft Reverted', 'Page Sections', sectionKey, `Reverted changes for: ${current.section_name}`);
  return sections[sectionKey];
}

// ==========================================
// 5. SERVICES
// ==========================================
export async function getServices() {
  return await fetchModuleApi('services', DEFAULT_SERVICES);
}

export async function saveService(service) {
  const items = [...(await getServices())];
  const index = items.findIndex((s) => s.id === service.id);

  if (index >= 0) {
    items[index] = { ...service, updated_at: new Date().toISOString() };
    logActivity('Service Updated', 'Services', service.id, `Updated service: ${service.title}`);
  } else {
    const newService = {
      ...service,
      id: service.id || `srv-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    items.push(newService);
    logActivity('Service Created', 'Services', newService.id, `Created service: ${service.title}`);
  }

  await saveModuleApi('services', items);
  notifyContentUpdated('services', items);
  return items;
}

export async function deleteService(id) {
  const items = [...(await getServices())];
  const target = items.find((s) => s.id === id);
  const filtered = items.filter((s) => s.id !== id);

  await saveModuleApi('services', filtered);
  logActivity('Service Deleted', 'Services', id, `Deleted service: ${target?.title || id}`);
  notifyContentUpdated('services', filtered);
  return filtered;
}

// ==========================================
// 6. PROJECTS
// ==========================================
export async function getProjects() {
  return await fetchModuleApi('projects', DEFAULT_PROJECTS);
}

export async function saveProject(project) {
  const items = [...(await getProjects())];
  const index = items.findIndex((p) => p.id === project.id);

  if (index >= 0) {
    items[index] = { ...project, updated_at: new Date().toISOString() };
    logActivity('Project Updated', 'Projects', project.id, `Updated project: ${project.title}`);
  } else {
    const newProject = {
      ...project,
      id: project.id || `proj-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    items.push(newProject);
    logActivity('Project Created', 'Projects', newProject.id, `Created project: ${project.title}`);
  }

  await saveModuleApi('projects', items);
  notifyContentUpdated('projects', items);
  return items;
}

export async function deleteProject(id) {
  const items = [...(await getProjects())];
  const target = items.find((p) => p.id === id);
  const filtered = items.filter((p) => p.id !== id);

  await saveModuleApi('projects', filtered);
  logActivity('Project Deleted', 'Projects', id, `Deleted project: ${target?.title || id}`);
  notifyContentUpdated('projects', filtered);
  return filtered;
}

// ==========================================
// 7. CLIENTS & CASE STUDIES
// ==========================================
export async function getClients() {
  return await fetchModuleApi('clients', DEFAULT_CLIENTS);
}

export async function saveClient(client) {
  const items = [...(await getClients())];
  const index = items.findIndex((c) => c.id === client.id);

  if (index >= 0) {
    items[index] = { ...client, updated_at: new Date().toISOString() };
    logActivity('Client Updated', 'Clients', client.id, `Updated client: ${client.name}`);
  } else {
    const newClient = {
      ...client,
      id: client.id || `cli-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    items.push(newClient);
    logActivity('Client Created', 'Clients', newClient.id, `Created client: ${client.name}`);
  }

  await saveModuleApi('clients', items);
  notifyContentUpdated('clients', items);
  return items;
}

export async function deleteClient(id) {
  const items = [...(await getClients())];
  const filtered = items.filter((c) => c.id !== id);
  await saveModuleApi('clients', filtered);
  logActivity('Client Deleted', 'Clients', id, `Deleted client ${id}`);
  notifyContentUpdated('clients', filtered);
  return filtered;
}

export async function getCaseStudies() {
  return await fetchModuleApi('case_studies', DEFAULT_CASE_STUDIES);
}

export async function saveCaseStudy(cs) {
  const items = [...(await getCaseStudies())];
  const idx = items.findIndex((c) => c.id === cs.id);
  if (idx >= 0) {
    items[idx] = { ...cs, updated_at: new Date().toISOString() };
  } else {
    items.push({ ...cs, id: cs.id || `cs-${Date.now()}` });
  }
  await saveModuleApi('case_studies', items);
  notifyContentUpdated('case_studies', items);
  return items;
}

// ==========================================
// 8. TEAM MEMBERS
// ==========================================
export async function getTeamMembers() {
  return await fetchModuleApi('team_members', DEFAULT_TEAM_MEMBERS);
}

export async function saveTeamMember(member) {
  const items = [...(await getTeamMembers())];
  const index = items.findIndex((t) => t.id === member.id);

  if (index >= 0) {
    items[index] = { ...member, updated_at: new Date().toISOString() };
    logActivity('Team Updated', 'Team', member.id, `Updated team member: ${member.full_name}`);
  } else {
    const newMember = {
      ...member,
      id: member.id || `tm-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    items.push(newMember);
    logActivity('Team Member Created', 'Team', newMember.id, `Added team member: ${member.full_name}`);
  }

  await saveModuleApi('team_members', items);
  notifyContentUpdated('team_members', items);
  return items;
}

export async function deleteTeamMember(id) {
  const items = [...(await getTeamMembers())];
  const target = items.find((t) => t.id === id);
  const filtered = items.filter((t) => t.id !== id);

  await saveModuleApi('team_members', filtered);
  logActivity('Team Member Deleted', 'Team', id, `Deleted team member: ${target?.full_name || id}`);
  notifyContentUpdated('team_members', filtered);
  return filtered;
}

// ==========================================
// 9. TESTIMONIALS
// ==========================================
export async function getTestimonials() {
  return await fetchModuleApi('testimonials', DEFAULT_TESTIMONIALS);
}

export async function saveTestimonial(testi) {
  const items = [...(await getTestimonials())];
  const index = items.findIndex((t) => t.id === testi.id);

  if (index >= 0) {
    items[index] = { ...testi, updated_at: new Date().toISOString() };
    logActivity('Testimonial Updated', 'Testimonials', testi.id, `Updated review from: ${testi.name}`);
  } else {
    const newTesti = {
      ...testi,
      id: testi.id || `t-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    items.push(newTesti);
    logActivity('Testimonial Created', 'Testimonials', newTesti.id, `Added review from: ${testi.name}`);
  }

  await saveModuleApi('testimonials', items);
  notifyContentUpdated('testimonials', items);
  return items;
}

export async function deleteTestimonial(id) {
  const items = [...(await getTestimonials())];
  const target = items.find((t) => t.id === id);
  const filtered = items.filter((t) => t.id !== id);

  await saveModuleApi('testimonials', filtered);
  logActivity('Testimonial Deleted', 'Testimonials', id, `Deleted review from: ${target?.name || id}`);
  notifyContentUpdated('testimonials', filtered);
  return filtered;
}

// ==========================================
// 10. BLOGS & CATEGORIES
// ==========================================
export async function getBlogCategories() {
  return await fetchModuleApi('blog_categories', DEFAULT_BLOG_CATEGORIES);
}

export async function getBlogPosts() {
  return await fetchModuleApi('blog_posts', DEFAULT_BLOG_POSTS);
}

export async function saveBlogPost(post) {
  const items = [...(await getBlogPosts())];
  const index = items.findIndex((p) => p.id === post.id);

  if (index >= 0) {
    items[index] = { ...post, updated_at: new Date().toISOString() };
    logActivity('Blog Updated', 'Blog', post.id, `Updated post: ${post.title}`);
  } else {
    const newPost = {
      ...post,
      id: post.id || `bp-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    items.push(newPost);
    logActivity('Blog Created', 'Blog', newPost.id, `Created post: ${post.title}`);
  }

  await saveModuleApi('blog_posts', items);
  notifyContentUpdated('blog_posts', items);
  return items;
}

export async function deleteBlogPost(id) {
  const items = [...(await getBlogPosts())];
  const filtered = items.filter((p) => p.id !== id);
  await saveModuleApi('blog_posts', filtered);
  logActivity('Blog Deleted', 'Blog', id, `Deleted post ${id}`);
  notifyContentUpdated('blog_posts', filtered);
  return filtered;
}

// ==========================================
// 11. ENQUIRIES / LEADS
// ==========================================
export async function getEnquiries() {
  try {
    const res = await fetch(getApiUrl('/api/inquiries'));
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        setLocal(STORAGE_KEYS.ENQUIRIES, json.data);
        return json.data;
      }
    }
  } catch {
    // fallback
  }
  return getLocal(STORAGE_KEYS.ENQUIRIES, DEFAULT_ENQUIRIES);
}

export async function submitEnquiry(enquiry) {
  try {
    const res = await fetch(getApiUrl('/api/inquiries'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiry)
    });
    if (res.ok) {
      const json = await res.json();
      notifyContentUpdated('enquiries', json.data);
      return json;
    }
  } catch {
    // offline fallback
  }

  const items = getLocal(STORAGE_KEYS.ENQUIRIES, DEFAULT_ENQUIRIES);
  const ticketId = `BG-${Math.floor(100000 + Math.random() * 900000)}`;
  const newEnquiry = {
    ...enquiry,
    id: `enq-${Date.now()}`,
    ticket_id: ticketId,
    status: 'new',
    created_at: new Date().toISOString()
  };
  items.unshift(newEnquiry);
  setLocal(STORAGE_KEYS.ENQUIRIES, items);
  notifyContentUpdated('enquiries', newEnquiry);
  return { success: true, ticket_id: ticketId, data: newEnquiry };
}

export async function updateEnquiryStatus(id, status, notes = '') {
  try {
    await fetch(getApiUrl(`/api/inquiries/${id}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, notes })
    });
  } catch {
    // fallback
  }

  const items = getLocal(STORAGE_KEYS.ENQUIRIES, DEFAULT_ENQUIRIES);
  const index = items.findIndex((e) => e.id === id || e.ticket_id === id);
  if (index >= 0) {
    items[index].status = status;
    if (notes) items[index].notes = notes;
    items[index].updated_at = new Date().toISOString();
    setLocal(STORAGE_KEYS.ENQUIRIES, items);
  }
  notifyContentUpdated('enquiries');
  return items;
}

export async function deleteEnquiry(id) {
  try {
    await fetch(getApiUrl(`/api/inquiries/${id}`), { method: 'DELETE' });
  } catch {
    // fallback
  }
  const items = getLocal(STORAGE_KEYS.ENQUIRIES, DEFAULT_ENQUIRIES);
  const filtered = items.filter((e) => e.id !== id && e.ticket_id !== id);
  setLocal(STORAGE_KEYS.ENQUIRIES, filtered);
  notifyContentUpdated('enquiries');
  return filtered;
}

// ==========================================
// 12. MEDIA LIBRARY
// ==========================================
export async function getMediaLibrary() {
  try {
    const res = await fetch(getApiUrl('/api/media'));
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        setLocal(STORAGE_KEYS.MEDIA, json.data);
        return json.data;
      }
    }
  } catch {
    // fallback
  }
  return getLocal(STORAGE_KEYS.MEDIA, []);
}

export async function uploadMediaItem(file, altText = '') {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const res = await fetch(getApiUrl('/api/upload'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: file.name,
            base64Data: reader.result,
            altText
          })
        });
        if (res.ok) {
          const json = await res.json();
          notifyContentUpdated('media');
          return resolve(json.item || { url: json.url });
        }
      } catch {
        // local base64 fallback
      }

      const localItem = {
        id: `med-${Date.now()}`,
        name: file.name,
        url: reader.result,
        file_type: file.type,
        file_size: file.size,
        alt_text: altText || file.name,
        uploaded_at: new Date().toISOString()
      };
      const items = getLocal(STORAGE_KEYS.MEDIA, []);
      items.unshift(localItem);
      setLocal(STORAGE_KEYS.MEDIA, items);
      notifyContentUpdated('media');
      resolve(localItem);
    };
    reader.readAsDataURL(file);
  });
}

export async function deleteMediaItem(id) {
  try {
    await fetch(getApiUrl(`/api/media/${id}`), { method: 'DELETE' });
  } catch {
    // fallback
  }
  const items = getLocal(STORAGE_KEYS.MEDIA, []);
  const filtered = items.filter((m) => m.id !== id);
  setLocal(STORAGE_KEYS.MEDIA, filtered);
  notifyContentUpdated('media');
  return filtered;
}

// ==========================================
// 13. SEO METADATA
// ==========================================
export async function getSeoMetadata() {
  return await fetchModuleApi('seo_metadata', DEFAULT_SEO_METADATA);
}

export async function saveSeoMetadata(seoItem) {
  const items = [...(await getSeoMetadata())];
  const index = items.findIndex((s) => s.id === seoItem.id || s.page_path === seoItem.page_path);

  if (index >= 0) {
    items[index] = { ...seoItem, updated_at: new Date().toISOString() };
  } else {
    items.push({ ...seoItem, id: seoItem.id || `seo-${Date.now()}` });
  }

  await saveModuleApi('seo_metadata', items);
  notifyContentUpdated('seo_metadata', items);
  return items;
}

// ==========================================
// 14. ADMIN USERS
// ==========================================
export async function getAdminUsers() {
  return await fetchModuleApi('admin_users', DEFAULT_ADMIN_USERS);
}

export async function saveAdminUser(user) {
  const items = [...(await getAdminUsers())];
  const index = items.findIndex((u) => u.id === user.id || u.email.toLowerCase() === user.email.toLowerCase());

  if (index >= 0) {
    items[index] = { ...user, updated_at: new Date().toISOString() };
  } else {
    items.push({ ...user, id: user.id || `usr-${Date.now()}`, created_at: new Date().toISOString() });
  }

  await saveModuleApi('admin_users', items);
  notifyContentUpdated('admin_users', items);
  return items;
}

// ==========================================
// 15. ACTIVITY LOGS
// ==========================================
export async function getActivityLogs() {
  return await fetchModuleApi('activity_logs', DEFAULT_ACTIVITY_LOGS);
}

export function logActivity(action, module, recordId, description) {
  const userEmail = typeof localStorage !== 'undefined'
    ? localStorage.getItem('bgst_current_admin_email') || 'admin@blackgrapessoftech.com'
    : 'admin@blackgrapessoftech.com';

  const newLog = {
    id: `log-${Date.now()}`,
    action,
    module,
    record_id: recordId,
    user_email: userEmail,
    description,
    created_at: new Date().toISOString()
  };

  const logs = getLocal(STORAGE_KEYS.LOGS, DEFAULT_ACTIVITY_LOGS);
  logs.unshift(newLog);
  setLocal(STORAGE_KEYS.LOGS, logs.slice(0, 100));
}

// ==========================================
// 16. CONTENT REVISIONS
// ==========================================
export async function getContentRevisions(sectionKey = null) {
  const all = getLocal(STORAGE_KEYS.REVISIONS, []);
  if (!sectionKey) return all;
  return all.filter((r) => r.section_key === sectionKey);
}
