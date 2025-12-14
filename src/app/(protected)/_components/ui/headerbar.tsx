import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FolderPlusIcon, RefreshIcon } from '../../assets/icons/main-icons'
import { AlbumSectionTitle } from './section-title'

type HeaderbarProps = {
  total: number
  loading: boolean
  queryTime: number
  refresh: () => Promise<void>
}

export default function Headerbar({ refresh, loading, queryTime, total }: HeaderbarProps) {
  const pathname = usePathname()

  return (
    <div className='mt-5 flex items-center justify-between'>
      <AlbumSectionTitle title={pathname === '/collections' ? 'Your Albums' : 'Favorite albums'} />

      <div className='flex items-center gap-x-2.5'>
        {total && (
          <h3 className='text-[13px]'>
            {total} {total === 1 ? 'album' : 'albums'} • {queryTime} ms
          </h3>
        )}
        <button
          type='button'
          aria-label='Refresh'
          onClick={refresh}
          className='icon-border'
        >
          {loading ? <RefreshIcon className='animate-spin' /> : <RefreshIcon />}
        </button>

        <Link
          href='#'
          className='block'
        >
          <div className='flex items-center gap-x-1.5 text-sm'>
            <FolderPlusIcon />
            <span>New album</span>
          </div>
        </Link>
      </div>
    </div>
  )
}
