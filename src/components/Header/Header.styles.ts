import {
  styled,
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  Button,
} from "@mui/material";

export const drawerWidth = 240;

export const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "elevation",
})<{ elevation?: number }>(({ theme, elevation }) => ({
  backgroundColor: "#fff",
  width: "100% !important",
  boxShadow: elevation && elevation > 0 ? theme.shadows[elevation] : "none",
}));
export const StyledAppBarContainer = styled(Box)(({ theme, elevation }) => ({
  width: "100%",
  [theme.breakpoints.up("lg")]: {
    maxWidth: "1200px",
    margin: "auto",
    "& .MuiToolbar-root": {
      paddingLeft: "0 !important",
      paddingRight: "0 !important",
    },
  },
}));


export const LogoTypography = styled(Typography)({
  flexGrow: 1,
});

export const LogoImage = styled("img")(({ theme }) => ({
  height: "40px",
  // verticalAlign: "middle",
  [theme.breakpoints.up("md")]: {
    height: "50px",
    marginLeft: "-2%",
  },
}));

export const NavItemsBox = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("sm")]: {
    display: "block",
  },
}));

export const NavButton = styled(Button)({
  color: "#000",
});

export const MenuIconButton = styled(IconButton)(({ theme }) => ({
  color: "#000",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  display: "block",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: drawerWidth,
  },
}));

export const DrawerContainer = styled(Box)({
  textAlign: "center",
});

export const DrawerTitle = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));
