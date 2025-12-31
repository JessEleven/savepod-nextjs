import { z } from 'zod'

export const createAlbumSchema = z.object({
  title: z
    .string()
    .min(3, 'The title must have 3 characters')
    .regex(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]+$/, 'The title contains invalid characters')
    .max(50, 'The title is too long'),

  description: z
    .string()
    .regex(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s,.:;]+$/, 'The description contains invalid characters')
    .max(250, 'The description is too long')
    .optional()
    .or(z.literal('')),
})

export type CreateAlbumInput = z.infer<typeof createAlbumSchema>
