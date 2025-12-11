import Header from './_components/header'
import Sidebar from './_components/sidebar/sidebar'
import { SidebarProvider } from './context/sidebar-context'

export default function DashLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className='flex h-screen bg-[#1d1e1e] text-neutral-200'>
        {/* Sidebar */}
        <Sidebar />

        {/* Content */}
        <div className='flex flex-1 flex-col'>
          <Header />
          <div className='p-4'>{children}</div>
        </div>
      </div>
    </SidebarProvider>
  )
}
