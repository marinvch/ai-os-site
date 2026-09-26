import { createTheme } from '@mui/material/styles'

// Mirrors the tokens in index.css. Text colours hold 7:1 or better on their surface, and no
// component renders text under 13px — MUI's Tooltip defaults to 11px, hence the override below.
export function createMuiTheme(mode: 'light' | 'dark') {
  const light = mode === 'light'
  const accent = light ? '#5a3000' : '#ffc766'
  return createTheme({
    palette: {
      mode,
      primary: {
        main: light ? '#5a3000' : '#f5b041',
        dark: light ? '#3f2200' : '#d99a2b',
        light: light ? '#7a4100' : '#ffc766',
        contrastText: light ? '#ffffff' : '#1a1208',
      },
      background: {
        default: light ? '#fbf8f3' : '#0f0d0b',
        paper: light ? '#f4efe7' : '#151210',
      },
      text: {
        primary: light ? '#1a1512' : '#f3ede4',
        secondary: light ? '#3d342c' : '#d6cabb',
      },
      divider: light ? '#cfc2b0' : '#3d332b',
    },
    typography: {
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
      fontSize: 16,
      htmlFontSize: 16,
    },
    shape: { borderRadius: 8 },
    components: {
      MuiIconButton: {
        defaultProps: { size: 'small' },
        styleOverrides: { root: { borderRadius: 6 } },
      },
      MuiTooltip: {
        defaultProps: { arrow: true, placement: 'bottom' },
        styleOverrides: {
          tooltip: {
            fontSize: '0.875rem',
            fontWeight: 600,
            color: light ? '#ffffff' : '#1a1512',
            backgroundColor: light ? '#1a1512' : '#f3ede4',
          },
          arrow: { color: light ? '#1a1512' : '#f3ede4' },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            margin: '1px 10px',
            padding: '6px 12px',
            '&.Mui-selected': {
              backgroundColor: light ? 'rgba(90, 48, 0, 0.10)' : 'rgba(245, 176, 65, 0.14)',
              color: accent,
              boxShadow: `inset 3px 0 0 ${light ? '#b86e00' : '#f5b041'}`,
              '&:hover': { backgroundColor: light ? 'rgba(90, 48, 0, 0.14)' : 'rgba(245, 176, 65, 0.2)' },
              '& .MuiListItemIcon-root': { color: accent },
            },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: { root: { minWidth: 34, color: 'inherit' } },
      },
    },
  })
}
