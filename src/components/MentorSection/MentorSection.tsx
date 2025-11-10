import { Box, Typography, Card, CardContent, Grid, Modal, IconButton } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Img1 from "../../assets/ProfileImages/GitamSession1.jpeg";
import Img2 from "../../assets/ProfileImages/teach1.jpeg";
import Img3 from "../../assets/ProfileImages/Teach2.jpeg";
import Img4 from "../../assets/ProfileImages/cuhSession1.jpeg";
import Img5 from "../../assets/ProfileImages/cuhSession2.jpeg";
import Img6 from "../../assets/ProfileImages/cuhCompetition1.jpeg";
import Img7 from "../../assets/ProfileImages/CuhCompetition2.jpeg";
import Img8 from "../../assets/ProfileImages/CuhCompetition3.jpeg";

const workData = [
  { img: Img1, detail: "Delivering Career Guidance to Gitam Deemed University students" },
  { img: Img2, detail: "Leading Initial Physical Classes and hands-on instruction" },
  { img: Img3, detail: "Pioneering the first sessions of Live Online Teaching" },
  { img: Img4, detail: "Mentoring Central University Haryana students and sharing professional insights" },
  { img: Img5, detail: "Fostering Active Student Participation in virtual learning environments" },
  { img: Img6, detail: "Launching the Coding Competition (setting the stage)" },
  { img: Img7, detail: "Successfully Managing and concluding the coding competition event" },
  { img: Img8, detail: "Briefing Participants and clarifying competition rules" }
];

const MentorSection = () => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % workData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + workData.length) % workData.length);
  };
  return (
    <Box sx={{ position: 'relative', py: 8, px: 4, backgroundColor: '#f5f5f5', overflow: 'hidden' }}>
      <Box
        component="video"
        src="/src/assets/stock.mp4"
        autoPlay
        muted
        loop
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1
        }}
      />
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.8rem', md: '2.5rem' },
            fontWeight: 'bold',
            color: '#333',
            mb: 1
          }}
        >
          Our Work
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: '#666',
            fontSize: '14px'
          }}
        >
          WOW !!! WHAT A JOURNEY SO FAR...!!!
        </Typography>
      </Box>
      
      <Box sx={{ position: 'relative', maxWidth: '800px', mx: 'auto' }}>
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '2px',
            backgroundColor: '#ddd',
            transform: 'translateX(-50%)'
          }}
        />
        {workData.map((work, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 6,
              flexDirection: index % 2 === 0 ? 'row' : 'row-reverse'
            }}
          >
            <Box
              sx={{
                width: '45%',
                pr: index % 2 === 0 ? 4 : 0,
                pl: index % 2 === 0 ? 0 : 4
              }}
            >
              <Card
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.15)' },
                  p: 3
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'bold', mb: 1, color: '#333' }}
                >
                  Work Session {index + 1}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#666', mb: 2, fontSize: '12px' }}
                >
                  {work.detail}
                </Typography>
                <Box
                  component="img"
                  src={work.img}
                  alt={`Work ${index + 1}`}
                  onClick={() => handleImageClick(index)}
                  sx={{
                    width: '60px',
                    height: '40px',
                    objectFit: 'cover',
                    borderRadius: 1,
                    cursor: 'pointer',
                    '&:hover': { opacity: 0.8 }
                  }}
                />
              </Card>
            </Box>
            
            <Box
              sx={{
                position: 'relative',
                zIndex: 1
              }}
            >
              <Box
                sx={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#2196F3',
                  border: '3px solid #fff',
                  boxShadow: '0 0 0 2px #2196F3'
                }}
              />
            </Box>
            
            <Box
              sx={{
                width: '45%',
                textAlign: index % 2 === 0 ? 'right' : 'left',
                pr: index % 2 === 0 ? 0 : 4,
                pl: index % 2 === 0 ? 4 : 0
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: '#999', fontSize: '12px', mb: 1 }}
              >
                Session
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}
              >
                {String(index + 1).padStart(2, '0')}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: '#999', fontSize: '12px' }}
              >
                2024
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.9)'
        }}
      >
        <Box sx={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: 'absolute',
              top: -50,
              right: 0,
              color: 'white',
              zIndex: 1
            }}
          >
            <CloseIcon />
          </IconButton>
          
          <IconButton
            onClick={handlePrev}
            sx={{
              position: 'absolute',
              left: -50,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'white',
              zIndex: 1
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          
          <Box
            component="img"
            src={workData[currentIndex]?.img}
            alt={`Work ${currentIndex + 1}`}
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: '80vh',
              objectFit: 'contain'
            }}
          />
          
          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: -50,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'white',
              zIndex: 1
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
          
          <Typography
            variant="body1"
            sx={{
              color: 'white',
              textAlign: 'center',
              mt: 2,
              px: 2
            }}
          >
            {workData[currentIndex]?.detail}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default MentorSection;