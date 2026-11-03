import { useState, useEffect, useCallback } from 'react';
import {
  getSiteSettings,
  getHomePage,
  getMenus,
  getPageSections,
  getServices,
  getProjects,
  getProducts,
  getClients,
  getTestimonials,
  getTeamMembers,
  getSeoMetadata,
  getITStaffing,
  getEcommerce,
  getPartnership,
  getContactPage,
  getClientsPage,
  getBusinessPartners,
  getServicesPage,
  getSoftechPage,
  getProductsPage
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
  DEFAULT_SEO_METADATA,
  DEFAULT_IT_STAFFING,
  DEFAULT_ECOMMERCE,
  DEFAULT_PARTNERSHIP,
  DEFAULT_CONTACT_PAGE,
  DEFAULT_CLIENTS_PAGE,
  DEFAULT_SERVICES_PAGE,
  DEFAULT_SOFTECH_PAGE,
  DEFAULT_PRODUCTS_PAGE
} from './defaultData';
import { subscribeToWebSocket } from './wsClient';

function subscribeToUpdates(moduleName, onUpdate) {
  // 1. Local window custom event listener
  const handleWindow = (e) => {
    if (!e.detail?.module || e.detail?.module === moduleName) {
      onUpdate(e.detail?.data);
    }
  };
  window.addEventListener('bgst_content_updated', handleWindow);

  // 2. Cross-tab Broadcast Channel listener (instant multi-tab synchronization)
  let syncChannel = null;
  const handleSyncChannel = (event) => {
    if (event.data && (!moduleName || event.data.module === moduleName)) {
      onUpdate(event.data.data);
    }
  };
  try {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      syncChannel = new BroadcastChannel('bgst_content_sync');
      syncChannel.addEventListener('message', handleSyncChannel);
    }
  } catch {
    // ignore
  }

  // 3. Real-Time WebSocket Listener (millisecond synchronization across all ports)
  const unsubscribeWs = subscribeToWebSocket(moduleName, (freshData) => {
    console.log(`[useContent] Real-Time WebSocket event for "${moduleName}" received! Updating UI...`);
    onUpdate(freshData);
  });

  return () => {
    window.removeEventListener('bgst_content_updated', handleWindow);
    if (syncChannel) {
      syncChannel.removeEventListener('message', handleSyncChannel);
      syncChannel.close();
    }
    unsubscribeWs();
  };
}

// 1. Site Settings Hook
export function useSiteSettings() {
  const [settings, setSettings] = useState(DEFAULT_SITE_SETTINGS);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async (freshData) => {
    if (freshData && typeof freshData === 'object' && freshData.site_name) {
      setSettings(freshData);
      setLoading(false);
      return;
    }
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
    return subscribeToUpdates('site_settings', (fresh) => reload(fresh));
  }, [reload]);

  return { settings, loading, reload };
}

// 2. Home Page Hook (Hero, Clock, Why Choose Us, CTA)
export function useHomePage() {
  const [home, setHome] = useState(DEFAULT_HOME_PAGE);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async (freshData) => {
    if (freshData && typeof freshData === 'object' && freshData.hero) {
      setHome(freshData);
      setLoading(false);
      return;
    }
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
    return subscribeToUpdates('home_page', (fresh) => reload(fresh));
  }, [reload]);

  return { home, loading, reload };
}

// 3. Menus Hook
export function useMenus() {
  const [menus, setMenus] = useState(DEFAULT_MENUS);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async (freshData) => {
    if (Array.isArray(freshData)) {
      setMenus(freshData);
      setLoading(false);
      return;
    }
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
    return subscribeToUpdates('menus', (fresh) => reload(fresh));
  }, [reload]);

  return { menus, loading, reload };
}

// 4. Page Sections Hook (About & Custom Sections)
export function usePageSections(pageSlug = 'about') {
  const [sections, setSections] = useState(DEFAULT_PAGE_SECTIONS);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async (freshData) => {
    if (freshData && typeof freshData === 'object' && Object.keys(freshData).length) {
      setSections(freshData);
      setLoading(false);
      return;
    }
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
    return subscribeToUpdates('page_sections', (fresh) => reload(fresh));
  }, [reload]);

  return { sections, loading, reload };
}

// 5. Services Hook
export function useServices() {
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async (freshData) => {
    if (Array.isArray(freshData)) {
      setServices(freshData);
      setLoading(false);
      return;
    }
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
    return subscribeToUpdates('services', (fresh) => reload(fresh));
  }, [reload]);

  return { services, loading, reload };
}

// 6. Projects Hook
export function useProjects() {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async (freshData) => {
    if (Array.isArray(freshData)) {
      setProjects(freshData);
      setLoading(false);
      return;
    }
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
    return subscribeToUpdates('projects', (fresh) => reload(fresh));
  }, [reload]);

  return { projects, loading, reload };
}

// 7. Testimonials Hook
export function useTestimonials() {
  const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async (freshData) => {
    if (Array.isArray(freshData)) {
      setTestimonials(freshData);
      setLoading(false);
      return;
    }
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
    return subscribeToUpdates('testimonials', (fresh) => reload(fresh));
  }, [reload]);

  return { testimonials, loading, reload };
}

// 8. Clients Hook
export function useClients() {
  const [clients, setClients] = useState(DEFAULT_CLIENTS);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async (freshData) => {
    if (Array.isArray(freshData)) {
      setClients(freshData);
      setLoading(false);
      return;
    }
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
    return subscribeToUpdates('clients', (fresh) => reload(fresh));
  }, [reload]);

  return { clients, loading, reload };
}

// 9. Team Members Hook
export function useTeamMembers() {
  const [team, setTeam] = useState(DEFAULT_TEAM_MEMBERS);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async (freshData) => {
    if (Array.isArray(freshData)) {
      setTeam(freshData);
      setLoading(false);
      return;
    }
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
    return subscribeToUpdates('team_members', (fresh) => reload(fresh));
  }, [reload]);

  return { team, loading, reload };
}

// 10. SEO Metadata Hook
export function useSeoMetadata(pagePath = '/') {
  const [seo, setSeo] = useState(null);

  const reload = useCallback(async (freshData) => {
    if (freshData && typeof freshData === 'object') {
      setSeo(freshData);
      return;
    }
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
    return subscribeToUpdates('seo_metadata', (fresh) => reload(fresh));
  }, [reload]);

  return seo;
}

export const useSeo = useSeoMetadata;

// 11. IT Staffing Hook
export function useITStaffing() {
  const [data, setData] = useState(DEFAULT_IT_STAFFING);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async (freshData) => {
    if (freshData && typeof freshData === 'object' && ('headline' in freshData || 'badge' in freshData)) {
      setData(freshData);
      setLoading(false);
      return;
    }
    try {
      const res = await getITStaffing();
      if (res && typeof res === 'object') setData(res);
    } catch {
      // keep fallback
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
    return subscribeToUpdates('it_staffing', (fresh) => reload(fresh));
  }, [reload]);

  return { staffingData: data, loading, reload };
}

// 12. E-Commerce Platform Hook
export function useEcommerce() {
  const [data, setData] = useState(DEFAULT_ECOMMERCE);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async (freshData) => {
    if (freshData && typeof freshData === 'object' && ('title' in freshData || 'badge' in freshData)) {
      setData(freshData);
      setLoading(false);
      return;
    }
    try {
      const res = await getEcommerce();
      if (res && typeof res === 'object') setData(res);
    } catch {
      // keep fallback
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
    return subscribeToUpdates('ecommerce_page', (fresh) => reload(fresh));
  }, [reload]);

  return { ecommerceData: data, loading, reload };
}

// 13. Partnership & Alliances Hook
export function usePartnership() {
  const [data, setData] = useState(DEFAULT_PARTNERSHIP);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async (freshData) => {
    if (freshData && typeof freshData === 'object' && ('heroTitle' in freshData || 'heroBadge' in freshData)) {
      setData(freshData);
      setLoading(false);
      return;
    }
    try {
      const res = await getPartnership();
      if (res && typeof res === 'object') setData(res);
    } catch {
      // keep fallback
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
    return subscribeToUpdates('partnership_page', (fresh) => reload(fresh));
  }, [reload]);

  return { partnershipData: data, loading, reload };
}

// 14. Contact Page Hook
export function useContactPage() {
  const [data, setData] = useState(DEFAULT_CONTACT_PAGE);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async (freshData) => {
    if (freshData && typeof freshData === 'object' && ('heroTitle' in freshData || 'heroBadge' in freshData)) {
      setData(freshData);
      setLoading(false);
      return;
    }
    try {
      const res = await getContactPage();
      if (res && typeof res === 'object') setData(res);
    } catch {
      // keep fallback
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
    return subscribeToUpdates('contact_page', (fresh) => reload(fresh));
  }, [reload]);

  return { contactData: data, loading, reload };
}

// 15. Clients Page Hook
export function useClientsPage() {
  const [data, setData] = useState(DEFAULT_CLIENTS_PAGE);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async (freshData) => {
    if (freshData && typeof freshData === 'object' && ('heroTitle' in freshData || 'metrics' in freshData)) {
      setData(freshData);
      setLoading(false);
      return;
    }
    try {
      const res = await getClientsPage();
      if (res && typeof res === 'object') setData(res);
    } catch {
      // keep fallback
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
    return subscribeToUpdates('clients_page', (fresh) => reload(fresh));
  }, [reload]);

  return { clientsPageData: data, loading, reload };
}

// 16. Proprietary Turnkey Products Hook
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async (freshData) => {
    if (Array.isArray(freshData)) {
      setProducts(freshData);
      setLoading(false);
      return;
    }
    try {
      const data = await getProducts();
      if (data && data.length) setProducts(data);
    } catch {
      // keep fallback
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
    return subscribeToUpdates('products', (fresh) => reload(fresh));
  }, [reload]);

  return { products, loading, reload };
}

// 17. Business Partners Hook
export function useBusinessPartners() {
  const [partners, setPartners] = useState({ product_partners: [], service_partners: [] });
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async (freshData) => {
    if (freshData && typeof freshData === 'object' && ('title' in freshData || 'product_partners' in freshData || 'product_intro' in freshData)) {
      setPartners(freshData);
      setLoading(false);
      return;
    }
    try {
      const res = await getBusinessPartners();
      if (res && typeof res === 'object') setPartners(res);
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
    return subscribeToUpdates('business_partners', (fresh) => reload(fresh));
  }, [reload]);

  return { partners, loading, reload };
}

// 18. Services Page Hook
export function useServicesPage() {
  const [data, setData] = useState(DEFAULT_SERVICES_PAGE);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async (freshData) => {
    if (freshData && typeof freshData === 'object' && ('title' in freshData || 'group_services' in freshData)) {
      setData(freshData);
      setLoading(false);
      return;
    }
    try {
      const res = await getServicesPage();
      if (res && typeof res === 'object') {
        setData(res);
      }
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
    return subscribeToUpdates('services_page', (fresh) => reload(fresh));
  }, [reload]);

  return { servicesPageData: data, loading, reload };
}

// 19. Softech Services Page Hook
export function useSoftechPage() {
  const [data, setData] = useState(DEFAULT_SOFTECH_PAGE);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async (freshData) => {
    if (freshData && typeof freshData === 'object' && freshData.title) {
      setData(freshData);
      setLoading(false);
      return;
    }
    try {
      const res = await getSoftechPage();
      if (res && res.title) setData(res);
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
    return subscribeToUpdates('softech_page', (fresh) => reload(fresh));
  }, [reload]);

  return { softechPageData: data, loading, reload };
}

// 20. Products Showcase Page Hook
export function useProductsPage() {
  const [data, setData] = useState(DEFAULT_PRODUCTS_PAGE);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async (freshData) => {
    if (freshData && typeof freshData === 'object' && ('title' in freshData || 'badge' in freshData)) {
      setData(freshData);
      setLoading(false);
      return;
    }
    try {
      const res = await getProductsPage();
      if (res && typeof res === 'object') setData(res);
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
    return subscribeToUpdates('products_page', (fresh) => reload(fresh));
  }, [reload]);

  return { productsPageData: data, loading, reload };
}

