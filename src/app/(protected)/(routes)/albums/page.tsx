'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useAlbums } from '@/hooks/use-albums'
import { dateFormat, dateISO } from '@/utils/date-format'
import Headerbar from '../../_components/ui/headerbar'

export default function AlbumPage() {
  const searchParams = useSearchParams()
  const route = useRouter()

  const currentPage = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10

  const updateQueryParams = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(page))
    params.set('limit', String(limit))
    route.push(`/albums?${params.toString()}`)
  }

  const { albums, total, loading, error, queryTime, refresh, syncAfterRemove } = useAlbums(
    currentPage,
    limit,
    updateQueryParams
  )

  useEffect(() => {
    const page = searchParams.get('page')
    const limitParam = searchParams.get('limit')

    if (!page || !limitParam) {
      const params = new URLSearchParams()
      params.set('page', '1')
      params.set('limit', '10')
      route.replace(`/albums?${params.toString()}`)
    }
  }, [searchParams, route])

  return (
    <main>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <Headerbar
        total={total}
        loading={loading}
        queryTime={queryTime}
        refresh={refresh}
      />
      {!loading && !error && total > 0 && (
        <div className='mt-5 grid grid-cols-5 gap-2.5'>
          {albums.map((album) => (
            <article
              key={album.id}
              className='app-transition cursor-pointer rounded-lg border border-neutral-500 p-3 hover:border-neutral-500'
            >
              <div>
                <Link
                  href='#'
                  className='block font-medium text-xl'
                >
                  {album.title}
                </Link>
                <time
                  dateTime={dateISO(album.created_at)}
                  className='mt-1.5 text-xs'
                >
                  {dateFormat(album.created_at)}
                </time>
              </div>
              <p>{album.description}</p>
              {album.images_count}
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
