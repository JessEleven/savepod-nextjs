import type { album } from '@/db/sql/album-schema'

type DrizzleAlbum = typeof album.$inferSelect

// Method GET
interface AlbumGet {
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
}

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

// Method PATCH
interface AlbumPatch {
  id: string
  title: string
  description: string | null
  created_at: Date
  update_at: Date
}

export function pickAlbumFieldsForPatch(album: DrizzleAlbum): AlbumPatch {
  return {
    id: album.id,
    title: album.title,
    description: album.description,
    created_at: album.createdAt,
    update_at: album.updatedAt,
  }
}
