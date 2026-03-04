# Quick Start Guide - Database Setup

This guide will help you set up the database for the GHL-Shopify Product Sync feature.

## Prerequisites

1. PostgreSQL database instance (local or remote)
2. Node.js and pnpm installed
3. Project dependencies installed

## Step 1: Install Dependencies

```powershell
pnpm install
```

This will install:
- `pg` - PostgreSQL client for Node.js
- `@types/pg` - TypeScript types for pg
- `tsx` - TypeScript execution engine for running migrations

## Step 2: Configure Database Connection

1. Copy `.env.example` to `.env.local`:

```powershell
Copy-Item .env.example .env.local
```

2. Edit `.env.local` and set your database connection string:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
```

Replace:
- `username` - Your PostgreSQL username
- `password` - Your PostgreSQL password
- `localhost:5432` - Your PostgreSQL host and port
- `database_name` - Your database name

### Example Connection Strings

**Local PostgreSQL:**
```
DATABASE_URL=postgresql://postgres:mypassword@localhost:5432/ghl_shopify_sync
```

**Vercel Postgres:**
```
DATABASE_URL=postgres://default:xxxxx@xxx-pooler.us-east-1.postgres.vercel-storage.com/verceldb
```

**Supabase:**
```
DATABASE_URL=postgresql://postgres:xxxxx@db.xxxxx.supabase.co:5432/postgres
```

## Step 3: Run Migrations

Execute the database migrations to create all required tables:

```powershell
pnpm db:migrate
```

Expected output:
```
Starting database migrations...
Found 2 pending migration(s)
Executing migration 1: create_product_sync_tables...
✓ Migration 1 completed successfully
Executing migration 2: create_updated_at_trigger...
✓ Migration 2 completed successfully
All migrations completed successfully!
```

## Step 4: Verify Database Setup

You can verify the tables were created by connecting to your database:

```powershell
# Using psql
psql $env:DATABASE_URL -c "\dt"
```

You should see the following tables:
- `product_mappings`
- `variant_mappings`
- `sync_status`
- `sync_history`
- `processed_events`
- `bulk_sync_control`
- `schema_migrations`

## Step 5: Test Database Connection (Optional)

Create a test script to verify the connection:

```typescript
// test-db.ts
import { testConnection } from './src/server/database';

(async () => {
  const isConnected = await testConnection();
  console.log('Database connection:', isConnected ? 'SUCCESS' : 'FAILED');
})();
```

Run it:
```powershell
pnpm tsx test-db.ts
```

## Troubleshooting

### Connection Refused

**Error:** `ECONNREFUSED` or `Connection refused`

**Solution:**
1. Verify PostgreSQL is running
2. Check host and port in DATABASE_URL
3. Verify firewall allows connections

### Authentication Failed

**Error:** `password authentication failed`

**Solution:**
1. Verify username and password in DATABASE_URL
2. Check PostgreSQL user permissions
3. Ensure user has CREATE TABLE privileges

### Database Does Not Exist

**Error:** `database "xxx" does not exist`

**Solution:**
Create the database first:
```powershell
psql -U postgres -c "CREATE DATABASE ghl_shopify_sync;"
```

### SSL Required

**Error:** `no pg_hba.conf entry` or SSL required

**Solution:**
Add `?sslmode=require` to your DATABASE_URL:
```
DATABASE_URL=postgresql://user:pass@host:5432/db?sslmode=require
```

## Rollback (Development Only)

To drop all tables and start fresh:

```powershell
pnpm db:rollback
```

**Warning:** This will delete all data in the sync tables.

## Next Steps

After setting up the database:

1. Implement webhook handler (Task 2)
2. Implement product mapper (Task 3)
3. Implement sync service (Task 4)

## Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [node-postgres (pg) Documentation](https://node-postgres.com/)
- [Full Database README](./README.md)
