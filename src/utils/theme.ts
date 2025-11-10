import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
      light: '#64B5F6',
      dark: '#1976D2',
      contrastText: '#fff',
    },
    secondary: {
      main: '#FF9800',
      light: '#FFB74D',
      dark: '#F57C00',
      contrastText: '#fff',
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: '#fff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          fontWeight: 500,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
          },
          '&:active': {
            transform: 'translateY(0px)',
            boxShadow: '0 2px 8px rgba(33, 150, 243, 0.4)',
          },
        },
        contained: {
          '&:hover': {
            backgroundColor: '#1976D2',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(33, 150, 243, 0.4)',
          },
          '&:active': {
            backgroundColor: '#1565C0',
            transform: 'translateY(0px)',
          },
        },
        outlined: {
          '&:hover': {
            backgroundColor: 'rgba(33, 150, 243, 0.08)',
            borderColor: '#1976D2',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            backgroundColor: 'rgba(33, 150, 243, 0.12)',
            transform: 'translateY(0px)',
          },
        },
        text: {
          '&:hover': {
            backgroundColor: 'rgba(33, 150, 243, 0.08)',
            color: '#1976D2',
          },
          '&:active': {
            backgroundColor: 'rgba(33, 150, 243, 0.12)',
          },
        },
      },
    },
  },
  
  // 👇 Defining/Overriding Screen Sizes (Breakpoints)
  breakpoints: {
    values: {
      xs: 0,
      sm: 200,
      // Example: If you want 'md' to start at 960px instead of 900px
      md: 750, 
      lg: 1280, // Example: If you want 'lg' to start later
      xl: 1920,
    },
  },
});

export default theme;