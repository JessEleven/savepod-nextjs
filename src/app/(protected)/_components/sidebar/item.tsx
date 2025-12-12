import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSidebar } from '../../context/sidebar-context'

type Props = {
  href: string
  icon: React.ReactNode
  label: string
}

export default function Item({ href, icon, label }: Props) {
  const { collapseSidebar } = useSidebar()
  const pathname = usePathname()

  return (
    <div className={`group relative flex items-center ${collapseSidebar && 'w-full'}`}>
      <div
        className={`app-transition absolute left-0 h-[18px] w-1 rounded-r-sm ${pathname === href ? 'bg-mulled-wine' : 'group-hover:bg-mulled-wine'}`}
      />
      <Link
        href={href}
        className={`app-transition block w-full rounded-[5px] px-2 py-[5px] ${pathname === href ? 'bg-zinc-500/20' : 'hover:bg-zinc-500/20'}`}
      >
        <div className='flex items-center gap-x-1'>
          {icon}
          {collapseSidebar && <span>{label}</span>}
        </div>
      </Link>
    </div>
  )
}
