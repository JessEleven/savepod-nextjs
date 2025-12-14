import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { album } from '../sql/album-schema'
import { account, session, user, verification } from '../sql/auth-schema'
import { image } from '../sql/image-schema'
import {
  accountRelations,
  albumRelations,
  imageRelations,
  sessionRelations,
  userRelations,
} from '../sql/relationships'

config({ path: '.env.local' })

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
})

const allSchemaAndRelationships = {
  album,
  user,
  session,
  account,
  verification,
  image,
  userRelations,
  sessionRelations,
  accountRelations,
  albumRelations,
  imageRelations,
}

export const db = drizzle(pool, { schema: allSchemaAndRelationships })
