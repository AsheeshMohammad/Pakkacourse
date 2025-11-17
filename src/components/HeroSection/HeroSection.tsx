import { Box } from "@mui/material";
import {
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
        flexDirection: { xs: 'column', md: 'column' },
        alignItems: 'center',
        justifyContent: 'center',
        gap: { xs: 4, md: 8 },
        px: { xs: 2, md: 4 },
        py: { xs: 4, md: 8 },
        textAlign: 'center'
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
      </Box>
    </Box>
  );
};

export default HeroSection;