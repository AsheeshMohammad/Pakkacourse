import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useLocation } from "react-router-dom";
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

const navItems = ["Links", "Work"];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isLegalPage =
    location.pathname === "/terms-and-conditions" ||
    location.pathname === "/privacy-policy";
  const isAdminPage = location.pathname.startsWith("/admin");
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const drawer = (
    <DrawerContainer onClick={handleDrawerToggle}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => scrollToSection(item.toLowerCase())}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </DrawerContainer>
  );

  return (
    <>
      <StyledAppBar component="nav" elevation={trigger ? 2 : 0}>
        <StyledAppBarContainer>
          <Toolbar>
            <LogoTypography
              variant="h6"
              component="div"
              onClick={() => (window.location.href = "/")}
              sx={{ cursor: "pointer" }}
            >
              <LogoImage src={logo} alt="logo" />
            </LogoTypography>
            {!isLegalPage && !isAdminPage && (
              <>
                {/* Desktop/Tablet Menu - Hidden on mobile */}
                <Box
                  sx={{ display: { xs: "none", md: "flex" }, gap: 1 }} // Using sx is cleaner than inline props                  gap={1}
                >
                  {navItems.map((item) => (
                    <Button
                      key={item}
                      variant="outlined"
                      onClick={() => scrollToSection(item.toLowerCase())}
                      sx={{
                        fontSize: "12px",
                        fontWeight: 700,
                        border: "2px solid #1976d2",
                        "&:hover": { backgroundColor: "#f5f5f5 !important" },
                      }}
                    >
                      {item}
                    </Button>
                  ))}
                </Box>
                {/* Mobile Hamburger Menu - Hidden on desktop/tablet */}
                <MenuIconButton
                  color="inherit"
                  aria-label="toggle drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                  sx={{ display: { xs: "flex", md: "none" } }}
                >
                  <Box
                    sx={{
                      transition: "transform 0.3s ease-in-out",
                      transform: mobileOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    {mobileOpen ? <CloseIcon /> : <MenuIcon />}
                  </Box>
                </MenuIconButton>
              </>
            )}
          </Toolbar>
        </StyledAppBarContainer>
      </StyledAppBar>
      {!isLegalPage && !isAdminPage && (
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
      )}
    </>
  );
};

export default Header;
