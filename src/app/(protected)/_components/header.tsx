'use client'

import { LayoutSidebarIcon, LayoutSidebarIconOutline } from '../assets/icons/sidebar-icons'
import { useSidebar } from '../context/sidebar-context'

export default function Header() {
  const { collapseSidebar, toggleSidebar } = useSidebar()

  return (
    <header className='flex h-[50px] w-full items-center justify-start border-stone-500 border-b'>
      <div className='ml-4'>
        <button
          type='button'
          aria-label='Layout Sidebar'
          className='icon-border'
          onClick={toggleSidebar}
        >
          {collapseSidebar ? <LayoutSidebarIcon /> : <LayoutSidebarIconOutline />}
        </button>
      </div>
    </header>
  )
}
