# Black Grapes Softech - MongoDB & Node.js Backend REST API

This is the official Node.js, Express, and MongoDB backend for **Black Grapes Softech**. It provides scalable REST APIs for lead generation, contact submissions, service catalogs, project case studies, client reviews, team profiles, and the comprehensive 18-module Admin Panel.

---

## 🚀 Quick Start Guide

### 1. Configure MongoDB Cluster URL
Open the `.env` file in the project root (or inside `/backend/.env`) and paste your MongoDB Atlas Cluster connection string:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/blackgrapes?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=blackgrapes_super_secure_jwt_secret_key_2026
```

> **Note on MongoDB Atlas**: In your MongoDB Atlas dashboard, ensure your IP address is whitelisted under **Network Access** (or set to `0.0.0.0/0` for universal cloud access), and your database user has read/write privileges.

---

### 2. Run the Backend Server

From the root project directory, run:
```bash
npm run server
```

Or from the `backend/` folder:
```bash
cd backend
npm start
```

Your server will start on `http://localhost:5000/api`.

---

### 3. Database Auto-Seeding

When the backend connects to your MongoDB cluster for the first time, it automatically creates:
1. **Default Superadmin User**:
   - **Email**: `admin@blackgrapessoftech.com`
   - **Password**: `Admin@12345`
   - **Role**: `superadmin`
2. **Initial 6 Enterprise Services** of Black Grapes Softech
3. **Official Site Settings** (phones, emails, addresses, social links)

You can also manually re-seed by running:
```bash
npm run seed
```

---

## 📡 Complete REST API Endpoints

### 🩺 Health & System Diagnostics
- `GET /api/health` — Returns server uptime and real-time MongoDB cluster connection state.

### 🔐 Authentication & Admin Users
- `POST /api/auth/login` — Authenticate admin and receive JWT token.
- `GET /api/auth/me` — Get current logged-in admin profile (Protected).
- `PUT /api/auth/profile` — Update admin name and email (Protected).
- `PUT /api/auth/change-password` — Change password with current password verification (Protected).
- `GET /api/auth/users` — List all registered admin accounts (Superadmin).
- `POST /api/auth/users` — Register a new admin account (Superadmin).
- `PUT /api/auth/users/:id` — Update admin roles (`superadmin`, `admin`, `editor`) (Superadmin).
- `DELETE /api/auth/users/:id` — Remove an admin account (Superadmin).

### 📨 Enquiries & Leads (Website Submissions)
- `POST /api/enquiries` — Public endpoint for Contact Form, Demo Requests, Quote CTAs.
- `GET /api/enquiries` — List enquiries with search, status filter (`New`, `Contacted`, `In Progress`, `Resolved`, `Closed`), and pagination (Protected).
- `GET /api/enquiries/stats` — Metrics overview of total and pending leads (Protected).
- `GET /api/enquiries/:id` — View specific inquiry details (Protected).
- `PUT /api/enquiries/:id` — Update lead status and internal admin notes (Protected).
- `DELETE /api/enquiries/:id` — Delete lead record (Protected).

### 💻 Services Management
- `GET /api/services` — Public catalog of all services.
- `GET /api/services/:slug` — Get single service details.
- `POST /api/services` — Create new service (Protected).
- `PUT /api/services/:id` — Update service (Protected).
- `DELETE /api/services/:id` — Delete service (Protected).

### 🏆 Projects & Case Studies
- `GET /api/projects` — Public project portfolio.
- `POST /api/projects` — Create project (Protected).
- `PUT /api/projects/:id` — Update project (Protected).
- `DELETE /api/projects/:id` — Delete project (Protected).

### ⭐ Client Testimonials
- `GET /api/testimonials` — Public client reviews.
- `POST /api/testimonials` — Add testimonial (Protected).
- `PUT /api/testimonials/:id` — Update testimonial (Protected).
- `DELETE /api/testimonials/:id` — Remove testimonial (Protected).

### 👥 Team Members
- `GET /api/team` — Public leadership and engineering team.
- `POST /api/team` — Add team member (Protected).
- `PUT /api/team/:id` — Update team member (Protected).
- `DELETE /api/team/:id` — Delete team member (Protected).

### 📝 Blogs & Insights
- `GET /api/blogs` — Public published blog articles.
- `GET /api/blogs/:slug` — Single article reader.
- `POST /api/blogs` — Publish new article (Protected).
- `PUT /api/blogs/:id` — Edit article (Protected).
- `DELETE /api/blogs/:id` — Delete article (Protected).

### ⚙️ Site Settings
- `GET /api/settings` — Public global contact numbers, emails, addresses, social links, SEO tags.
- `PUT /api/settings` — Update site settings (Protected).

### 📜 Activity Logs
- `GET /api/logs` — Audit log of all admin operations (Protected).

### 🖼️ Media Library
- `GET /api/media` — List uploaded assets.
- `POST /api/media/upload` — Upload image file via `multipart/form-data` (`file` key) (Protected).
- `DELETE /api/media/:id` — Delete media asset (Protected).
