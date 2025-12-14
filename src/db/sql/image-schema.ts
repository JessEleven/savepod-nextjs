import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { album } from './album-schema'

export const image = pgTable('image', {
  id: text('id').primaryKey(),
  url: text('url').notNull(),
  publicId: text('public_id').notNull(),
  preview: text('preview'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  albumId: text('album_id')
    .notNull()
    .references(() => album.id, { onDelete: 'cascade' }),
})
