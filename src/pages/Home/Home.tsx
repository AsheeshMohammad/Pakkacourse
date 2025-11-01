import Footer from "../../components/Footer/Footer";
import { Box } from "@mui/material";
import HomeContainer from "../../components/HomeContainer/HomeContainer";
import { MainContainer } from "./Home.styles";
import UsefulLinks from "../../components/UsefulLinks/UsefulLinks";
import OurWork from "../../components/OurWork/OurWork";
import { useEffect } from "react";
import { jwtAxios } from "../../utils/axios";
import { API_ENDPOINTS } from "../../utils/endpoints";

const Home = () => {
  useEffect(() => {
    const logUserAccess = async () => {
      try {
        await jwtAxios.post(API_ENDPOINTS.LOGS.ACCESS);
      } catch (error) {
        console.error('Failed to log user access:', error);
      }
    };
    logUserAccess();
  }, []);

  return (
    <MainContainer>
      <Box mt={8}>
        <HomeContainer />
        <Box id="links">
          <UsefulLinks />
        </Box>
        <Box id="work">
          <OurWork />
        </Box>
        <Footer />
      </Box>
    </MainContainer>
  );
};

export default Home;
