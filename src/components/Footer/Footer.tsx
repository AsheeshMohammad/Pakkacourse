import { Container, Grid, Typography } from "@mui/material";
import logo from "../../assets/Images/logo.png";
import SocialLinks from "../SocialLinks/SocialLinks";
import {
  FooterContainer,
  LogoImage,
  HelpfulLinksTitle,
  StyledLink,
  StyledChevron,
} from "./Footer.styles";

const helpfulLinks = [
  { name: "Links", id: "links" },
  { name: "Work", id: "work" },
  { name: "Privacy Policy", id: "/#/privacy-policy" },
  { name: "Terms & Conditions", id: "/#/terms-and-conditions" },
];

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    if (sectionId === "#") return;
    if (sectionId.startsWith("/")) {
      window.location.href = sectionId;
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <FooterContainer>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <LogoImage src={logo} alt="logo" />
            <SocialLinks />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <HelpfulLinksTitle variant="h6" gutterBottom>
              HELPFUL LINKS
            </HelpfulLinksTitle>
            {helpfulLinks.map((link) => (
              <StyledLink 
                key={link.name} 
                variant="body1"
                onClick={() => scrollToSection(link.id)}
                sx={{ cursor: 'pointer' }}
              >
                <StyledChevron /> {link.name}
              </StyledLink>
            ))}
          </Grid>
        </Grid>
      </Container>
    </FooterContainer>
  );
};

export default Footer;