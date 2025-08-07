/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from "dotenv";

dotenv.config();

interface Envconfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: "development" | "production";
}

const EnvVariables = (): Envconfig => {
  const RequeardEnvVariables: string[] = ["PORT", "DB_URL", "NODE_ENV"];
  RequeardEnvVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing Requerd Envarment variables ${key}`);
    }
  });
  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL!,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
  };
};

export const envVars = EnvVariables();
