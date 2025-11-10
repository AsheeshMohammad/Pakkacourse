import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

export const OurWorkContainer = styled(Box)({});
export const OurWorkHeader = styled(Typography)({
  fontSize: "24px",
  fontWeight: 700,
  textAlign: "center",
  marginTop: "20px",
});
export const WorkContainerDetails = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  width: "100%",
  margin: "20px 0",
  paddingLeft: "30px",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    left: "8px",
    top: "0",
    bottom: "-20px",
    width: "2px",
    backgroundColor: "#e0e0e0",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    left: "4px",
    top: "15px",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.main,
    border: "2px solid white",
    boxShadow: "0 0 0 2px #e0e0e0",
  },
  "& > div": {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  "& img": {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "8px",
    flexShrink: 0,
  },
  "& span": {
    fontSize: "13px",
    lineHeight: 1.4,
    color: "#333",
    flex: 1,
  },
  [theme.breakpoints.up("md")]: {
    width: "45%",
    margin: "15px auto",
    flexDirection: "column",
    textAlign: "center",
    paddingLeft: "0",
    "&::before": {
      display: "none",
    },
    "& img": {
      width: "100%",
      height: "250px",
      marginRight: "0",
      marginBottom: "8px",
    },
    "& span": {
      fontSize: "14px",
      textAlign: "center",
    },
  },
}));
export const WorkContainerContainer = styled(Box)(({ theme }) => ({
  padding: "20px 16px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  position: "relative",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "20px",
    padding: "20px",
    alignItems: "center",
  },
}));
