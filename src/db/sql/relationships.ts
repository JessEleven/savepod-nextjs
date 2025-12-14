import { relations } from 'drizzle-orm'
import { album } from './album-schema'
import { account, session, user } from './auth-schema'
import { image } from './image-schema'

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}))

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}))

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}))

export const albumRelations = relations(album, ({ many, one }) => ({
  images: many(image),
  user: one(user, {
    fields: [album.userId],
    references: [user.id],
  }),
}))

export const imageRelations = relations(image, ({ one }) => ({
  album: one(album, {
    fields: [image.albumId],
    references: [album.id],
  }),
}))
