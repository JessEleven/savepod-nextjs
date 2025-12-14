import type { album } from '@/db/sql/album-schema'

type DrizzleAlbum = typeof album.$inferSelect

// Method GET (all elements)
export const pickAlbumFieldsForGetAll = (album: {
  id: string
  title: string
  description: string | null
  favorite: boolean
  createdAt: Date
  updatedAt: Date
  images_count: number
}) => ({
  id: album.id,
  title: album.title,
  description: album.description,
  favorite: album.favorite,
  created_at: album.createdAt,
  updated_at: album.updatedAt,
  images_count: album.images_count,
})

/* interface AlbumGet {
  id: string
  title: string
  description: string | null
  favorite: boolean
  created_at: Date
  update_at: Date
}

export function pickAlbumFieldsForGet(album: DrizzleAlbum): AlbumGet {
  return {
    id: album.id,
    title: album.title,
    description: album.description,
    favorite: album.favorite,
    created_at: album.createdAt,
    update_at: album.updatedAt,
  }
} */

// Method POST
interface AlbumPost {
  id: string
  title: string
  description: string | null
  created_at: Date
}

export function pickAlbumFieldsForPost(album: DrizzleAlbum): AlbumPost {
  return {
    id: album.id,
    title: album.title,
    description: album.description,
    created_at: album.createdAt,
  }
}

// Method Get (with ID)
interface AlbumDetail {
  id: string
  title: string
  description: string | null
  favorite: boolean
  created_at: Date
  updated_at: Date
  images: {
    id: string
    url: string
    publicId: string
    preview: string | null
    albumId: string
  }[]
}

export function pickAlbumFieldsById(album: {
  id: string
  title: string
  description: string | null
  favorite: boolean
  createdAt: Date
  updatedAt: Date
  images: AlbumDetail['images']
}): AlbumDetail {
  return {
    id: album.id,
    title: album.title,
    description: album.description,
    favorite: album.favorite,
    created_at: album.createdAt,
    updated_at: album.updatedAt,
    images: album.images,
  }
}

// Method PATCH
interface AlbumPatch {
  id: string
  title: string
  description: string | null
  created_at: Date
  updated_at: Date
}

export function pickAlbumFieldsForPatch(album: DrizzleAlbum): AlbumPatch {
  return {
    id: album.id,
    title: album.title,
    description: album.description,
    created_at: album.createdAt,
    updated_at: album.updatedAt,
  }
}
