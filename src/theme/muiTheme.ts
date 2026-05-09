import { createTheme } from '@mui/material/styles'

export function createMuiTheme(mode: 'light' | 'dark') {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#2563eb' : '#3b82f6',
        dark: mode === 'light' ? '#1d4ed8' : '#2563eb',
        light: mode === 'light' ? '#3b82f6' : '#60a5fa',
      },
      background: {
        default: mode === 'light' ? '#ffffff' : '#0a0a0a',
        paper: mode === 'light' ? '#f8fafc' : '#111111',
      },
      text: {
        primary: mode === 'light' ? '#0f172a' : '#e5e5e5',
        secondary: mode === 'light' ? '#475569' : '#737373',
      },
      divider: mode === 'light' ? '#e2e8f0' : '#222222',
    },
    typography: {
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
      h6: { fontWeight: 600 },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiIconButton: {
        defaultProps: { size: 'small' },
        styleOverrides: {
          root: {
            borderRadius: 6,
            transition: 'background 0.15s',
          },
        },
      },
      MuiTooltip: {
        defaultProps: { arrow: true, placement: 'bottom' },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            border: `1px solid ${theme.palette.divider}`,
            transition: 'border-color 0.2s, box-shadow 0.2s',
            '&:hover': {
              borderColor: theme.palette.primary.main,
              boxShadow: `0 0 0 1px ${theme.palette.primary.main}20`,
            },
          }),
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { textTransform: 'none', fontWeight: 600, borderRadius: 8 },
          contained: { boxShadow: 'none', '&:hover': { boxShadow: 'none' } },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 6,
            margin: '1px 8px',
            padding: '5px 12px',
            fontSize: '0.875rem',
            '&.Mui-selected': {
              backgroundColor: theme.palette.primary.main + '14',
              color: theme.palette.primary.main,
              fontWeight: 600,
              '&:hover': {
                backgroundColor: theme.palette.primary.main + '20',
              },
              '& .MuiListItemIcon-root': {
                color: theme.palette.primary.main,
              },
            },
          }),
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: { minWidth: 32, color: 'inherit', opacity: 0.65 },
        },
      },
    },
  })
}
