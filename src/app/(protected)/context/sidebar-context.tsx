'use client'

import { createContext, type ReactNode, useContext, useState } from 'react'

interface SidebarContextProps {
  collapseSidebar: boolean
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextProps>({
  collapseSidebar: true,
  toggleSidebar: () => {},
})

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [collapseSidebar, setCollapseSidebar] = useState(true)

  const toggleSidebar = () => setCollapseSidebar((prev) => !prev)

  return (
    <SidebarContext.Provider
      value={{
        collapseSidebar,
        toggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => useContext(SidebarContext)
