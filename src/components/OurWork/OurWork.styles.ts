import styled from "@emotion/styled";
import { Box, Grid, Typography } from "@mui/material";

export const OurWorkContainer = styled(Box)({});
export const OurWorkHeader = styled(Typography)({
  fontSize: "24px",
  fontWeight: 700,
  textAlign: "center",
  marginTop: "20px",
});
export const WorkContainerDetails = styled(Box)(({ theme }) => ({
  width: "90%",
  margin: "auto",
  textAlign: "center",
  marginBottom: "20px",
  "& img": {
    width: "100%",
  },
  "& span": {
    fontSize: "14px",
    fontStyle: "italic",
  },
  [theme.breakpoints.up("sm")]: {
    width: "40%",
    margin: "auto",
    textAlign: "center",
    marginBottom: "20px",
  },
}));
export const WorkContainerContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "20px",
  },
}));
