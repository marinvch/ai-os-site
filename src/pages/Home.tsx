import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import GitHubIcon from '@mui/icons-material/GitHub'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined'
import MemoryOutlinedIcon from '@mui/icons-material/MemoryOutlined'
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined'

const INSTALL_CMD = 'npx -y github:marinvch/ai-os'

const features = [
  {
    icon: <AutoAwesomeOutlinedIcon />,
    title: 'Auto Stack Detection',
    desc: 'Detects your language, framework, and dependencies automatically. No config files to write.',
  },
  {
    icon: <BuildOutlinedIcon />,
    title: '30 MCP Tools',
    desc: 'Rich set of context tools wired into GitHub Copilot — architecture, conventions, freshness, memory, and more.',
  },
  {
    icon: <MemoryOutlinedIcon />,
    title: 'Memory System',
    desc: 'Persistent repo-scoped, session, and user memory across Copilot conversations. No more repeating context.',
  },
  {
    icon: <CachedOutlinedIcon />,
    title: 'Context Freshness',
    desc: 'Detects stale context automatically. SHA-256 content-hash gating skips unchanged files on refresh.',
  },
  {
    icon: <VisibilityOutlinedIcon />,
    title: 'Dry-Run Mode',
    desc: 'Preview every change with a colorized unified diff before committing to disk. Add --full-diff for full output.',
  },
  {
    icon: <SmartToyOutlinedIcon />,
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
          <Button
            variant="contained"
            component={Link}
            to="/getting-started"
            endIcon={<ArrowForwardIcon />}
            size="large"
            sx={{ borderRadius: '8px', fontWeight: 600, px: 2.5 }}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            href="https://github.com/marinvch/ai-os"
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<GitHubIcon />}
            size="large"
            sx={{ borderRadius: '8px', fontWeight: 600, px: 2.5, color: 'text.primary', borderColor: 'divider', '&:hover': { borderColor: 'primary.main' } }}
          >
            View on GitHub
          </Button>
        </div>

        <div className="install-box">
          <code>{INSTALL_CMD}</code>
          <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'} placement="top">
            <IconButton
              onClick={handleCopy}
              size="small"
              sx={{
                color: copied ? 'success.main' : 'text.secondary',
                transition: 'color 0.2s',
                '&:hover': { bgcolor: 'transparent', color: 'primary.main' },
              }}
            >
              {copied
                ? <CheckOutlinedIcon fontSize="small" />
                : <ContentCopyOutlinedIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
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
            <Card key={f.title} elevation={0} sx={{ height: '100%' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'primary.main',
                      color: '#fff',
                      flexShrink: 0,
                      '& svg': { fontSize: '1.1rem' },
                    }}
                  >
                    {f.icon}
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                    {f.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {f.desc}
                </Typography>
              </CardContent>
            </Card>
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
          <Button
            variant="contained"
            component={Link}
            to="/getting-started"
            endIcon={<ArrowForwardIcon />}
            size="large"
            sx={{ borderRadius: '8px', fontWeight: 600, px: 3 }}
          >
            Full Installation Guide
          </Button>
        </div>
      </section>
    </div>
  )
}
