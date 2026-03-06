import dotenv from "dotenv";
dotenv.config();

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is not set`);
  }
  return value;
}

export const JWT_SECRET = getEnvVar("JWT_SECRET");
export const DATABASE_URL = getEnvVar("DATABASE_URL");
// Add more as needed