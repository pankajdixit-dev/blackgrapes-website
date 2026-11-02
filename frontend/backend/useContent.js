import { useState, useEffect, useCallback } from 'react';
import {
  getSiteSettings,
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
  DEFAULT_MENUS,
  DEFAULT_PAGE_SECTIONS,
  DEFAULT_SERVICES,
  DEFAULT_PROJECTS,
  DEFAULT_CLIENTS,
  DEFAULT_TESTIMONIALS,
  DEFAULT_TEAM_MEMBERS,
  DEFAULT_SEO_METADATA
} from './defaultData';

export function useSiteSettings() {
  const [settings, setSettings] = useState(DEFAULT_SITE_SETTINGS);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    try {
      const data = await getSiteSettings();
      if (data) setSettings(data);
    } catch {
      // keep default
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();

    const handleUpdate = (e) => {
      if (e.detail?.module === 'site_settings') {
        reload();
      }
    };
    window.addEventListener('bgst_content_updated', handleUpdate);
    return () => window.removeEventListener('bgst_content_updated', handleUpdate);
  }, [reload]);

  return { settings, loading, reload };
}

export function useMenus() {
  const [menus, setMenus] = useState(DEFAULT_MENUS);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    try {
      const data = await getMenus();
      if (data && data.length) setMenus(data);
    } catch {
      // keep default
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();

    const handleUpdate = (e) => {
      if (e.detail?.module === 'menus') {
        reload();
      }
    };
    window.addEventListener('bgst_content_updated', handleUpdate);
    return () => window.removeEventListener('bgst_content_updated', handleUpdate);
  }, [reload]);

  return { menus, loading, reload };
}

export function usePageSections(pageSlug = 'about') {
  const [sections, setSections] = useState(DEFAULT_PAGE_SECTIONS);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    try {
      const data = await getPageSections(pageSlug);
      if (data && Object.keys(data).length) setSections(data);
    } catch {
      // keep default
    } finally {
      setLoading(false);
    }
  }, [pageSlug]);

  useEffect(() => {
    reload();

    const handleUpdate = (e) => {
      if (e.detail?.module === 'page_sections') {
        reload();
      }
    };
    window.addEventListener('bgst_content_updated', handleUpdate);
    return () => window.removeEventListener('bgst_content_updated', handleUpdate);
  }, [reload]);

  return { sections, loading, reload };
}

export function useProjects() {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    try {
      const data = await getProjects();
      if (data && data.length) setProjects(data);
    } catch {
      // keep default
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();

    const handleUpdate = (e) => {
      if (e.detail?.module === 'projects') {
        reload();
      }
    };
    window.addEventListener('bgst_content_updated', handleUpdate);
    return () => window.removeEventListener('bgst_content_updated', handleUpdate);
  }, [reload]);

  return { projects, loading, reload };
}

export function useClients() {
  const [clients, setClients] = useState(DEFAULT_CLIENTS);
  const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    try {
      const [cData, tData] = await Promise.all([getClients(), getTestimonials()]);
      if (cData && cData.length) setClients(cData);
      if (tData && tData.length) setTestimonials(tData);
    } catch {
      // keep default
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();

    const handleUpdate = (e) => {
      if (e.detail?.module === 'clients' || e.detail?.module === 'testimonials') {
        reload();
      }
    };
    window.addEventListener('bgst_content_updated', handleUpdate);
    return () => window.removeEventListener('bgst_content_updated', handleUpdate);
  }, [reload]);

  return { clients, testimonials, loading, reload };
}

export function useServices() {
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    try {
      const data = await getServices();
      if (data && data.length) setServices(data);
    } catch {
      // keep default
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();

    const handleUpdate = (e) => {
      if (e.detail?.module === 'services') {
        reload();
      }
    };
    window.addEventListener('bgst_content_updated', handleUpdate);
    return () => window.removeEventListener('bgst_content_updated', handleUpdate);
  }, [reload]);

  return { services, loading, reload };
}

export function useTeamMembers() {
  const [teamMembers, setTeamMembers] = useState(DEFAULT_TEAM_MEMBERS);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    try {
      const data = await getTeamMembers();
      if (data && data.length) setTeamMembers(data);
    } catch {
      // keep default
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();

    const handleUpdate = (e) => {
      if (e.detail?.module === 'team_members') {
        reload();
      }
    };
    window.addEventListener('bgst_content_updated', handleUpdate);
    return () => window.removeEventListener('bgst_content_updated', handleUpdate);
  }, [reload]);

  return { teamMembers, loading, reload };
}

export function useSeo(pageRoute) {
  useEffect(() => {
    getSeoMetadata().then((list) => {
      const match = list.find((s) => s.page_route === pageRoute);
      if (match) {
        if (match.meta_title) document.title = match.meta_title;
        if (match.meta_description) {
          let descEl = document.querySelector('meta[name="description"]');
          if (!descEl) {
            descEl = document.createElement('meta');
            descEl.setAttribute('name', 'description');
            document.head.appendChild(descEl);
          }
          descEl.setAttribute('content', match.meta_description);
        }
      }
    });
  }, [pageRoute]);
}

