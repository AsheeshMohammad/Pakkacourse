import { Container, Grid, Typography } from "@mui/material";
import logo from "../../assets/Images/logo.png";
import {
  FooterContainer,
  LogoImage,
  HelpfulLinksTitle,
  StyledLink,
  StyledChevron,
} from "./Footer.styles";

const helpfulLinks = [
  "Courses",
  "Privacy policy",
  "Refund Policy",
  "Terms & Conditions",
];

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <LogoImage src={logo} alt="logo" />
            <Typography variant="body1" color="textSecondary">
              Where education meets real-world needs.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <HelpfulLinksTitle variant="h6" gutterBottom>
              HELPFUL LINKS
            </HelpfulLinksTitle>
            {helpfulLinks.map((link) => (
              <StyledLink href="#" key={link} variant="body1">
                <StyledChevron /> {link}
              </StyledLink>
            ))}
          </Grid>
        </Grid>
      </Container>
    </FooterContainer>
  );
};

export default Footer;