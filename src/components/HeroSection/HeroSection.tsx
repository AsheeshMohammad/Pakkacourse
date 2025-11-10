import { Box, Typography } from "@mui/material";
import {
  HomeHeaderHeadLine,
  HomeHeaderHeadSideLine,
  HomeHeaderTab,
  HomeProfileContainer,
  ProfileDetails,
  ProfileDetailsContainer,
} from "../HomeContainer/HomeContainer.styles";
import ProfileImaage from "../../assets/ProfileImages/ProfileImage.jpeg";
import SocialLinks from "../SocialLinks/SocialLinks";

const HeroSection = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f8f9fa',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: { xs: 'center', md: 'flex-start' },
        gap: { xs: 4, md: 8 },
        px: { xs: 2, md: 4 },
        py: { xs: 4, md: 0 },
        textAlign: { xs: 'center', md: 'left' }
      }}
    >
      <Box>
        <HomeProfileContainer>
          <img src={ProfileImaage} alt="Profile Image" />
          <ProfileDetailsContainer>
            <ProfileDetails>
              <span className="profile-name">Rahul Yadav</span>
              <br />
              <span className="profile-designation">Founder & Instructor</span>
              <div className="social-icons">
                <SocialLinks />
              </div>
            </ProfileDetails>
          </ProfileDetailsContainer>
        </HomeProfileContainer>
      </Box>
      
      <Box sx={{ maxWidth: '500px', width: '100%' }}>
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: '1.8rem', md: '2.5rem' },
            fontWeight: 'bold',
            color: '#333',
            mb: 2,
            lineHeight: 1.2
          }}
        >
          Join the Future-Changing Course
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: '1rem', md: '1.2rem' },
            color: '#666',
            fontWeight: 400,
            lineHeight: 1.5
          }}
        >
          Transform your career with cutting-edge skills. Get together with like-minded learners and unlock your potential in today's digital world.
        </Typography>
      </Box>
    </Box>
  );
};

export default HeroSection;