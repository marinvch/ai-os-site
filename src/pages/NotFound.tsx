import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SITE_TITLE } from '../site'

export default function NotFound() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = 'Not found — Cortex'
    return () => { document.title = SITE_TITLE }
  }, [])

  return (
    <article className="prose not-found" aria-label="Page not found">
      <h1>No page here</h1>
      <p>
        There is no page at <code>{pathname}</code>. This site was rebuilt for Cortex 2, and some
        pages of the old engine’s documentation no longer exist.
      </p>
      <p>
        <Link to="/">Home</Link> · <Link to="/install">Installation</Link> · <Link to="/sequence">The sequence</Link>
      </p>
    </article>
  )
}
