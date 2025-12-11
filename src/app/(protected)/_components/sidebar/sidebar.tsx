'use client'

import { useSidebar } from '../../context/sidebar-context'
import SidebarItem from './sidebar-item'

export default function Sidebar() {
  const { collapseSidebar } = useSidebar()

  return (
    <aside
      className={`flex flex-col overflow-hidden transition-all duration-500 ease-in-out ${collapseSidebar ? 'w-[250px]' : 'w-[66px]'}`}
    >
      <div className='h-full border-stone-500 border-r bg-neutral-900'>
        <SidebarItem />
      </div>
    </aside>
  )
}
