import { Box, Container, Typography, Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import bannerImage from "../../assets/Images/bannerimage.jpg";

const BannerContainer = styled(Box)(() => ({
  background: "linear-gradient(135deg, #e8f0f5 0%, #f5f5f5 100%)",
  padding: "60px 20px",
  position: "relative",
  overflow: "hidden",
  
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    right: 0,
    width: "40%",
    height: "100%",
    backgroundImage: "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22><circle cx=%22100%22 cy=%2250%22 r=%2240%22 fill=%22%23d4a5d4%22 opacity=%220.5%22/><circle cx=%22300%22 cy=%22150%22 r=%2260%22 fill=%22%238b9dc3%22 opacity=%220.3%22/></svg>')",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    opacity: 0.3,
  },
}));

const ContentWrapper = styled(Container)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "40px",
  alignItems: "center",
  position: "relative",
  zIndex: 1,

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: "30px",
  },
}));

const TextContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "48px",
  fontWeight: 700,
  color: "#1a3a3a",
  lineHeight: "1.2",

  [theme.breakpoints.down("md")]: {
    fontSize: "36px",
  },
}));

const Description = styled(Typography)({
  fontSize: "16px",
  color: "#666",
  lineHeight: "1.6",
});

const FormWrapper = styled(Box)({
  display: "flex",
  gap: "12px",
  alignItems: "center",
  flexWrap: "wrap",

  "& .MuiTextField-root": {
    flex: 1,
    minWidth: "200px",
  },
});

interface BannerProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onSubmit?: (email: string) => void;
}

const Banner = ({
  title = "Join the Future-Changing Course",
  description = "Transform your career with cutting-edge skills. Get together with like-minded learners and unlock your potential in today's digital world.",
  buttonText = "Get Started",
  onSubmit,
}: BannerProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    if (onSubmit && email) {
      onSubmit(email);
    }
  };

  return (
    <BannerContainer>
      <ContentWrapper maxWidth="lg">
        <TextContent>
          <Title>{title}</Title>
          <Description>{description}</Description>
          {/* <Box component="form" onSubmit={handleSubmit}>
            <FormWrapper>
              <TextField
                name="email"
                type="email"
                placeholder="Your email address"
                variant="outlined"
                size="small"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#fff",
                    borderRadius: "25px",
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#2d7a7a",
                  color: "#fff",
                  borderRadius: "25px",
                  padding: "10px 30px",
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: "16px",
                  "&:hover": {
                    backgroundColor: "#245a5a",
                  },
                }}
              >
                {buttonText}
              </Button>
            </FormWrapper>
          </Box> */}
        </TextContent>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            height: "400px",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <img
            src={bannerImage}
            alt="Banner"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </ContentWrapper>
    </BannerContainer>
  );
};

export default Banner;
