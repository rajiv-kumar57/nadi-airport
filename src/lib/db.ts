import { Pool } from "pg";

type GlobalWithPg = typeof globalThis & { __pgPool?: Pool };

function getGlobal(): GlobalWithPg {
  return globalThis as GlobalWithPg;
}

function getPool(): Pool {
  const g = getGlobal();
  if (!g.__pgPool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error(
        "DATABASE_URL is not set. Please create a .env.local with your Postgres connection string."
      );
    }
    g.__pgPool = new Pool({ connectionString });
  }
  return g.__pgPool!;
}

export async function ensureWaitlistTable(): Promise<void> {
  const pool = getPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS waitlist_signups (
      id BIGSERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      consent BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
}

export type WaitlistRow = {
  id: number;
  email: string;
  consent: boolean;
  created_at: string;
};

export async function saveWaitlistSignup(
  email: string,
  consent: boolean
): Promise<WaitlistRow> {
  const pool = getPool();
  await ensureWaitlistTable();
  const res = await pool.query(
    `
    INSERT INTO waitlist_signups (email, consent)
    VALUES ($1, $2)
    ON CONFLICT (email) DO UPDATE SET consent = EXCLUDED.consent
    RETURNING id, email, consent, created_at;
  `,
    [email.toLowerCase(), consent]
  );
  return res.rows[0] as WaitlistRow;
}


