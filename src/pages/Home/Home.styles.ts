import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const MainContainer = styled(Box)(({ theme }) => ({
  margin: "auto",
  maxWidth: "360px",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "720px",
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: "820px",
  },
}));
