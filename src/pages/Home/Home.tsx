import Footer from "../../components/Footer/Footer";
import { Box } from "@mui/material";
import { MainContainer } from "./Home.styles";
import HeroSection from "../../components/HeroSection/HeroSection";
import MentorSection from "../../components/MentorSection/MentorSection";
import UsefulLinks from "../../components/UsefulLinks/UsefulLinks";
import { useEffect, useRef } from "react";
import { jwtAxios } from "../../utils/axios";
import { API_ENDPOINTS } from "../../utils/endpoints";

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logUserAccess = async () => {
      try {
        await jwtAxios.post(API_ENDPOINTS.LOGS.ACCESS);
      } catch (error) {
        console.error('Failed to log user access:', error);
      }
    };
    logUserAccess();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    [heroRef, linksRef, workRef, footerRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <MainContainer>
      <Box mt={8}>
        <Box 
          ref={heroRef}
          className="fade-in-section"
          sx={{
            '&.fade-in-section': {
              opacity: 0,
              transform: 'translateY(30px)',
              transition: 'all 0.8s ease-out'
            },
            '&.fade-in-visible': {
              opacity: 1,
              transform: 'translateY(0)'
            }
          }}
        >
          <HeroSection />
        </Box>
        <Box 
          ref={linksRef}
          id="links"
          className="fade-in-section"
          sx={{
            '&.fade-in-section': {
              opacity: 0,
              transform: 'translateY(30px)',
              transition: 'all 0.8s ease-out 0.2s'
            },
            '&.fade-in-visible': {
              opacity: 1,
              transform: 'translateY(0)'
            }
          }}
        >
          <UsefulLinks />
        </Box>
        <Box 
          ref={workRef}
          id="work"
          className="fade-in-section"
          sx={{
            '&.fade-in-section': {
              opacity: 0,
              transform: 'translateY(30px)',
              transition: 'all 0.8s ease-out 0.4s'
            },
            '&.fade-in-visible': {
              opacity: 1,
              transform: 'translateY(0)'
            }
          }}
        >
          <MentorSection />
        </Box>
        <Box 
          ref={footerRef}
          className="fade-in-section"
          sx={{
            '&.fade-in-section': {
              opacity: 0,
              transform: 'translateY(30px)',
              transition: 'all 0.8s ease-out 0.6s'
            },
            '&.fade-in-visible': {
              opacity: 1,
              transform: 'translateY(0)'
            }
          }}
        >
          <Footer />
        </Box>
      </Box>
    </MainContainer>
  );
};

export default Home;
