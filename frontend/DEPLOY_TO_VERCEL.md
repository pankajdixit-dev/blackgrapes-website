# Deploying Black Grapes Softech Website on Vercel

### Option 1: Deploy entire repo on Vercel (Recommended)
1. Push your repository to GitHub / GitLab / Bitbucket.
2. In Vercel, click **"Add New Project"** and select this repository.
3. In the **Project Settings**:
   - **Root Directory**: Click "Edit" and select `frontend` (or leave as root, root `vercel.json` will handle it automatically).
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**!

### Option 2: Deploy only the frontend folder via Vercel CLI
```bash
cd frontend
npx vercel
```

### Routing / SPA Fix:
`vercel.json` has already been configured with SPA rewrites to ensure paths like `/about-us`, `/services`, `/our-products`, `/partnership`, etc. never show 404 on refresh!
