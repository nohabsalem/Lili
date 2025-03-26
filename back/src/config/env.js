import { z } from 'zod'
import dotenv from "dotenv";
dotenv.config();


const envSchema = z.object({
  PORT: z.coerce.number().min(1000),
  JWT_SECRET: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number(),
  SMTP_USERNAME: z.string(),
  SMTP_PASSWORD: z.string(),
  APP_URL: z.string(),
  FROM_EMAIL: z.string().email(),
  JWT_EXPIRES_IN: z.coerce.number().default(60 * 24),
  JWT_REFRESH_EXPIRES_IN: z.coerce.number().default(60 * 24 * 7)
})

// Export the type derived from the schema

// Validate `process.env` against our schema
// and return the result
let env
try {
  env = envSchema.parse(process.env)
} catch (err) {
  console.log("err:", err)
  process.exit(1)
}

// Export the result so we can use it in the project
export default env
