import { FolderIcon, LayoutGridIcon, SettingsIcon } from '../../assets/icons/sidebar-icons'
import { useSidebar } from '../../context/sidebar-context'
import Item from './item'

export default function SidebarItem() {
  const { collapseSidebar } = useSidebar()

  return (
    <nav
      className={`flex flex-col gap-y-2 text-sm ${collapseSidebar ? 'mx-[15px] items-start' : 'items-center'}`}
    >
      <Item
        href='/overview'
        icon={<LayoutGridIcon />}
        label='Overview'
      />

      <Item
        href='/albums'
        icon={<FolderIcon />}
        label='Albums'
      />

      <Item
        href='/settings'
        icon={<SettingsIcon />}
        label='Settings'
      />
    </nav>
  )
}
