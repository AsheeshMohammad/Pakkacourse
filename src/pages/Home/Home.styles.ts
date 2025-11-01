import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const MainContainer = styled(Box)(({ theme }) => ({
  margin: "auto",
  // 💡 Suggestion: Add consistent side padding, especially on mobile.
  padding: '0 16px', 
  maxWidth: "360px",
  
  [theme.breakpoints.up("sm")]: {
    maxWidth: "820px",
  },
  
  [theme.breakpoints.up("md")]: {
    maxWidth: "1200px",
  },
  
  // 💡 Optional: Define an extra-large breakpoint if needed
  // [theme.breakpoints.up("lg")]: { 
  //   maxWidth: "1440px",
  // },
  
  // [theme.breakpoints.up("xl")]: {
  //   maxWidth: "1600px",
  // },
}));