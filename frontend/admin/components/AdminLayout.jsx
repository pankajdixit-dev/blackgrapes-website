import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Home,
  Info,
  Layers,
  Package,
  Users,
  MessageSquareQuote,
  BookOpen,
  MapPin,
  Menu as MenuIcon,
  X,
  Sliders,
  Image as ImageIcon,
  Search,
  Inbox,
  Settings,
  ShieldCheck,
  History,
  LogOut,
  ExternalLink,
  ChevronRight,
  Database,
  Radio
} from 'lucide-react';
import { getCurrentSession, logoutAdmin } from '@backend/authService';
import { checkSupabaseHealth } from '@backend/supabaseClient';
import { getEnquiries } from '@backend/dataService';
import logoImg from '@assets/bgst-logo.png';
import '../admin.css';

export default function AdminLayout() {
  const [session, setSession] = useState(getCurrentSession());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dbStatus, setDbStatus] = useState({ connected: false, mode: 'checking', message: 'Checking connection...' });
  const [newEnquiriesCount, setNewEnquiriesCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check Auth
    const current = getCurrentSession();
    if (!current) {
      navigate('/admin/login', { replace: true });
      return;
    }
    setSession(current);

    // Check DB Status
    checkSupabaseHealth().then((res) => {
      setDbStatus(res);
    });

    // Load unread enquiries count
    getEnquiries().then((items) => {
      const unread = items.filter((e) => e.status === 'new').length;
      setNewEnquiriesCount(unread);
    });

    // Listen for enquiry updates
    const handleUpdate = () => {
      getEnquiries().then((items) => {
        setNewEnquiriesCount(items.filter((e) => e.status === 'new').length);
      });
    };
    window.addEventListener('bgst_content_updated', handleUpdate);
    return () => window.removeEventListener('bgst_content_updated', handleUpdate);
  }, [navigate]);

  const handleLogout = async () => {
    await logoutAdmin();
    navigate('/admin/login', { replace: true });
  };

  const navGroups = [
    {
      group: 'Overview',
      items: [
        { label: 'Dashboard', path: '/admin', icon: LayoutDashboard }
      ]
    },
    {
      group: 'Page Content',
      items: [
        { label: 'Home Page', path: '/admin/home', icon: Home },
        { label: 'About Us Page', path: '/admin/about', icon: Info },
        { label: 'Services', path: '/admin/services', icon: Layers },
        { label: 'Projects / Products', path: '/admin/projects', icon: Package },
        { label: 'Leadership & Team', path: '/admin/team', icon: Users },
        { label: 'Client Testimonials', path: '/admin/testimonials', icon: MessageSquareQuote },
        { label: 'Blog & Insights', path: '/admin/blog', icon: BookOpen }
      ]
    },
    {
      group: 'Site Structure',
      items: [
        { label: 'Header & Banner', path: '/admin/header', icon: Sliders },
        { label: 'Footer & Links', path: '/admin/footer', icon: Sliders },
        { label: 'Navigation Menus', path: '/admin/menus', icon: MenuIcon },
        { label: 'Contact Coordinates', path: '/admin/contact', icon: MapPin }
      ]
    },
    {
      group: 'Operations & Media',
      items: [
        { label: 'Media Library', path: '/admin/media', icon: ImageIcon },
        { label: 'SEO Management', path: '/admin/seo', icon: Search },
        { label: 'Enquiries & Leads', path: '/admin/enquiries', icon: Inbox, badge: newEnquiriesCount }
      ]
    },
    {
      group: 'Settings & Security',
      items: [
        { label: 'Website Settings', path: '/admin/settings', icon: Settings },
        { label: 'Admin Users & Roles', path: '/admin/users', icon: ShieldCheck },
        { label: 'Activity Audit Logs', path: '/admin/logs', icon: History }
      ]
    }
  ];

  return (
    <div className="admin-shell">
      {/* Sidebar Navigation */}
      <aside className={`admin-sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <Link to="/admin" className="admin-brand">
            <img src={logoImg} alt="Black Grapes Softech" className="admin-logo-img" />
            <div>
              <span className="admin-brand-title">BLACK <span>GRAPES</span></span>
              <span className="admin-brand-badge">CONTROL PANEL</span>
            </div>
          </Link>
          <button className="admin-mobile-toggle" onClick={() => setMobileOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="admin-sidebar-nav">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="admin-nav-group">
              <div className="admin-nav-group-title">{group.group}</div>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.path === '/admin'
                    ? location.pathname === '/admin'
                    : location.pathname.startsWith(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`admin-nav-link ${isActive ? 'active' : ''}`}
                  >
                    <div className="admin-nav-link-left">
                      <Icon size={17} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge > 0 ? (
                      <span className="nav-badge-pill">{item.badge}</span>
                    ) : (
                      <ChevronRight size={14} style={{ opacity: 0.4 }} />
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Admin Area */}
      <div className="admin-main">
        {/* Top Header */}
        <header className="admin-header">
          <div className="admin-header-left">
            <button className="admin-mobile-toggle" onClick={() => setMobileOpen(true)}>
              <MenuIcon size={22} />
            </button>

            {/* Live Database Status Indicator */}
            <div
              className={`connection-pill ${dbStatus.connected ? 'connected' : 'local'}`}
              title={dbStatus.message}
            >
              <span className={`status-dot ${dbStatus.connected ? 'green' : 'yellow'}`}></span>
              <span>
                {dbStatus.connected
                  ? 'MongoDB Atlas (Online)'
                  : 'Local Storage Mode'}
              </span>
            </div>
          </div>

          <div className="admin-header-right">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="btn-header-action"
              title="Open public website in new tab"
            >
              <ExternalLink size={15} />
              <span>View Live Website</span>
            </a>

            <div className="admin-user-pill">
              <div className="user-avatar-circle">
                {(session?.full_name || 'A').charAt(0).toUpperCase()}
              </div>
              <div className="user-meta" style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff' }}>
                  {session?.full_name || session?.email}
                </span>
                <span style={{ fontSize: '0.7rem', color: '#9ca3af', textTransform: 'capitalize' }}>
                  {session?.role || 'Administrator'}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="btn-header-action"
              style={{ color: '#f87171' }}
              title="Log out of admin"
            >
              <LogOut size={15} />
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="admin-page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

