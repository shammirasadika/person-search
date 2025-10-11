# Vercel PostgreSQL Setup Guide

## 🚀 Deploy to Vercel with PostgreSQL Storage

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Setup PostgreSQL with Vercel Storage"
git push origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Deploy the project

### Step 3: Add PostgreSQL Storage
1. In your Vercel dashboard, go to your project
2. Click on the **"Storage"** tab
3. Click **"Create Database"**
4. Select **"Postgres"**
5. Choose a database name (e.g., "person-search-db")
6. Click **"Create"**

### Step 4: Automatic Environment Variables
Vercel will automatically set these environment variables:
- `POSTGRES_URL` - Direct connection
- `POSTGRES_PRISMA_URL` - Optimized for Prisma with connection pooling
- `POSTGRES_URL_NO_SSL` - Without SSL
- `POSTGRES_URL_NON_POOLING` - Direct connection without pooling

### Step 5: Redeploy
After adding the database, trigger a new deployment:
1. Go to **"Deployments"** tab
2. Click **"Redeploy"** on the latest deployment
3. Or push a new commit to trigger auto-deployment

## 🔧 What Happens During Deployment

1. **Build Process**: `prisma generate && npm run build`
2. **Database Migration**: Prisma will create tables automatically
3. **Environment Variables**: Vercel injects PostgreSQL connection strings
4. **Ready**: Your app will be live with PostgreSQL!

## 📱 Features Available After Deployment

- ✅ **PostgreSQL Database** - Managed by Vercel
- ✅ **Prisma ORM** - Full CRUD operations
- ✅ **Case-insensitive Search** - PostgreSQL mode support
- ✅ **Auto-scaling** - Vercel handles traffic
- ✅ **Backup & Monitoring** - Built into Vercel Storage

## 🛠 Local Development (Optional)

If you want to develop locally with PostgreSQL:

### Option A: Use Vercel PostgreSQL locally
```bash
# Install Vercel CLI
npm i -g vercel

# Link your project
vercel link

# Pull environment variables
vercel env pull .env.local

# Use the local env
npm run dev
```

### Option B: Docker PostgreSQL
```bash
docker run --name postgres-dev \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=person_search \
  -p 5432:5432 -d postgres:15

# Update .env.local
echo "DATABASE_URL=\"postgresql://postgres:password@localhost:5432/person_search\"" > .env.local
```

## 🎯 Next Steps

1. **Deploy**: Push your code to GitHub
2. **Import**: Connect your repo to Vercel
3. **Add Storage**: Create PostgreSQL database in Vercel
4. **Test**: Your app will be live with full database functionality!

Your Person Search app will be production-ready with PostgreSQL! 🎉