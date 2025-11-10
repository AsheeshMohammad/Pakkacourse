import { Container, Grid, Typography, Box, Button } from "@mui/material";
import logo from "../../assets/Images/logo.png";
import SocialLinks from "../SocialLinks/SocialLinks";

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
    <Box sx={{ backgroundColor: '#f8f9fa', py: 6, mt: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={3}>
            <img 
              src={logo} 
              alt="Pakka Course Logo" 
              style={{ height: '40px', width: 'auto', marginBottom: '16px' }}
            />
            <Typography variant="body2" sx={{ color: '#666', mb: 3, lineHeight: 1.6 }}>
              With seamlessly connect your members with the community, resources, and tools.
            </Typography>
            <SocialLinks isDark />
          </Grid>

          {/* Links Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
              Links
            </Typography>
            {[
              { name: 'Links', id: 'links' },
              { name: 'Work', id: 'work' },
              { name: 'Terms & Conditions', id: '/terms-and-conditions' },
              { name: 'Privacy Policy', id: '/privacy-policy' }
            ].map((item) => (
              <Typography 
                key={item.name} 
                variant="body2" 
                sx={{ color: '#666', mb: 1, cursor: 'pointer', '&:hover': { color: '#333' } }}
                onClick={() => scrollToSection(item.id)}
              >
                {item.name}
              </Typography>
            ))}
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
              Contact US
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#666',
                cursor: 'pointer',
                '&:hover': { color: '#333' }
              }}
              onClick={() => window.location.href = 'mailto:rahul.yadav@gmail.com'}
            >
              rahul.yadav@gmail.com
            </Typography>
          </Grid>
        </Grid>
        
        {/* Copyright Section */}
        <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #e0e0e0', textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#666', fontSize: '12px', mb: 1 }}>
            © {new Date().getFullYear()} Pakka Course. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ color: '#666', fontSize: '12px' }}>
            Powered by{' '}
            <Typography
              component="a"
              href="https://kynix.co.in"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#666',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Kynix.co.in
            </Typography>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;