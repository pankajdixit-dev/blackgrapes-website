-- ==============================================================================
-- BLACK GRAPES SOFTECH - SUPABASE POSTGRESQL PRODUCTION DATABASE SCHEMA
-- Generated for full dynamic CMS, Admin Panel, and existing website integration
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- Helper Function: update timestamp trigger
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ------------------------------------------------------------------------------
-- 1. SITE SETTINGS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_name VARCHAR(255) NOT NULL DEFAULT 'Black Grapes Softech Pvt. Ltd.',
    tagline TEXT DEFAULT 'Empowering Enterprises Worldwide with Next-Gen Tech',
    logo_url TEXT DEFAULT '/src/assets/bgst-logo.png',
    favicon_url TEXT DEFAULT '/favicon.svg',
    primary_email VARCHAR(255) DEFAULT 'info@blackgrapessoftech.com',
    support_email VARCHAR(255) DEFAULT 'support@blackgrapessoftech.com',
    primary_phone VARCHAR(50) DEFAULT '+91 7470997884',
    secondary_phone VARCHAR(50) DEFAULT '+91 6262414463',
    office_address TEXT DEFAULT '252-F/H Scheme No 54, Vijaynagar, Indore - 452010, Madhya Pradesh, India',
    top_strip_text TEXT DEFAULT 'Empowering Enterprises Worldwide with Next-Gen Tech',
    top_strip_enabled BOOLEAN DEFAULT true,
    social_linkedin TEXT DEFAULT 'https://www.linkedin.com/in/black-grapes-softech/',
    social_twitter TEXT DEFAULT 'https://twitter.com/grapessoftech',
    social_instagram TEXT DEFAULT 'https://www.instagram.com/blackgrapessoftech/',
    social_youtube TEXT DEFAULT 'https://www.youtube.com/channel/UC3gJA06Uxb0D82-PVJl0SbQ',
    footer_about_text TEXT DEFAULT 'We are an innovative IT solutions & custom software development company based in Indore, India. Empowering businesses across the globe with robust, scalable, and tailored digital products.',
    footer_trust_badge TEXT DEFAULT 'ISO & Quality Assured Development Standards',
    copyright_text TEXT DEFAULT '© 2026 Black Grapes Softech Pvt. Ltd. All rights reserved.',
    maintenance_mode BOOLEAN DEFAULT false,
    google_analytics_id VARCHAR(100) DEFAULT '',
    custom_head_scripts TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON site_settings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 2. MENUS / NAVIGATION TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS menus (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    label VARCHAR(100) NOT NULL,
    path VARCHAR(255) NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    is_external BOOLEAN DEFAULT false,
    parent_id UUID REFERENCES menus(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_menus_updated_at
BEFORE UPDATE ON menus
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 3. PAGES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    meta_title VARCHAR(255),
    meta_description TEXT,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_pages_updated_at
BEFORE UPDATE ON pages
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 4. PAGE SECTIONS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS page_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
    section_key VARCHAR(100) NOT NULL,
    section_name VARCHAR(255) NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    is_visible BOOLEAN DEFAULT true,
    content_draft JSONB DEFAULT '{}'::jsonb,
    content_published JSONB DEFAULT '{}'::jsonb,
    has_unpublished_changes BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_page_section_unique ON page_sections(page_id, section_key);

CREATE TRIGGER update_page_sections_updated_at
BEFORE UPDATE ON page_sections
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 5. SERVICES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE,
    short_desc TEXT,
    full_desc TEXT,
    icon_name VARCHAR(100) DEFAULT 'Layers',
    category VARCHAR(100) DEFAULT 'General',
    tech_stack JSONB DEFAULT '[]'::jsonb,
    features JSONB DEFAULT '[]'::jsonb,
    order_index INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'published', -- 'published', 'draft'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON services
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 6. PROJECTS & PROPRIETARY PRODUCTS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_key VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    category VARCHAR(100) NOT NULL,
    industry VARCHAR(100) NOT NULL,
    badge VARCHAR(100),
    badge_color VARCHAR(50) DEFAULT 'orange',
    youtube_id VARCHAR(50),
    deployment_days VARCHAR(100) DEFAULT '3 - 5 Days',
    rating VARCHAR(100) DEFAULT '4.9/5',
    summary TEXT,
    key_features JSONB DEFAULT '[]'::jsonb,
    tech_stack JSONB DEFAULT '[]'::jsonb,
    highlights JSONB DEFAULT '[]'::jsonb,
    image_url TEXT,
    order_index INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 7. PROJECT IMAGES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS project_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption TEXT,
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 8. CLIENTS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_key VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    industry VARCHAR(100) NOT NULL,
    region VARCHAR(100) DEFAULT 'Global',
    logo_url TEXT NOT NULL,
    badge VARCHAR(100) DEFAULT 'Verified Partner',
    badge_color VARCHAR(50) DEFAULT 'purple',
    services TEXT,
    impact TEXT,
    order_index INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_clients_updated_at
BEFORE UPDATE ON clients
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 9. CASE STUDIES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS case_studies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name VARCHAR(255) NOT NULL,
    industry VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    metrics JSONB DEFAULT '[]'::jsonb,
    tech_stack JSONB DEFAULT '[]'::jsonb,
    order_index INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 10. TEAM MEMBERS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    bio TEXT,
    photo_url TEXT,
    linkedin_url TEXT,
    twitter_url TEXT,
    badge_tag VARCHAR(100),
    order_index INT DEFAULT 0,
    is_leadership BOOLEAN DEFAULT false,
    status VARCHAR(50) DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_team_members_updated_at
BEFORE UPDATE ON team_members
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 11. TESTIMONIALS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote TEXT NOT NULL,
    author VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    company VARCHAR(255),
    country VARCHAR(100),
    avatar_url TEXT,
    rating INT DEFAULT 5,
    order_index INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_testimonials_updated_at
BEFORE UPDATE ON testimonials
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 12. BLOG CATEGORIES & BLOG POSTS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS blog_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    category_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL,
    cover_image TEXT,
    author_name VARCHAR(100) DEFAULT 'Black Grapes Engineering Team',
    read_time VARCHAR(50) DEFAULT '5 min read',
    tags JSONB DEFAULT '[]'::jsonb,
    status VARCHAR(50) DEFAULT 'draft',
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON blog_posts
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 13. ENQUIRIES TABLE (Leads & Demo Requests)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(100),
    requirement VARCHAR(255),
    message TEXT,
    source_page VARCHAR(255) DEFAULT 'Demo Modal',
    status VARCHAR(50) DEFAULT 'new', -- 'new', 'contacted', 'in_progress', 'converted', 'closed'
    admin_notes TEXT DEFAULT '',
    ip_address VARCHAR(100),
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_enquiries_updated_at
BEFORE UPDATE ON enquiries
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 14. MEDIA LIBRARY TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    file_type VARCHAR(100),
    file_size INT,
    width INT,
    height INT,
    alt_text VARCHAR(255),
    caption TEXT,
    storage_path TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 15. SEO METADATA TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS seo_metadata (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_route VARCHAR(255) UNIQUE NOT NULL,
    meta_title VARCHAR(255) NOT NULL,
    meta_description TEXT NOT NULL,
    meta_keywords TEXT,
    og_title VARCHAR(255),
    og_description TEXT,
    og_image TEXT,
    canonical_url VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_seo_metadata_updated_at
BEFORE UPDATE ON seo_metadata
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 16. ADMIN USERS & ROLES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'editor', -- 'super_admin', 'admin', 'editor'
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_admin_users_updated_at
BEFORE UPDATE ON admin_users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 17. ACTIVITY LOGS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_email VARCHAR(255) NOT NULL,
    action VARCHAR(100) NOT NULL, -- 'create', 'update', 'delete', 'publish', 'login'
    module VARCHAR(100) NOT NULL, -- 'projects', 'clients', 'pages', 'settings', etc.
    record_id VARCHAR(255),
    description TEXT NOT NULL,
    changes JSONB DEFAULT '{}'::jsonb,
    ip_address VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 18. CONTENT REVISIONS TABLE (History & Rollback)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS content_revisions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_id UUID REFERENCES page_sections(id) ON DELETE CASCADE,
    version_number INT NOT NULL,
    content_snapshot JSONB NOT NULL,
    published_by VARCHAR(255),
    note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_revisions ENABLE ROW LEVEL SECURITY;

-- 1. PUBLIC READ POLICIES (for public website)
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read menus" ON menus FOR SELECT USING (is_active = true);
CREATE POLICY "Public read pages" ON pages FOR SELECT USING (is_published = true);
CREATE POLICY "Public read page_sections" ON page_sections FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read published services" ON services FOR SELECT USING (status = 'published');
CREATE POLICY "Public read published projects" ON projects FOR SELECT USING (status = 'published');
CREATE POLICY "Public read project_images" ON project_images FOR SELECT USING (true);
CREATE POLICY "Public read published clients" ON clients FOR SELECT USING (status = 'published');
CREATE POLICY "Public read published case_studies" ON case_studies FOR SELECT USING (status = 'published');
CREATE POLICY "Public read published team_members" ON team_members FOR SELECT USING (status = 'published');
CREATE POLICY "Public read published testimonials" ON testimonials FOR SELECT USING (status = 'published');
CREATE POLICY "Public read blog_categories" ON blog_categories FOR SELECT USING (true);
CREATE POLICY "Public read published blog_posts" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Public read media" ON media FOR SELECT USING (true);
CREATE POLICY "Public read seo_metadata" ON seo_metadata FOR SELECT USING (true);

-- 2. PUBLIC INSERT ENQUIRIES (for DemoModal and Contact form submissions)
CREATE POLICY "Public insert enquiries" ON enquiries FOR INSERT WITH CHECK (true);

-- 3. AUTHENTICATED / ADMIN FULL ACCESS POLICIES
CREATE POLICY "Admin all site_settings" ON site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all menus" ON menus FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all pages" ON pages FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all page_sections" ON page_sections FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all services" ON services FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all projects" ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all project_images" ON project_images FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all clients" ON clients FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all case_studies" ON case_studies FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all team_members" ON team_members FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all testimonials" ON testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all blog_categories" ON blog_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all blog_posts" ON blog_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all enquiries" ON enquiries FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all media" ON media FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all seo_metadata" ON seo_metadata FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all admin_users" ON admin_users FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all activity_logs" ON activity_logs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all content_revisions" ON content_revisions FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ==============================================================================
-- STORAGE BUCKET CONFIGURATION (for Supabase Storage)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access to media bucket" ON storage.objects
FOR SELECT USING (bucket_id = 'media');

CREATE POLICY "Admin Upload to media bucket" ON storage.objects
FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media');

CREATE POLICY "Admin Delete from media bucket" ON storage.objects
FOR DELETE TO authenticated USING (bucket_id = 'media');

