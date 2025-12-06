import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: '.env.local' })

const allSchema = [
  './src/db/sql/album-schema.ts',
  './src/db/sql/auth-schema.ts',
  './src/db/sql/image-schema.ts',
]

export default defineConfig({
  out: './src/db/migrations',
  schema: allSchema,
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
