import { relations } from 'drizzle-orm'
import { boolean, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { user } from './auth-schema'
import { image } from './image-schema'

export const album = pgTable('album', {
  id: text('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  favorite: boolean('favorite').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const albumRelations = relations(album, ({ many, one }) => ({
  images: many(image),
  user: one(user, { fields: [album.userId], references: [user.id] }),
}))
