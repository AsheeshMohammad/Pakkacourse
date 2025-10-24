import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Box } from "@mui/material";
import HomeContainer from "../../components/HomeContainer/HomeContainer";
import { MainContainer } from "./Home.styles";
import OurWork from "../../components/OurWork/OurWork";

const Home = () => {
  return (
    <MainContainer>
      <Header />
      <Box mt={8}>
        <HomeContainer />
        <OurWork />
        <Footer />
      </Box>
    </MainContainer>
  );
};

export default Home;
