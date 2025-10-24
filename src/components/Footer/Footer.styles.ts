import { styled, Box, Typography, Link } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export const FooterContainer = styled(Box)({
  backgroundColor: "#f8f9fa",
  padding: "40px 0",
});

export const LogoImage = styled('img')({
  height: "40px",
  marginBottom: "10px",
});

export const HelpfulLinksTitle = styled(Typography)({
  marginBottom: '1rem',
});

export const StyledLink = styled(Link)(({theme})=>({
  textDecoration: "none",
  marginBottom: "8px",
  color: theme.palette.text.secondary,
  display: 'block',
}));

export const StyledChevron = styled(ChevronRightIcon)({
  verticalAlign: "middle",
});
