import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { album } from '../sql/album-schema'
import { account, session, user, verification } from '../sql/auth-schema'
import { image } from '../sql/image-schema'

config({ path: '.env.local' })

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
})
const allSchema = { album, user, session, account, verification, image }

export const db = drizzle(pool, { schema: allSchema })
