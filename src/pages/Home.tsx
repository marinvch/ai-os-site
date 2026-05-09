import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const INSTALL_CMD = 'npx -y github:marinvch/ai-os'

const features = [
  {
    icon: '🔍',
    title: 'Auto Stack Detection',
    desc: 'Detects your language, framework, and dependencies automatically. No config files to write.',
  },
  {
    icon: '🛠️',
    title: '30 MCP Tools',
    desc: 'Rich set of context tools wired into GitHub Copilot — architecture, conventions, freshness, memory, and more.',
  },
  {
    icon: '🧠',
    title: 'Memory System',
    desc: 'Persistent repo-scoped, session, and user memory across Copilot conversations. No more repeating context.',
  },
  {
    icon: '🔁',
    title: 'Context Freshness',
    desc: 'Detects stale context automatically. SHA-256 content-hash gating skips unchanged files on refresh.',
  },
  {
    icon: '👁️',
    title: 'Dry-Run Mode',
    desc: 'Preview every change with a colorized unified diff before committing to disk. Add --full-diff for full output.',
  },
  {
    icon: '🤖',
    title: 'Skills & Agents',
    desc: 'Auto-installs domain-specific skills and agent files based on your detected stack.',
  },
]

export default function Home() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    document.title = 'AI OS — Context-enriched GitHub Copilot Framework'
  }, [])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(INSTALL_CMD)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
            <circle cx="5" cy="5" r="5"/>
          </svg>
          v0.15.0 — now with dry-run diff & hash gate
        </div>

        <h1>Context-enriched Copilot<br/>for any codebase</h1>

        <p>
          AI OS scans your repository, generates rich context for GitHub Copilot,
          and keeps it fresh — automatically. Install once, stay productive forever.
        </p>

        <div className="hero-actions">
          <Link to="/getting-started" className="btn btn-primary">
            Get Started →
          </Link>
          <a
            href="https://github.com/marinvch/ai-os"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            View on GitHub
          </a>
        </div>

        <div className="install-box">
          <code>{INSTALL_CMD}</code>
          <button
            className={`copy-btn${copied ? ' copied' : ''}`}
            onClick={handleCopy}
            title="Copy to clipboard"
          >
            {copied ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
              </svg>
            )}
          </button>
        </div>
      </section>

      <hr className="divider"/>

      {/* Features */}
      <section>
        <div className="section">
          <h2 className="section-title">Everything Copilot needs to understand your codebase</h2>
        </div>
        <div className="features">
          {features.map(f => (
            <div key={f.title} className="feature-card">
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider"/>

      {/* Quick start */}
      <section className="section">
        <h2 className="section-title">Up and running in 30 seconds</h2>
        <div style={{ maxWidth: '580px', margin: '0 auto' }}>
          {[
            { step: '1', label: 'Run the installer in your project root', cmd: 'npx -y github:marinvch/ai-os' },
            { step: '2', label: 'Verify with the health check', cmd: 'npx -y github:marinvch/ai-os --doctor' },
            { step: '3', label: 'Refresh after major changes', cmd: 'npx -y github:marinvch/ai-os --refresh-existing' },
          ].map(({ step, label, cmd }) => (
            <div
              key={step}
              style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', alignItems: 'flex-start' }}
            >
              <div style={{
                width: '28px', height: '28px', minWidth: '28px',
                borderRadius: '50%',
                background: 'var(--accent-bg)',
                border: '1px solid var(--accent-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent)',
              }}>
                {step}
              </div>
              <div style={{ flex: 1 }}>
                <div className="step-label">{label}</div>
                <div className="step-cmd">{cmd}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/getting-started" className="btn btn-primary">
            Full Installation Guide →
          </Link>
        </div>
      </section>
    </div>
  )
}
