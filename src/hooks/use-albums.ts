'use client'

import { useCallback, useEffect, useState } from 'react'
import { getAllAlbums } from '@/libs/fetch-api/album'

type Album = {
  id: string
  title: string
  description: string | null
  images_count: number
  created_at: string
}

export function useAlbums(page: number, limit: number, onPageChange?: (page: number) => void) {
  const [albums, setAlbums] = useState<Album[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [queryTime, setQueryTime] = useState(0)

  const fetchAlbums = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const start = performance.now()
      const res = await getAllAlbums({ page, limit })
      const end = performance.now()

      if (res.success) {
        setAlbums(res.results.data)
        setTotal(res.results.total_records)
      } else {
        setError(res.message)
      }

      setQueryTime(Math.round(end - start))
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error'

      setError(message)
    } finally {
      setLoading(false)
    }
  }, [page, limit])

  /**
   * Sincroniza la paginación cuando el total cambia
   * (ej. mover a favoritos, eliminar, etc.)
   */
  const syncAfterRemove = useCallback(async () => {
    const newTotal = total - 1
    const newTotalPages = Math.ceil(newTotal / limit)

    if (newTotalPages <= 0) {
      setAlbums([])
      setTotal(0)
      return
    }

    if (page > newTotalPages) {
      onPageChange?.(newTotalPages)
      return
    }

    await fetchAlbums()
  }, [total, limit, page, fetchAlbums, onPageChange])

  useEffect(() => {
    fetchAlbums()
  }, [fetchAlbums])

  return {
    albums,
    total,
    loading,
    error,
    queryTime,
    refresh: fetchAlbums,
    syncAfterRemove,
  }
}
