import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const PrivacyPolicy: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4,mt: 5 }}>
      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
          Privacy Policy
        </Typography>
        
        <Typography variant="body1" paragraph>
          This policy outlines how we collect, use, and protect your personal data.
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            1. Information Collection and Use
          </Typography>
          <Typography variant="body1" paragraph>
            We collect several different types of information for various purposes to provide and improve our Service to you.
          </Typography>
          
          <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold', mt: 2 }}>
            Types of Data Collected:
          </Typography>
          
          <Typography variant="body1" paragraph>
            <strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to:
          </Typography>
          <Box component="ul" sx={{ pl: 3 }}>
            <li>Email address</li>
            <li>First name and last name</li>
            <li>Phone number</li>
            <li>Address, State, Province, ZIP/Postal code, City</li>
          </Box>
          
          <Typography variant="body1" paragraph>
            <strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g., IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, and other diagnostic data.
          </Typography>
          
          <Typography variant="body1" paragraph>
            <strong>Tracking & Cookies Data:</strong> We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            2. Use of Data
          </Typography>
          <Typography variant="body1" paragraph>
            Pakka Course uses the collected data for various purposes:
          </Typography>
          <Box component="ul" sx={{ pl: 3 }}>
            <li>To provide and maintain the Service</li>
            <li>To notify you about changes to our Service</li>
            <li>To allow you to participate in interactive features when you choose to do so</li>
            <li>To provide customer support</li>
            <li>To monitor the usage of the Service</li>
            <li>To detect, prevent, and address technical issues</li>
            <li>To provide you with news, special offers, and general information about other goods, services, and events which we offer</li>
          </Box>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            3. Disclosure of Data
          </Typography>
          <Typography variant="body1" paragraph>
            We may disclose your Personal Data in the good faith belief that such action is necessary to:
          </Typography>
          <Box component="ul" sx={{ pl: 3 }}>
            <li>Comply with a legal obligation</li>
            <li>Protect and defend the rights or property of Pakka Course</li>
            <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
            <li>Protect the personal safety of users of the Service or the public</li>
            <li>Protect against legal liability</li>
          </Box>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            4. Security of Data
          </Typography>
          <Typography variant="body1" paragraph>
            The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            5. Your Data Protection Rights
          </Typography>
          <Typography variant="body1" paragraph>
            Depending on your location (e.g., California, EU), you may have specific rights regarding your personal data, such as the right to access, update, or request deletion of the information we have on you.
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            6. Changes to This Privacy Policy
          </Typography>
          <Typography variant="body1" paragraph>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            7. Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions about this Privacy Policy, please contact us:
          </Typography>
          <Typography variant="body1" paragraph>
            By email: <strong>pakkacourse@gmail.com</strong>
          </Typography>
        </Box>

        <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid #e0e0e0' }}>
          <Typography variant="body2" color="text.secondary">
            Last updated: {new Date().toLocaleDateString()}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;