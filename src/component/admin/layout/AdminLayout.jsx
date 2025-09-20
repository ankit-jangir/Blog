import React, { useEffect, useMemo, useState } from 'react'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from './sidebar.jsx'
import Header from '../Header/Header'

export default function AdminLayout({ children }) {
  const initialOpen = useMemo(() => {
    try {
      const match = document.cookie.match(/(?:^|; )sidebar_state=([^;]+)/)
      if (match) {
        return match[1] === 'true'
      }
      // If no cookie, default responsive: open on desktop, collapsed on tablets/phones
      if (typeof window !== 'undefined') {
        return window.innerWidth >= 1024 // lg breakpoint
      }
    } catch {}
    return true
  }, [])

  const [open, setOpen] = useState(initialOpen)

  // Keep sidebar responsive on resize: collapse on <lg, expand on >=lg
  useEffect(() => {
    function handleResize() {
      try {
        const shouldOpen = window.innerWidth >= 1024
        setOpen((prev) => (prev === shouldOpen ? prev : shouldOpen))
      } catch {}
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="admin-theme antialiased">
      <SidebarProvider open={open} onOpenChange={setOpen} style={{ "--sidebar-width": "15rem" }}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

