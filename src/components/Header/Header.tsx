import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import logo from './../../assets/Images/logo.png';
import {
  StyledAppBar,
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
      <StyledAppBar component="nav" elevation={0} sx={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb' }}>
        <StyledAppBarContainer>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <img 
              src={logo} 
              alt="Business Course Logo" 
              onClick={() => (window.location.href = "/")}
              style={{ cursor: "pointer", height: "40px", width: "auto" }}
            />
            {!isLegalPage && !isAdminPage && (
              <>
                {/* Desktop/Tablet Menu - Centered */}
                <Box
                  sx={{ 
                    display: { xs: "none", md: "flex" }, 
                    gap: 3, 
                    alignItems: 'center',
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                >
                  {navItems.map((item) => (
                    <Button
                      key={item}
                      variant="text"
                      onClick={() => scrollToSection(item.toLowerCase())}
                      sx={{
                        fontSize: "14px",
                        fontWeight: 400,
                        color: '#666',
                        textTransform: 'none',
                        position: 'relative',
                        transition: 'all 0.3s ease',
                        "&:hover": { 
                          backgroundColor: 'transparent',
                          transform: 'translateY(-2px)',
                          '&::after': {
                            width: '100%'
                          }
                        },
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          width: '0%',
                          height: '2px',
                          backgroundColor: '#2196F3',
                          transition: 'width 0.3s ease'
                        }
                      }}
                    >
                      {item}
                    </Button>
                  ))}
                </Box>
                {/* Spacer for layout balance */}
                <Box sx={{ width: '40px', display: { xs: "none", md: "block" } }} />
                {/* Mobile Hamburger Menu - Hidden on desktop/tablet */}
                {/* <MenuIconButton
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
                </MenuIconButton> */}
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
