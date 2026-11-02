import { useState, useEffect, useCallback } from 'react';
import {
  getSiteSettings,
  getHomePage,
  getMenus,
  getPageSections,
  getServices,
  getProjects,
  getClients,
  getTestimonials,
  getTeamMembers,
  getSeoMetadata
} from './dataService';
import {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_HOME_PAGE,
  DEFAULT_MENUS,
  DEFAULT_PAGE_SECTIONS,
  DEFAULT_SERVICES,
  DEFAULT_PROJECTS,
  DEFAULT_CLIENTS,
  DEFAULT_TESTIMONIALS,
  DEFAULT_TEAM_MEMBERS,
  DEFAULT_SEO_METADATA
} from './defaultData';

function subscribeToUpdates(moduleName, onUpdate) {
  const handleWindow = (e) => {
    if (!e.detail?.module || e.detail?.module === moduleName) {
      onUpdate();
    }
  };
  window.addEventListener('bgst_content_updated', handleWindow);

  let bc = null;
  if (typeof BroadcastChannel !== 'undefined') {
    try {
      bc = new BroadcastChannel('bgst_sync');
      bc.onmessage = (event) => {
        if (!event.data?.detail?.module || event.data?.detail?.module === moduleName) {
          onUpdate();
        }
      };
    } catch {
      // ignore
    }
  }

  return () => {
    window.removeEventListener('bgst_content_updated', handleWindow);
    if (bc) bc.close();
  };
}

// 1. Site Settings Hook
export function useSiteSettings() {
  const [settings, setSettings] = useState(DEFAULT_SITE_SETTINGS);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    try {
      const data = await getSiteSettings();
      if (data) setSettings(data);
    } catch {
      // keep fallback
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
    return subscribeToUpdates('site_settings', reload);
  }, [reload]);

  return { settings, loading, reload };
}

// 2. Home Page Hook
export function useHomePage() {
  const [home, setHome] = useState(DEFAULT_HOME_PAGE);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    try {
      const data = await getHomePage();
      if (data) setHome(data);
    } catch {
      // keep fallback
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
    return subscribeToUpdates('home_page', reload);
  }, [reload]);

  return { home, loading, reload };
}

// 3. Menus Hook
export function useMenus() {
  const [menus, setMenus] = useState(DEFAULT_MENUS);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    try {
      const data = await getMenus();
      if (data && data.length) setMenus(data);
    } catch {
      // keep fallback
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
    return subscribeToUpdates('menus', reload);
  }, [reload]);

  return { menus, loading, reload };
}

// 4. Page Sections Hook
export function usePageSections(pageSlug = 'about') {
  const [sections, setSections] = useState(DEFAULT_PAGE_SECTIONS);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    try {
      const data = await getPageSections(pageSlug);
      if (data && Object.keys(data).length) setSections(data);
    } catch {
      // keep fallback
    } finally {
      setLoading(false);
    }
  }, [pageSlug]);

  useEffect(() => {
    reload();
    return subscribeToUpdates('page_sections', reload);
  }, [reload]);

  return { sections, loading, reload };
}

// 5. Services Hook
export function useServices() {
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    try {
      const data = await getServices();
      if (data && data.length) setServices(data);
    } catch {
      // keep fallback
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
    return subscribeToUpdates('services', reload);
  }, [reload]);

  return { services, loading, reload };
}

// 6. Projects Hook
export function useProjects() {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    try {
      const data = await getProjects();
      if (data && data.length) setProjects(data);
    } catch {
      // keep fallback
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
    return subscribeToUpdates('projects', reload);
  }, [reload]);

  return { projects, loading, reload };
}

// 7. Testimonials Hook
export function useTestimonials() {
  const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    try {
      const data = await getTestimonials();
      if (data && data.length) setTestimonials(data);
    } catch {
      // keep fallback
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
    return subscribeToUpdates('testimonials', reload);
  }, [reload]);

  return { testimonials, loading, reload };
}

// 8. Clients Hook
export function useClients() {
  const [clients, setClients] = useState(DEFAULT_CLIENTS);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    try {
      const data = await getClients();
      if (data && data.length) setClients(data);
    } catch {
      // keep fallback
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
    return subscribeToUpdates('clients', reload);
  }, [reload]);

  return { clients, loading, reload };
}

// 9. Team Members Hook
export function useTeamMembers() {
  const [team, setTeam] = useState(DEFAULT_TEAM_MEMBERS);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    try {
      const data = await getTeamMembers();
      if (data && data.length) setTeam(data);
    } catch {
      // keep fallback
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
    return subscribeToUpdates('team_members', reload);
  }, [reload]);

  return { team, loading, reload };
}

// 10. SEO Metadata Hook
export function useSeoMetadata(pagePath = '/') {
  const [seo, setSeo] = useState(null);

  const reload = useCallback(async () => {
    try {
      const list = await getSeoMetadata();
      const matched = list.find((s) => s.page_path === pagePath);
      setSeo(matched || null);
    } catch {
      // ignore
    }
  }, [pagePath]);

  useEffect(() => {
    reload();
    return subscribeToUpdates('seo_metadata', reload);
  }, [reload]);

  return seo;
}

export const useSeo = useSeoMetadata;
