# Database Migrations

This directory contains database migration files and utilities for the GHL-Shopify Product Sync feature.

## Overview

The database schema includes the following tables:

- **product_mappings**: Bidirectional mapping between GHL and Shopify product IDs
- **variant_mappings**: Mapping between GHL and Shopify variant IDs (critical for variant sync)
- **sync_status**: Current synchronization status of each product
- **sync_history**: Complete audit trail of all sync operations
- **processed_events**: Ensures idempotency by tracking processed webhook events
- **bulk_sync_control**: Manages bulk sync operations and prevents race conditions

## Prerequisites

1. PostgreSQL database instance
2. Database connection string configured in `.env` file:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
```

## Running Migrations

### Apply All Pending Migrations

```powershell
pnpm tsx src/server/database/migrate.ts up
```

This will:
- Create the `schema_migrations` tracking table if it doesn't exist
- Execute all pending migration files in order
- Mark each migration as applied to prevent duplicate execution

### Rollback Migrations (Development Only)

```powershell
pnpm tsx src/server/database/migrate.ts down
```

**Warning**: This will drop all product sync tables and data. Use only in development.

## Migration Files

Migrations are located in the `migrations/` directory:

1. **001_create_product_sync_tables.sql**
   - Creates all core tables for product synchronization
   - Adds performance indexes
   - Includes foreign key constraints and check constraints

2. **002_create_updated_at_trigger.sql**
   - Creates trigger function to automatically update `updated_at` timestamps
   - Applies triggers to relevant tables

## Adding New Migrations

To add a new migration:

1. Create a new SQL file in `migrations/` with the naming pattern: `00X_description.sql`
2. Add the migration to the `MIGRATIONS` array in `migrate.ts`:

```typescript
{
  id: 3,
  name: 'your_migration_name',
  filename: '003_your_migration_name.sql',
}
```

3. Run migrations: `pnpm tsx src/server/database/migrate.ts up`

## Database Connection

The database connection pool is managed by `src/server/config/database.ts`:

```typescript
import { getPool } from '@/server/config/database';

const pool = getPool();
const result = await pool.query('SELECT * FROM product_mappings');
```

### Connection Pool Configuration

- **Max connections**: 20
- **Idle timeout**: 30 seconds
- **Connection timeout**: 10 seconds

## Testing Database Connection

```typescript
import { testConnection } from '@/server/config/database';

const isConnected = await testConnection();
if (!isConnected) {
  console.error('Database connection failed');
}
```

## Schema Documentation

### product_mappings

| Column | Type | Description |
|--------|------|-------------|
| ghl_product_id | VARCHAR(255) | Primary key, GHL product identifier |
| shopify_product_id | VARCHAR(255) | Shopify product identifier |
| created_at | TIMESTAMP | Record creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp (auto-updated) |

### variant_mappings

| Column | Type | Description |
|--------|------|-------------|
| ghl_variant_id | VARCHAR(255) | Primary key, GHL variant identifier |
| shopify_variant_id | VARCHAR(255) | Shopify variant identifier |
| ghl_product_id | VARCHAR(255) | Foreign key to product_mappings |
| shopify_product_id | VARCHAR(255) | Shopify product identifier |
| created_at | TIMESTAMP | Record creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp (auto-updated) |

### sync_status

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| ghl_product_id | VARCHAR(255) | Foreign key to product_mappings |
| shopify_product_id | VARCHAR(255) | Shopify product identifier |
| status | VARCHAR(50) | Sync status: synced, failed, archived, pending |
| last_sync_at | TIMESTAMP | Last successful sync timestamp |
| last_error | TEXT | Last error message if failed |
| retry_count | INTEGER | Number of retry attempts |
| created_at | TIMESTAMP | Record creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp (auto-updated) |

### sync_history

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| ghl_product_id | VARCHAR(255) | GHL product identifier |
| operation | VARCHAR(50) | Operation type: create, update, archive |
| status | VARCHAR(50) | Operation status: pending, success, failed |
| error | TEXT | Error message if failed |
| attempt_number | INTEGER | Attempt number for this operation |
| created_at | TIMESTAMP | Record creation timestamp |

### processed_events

| Column | Type | Description |
|--------|------|-------------|
| event_id | VARCHAR(255) | Primary key, unique event identifier |
| ghl_product_id | VARCHAR(255) | GHL product identifier |
| event_type | VARCHAR(50) | Event type: product.created, product.updated, product.deleted |
| processed_at | TIMESTAMP | Event processing timestamp |

**Note**: Unique constraint on (ghl_product_id, event_type, processed_at) ensures idempotency.

### bulk_sync_control

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| is_running | BOOLEAN | Whether bulk sync is currently running |
| started_at | TIMESTAMP | Bulk sync start timestamp |
| completed_at | TIMESTAMP | Bulk sync completion timestamp |
| total_products | INTEGER | Total number of products to sync |
| processed_count | INTEGER | Number of products processed so far |

## Performance Indexes

The following indexes are created for optimal query performance:

- `idx_sync_status_ghl_id`: Fast lookups by GHL product ID
- `idx_sync_status_status`: Filter by sync status
- `idx_sync_history_ghl_id`: Sync history lookups
- `idx_variant_mappings_ghl_product`: Variant operations by product
- `idx_processed_events_ghl_product`: Idempotency checks
- `idx_processed_events_type`: Event type analytics

## Troubleshooting

### Connection Issues

If you encounter connection errors:

1. Verify `DATABASE_URL` is set correctly in `.env`
2. Ensure PostgreSQL is running
3. Check network connectivity and firewall rules
4. Verify database user has necessary permissions

### Migration Failures

If a migration fails:

1. Check the error message for SQL syntax issues
2. Verify the database user has CREATE TABLE permissions
3. Check for conflicting table names
4. Review the migration SQL file for errors

### Rollback Issues

If rollback fails:

1. Manually drop tables in reverse dependency order
2. Clear the `schema_migrations` table
3. Re-run migrations from scratch

## Related Documentation

- [Requirements Document](../../../.kiro/specs/ghl-shopify-product-sync/requirements.md)
- [Design Document](../../../.kiro/specs/ghl-shopify-product-sync/design.md)
- [Tasks](../../../.kiro/specs/ghl-shopify-product-sync/tasks.md)
