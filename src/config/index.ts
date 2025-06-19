import dotenv from "dotenv";
dotenv.config();

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export const config = {
  app: {
    port: parseInt(process.env.PORT || "3000", 10),
  },
  bcrypt: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10),
  },
  jwt: {
    secret: requireEnv("JWT_SECRET"),
    refreshSecret: requireEnv("JWT_REFRESH_SECRET"),
    accessExpiration: process.env.JWT_ACCESS_EXPIRATION || "1h",
    refreshExpiration: process.env.JWT_REFRESH_EXPIRATION || "7d",
  },
  db: {
    name: process.env.DB_NAME || "hostel_db",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306", 10),
  },
};
