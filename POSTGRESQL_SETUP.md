# PostgreSQL Setup for Vercel Deployment

## ✅ Configuration Complete!

Your application is now configured for PostgreSQL and ready for Vercel deployment.

### What was updated:
- ✅ **Schema**: Changed from SQLite to PostgreSQL
- ✅ **Environment**: Updated .env for PostgreSQL
- ✅ **Scripts**: Added deployment and database scripts
- ✅ **Search**: Optimized for PostgreSQL with case-insensitive search
- ✅ **Migrations**: Created PostgreSQL migration files
- ✅ **Seed**: Updated for better PostgreSQL performance

## 🚀 Deploy to Vercel

### Step 1: Setup Vercel Postgres
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to your project
3. Go to **Storage** tab
4. Click **Create Database** → **Postgres**
5. Vercel will automatically set these environment variables:
   ```
   POSTGRES_URL
   POSTGRES_PRISMA_URL
   POSTGRES_URL_NO_SSL
   POSTGRES_URL_NON_POOLING
   ```

### Step 2: Deploy
```bash
# Commit your changes
git add .
git commit -m "Setup PostgreSQL for Vercel deployment"
git push origin main

# Your app will auto-deploy to Vercel
```

### Step 3: Verify Deployment
- Vercel will automatically run `prisma generate` during build
- Database migrations will run on first deployment
- Your app will be ready with PostgreSQL!

## 🛠 Local Development Options

### Option A: Continue with SQLite (Easiest)
For local development, you can temporarily switch back to SQLite:

1. Create `.env.local`:
   ```bash
   DATABASE_URL="file:./dev.db"
   ```

2. Update schema temporarily:
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = env("DATABASE_URL")
   }
   ```

### Option B: Use Docker PostgreSQL
```bash
# Start PostgreSQL in Docker
docker run --name postgres-dev \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=person_search \
  -p 5432:5432 -d postgres:15

# Update .env
DATABASE_URL="postgresql://postgres:password@localhost:5432/person_search"

# Run migrations
npx prisma migrate dev --name init
npx prisma generate
npm run db:seed
```

### Option C: Use Supabase (Free)
1. Create account at [Supabase](https://supabase.com)
2. Create new project
3. Copy connection string to `.env`
4. Run migrations: `npx prisma db push`

## 📋 Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run studio          # Open Prisma Studio

# Database
npx prisma generate     # Generate client
npx prisma db push      # Push schema changes
npx prisma migrate dev  # Create and run migration
npm run db:seed         # Seed database

# Production
npm run build           # Build for production
npm run start           # Start production server
```

## 🔧 Current Configuration

- **Database**: PostgreSQL (production) / SQLite (optional local)
- **ORM**: Prisma with full CRUD operations
- **Search**: Case-insensitive with PostgreSQL
- **Deployment**: Vercel with automatic database setup
- **Seeding**: Optimized for PostgreSQL performance

Your Person Search app is now ready for production deployment! 🎉