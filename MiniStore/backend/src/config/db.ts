import { Pool } from "pg";
import { DATABASE_URL } from "./env";

const pool = new Pool({
  connectionString: DATABASE_URL,
});

pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL");
});

export default pool;
