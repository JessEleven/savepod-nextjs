'use client'

import AppLogo from '@/components/ui/app-logo'
import { useSidebar } from '../../context/sidebar-context'
import SidebarItem from './sidebar-item'

export default function Sidebar() {
  const { collapseSidebar } = useSidebar()

  return (
    <aside
      className={`flex flex-col overflow-hidden transition-all duration-500 ease-in-out ${collapseSidebar ? 'w-[250px]' : 'w-[66px]'}`}
    >
      <div className='h-full border-mulled-wine border-r bg-neutral-900'>
        <div
          className={`mt-[13px] mb-[15px] flex ${collapseSidebar ? 'mx-[15px] justify-start' : 'justify-center'}`}
        >
          <AppLogo
            display='flex'
            showText={collapseSidebar}
            iconSize={26}
            fontSize={20}
          />
        </div>

        {/* All sidebar items */}
        <SidebarItem />
      </div>
    </aside>
  )
}
