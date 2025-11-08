# Handloom Products E-Commerce Platform - Deployment Guide

## Overview
This guide provides step-by-step instructions to deploy the Handloom Products Global E-Commerce Platform to Vercel or Render. Both platforms offer free tiers suitable for getting started.

## Prerequisites
Before deploying, ensure you have:
- A GitHub account (already used for repository)
- A Vercel account (vercel.com) OR a Render account (render.com)
- MongoDB connection string (either MongoDB Atlas free tier or Render PostgreSQL)
- Git command line installed

## Environment Variables Required
Before deployment, prepare these environment variables:
```
DB_URI=mongodb+srv://username:password@cluster.mongodb.net/handloom?retryWrites=true&w=majority
JWT_SECRET=your-secure-jwt-secret-key-here
BCRYPT_ROUNDS=10
PORT=3000
NODE_ENV=production
```

---

## Option 1: Deploy to Vercel (Recommended for Beginners)

### Step 1: Create MongoDB Atlas Database (Free Tier)
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up or log in with your account
3. Create a new project
4. Create a cluster (select Free tier)
5. Create a database user with username and password
6. Add your IP to the whitelist (or use 0.0.0.0/0 for development)
7. Get your connection string from "Connect" button
8. Format: `mongodb+srv://username:password@cluster-name.mongodb.net/handloom?retryWrites=true&w=majority`

### Step 2: Create Vercel Account and Connect Repository
1. Go to https://vercel.com
2. Sign up with your GitHub account
3. Click "New Project"
4. Select "Import Git Repository"
5. Find and select `udaykiran-30402/handloom-products`
6. Click "Import"

### Step 3: Configure Environment Variables in Vercel
1. In the Vercel project settings, go to "Environment Variables"
2. Add the following variables:
   - `DB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A random secure string (min 32 characters)
   - `BCRYPT_ROUNDS`: 10
   - `NODE_ENV`: production
3. Click "Save"

### Step 4: Deploy
1. Vercel will automatically detect the Node.js application
2. Click "Deploy"
3. Wait for deployment to complete (usually 1-2 minutes)
4. You'll get a live URL like: `https://handloom-products.vercel.app`

### Step 5: Test Your Deployment
1. Visit your deployed URL
2. Test the API endpoints:
   - `GET /api/products` - Should return products
   - `POST /api/auth/register` - Test registration
   - Browse products as a buyer

---

## Option 2: Deploy to Render

### Step 1: Create MongoDB Atlas Database (Same as Vercel Step 1)
Follow the same MongoDB Atlas setup as Option 1, Step 1.

### Step 2: Connect Your Repository to Render
1. Go to https://render.com
2. Sign up or log in with GitHub
3. Click "New +" and select "Web Service"
4. Choose "Build and deploy from a Git repository"
5. Click "Connect" and select your GitHub account
6. Find and select `udaykiran-30402/handloom-products`
7. Click "Connect"

### Step 3: Configure Service Settings
1. **Name**: handloom-products (or your preferred name)
2. **Environment**: Node
3. **Region**: Choose closest to your location
4. **Branch**: main
5. **Build Command**: `npm install`
6. **Start Command**: `node server.js`

### Step 4: Add Environment Variables
1. Scroll to "Environment Variables" section
2. Add the following:
   - `DB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your secure JWT secret
   - `BCRYPT_ROUNDS`: 10
   - `NODE_ENV`: production
3. Click "Create Web Service"

### Step 5: Deploy
1. Render will automatically start the deployment
2. Monitor the logs for any errors
3. Once complete, you'll get a URL like: `https://handloom-products.onrender.com`
4. Note: Free tier services sleep after 15 minutes of inactivity

---

## Troubleshooting

### Issue: "Cannot find module 'express'"
**Solution**: Ensure all dependencies are listed in package.json and rebuild/redeploy.

### Issue: "MongoError: Authentication failed"
**Solution**: 
- Verify DB_URI is correct
- Check MongoDB whitelist includes deployment service IP
- Ensure database user exists with correct password

### Issue: "Port already in use"
**Solution**: The application uses environment PORT variable (defaults to 3000). Deployment services automatically assign ports.

### Issue: "CORS error when accessing from frontend"
**Solution**: 
- Ensure CORS is enabled in server.js
- Frontend requests must come from allowed origins
- Check that API base URL in frontend matches deployment domain

### Issue: Application starts but shows blank page
**Solution**: 
- Check browser console for JavaScript errors
- Verify API endpoints are accessible
- Check deployment service logs for backend errors

---

## Updating Your Deployment

### To Update Code
1. Make changes to your local repository
2. Commit and push to GitHub: `git push origin main`
3. Vercel/Render will automatically detect changes and redeploy
4. No manual action needed - automatic CI/CD pipeline

---

## Production Recommendations

1. **Database**: Use MongoDB Atlas with:
   - Encrypted connection strings
   - IP whitelist (not 0.0.0.0/0)
   - Automated backups enabled

2. **Authentication**: 
   - Use strong JWT_SECRET (40+ random characters)
   - Implement rate limiting for login attempts
   - Enable HTTPS (automatic with Vercel/Render)

3. **File Uploads**:
   - Implement file size limits
   - Validate file types on backend
   - Use cloud storage (AWS S3, Cloudinary) for production

4. **Monitoring**:
   - Set up error tracking (Sentry)
   - Monitor application logs regularly
   - Set up uptime monitoring

5. **Security**:
   - Keep dependencies updated
   - Enable two-factor authentication on GitHub
   - Review security logs regularly

---

## Deployment Comparison

| Feature | Vercel | Render |
|---------|--------|--------|
| Free Tier | Yes | Yes |
| Automatic HTTPS | Yes | Yes |
| Auto-scaling | Limited | Limited |
| MongoDB Compatible | Yes | Yes |
| Sleep After Inactivity | No | Yes (15 min) |
| Cold Start | Fast | Moderate |

---

## Support
For issues with:
- **Vercel**: https://vercel.com/docs
- **Render**: https://render.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **This Application**: Check README.md and GitHub issues

---

## Next Steps After Deployment
1. Visit your live application URL
2. Create admin account and test admin features
3. Create artisan account and list test products
4. Create buyer account and test purchases
5. Share URL with artisans to start listing real products
6. Monitor application performance and user feedback
