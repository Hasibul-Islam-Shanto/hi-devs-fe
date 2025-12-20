import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().describe('Base URL for the API server'),
});

const _env = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
};
const parseEnv = envSchema.safeParse(_env);

if (!parseEnv.success) {
  console.error('❌ Invalid environment variables:', parseEnv.error);
  throw new Error('Invalid environment variables');
}

const env = {
  apiBaseUrl: parseEnv.data.NEXT_PUBLIC_API_URL,
};

export default env;
