# Zorath Planet — Free Cloud Deployment Guide

This guide provides step-by-step instructions to deploy the **Zorath Planet** web application for **100% free** with global edge CDN, custom domain support, and automated HTTPS certificates.

---

## Pre-Requisites & Project Optimization Status

The project has already been optimized for instant cloud deployment:
- **Total Repository Size**: Reduced from **~2.7 GB** down to **~107 MB**.
- **Video Bitrates**: Compressed using H.264 CRF 25 + faststart metadata for instantaneous browser streaming without buffering.
- **`.gitignore` Configured**: Ensures `node_modules/` and local build caches are not uploaded.

---

## Option 1: Deploy to Vercel (Recommended — Fastest & Easiest)

Vercel provides free static site hosting with instant deployment and global edge network.

### Step 1: Push your project to GitHub
1. Open terminal in the project directory:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Zorath Planet optimized build"
   ```
2. Create a new repository on [GitHub](https://github.com/new).
3. Link and push your repository:
   ```bash
   git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Import into Vercel
1. Go to [vercel.com](https://vercel.com) and sign up/log in with your GitHub account.
2. Click **"Add New..."** > **"Project"**.
3. Select your `zorath-planet` repository from the list.
4. Vercel will automatically detect **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"**.
6. Within ~30 seconds, your site will be live with a free `*.vercel.app` URL and free SSL!

---

## Option 2: Deploy to Netlify (Drag-and-Drop or Git)

Netlify is another excellent free platform for static React/Vite applications.

### Method A: Git Integration (Auto-deploys on every push)
1. Go to [netlify.com](https://www.netlify.com) and sign in.
2. Click **"Add new site"** > **"Import an existing project"**.
3. Choose **GitHub** and select your `zorath-planet` repository.
4. Set the build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **"Deploy site"**.

### Method B: Instant Manual Drag-and-Drop (No Git required)
1. Run local build:
   ```bash
   npm run build
   ```
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the generated `dist` folder directly onto the page.
4. Your site will immediately go live!

---

## Option 3: Deploy to Cloudflare Pages (Unlimited Bandwidth)

Cloudflare Pages offers unlimited free bandwidth and lightning-fast edge delivery.

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) and log in.
2. Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your GitHub repository.
4. Configure Build settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click **"Save and Deploy"**.

---

## Option 4: Deploy to GitHub Pages (100% Free inside GitHub)

To host directly on GitHub Pages using GitHub Actions:

1. In your project, check `vite.config.js` and set the base path if hosting on a subpath (e.g. `https://<username>.github.io/<repo>/`):
   ```js
   export default defineConfig({
     base: './', // relative base path works everywhere
     plugins: [react()],
   })
   ```
2. Go to your GitHub repository **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, choose **GitHub Actions**.
4. GitHub will automatically run the Vite build and publish the site to your free GitHub Pages URL.

---

## Summary of Free Hosting Limits & Compatibility

| Provider | Free Bandwidth | Max File Size | Deploy Speed | Custom Domain |
| :--- | :--- | :--- | :--- | :--- |
| **Vercel** | 100 GB / month | 100 MB | ~30 seconds | Free + SSL |
| **Netlify** | 100 GB / month | 100 MB | ~45 seconds | Free + SSL |
| **Cloudflare Pages** | **Unlimited** | 25 MB (our max file is 25.4MB) | ~35 seconds | Free + SSL |
| **GitHub Pages** | 100 GB / month | 100 MB | ~60 seconds | Free + SSL |
