# Render Deployment Guide for MERN Stack Application

## Overview
This guide will help you deploy your fullstack MERN application to Render, which includes:
- **Backend**: Node.js/Express API with MongoDB
- **Frontend**: React application
- **Database**: MongoDB Atlas (cloud database)

## Prerequisites
1. GitHub account with your project repository
2. Render account (free at render.com)
3. MongoDB Atlas account (free at mongodb.com/atlas)

---

## Step 1: Prepare MongoDB Atlas Database

### 1.1 Create MongoDB Atlas Cluster
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up/login and create a new project
3. Create a new cluster (choose the free M0 tier)
4. Wait for the cluster to be created (2-3 minutes)

### 1.2 Configure Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a user with username/password authentication
4. Set permissions to "Read and write to any database"
5. **Important**: Save the username and password - you'll need them later

### 1.3 Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Confirm the change

### 1.4 Get Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string (it looks like: `mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)
5. Replace `<password>` with your actual password

---

## Step 2: Deploy Backend to Render

### 2.1 Create Web Service for Backend
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select your repository and branch (usually `main`)

### 2.2 Configure Backend Service
Fill in the following settings:

**Basic Settings:**
- **Name**: `your-app-backend` (choose any name)
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`

**Build & Deploy:**
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Advanced Settings:**
- **Auto-Deploy**: Yes (recommended)

### 2.3 Set Environment Variables
In the "Environment" section, add:
- **Key**: `MONGO_URI`
- **Value**: Your MongoDB Atlas connection string (from Step 1.4)
- **Key**: `NODE_ENV`
- **Value**: `production`

### 2.4 Deploy Backend
1. Click "Create Web Service"
2. Wait for deployment to complete (5-10 minutes)
3. Your backend will be available at: `https://your-app-backend.onrender.com`
4. **Important**: Copy this URL - you'll need it for the frontend

### 2.5 Seed the Database
After backend deployment:
1. Go to your service dashboard
2. Click "Shell" tab
3. Run: `node seed.js`
4. This will populate your database with states and cities data

---

## Step 3: Deploy Frontend to Render

### 3.1 Create Static Site for Frontend
1. In Render Dashboard, click "New +" → "Static Site"
2. Connect your GitHub repository
3. Select your repository and branch

### 3.2 Configure Frontend Service
Fill in the following settings:

**Basic Settings:**
- **Name**: `your-app-frontend` (choose any name)
- **Branch**: `main`
- **Root Directory**: `frontend`

**Build & Deploy:**
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `build`

### 3.3 Set Environment Variables
In the "Environment" section, add:
- **Key**: `REACT_APP_API_URL`
- **Value**: `https://your-app-backend.onrender.com/api` (use the backend URL from Step 2.4)

### 3.4 Deploy Frontend
1. Click "Create Static Site"
2. Wait for deployment to complete (5-10 minutes)
3. Your frontend will be available at: `https://your-app-frontend.onrender.com`

---

## Step 4: Update CORS Settings (Important!)

### 4.1 Update Backend CORS Configuration
Since your frontend is now on a different domain, you need to update CORS settings:

1. In your `backend/server.js`, update the CORS configuration:

```javascript
// Updated CORS configuration for production
app.use(cors({
  origin: [
    'http://localhost:3000', // for local development
    'https://your-app-frontend.onrender.com' // replace with your actual frontend URL
  ],
  credentials: true
}));
```

2. Commit and push this change to trigger a redeploy

---

## Step 5: Test Your Deployment

### 5.1 Verify Backend
1. Visit `https://your-app-backend.onrender.com/api/states`
2. You should see JSON data with Indian states

### 5.2 Verify Frontend
1. Visit `https://your-app-frontend.onrender.com`
2. Test all functionality:
   - Adding users
   - Viewing users
   - Editing users
   - Deleting users
   - State/city dropdown dependency

---

## Important Notes

### Free Tier Limitations
- **Backend**: Spins down after 15 minutes of inactivity (first request may be slow)
- **Frontend**: Always available
- **Database**: MongoDB Atlas free tier has 512MB limit

### Performance Tips
1. Keep services active by setting up uptime monitoring
2. Consider upgrading to paid plans for production use
3. Monitor database usage in MongoDB Atlas

### Environment Variables Summary
**Backend Environment Variables:**
- `MONGO_URI`: MongoDB Atlas connection string
- `NODE_ENV`: `production`

**Frontend Environment Variables:**
- `REACT_APP_API_URL`: Backend API URL (e.g., `https://your-app-backend.onrender.com/api`)

### Troubleshooting
1. **500 Error**: Check backend logs in Render dashboard
2. **CORS Error**: Verify CORS configuration in server.js
3. **Database Connection**: Verify MongoDB Atlas connection string and network access
4. **API Not Found**: Check that backend URL is correctly set in frontend environment variables

---

## Cost Estimate
- **Render Free Tier**: $0/month (with limitations)
- **MongoDB Atlas Free Tier**: $0/month (512MB storage)
- **Render Paid Tier**: ~$7/month per service (removes limitations)

Your application is now successfully deployed on Render! 🎉