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
        className={`absolute left-0 h-5 w-1 rounded-r-sm transition-colors duration-300 ease-in-out ${pathname === href ? 'bg-pink-500' : 'group-hover:bg-pink-500'}`}
      />
      <Link
        href={href}
        className={`block w-full rounded-[5px] px-2 py-[5px] ${pathname === href ? 'bg-pink-300/10' : 'transition-colors duration-300 ease-in-out hover:bg-pink-300/10'}`}
      >
        <div className='flex items-center gap-x-1'>
          {icon}
          {collapseSidebar && <span>{label}</span>}
        </div>
      </Link>
    </div>
  )
}
