import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

export const HomeHeaderTab = styled(Box)({});
export const HomeHeaderHeadLine = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "25px",
  lineHeight: "30px",
  marginBottom: "8px",
  [theme.breakpoints.up("sm")]: {
    fontSize: "45px",
    lineHeight: "60px",
  },
}));
export const HomeHeaderHeadSideLine = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "20px",
  [theme.breakpoints.up("sm")]: {
    fontSize: "18px",
    lineHeight: "30px",
  },
}));

export const HomeProfileContainer = styled(Box)(({ theme }) => ({
  width: "170px",
  margin: "auto",
  "& img": {
    width: "100%",
    borderRadius: "40px",
    marginTop: "20px",
  },
  [theme.breakpoints.up("sm")]: {
    width: "250px",
    "& img": {
      width: "100%",
      borderRadius: "40px",
      marginTop: "20px",
    },
  },
}));
export const ProfileDetailsContainer = styled(Box)({
  textAlign: "center",
});
export const ProfileDetails = styled(Box)(({ theme }) => ({
  "& .profile-name": {
    fontWeight: 600,
    fontSize: "14px",
  },
  "& .profile-designation": {
    fontWeight: 200,
    fontSize: "14px",
    fontStyle: "italic",
  },
  "& .social-icons": {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "10px",
  },
  [theme.breakpoints.up("sm")]: {
    "& .profile-name": {
      fontWeight: 600,
      fontSize: "18px",
    },
    "& .profile-designation": {
      fontWeight: 200,
      fontSize: "16px",
      fontStyle: "italic",
    },
  },
}));
