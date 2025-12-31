import type { CreateAlbumInput } from '@/schemas/album.schema'

export const getAllAlbums = async ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => {
  try {
    const res = await fetch(`/api/albums?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    })
    const result = await res.json()
    // console.log('Response from API', result)

    if (!res.ok || !result.success) {
      throw new Error(result.message || 'Failed to fetch albums')
    }
    return result
  } catch (error: unknown) {
    // console.error('Error fetching albums:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'

    return {
      success: false,
      error: message,
    }
  }
}

export const createAlbum = async (formData: CreateAlbumInput) => {
  try {
    const res = await fetch('/api/albums', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    const result = await res.json()
    // console.log('Response from API', result)

    return result
  } catch (error: unknown) {
    // console.error('Error creating album:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'

    return {
      success: false,
      error: message,
    }
  }
}
