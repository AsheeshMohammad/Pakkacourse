import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const TermsAndConditions: React.FC = () => {
  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 12, mb: 4, px: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          Terms and Conditions
        </Typography>
        
        <Box sx={{ '& p': { mb: 2 }, '& h6': { mt: 3, mb: 1, fontWeight: 'bold' } }}>
          <Typography variant="body1" paragraph>
            These terms govern your use of the website and services.
          </Typography>

          <Typography variant="h6" component="h2">
            1. Acceptance of Terms
          </Typography>
          <Typography variant="body1" paragraph>
            By accessing or using the website located at pakkacourse.com (the "Service"), operated by Pakka Course ("Company," "we," "us," or "our"), you agree to be bound by these Terms and Conditions ("Terms"). If you disagree with any part of the terms, then you may not access the Service.
          </Typography>

          <Typography variant="h6" component="h2">
            2. Intellectual Property
          </Typography>
          <Typography variant="body1" paragraph>
            The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of Pakka Course and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Pakka Course.
          </Typography>

          <Typography variant="h6" component="h2">
            3. User Accounts
          </Typography>
          <Typography variant="body1" paragraph>
            If you create an account with us, you must provide us with information that is accurate, complete, and current at all times. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
          </Typography>

          <Typography variant="h6" component="h2">
            4. Links To Other Websites
          </Typography>
          <Typography variant="body1" paragraph>
            Our Service may contain links to third-party websites or services that are not owned or controlled by Pakka Course. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
          </Typography>

          <Typography variant="h6" component="h2">
            5. Termination
          </Typography>
          <Typography variant="body1" paragraph>
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </Typography>

          <Typography variant="h6" component="h2">
            6. Governing Law
          </Typography>
          <Typography variant="body1" paragraph>
            These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
          </Typography>

          <Typography variant="h6" component="h2">
            7. Changes to Terms
          </Typography>
          <Typography variant="body1" paragraph>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
          </Typography>

          <Typography variant="h6" component="h2">
            8. Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions about these Terms, please contact us at pakkacourse@gmail.com.
          </Typography>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default TermsAndConditions;