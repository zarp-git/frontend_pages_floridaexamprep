import { getPool } from '../config/database';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Database Migration Runner
 * 
 * Executes SQL migration files in order to set up the database schema.
 * Tracks applied migrations to prevent duplicate execution.
 */

interface Migration {
  id: number;
  name: string;
  filename: string;
  applied_at?: Date;
}

const MIGRATIONS: Migration[] = [
  {
    id: 1,
    name: 'create_product_sync_tables',
    filename: '001_create_product_sync_tables.sql',
  },
  {
    id: 2,
    name: 'create_updated_at_trigger',
    filename: '002_create_updated_at_trigger.sql',
  },
];

/**
 * Create migrations tracking table if it doesn't exist
 */
async function createMigrationsTable(): Promise<void> {
  const pool = getPool();
  
  await pool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id INTEGER PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      filename VARCHAR(255) NOT NULL,
      applied_at TIMESTAMP DEFAULT NOW()
    );
  `);
}

/**
 * Get list of applied migrations
 */
async function getAppliedMigrations(): Promise<Set<number>> {
  const pool = getPool();
  
  const result = await pool.query<{ id: number }>(
    'SELECT id FROM schema_migrations ORDER BY id'
  );
  
  return new Set(result.rows.map(row => row.id));
}

/**
 * Mark a migration as applied
 */
async function markMigrationApplied(migration: Migration): Promise<void> {
  const pool = getPool();
  
  await pool.query(
    'INSERT INTO schema_migrations (id, name, filename) VALUES ($1, $2, $3)',
    [migration.id, migration.name, migration.filename]
  );
}

/**
 * Execute a single migration file
 */
async function executeMigration(migration: Migration): Promise<void> {
  const pool = getPool();
  const migrationsDir = join(__dirname, 'migrations');
  const filePath = join(migrationsDir, migration.filename);
  
  console.log(`Executing migration ${migration.id}: ${migration.name}...`);
  
  try {
    const sql = readFileSync(filePath, 'utf-8');
    await pool.query(sql);
    await markMigrationApplied(migration);
    console.log(`✓ Migration ${migration.id} completed successfully`);
  } catch (error) {
    console.error(`✗ Migration ${migration.id} failed:`, error);
    throw error;
  }
}

/**
 * Run all pending migrations
 */
export async function runMigrations(): Promise<void> {
  console.log('Starting database migrations...');
  
  try {
    // Create migrations tracking table
    await createMigrationsTable();
    
    // Get applied migrations
    const appliedMigrations = await getAppliedMigrations();
    
    // Find pending migrations
    const pendingMigrations = MIGRATIONS.filter(
      migration => !appliedMigrations.has(migration.id)
    );
    
    if (pendingMigrations.length === 0) {
      console.log('No pending migrations. Database is up to date.');
      return;
    }
    
    console.log(`Found ${pendingMigrations.length} pending migration(s)`);
    
    // Execute pending migrations in order
    for (const migration of pendingMigrations) {
      await executeMigration(migration);
    }
    
    console.log('All migrations completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
}

/**
 * Rollback the last migration (for development purposes)
 * Note: This is a simple implementation that drops all sync tables
 */
export async function rollbackMigrations(): Promise<void> {
  const pool = getPool();
  
  console.log('Rolling back migrations...');
  
  try {
    await pool.query(`
      DROP TABLE IF EXISTS bulk_sync_control CASCADE;
      DROP TABLE IF EXISTS processed_events CASCADE;
      DROP TABLE IF EXISTS sync_history CASCADE;
      DROP TABLE IF EXISTS sync_status CASCADE;
      DROP TABLE IF EXISTS variant_mappings CASCADE;
      DROP TABLE IF EXISTS product_mappings CASCADE;
      DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
      DELETE FROM schema_migrations WHERE id IN (1, 2);
    `);
    
    console.log('✓ Rollback completed successfully');
  } catch (error) {
    console.error('✗ Rollback failed:', error);
    throw error;
  }
}

// CLI execution
if (require.main === module) {
  const command = process.argv[2];
  
  (async () => {
    try {
      if (command === 'up') {
        await runMigrations();
      } else if (command === 'down') {
        await rollbackMigrations();
      } else {
        console.log('Usage: pnpm tsx src/server/database/migrate.ts [up|down]');
        process.exit(1);
      }
      process.exit(0);
    } catch (error) {
      console.error('Migration error:', error);
      process.exit(1);
    }
  })();
}
