import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const main = useRef<HTMLElement>(null)
  const { pathname } = useLocation()

  // The content pane is the scroll container, so a new page would otherwise open mid-scroll.
  useEffect(() => { main.current?.scrollTo(0, 0) }, [pathname])

  return (
    <div className="layout">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header onMenuToggle={() => setSidebarOpen(o => !o)} />
      <div className="layout-body">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        {sidebarOpen && <div className="scrim" onClick={() => setSidebarOpen(false)} />}
        <main className="content" id="main-content" ref={main}>
          <div className="content-inner">{children}</div>
        </main>
      </div>
    </div>
  )
}
