'use client'

import { useParams } from 'next/navigation'

export default function AlbumPage() {
  const { id } = useParams()
  return (
    <main>
      <h2>Upload images to album {id}</h2>
    </main>
  )
}
