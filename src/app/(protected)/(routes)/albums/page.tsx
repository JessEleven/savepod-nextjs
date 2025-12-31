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
    <main className='mx-0 lg:mx-16'>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <Headerbar
        total={total}
        loading={loading}
        queryTime={queryTime}
        refresh={refresh}
      />

      <div className='mt-5 h-[500px] overflow-auto'>
        {!loading && !error && total > 0 && (
          <div className='grid grid-cols-1 gap-2.5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6'>
            {albums.map((album) => (
              <article
                key={album.id}
                className='app-transition cursor-pointer rounded-lg border border-neutral-500 p-3 hover:border-neutral-500'
              >
                <div>
                  <Link
                    href={`/albums/${album.id}`}
                    className='block font-medium text-lg'
                  >
                    <span>{album.title}</span>
                  </Link>

                  <time
                    dateTime={dateISO(album.created_at)}
                    className='mt-1.5 text-xs'
                  >
                    {dateFormat(album.created_at)}
                  </time>
                </div>
                {album.images_count}
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
