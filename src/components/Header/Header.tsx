import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import logo from "../../assets/Images/logo.png";
import {
  StyledAppBar,
  LogoTypography,
  LogoImage,
  NavItemsBox,
  NavButton,
  MenuIconButton,
  StyledDrawer,
  DrawerContainer,
  DrawerTitle,
  StyledAppBarContainer,
} from "./Header.styles";

const navItems = ["New Sigma 9.0", "New Courses"];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <DrawerContainer onClick={handleDrawerToggle}>
      <DrawerTitle variant="h6">APNA COLLEGE</DrawerTitle>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      n
    </DrawerContainer>
  );

  return (
    <>
      <StyledAppBar component="nav" elevation={trigger ? 4 : 0}>
        <StyledAppBarContainer>
        <Toolbar>
          <LogoTypography variant="h6" component="div" onClick={() => window.location.href = '/'} sx={{ cursor: 'pointer' }}>
            <LogoImage src={logo} alt="logo" />
          </LogoTypography>
          {/* <NavItemsBox>
            {navItems.map((item) => (
              <NavButton key={item}>{item}</NavButton>
            ))}
          </NavItemsBox> */}
          {/* <MenuIconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </MenuIconButton> */}
        </Toolbar>
        </StyledAppBarContainer>
      </StyledAppBar>
      <nav>
        <StyledDrawer
          anchor="right"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </StyledDrawer>
      </nav>
    </>
  );
};

export default Header;
