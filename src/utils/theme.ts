import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: '#fff',
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