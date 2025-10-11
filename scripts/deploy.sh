#!/bin/bash
# Deployment script for Vercel

echo "🔄 Generating Prisma client..."
npx prisma generate

echo "🔄 Running database migrations..."
npx prisma migrate deploy

echo "🌱 Seeding database (if empty)..."
npm run db:seed || echo "Seeding failed or database already seeded"

echo "✅ Deployment preparation complete!"