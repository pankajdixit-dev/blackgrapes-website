import { supabase, isConfigured } from './supabaseClient';
import {
  DEFAULT_SITE_SETTINGS,
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

const STORAGE_KEYS = {
  SETTINGS: 'bgst_site_settings',
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
    const event = new CustomEvent('bgst_content_updated', {
      detail: { module: moduleName, timestamp: Date.now(), ...details }
    });
    window.dispatchEvent(event);
  } catch {
    // ignore in non-browser environments
  }
}

// Local storage helper
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

// ==============================================================================
// 1. SITE SETTINGS
// ==============================================================================
export async function getSiteSettings() {
  if (isConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('site_settings').select('*').limit(1).single();
      if (!error && data) return data;
    } catch {
      // fallback
    }
  }
  return getLocal(STORAGE_KEYS.SETTINGS, DEFAULT_SITE_SETTINGS);
}

export async function updateSiteSettings(updates) {
  const current = await getSiteSettings();
  const merged = { ...current, ...updates, updated_at: new Date().toISOString() };

  if (isConfigured && supabase) {
    try {
      await supabase.from('site_settings').upsert(merged);
    } catch {
      // fallback to local
    }
  }

  setLocal(STORAGE_KEYS.SETTINGS, merged);
  logActivity('Update', 'Website Settings', 'settings-1', 'Updated global site settings and contact coordinates');
  notifyContentUpdated('site_settings', merged);
  return merged;
}

// ==============================================================================
// 2. MENUS / NAVIGATION
// ==============================================================================
export async function getMenus() {
  if (isConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('menus').select('*').order('order_index', { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch {
      // fallback
    }
  }
  return getLocal(STORAGE_KEYS.MENUS, DEFAULT_MENUS);
}

export async function saveMenus(menuItems) {
  if (isConfigured && supabase) {
    try {
      await supabase.from('menus').upsert(menuItems);
    } catch {
      // fallback
    }
  }
  setLocal(STORAGE_KEYS.MENUS, menuItems);
  logActivity('Update', 'Menu Navigation', 'menu-nav', `Saved ${menuItems.length} navigation menu items`);
  notifyContentUpdated('menus', menuItems);
  return menuItems;
}

// ==============================================================================
// 3. PAGE SECTIONS (Draft, Preview, Publish Workflow & Revisions)
// ==============================================================================
export async function getPageSections(pageSlug = 'about') {
  if (isConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('page_sections').select('*').order('order_index', { ascending: true });
      if (!error && data && data.length > 0) {
        // Map to section_key dictionary
        const map = {};
        data.forEach((sec) => {
          map[sec.section_key] = {
            id: sec.id,
            section_key: sec.section_key,
            section_name: sec.section_name,
            order_index: sec.order_index,
            is_visible: sec.is_visible,
            has_unpublished_changes: sec.has_unpublished_changes,
            content: sec.content_published || sec.content_draft || {},
            draft_content: sec.content_draft || sec.content_published || {}
          };
        });
        return map;
      }
    } catch {
      // fallback
    }
  }
  return getLocal(STORAGE_KEYS.PAGE_SECTIONS, DEFAULT_PAGE_SECTIONS);
}

export async function getSection(sectionKey) {
  const sections = await getPageSections();
  return sections[sectionKey] || DEFAULT_PAGE_SECTIONS[sectionKey] || null;
}

export async function updateSectionDraft(sectionKey, newContent) {
  const sections = { ...(await getPageSections()) };
  const current = sections[sectionKey] || DEFAULT_PAGE_SECTIONS[sectionKey];

  if (!current) return null;

  sections[sectionKey] = {
    ...current,
    draft_content: newContent,
    has_unpublished_changes: true,
    updated_at: new Date().toISOString()
  };

  if (isConfigured && supabase) {
    try {
      await supabase.from('page_sections').upsert({
        section_key: sectionKey,
        section_name: current.section_name,
        content_draft: newContent,
        has_unpublished_changes: true
      });
    } catch {
      // fallback
    }
  }

  setLocal(STORAGE_KEYS.PAGE_SECTIONS, sections);
  logActivity('Draft Saved', 'Page Sections', sectionKey, `Saved draft changes for section: ${current.section_name}`);
  return sections[sectionKey];
}

export async function publishSection(sectionKey, userEmail = 'admin@blackgrapessoftech.com') {
  const sections = { ...(await getPageSections()) };
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
  setLocal(STORAGE_KEYS.REVISIONS, revisions.slice(0, 50)); // keep last 50

  if (isConfigured && supabase) {
    try {
      await supabase.from('page_sections').upsert({
        section_key: sectionKey,
        section_name: current.section_name,
        content_published: publishedContent,
        content_draft: publishedContent,
        has_unpublished_changes: false
      });
      await supabase.from('content_revisions').insert({
        version_number: newRev.version,
        content_snapshot: publishedContent,
        published_by: userEmail
      });
    } catch {
      // fallback
    }
  }

  setLocal(STORAGE_KEYS.PAGE_SECTIONS, sections);
  logActivity('Published', 'Page Sections', sectionKey, `Published live updates for section: ${current.section_name}`);
  notifyContentUpdated('page_sections', { sectionKey, content: publishedContent });
  return sections[sectionKey];
}

export async function revertSectionDraft(sectionKey) {
  const sections = { ...(await getPageSections()) };
  const current = sections[sectionKey];
  if (!current) return null;

  sections[sectionKey] = {
    ...current,
    draft_content: current.content,
    has_unpublished_changes: false
  };

  setLocal(STORAGE_KEYS.PAGE_SECTIONS, sections);
  return sections[sectionKey];
}

// ==============================================================================
// 4. SERVICES MANAGEMENT
// ==============================================================================
export async function getServices() {
  if (isConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('services').select('*').order('order_index', { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch {
      // fallback
    }
  }
  return getLocal(STORAGE_KEYS.SERVICES, DEFAULT_SERVICES);
}

export async function saveService(service) {
  const list = [...(await getServices())];
  let updated;
  if (service.id) {
    const idx = list.findIndex((s) => s.id === service.id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...service, updated_at: new Date().toISOString() };
      updated = list[idx];
      logActivity('Update', 'Services', service.id, `Updated service: ${service.title}`);
    } else {
      updated = { ...service, id: `srv-${Date.now()}` };
      list.push(updated);
      logActivity('Create', 'Services', updated.id, `Created new service: ${service.title}`);
    }
  } else {
    updated = { ...service, id: `srv-${Date.now()}`, order_index: list.length + 1 };
    list.push(updated);
    logActivity('Create', 'Services', updated.id, `Created new service: ${service.title}`);
  }

  if (isConfigured && supabase) {
    try {
      await supabase.from('services').upsert(updated);
    } catch {
      // fallback
    }
  }

  setLocal(STORAGE_KEYS.SERVICES, list);
  notifyContentUpdated('services', list);
  return updated;
}

export async function deleteService(id) {
  const list = (await getServices()).filter((s) => s.id !== id);
  if (isConfigured && supabase) {
    try {
      await supabase.from('services').delete().eq('id', id);
    } catch {
      // fallback
    }
  }
  setLocal(STORAGE_KEYS.SERVICES, list);
  logActivity('Delete', 'Services', id, `Deleted service ID: ${id}`);
  notifyContentUpdated('services', list);
  return true;
}

// ==============================================================================
// 5. PROJECTS & PROPRIETARY PRODUCTS MANAGEMENT
// ==============================================================================
export async function getProjects() {
  if (isConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('projects').select('*').order('order_index', { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch {
      // fallback
    }
  }
  return getLocal(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS);
}

export async function saveProject(project) {
  const list = [...(await getProjects())];
  let updated;
  if (project.id) {
    const idx = list.findIndex((p) => p.id === project.id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...project, updated_at: new Date().toISOString() };
      updated = list[idx];
      logActivity('Update', 'Projects', project.id, `Updated proprietary product: ${project.title}`);
    } else {
      updated = { ...project, id: project.id || `prod-${Date.now()}` };
      list.push(updated);
      logActivity('Create', 'Projects', updated.id, `Created proprietary product: ${project.title}`);
    }
  } else {
    const key = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    updated = { ...project, id: key, product_key: key, order_index: list.length + 1 };
    list.push(updated);
    logActivity('Create', 'Projects', updated.id, `Created proprietary product: ${project.title}`);
  }

  if (isConfigured && supabase) {
    try {
      await supabase.from('projects').upsert(updated);
    } catch {
      // fallback
    }
  }

  setLocal(STORAGE_KEYS.PROJECTS, list);
  notifyContentUpdated('projects', list);
  return updated;
}

export async function deleteProject(id) {
  const list = (await getProjects()).filter((p) => p.id !== id);
  if (isConfigured && supabase) {
    try {
      await supabase.from('projects').delete().eq('id', id);
    } catch {
      // fallback
    }
  }
  setLocal(STORAGE_KEYS.PROJECTS, list);
  logActivity('Delete', 'Projects', id, `Deleted proprietary product ID: ${id}`);
  notifyContentUpdated('projects', list);
  return true;
}

// ==============================================================================
// 6. CLIENTS & CASE STUDIES MANAGEMENT
// ==============================================================================
export async function getClients() {
  if (isConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('clients').select('*').order('order_index', { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch {
      // fallback
    }
  }
  return getLocal(STORAGE_KEYS.CLIENTS, DEFAULT_CLIENTS);
}

export async function saveClient(client) {
  const list = [...(await getClients())];
  let updated;
  if (client.id) {
    const idx = list.findIndex((c) => c.id === client.id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...client };
      updated = list[idx];
      logActivity('Update', 'Clients', client.id, `Updated client portfolio: ${client.name}`);
    } else {
      updated = { ...client, id: client.id || `client-${Date.now()}` };
      list.push(updated);
      logActivity('Create', 'Clients', updated.id, `Added client: ${client.name}`);
    }
  } else {
    const key = client.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    updated = { ...client, id: key, client_key: key, order_index: list.length + 1 };
    list.push(updated);
    logActivity('Create', 'Clients', updated.id, `Added client: ${client.name}`);
  }

  if (isConfigured && supabase) {
    try {
      await supabase.from('clients').upsert(updated);
    } catch {
      // fallback
    }
  }

  setLocal(STORAGE_KEYS.CLIENTS, list);
  notifyContentUpdated('clients', list);
  return updated;
}

export async function deleteClient(id) {
  const list = (await getClients()).filter((c) => c.id !== id);
  if (isConfigured && supabase) {
    try {
      await supabase.from('clients').delete().eq('id', id);
    } catch {
      // fallback
    }
  }
  setLocal(STORAGE_KEYS.CLIENTS, list);
  logActivity('Delete', 'Clients', id, `Removed client ID: ${id}`);
  notifyContentUpdated('clients', list);
  return true;
}

// Case Studies
export async function getCaseStudies() {
  return getLocal(STORAGE_KEYS.CASE_STUDIES, DEFAULT_CASE_STUDIES);
}

export async function saveCaseStudy(cs) {
  const list = [...(await getCaseStudies())];
  let updated;
  if (cs.id) {
    const idx = list.findIndex((c) => c.id === cs.id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...cs };
      updated = list[idx];
    } else {
      updated = { ...cs, id: `cs-${Date.now()}` };
      list.push(updated);
    }
  } else {
    updated = { ...cs, id: `cs-${Date.now()}` };
    list.push(updated);
  }
  setLocal(STORAGE_KEYS.CASE_STUDIES, list);
  notifyContentUpdated('case_studies', list);
  return updated;
}

// ==============================================================================
// 7. TEAM MANAGEMENT
// ==============================================================================
export async function getTeamMembers() {
  if (isConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('team_members').select('*').order('order_index', { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch {
      // fallback
    }
  }
  return getLocal(STORAGE_KEYS.TEAM, DEFAULT_TEAM_MEMBERS);
}

export async function saveTeamMember(member) {
  const list = [...(await getTeamMembers())];
  let updated;
  if (member.id) {
    const idx = list.findIndex((m) => m.id === member.id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...member };
      updated = list[idx];
      logActivity('Update', 'Team', member.id, `Updated team member profile: ${member.name}`);
    } else {
      updated = { ...member, id: `team-${Date.now()}` };
      list.push(updated);
      logActivity('Create', 'Team', updated.id, `Added team member: ${member.name}`);
    }
  } else {
    updated = { ...member, id: `team-${Date.now()}`, order_index: list.length + 1 };
    list.push(updated);
    logActivity('Create', 'Team', updated.id, `Added team member: ${member.name}`);
  }

  if (isConfigured && supabase) {
    try {
      await supabase.from('team_members').upsert(updated);
    } catch {
      // fallback
    }
  }

  setLocal(STORAGE_KEYS.TEAM, list);
  notifyContentUpdated('team_members', list);
  return updated;
}

export async function deleteTeamMember(id) {
  const list = (await getTeamMembers()).filter((m) => m.id !== id);
  if (isConfigured && supabase) {
    try {
      await supabase.from('team_members').delete().eq('id', id);
    } catch {
      // fallback
    }
  }
  setLocal(STORAGE_KEYS.TEAM, list);
  logActivity('Delete', 'Team', id, `Removed team member ID: ${id}`);
  notifyContentUpdated('team_members', list);
  return true;
}

// ==============================================================================
// 8. TESTIMONIALS MANAGEMENT
// ==============================================================================
export async function getTestimonials() {
  if (isConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('testimonials').select('*').order('order_index', { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch {
      // fallback
    }
  }
  return getLocal(STORAGE_KEYS.TESTIMONIALS, DEFAULT_TESTIMONIALS);
}

export async function saveTestimonial(testi) {
  const list = [...(await getTestimonials())];
  let updated;
  if (testi.id) {
    const idx = list.findIndex((t) => t.id === testi.id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...testi };
      updated = list[idx];
      logActivity('Update', 'Testimonials', testi.id, `Updated testimonial by ${testi.author}`);
    } else {
      updated = { ...testi, id: `testi-${Date.now()}` };
      list.push(updated);
      logActivity('Create', 'Testimonials', updated.id, `Created testimonial by ${testi.author}`);
    }
  } else {
    updated = { ...testi, id: `testi-${Date.now()}`, order_index: list.length + 1 };
    list.push(updated);
    logActivity('Create', 'Testimonials', updated.id, `Created testimonial by ${testi.author}`);
  }

  if (isConfigured && supabase) {
    try {
      await supabase.from('testimonials').upsert(updated);
    } catch {
      // fallback
    }
  }

  setLocal(STORAGE_KEYS.TESTIMONIALS, list);
  notifyContentUpdated('testimonials', list);
  return updated;
}

export async function deleteTestimonial(id) {
  const list = (await getTestimonials()).filter((t) => t.id !== id);
  if (isConfigured && supabase) {
    try {
      await supabase.from('testimonials').delete().eq('id', id);
    } catch {
      // fallback
    }
  }
  setLocal(STORAGE_KEYS.TESTIMONIALS, list);
  logActivity('Delete', 'Testimonials', id, `Deleted testimonial ID: ${id}`);
  notifyContentUpdated('testimonials', list);
  return true;
}

// ==============================================================================
// 9. BLOG MANAGEMENT
// ==============================================================================
export async function getBlogCategories() {
  return getLocal(STORAGE_KEYS.BLOG_CATS, DEFAULT_BLOG_CATEGORIES);
}

export async function getBlogPosts() {
  if (isConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch {
      // fallback
    }
  }
  return getLocal(STORAGE_KEYS.BLOG_POSTS, DEFAULT_BLOG_POSTS);
}

export async function saveBlogPost(post) {
  const list = [...(await getBlogPosts())];
  let updated;
  if (post.id) {
    const idx = list.findIndex((p) => p.id === post.id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...post, updated_at: new Date().toISOString() };
      updated = list[idx];
      logActivity('Update', 'Blog', post.id, `Updated blog article: ${post.title}`);
    } else {
      updated = { ...post, id: `blog-${Date.now()}` };
      list.push(updated);
      logActivity('Create', 'Blog', updated.id, `Created blog article: ${post.title}`);
    }
  } else {
    const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    updated = {
      ...post,
      id: `blog-${Date.now()}`,
      slug: post.slug || slug,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    list.unshift(updated);
    logActivity('Create', 'Blog', updated.id, `Created blog article: ${post.title}`);
  }

  if (isConfigured && supabase) {
    try {
      await supabase.from('blog_posts').upsert(updated);
    } catch {
      // fallback
    }
  }

  setLocal(STORAGE_KEYS.BLOG_POSTS, list);
  notifyContentUpdated('blog_posts', list);
  return updated;
}

export async function deleteBlogPost(id) {
  const list = (await getBlogPosts()).filter((p) => p.id !== id);
  if (isConfigured && supabase) {
    try {
      await supabase.from('blog_posts').delete().eq('id', id);
    } catch {
      // fallback
    }
  }
  setLocal(STORAGE_KEYS.BLOG_POSTS, list);
  logActivity('Delete', 'Blog', id, `Deleted blog article ID: ${id}`);
  notifyContentUpdated('blog_posts', list);
  return true;
}

// ==============================================================================
// 10. ENQUIRIES MANAGEMENT (Connected with DemoModal & Contact Form)
// ==============================================================================
export async function getEnquiries() {
  if (isConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch {
      // fallback
    }
  }
  return getLocal(STORAGE_KEYS.ENQUIRIES, DEFAULT_ENQUIRIES);
}

export async function submitEnquiry(enquiry) {
  const newEnquiry = {
    ...enquiry,
    id: `enq-${Date.now()}`,
    status: 'new',
    admin_notes: '',
    created_at: new Date().toISOString()
  };

  if (isConfigured && supabase) {
    try {
      await supabase.from('enquiries').insert([newEnquiry]);
    } catch {
      // fallback
    }
  }

  const list = [newEnquiry, ...(await getEnquiries())];
  setLocal(STORAGE_KEYS.ENQUIRIES, list);
  logActivity('Enquiry Received', 'Enquiries', newEnquiry.id, `New lead enquiry from ${enquiry.name} (${enquiry.email})`);
  notifyContentUpdated('enquiries', list);
  return newEnquiry;
}

export async function updateEnquiryStatus(id, status, notes = '') {
  const list = [...(await getEnquiries())];
  const idx = list.findIndex((e) => e.id === id);
  if (idx !== -1) {
    list[idx] = {
      ...list[idx],
      status,
      admin_notes: notes !== undefined ? notes : list[idx].admin_notes,
      updated_at: new Date().toISOString()
    };
    if (isConfigured && supabase) {
      try {
        await supabase.from('enquiries').update({ status, admin_notes: notes }).eq('id', id);
      } catch {
        // fallback
      }
    }
    setLocal(STORAGE_KEYS.ENQUIRIES, list);
    logActivity('Update', 'Enquiries', id, `Updated enquiry status to "${status}" for ${list[idx].name}`);
    notifyContentUpdated('enquiries', list);
    return list[idx];
  }
  return null;
}

export async function deleteEnquiry(id) {
  const list = (await getEnquiries()).filter((e) => e.id !== id);
  if (isConfigured && supabase) {
    try {
      await supabase.from('enquiries').delete().eq('id', id);
    } catch {
      // fallback
    }
  }
  setLocal(STORAGE_KEYS.ENQUIRIES, list);
  logActivity('Delete', 'Enquiries', id, `Removed enquiry record ID: ${id}`);
  notifyContentUpdated('enquiries', list);
  return true;
}

// ==============================================================================
// 11. MEDIA LIBRARY MANAGEMENT
// ==============================================================================
export async function getMediaLibrary() {
  if (isConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('media').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch {
      // fallback
    }
  }
  return getLocal(STORAGE_KEYS.MEDIA, [
    {
      id: 'med-1',
      filename: 'founders.jpg',
      file_url: DEFAULT_PAGE_SECTIONS.founders.content.photo,
      file_type: 'image/jpeg',
      file_size: 65450,
      alt_text: 'Mr. Arpit Jain and Mrs. Deepika Jain',
      created_at: new Date().toISOString()
    },
    {
      id: 'med-2',
      filename: 'about-hero.jpg',
      file_url: DEFAULT_PAGE_SECTIONS.about_hero.content.image,
      file_type: 'image/jpeg',
      file_size: 890120,
      alt_text: 'Black Grapes Tech Lab',
      created_at: new Date().toISOString()
    },
    {
      id: 'med-3',
      filename: 'workspace.jpg',
      file_url: DEFAULT_PAGE_SECTIONS.culture_hq.content.image,
      file_type: 'image/jpeg',
      file_size: 925000,
      alt_text: 'Indore Headquarters Workspace',
      created_at: new Date().toISOString()
    }
  ]);
}

export async function uploadMediaItem(file, altText = '') {
  let fileUrl = '';
  let storagePath = '';

  if (isConfigured && supabase) {
    try {
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
      const { data, error } = await supabase.storage.from('media').upload(`uploads/${fileName}`, file);
      if (!error && data) {
        storagePath = data.path;
        const { data: urlData } = supabase.storage.from('media').getPublicUrl(data.path);
        fileUrl = urlData.publicUrl;
      }
    } catch {
      // fallback
    }
  }

  // If local fallback or supabase storage upload failed
  if (!fileUrl) {
    fileUrl = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  }

  const mediaItem = {
    id: `med-${Date.now()}`,
    filename: file.name,
    file_url: fileUrl,
    file_type: file.type,
    file_size: file.size,
    alt_text: altText || file.name,
    storage_path: storagePath,
    created_at: new Date().toISOString()
  };

  if (isConfigured && supabase && storagePath) {
    try {
      await supabase.from('media').insert([mediaItem]);
    } catch {
      // fallback
    }
  }

  const list = [mediaItem, ...(await getMediaLibrary())];
  setLocal(STORAGE_KEYS.MEDIA, list);
  logActivity('Upload', 'Media Library', mediaItem.id, `Uploaded media asset: ${file.name}`);
  notifyContentUpdated('media', list);
  return mediaItem;
}

export async function deleteMediaItem(id) {
  const list = (await getMediaLibrary()).filter((m) => m.id !== id);
  if (isConfigured && supabase) {
    try {
      await supabase.from('media').delete().eq('id', id);
    } catch {
      // fallback
    }
  }
  setLocal(STORAGE_KEYS.MEDIA, list);
  logActivity('Delete', 'Media Library', id, `Deleted media item ID: ${id}`);
  notifyContentUpdated('media', list);
  return true;
}

// ==============================================================================
// 12. SEO METADATA MANAGEMENT
// ==============================================================================
export async function getSeoMetadata() {
  if (isConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('seo_metadata').select('*');
      if (!error && data && data.length > 0) return data;
    } catch {
      // fallback
    }
  }
  return getLocal(STORAGE_KEYS.SEO, DEFAULT_SEO_METADATA);
}

export async function saveSeoMetadata(seoItem) {
  const list = [...(await getSeoMetadata())];
  const idx = list.findIndex((s) => s.page_route === seoItem.page_route);
  let updated;
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...seoItem, updated_at: new Date().toISOString() };
    updated = list[idx];
  } else {
    updated = { ...seoItem, id: `seo-${Date.now()}` };
    list.push(updated);
  }

  if (isConfigured && supabase) {
    try {
      await supabase.from('seo_metadata').upsert(updated);
    } catch {
      // fallback
    }
  }

  setLocal(STORAGE_KEYS.SEO, list);
  logActivity('Update', 'SEO Management', updated.page_route, `Updated SEO tags for page: ${updated.page_route}`);
  notifyContentUpdated('seo', list);
  return updated;
}

// ==============================================================================
// 13. ADMIN USERS & ROLES
// ==============================================================================
export async function getAdminUsers() {
  if (isConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('admin_users').select('*');
      if (!error && data && data.length > 0) return data;
    } catch {
      // fallback
    }
  }
  return getLocal(STORAGE_KEYS.USERS, DEFAULT_ADMIN_USERS);
}

export async function saveAdminUser(user) {
  const list = [...(await getAdminUsers())];
  let updated;
  if (user.id) {
    const idx = list.findIndex((u) => u.id === user.id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...user };
      updated = list[idx];
      logActivity('Update', 'Admin Users', user.id, `Updated admin permissions for ${user.email}`);
    } else {
      updated = { ...user, id: `usr-${Date.now()}` };
      list.push(updated);
      logActivity('Create', 'Admin Users', updated.id, `Created admin account for ${user.email}`);
    }
  } else {
    updated = { ...user, id: `usr-${Date.now()}`, is_active: true };
    list.push(updated);
    logActivity('Create', 'Admin Users', updated.id, `Created admin account for ${user.email}`);
  }

  if (isConfigured && supabase) {
    try {
      await supabase.from('admin_users').upsert(updated);
    } catch {
      // fallback
    }
  }

  setLocal(STORAGE_KEYS.USERS, list);
  return updated;
}

// ==============================================================================
// 14. ACTIVITY LOGS & AUDIT TRAIL
// ==============================================================================
export async function getActivityLogs() {
  if (isConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('activity_logs').select('*').order('created_at', { ascending: false }).limit(100);
      if (!error && data && data.length > 0) return data;
    } catch {
      // fallback
    }
  }
  return getLocal(STORAGE_KEYS.LOGS, DEFAULT_ACTIVITY_LOGS);
}

export function logActivity(action, module, recordId, description) {
  const currentLogs = getLocal(STORAGE_KEYS.LOGS, DEFAULT_ACTIVITY_LOGS);
  const adminEmail = localStorage.getItem('bgst_current_admin_email') || 'admin@blackgrapessoftech.com';

  const entry = {
    id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    admin_email: adminEmail,
    action,
    module,
    record_id: String(recordId || ''),
    description,
    created_at: new Date().toISOString()
  };

  const updated = [entry, ...currentLogs].slice(0, 150);
  setLocal(STORAGE_KEYS.LOGS, updated);

  if (isConfigured && supabase) {
    supabase.from('activity_logs').insert([entry]).then(() => {}).catch(() => {});
  }
  return entry;
}

// ==============================================================================
// 15. CONTENT REVISIONS
// ==============================================================================
export async function getContentRevisions(sectionKey = null) {
  const revs = getLocal(STORAGE_KEYS.REVISIONS, []);
  if (sectionKey) {
    return revs.filter((r) => r.section_key === sectionKey);
  }
  return revs;
}
