# 🍇 Black Grapes Softech - Complete Dynamic Website Management System

Official Enterprise Website, Dynamic Content Management System, and Lead Generation Platform for **Black Grapes Group** & **Black Grapes Softech**.

> **Tagline:** Innovate, Integrate, Elevate  
> **Headquarters:** Scheme No 54 & Scheme No 114, Vijay Nagar, Indore, Madhya Pradesh  
> **Tech Stack:** React 19, Vite 8, Node.js, Express.js, MongoDB Atlas, JWT, Cloudinary, Axios  

---

## 📌 Features & Architecture Overview

* **Public Web Application:**
  * **Home Page (`/`):** Dynamic Hero banner and quantitative metrics driven via Admin CMS.
  * **Services Hub (`/services`):** Multi-division architecture for Group Companies, Softech IT suite, Staffing, and E-Commerce.
  * **IT Staffing (`/it-staffing`):** Real-time lead capture, volume mandate selection, and dynamic client reviews.
  * **E-Commerce (`/ecommerce`):** Naya Purana Bazaar waitlist and platform preview.
  * **Contact Page (`/contact`):** Dual-office Google Maps embeds, executive phone desk, and ticketed message submission.
  * **Global Proposal Modal:** Instant quotation requests accessible from any page with automated ticket generation (`BG-XXXXXX`).

* **Professional Admin Management Portal (`/admin`):**
  * **Admin Login (`/admin/login`):** Encrypted authentication with JWT and bcryptjs.
  * **Dashboard (`/admin/dashboard`):** Real-time statistics, lead status breakdown, and recent activity monitoring.
  * **Enquiries & Leads (`/admin/enquiries`):** Filter by status (`New`, `In Progress`, `Completed`), search by client name/ticket, view requirements, write internal executive notes, and delete leads.
  * **Services Catalog (`/admin/services`):** Add, edit, upload icons, toggle visibility, and organize deliverables without code changes.
  * **Portfolio Showcase (`/admin/projects`):** Showcase enterprise case studies with category tags and screenshots.
  * **Testimonials (`/admin/testimonials`):** Manage client reviews, designations, and 5-star ratings.
  * **Dynamic Content (`/admin/content`):** Live editor for Hero Banner copy, stats numbers, and official contact phone/addresses.
  * **Settings & Security (`/admin/settings`):** Change administrator password, review security posture.

---

## 🚀 Quick Start Guide (Local Development)

### 1. Requirements
* Node.js v18+ (Tested on Node.js v24)
* MongoDB (Local instance or MongoDB Atlas Connection String)

### 2. Installation
Clone the repository and install dependencies for both frontend and backend:

```bash
# 1. Install Frontend Dependencies (in root)
npm install

# 2. Install Backend Dependencies (in backend)
cd backend
npm install
cd ..
```

### 3. Environment Variables Setup
Copy the example environment configuration:

```bash
cp backend/.env.example backend/.env
```

Ensure your `backend/.env` file has the following:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/blackgrapes
JWT_SECRET=your_super_secure_jwt_secret_key_here
CLIENT_URL=http://localhost:5173
```

### 4. Seed Super Administrator
Create the default Super Admin user in MongoDB:

```bash
npm run seed:admin
```

Default credentials:
* **Email:** `admin@blackgrapessoftech.com`
* **Password:** `BlackGrapes@2026`
*(You can change these in `/admin/settings` after login)*

### 5. Start the Application
Run both servers:

```bash
# Terminal 1: Start Backend API (Port 5000)
npm run server

# Terminal 2: Start Frontend Development Server (Port 5173)
npm run dev
```

* **Public Website:** [http://localhost:5173](http://localhost:5173)
* **Admin Login:** [http://localhost:5173/admin/login](http://localhost:5173/admin/login)
* **Backend API:** [http://localhost:5000/api](http://localhost:5000/api)

---

## 📡 REST API Reference

| Endpoint | Method | Access | Description |
| :--- | :--- | :--- | :--- |
| `/api/auth/login` | `POST` | Public | Authenticates admin and returns JWT |
| `/api/auth/me` | `GET` | Protected | Fetches active admin profile |
| `/api/auth/change-password` | `PUT` | Protected | Updates admin password |
| `/api/dashboard/stats` | `GET` | Protected | Aggregates count of leads, services, projects |
| `/api/contact` | `POST` | Public | Submits lead from website forms |
| `/api/contact` | `GET` | Protected | Retrieves leads with search, filter, pagination |
| `/api/contact/:id` | `PUT` | Protected | Updates lead status & admin notes |
| `/api/contact/:id` | `DELETE`| Protected | Deletes lead record |
| `/api/services` | `GET` | Public | Fetches published services |
| `/api/services` | `POST` | Protected | Creates new service |
| `/api/projects` | `GET` | Public | Fetches portfolio projects |
| `/api/projects` | `POST` | Protected | Adds portfolio project |
| `/api/testimonials` | `GET` | Public | Fetches published testimonials |
| `/api/content/:section` | `GET` | Public | Fetches dynamic section (`hero`, `stats`, `contactInfo`) |
| `/api/content/:section` | `PUT` | Protected | Updates dynamic section |
| `/api/upload` | `POST` | Protected | Uploads media file |

---

## 🌐 Production Deployment Guide

### A. Deploy Frontend to Vercel
1. Push repository to GitHub.
2. Link repository in Vercel Dashboard.
3. Configure **Build Command:** `npm run build`
4. Configure **Output Directory:** `dist`
5. In **Environment Variables**, add:
   * `VITE_API_BASE_URL`: `https://your-backend-service.onrender.com/api`
6. `vercel.json` is already included to support client-side routing on reload.

### B. Deploy Backend to Render
1. Create a new **Web Service** on Render connected to this repository.
2. Configure **Root Directory:** `backend`
3. Configure **Build Command:** `npm install`
4. Configure **Start Command:** `node server.js`
5. Add Environment Variables:
   * `PORT`: `5000`
   * `NODE_ENV`: `production`
   * `MONGO_URI`: `mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/blackgrapes?retryWrites=true&w=majority`
   * `JWT_SECRET`: `<your_long_random_secret>`
   * `CLIENT_URL`: `https://your-vercel-domain.vercel.app`
   * `CLOUDINARY_CLOUD_NAME`: `<your_cloud_name>`
   * `CLOUDINARY_API_KEY`: `<your_api_key>`
   * `CLOUDINARY_API_SECRET`: `<your_api_secret>`
