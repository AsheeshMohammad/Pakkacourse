import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SectionHeader } from "../../styles/globalStyles";
import { jwtAxios } from "../../utils/axios";
import { API_ENDPOINTS } from "../../utils/endpoints";
import YouTubeVideo from "../YouTubeVideo/YouTubeVideo";

interface UsefulLink {
  link_id: number;
  link_name: string;
  link_url: string;
  linktype: string;
  clicks: string;
  displayorder: number;
}

const UsefulLinks: React.FC = () => {
  const [usefulLinks, setUsefulLinks] = useState<UsefulLink[]>([]);

  const navigateToTerms = () => {
    window.location.href = '/#/terms-and-conditions';
  };

  const navigateToPrivacy = () => {
    window.location.href = '/#/privacy-policy';
  };

  useEffect(() => {
    fetchUsefulLinks();
  }, []);

  const fetchUsefulLinks = async () => {
    try {
      const response = await jwtAxios.get(
        `${API_ENDPOINTS.LINKS.GET_LIST}?type=resource`
      );
      if (response.data.success) {
        setUsefulLinks(response.data.data.links);
      }
    } catch (error) {
      console.error("Error fetching useful links:", error);
    }
  };

  const handleLinkClick = async (link: UsefulLink) => {
    try {
      await jwtAxios.post(API_ENDPOINTS.LINKS.CLICK_COUNT, {
        linkId: link.link_id,
      });
      window.open(link.link_url, "_blank");
    } catch (error) {
      console.error("Error incrementing click count:", error);
      window.open(link.link_url, "_blank");
    }
  };

  // if (usefulLinks.length === 0) {
  //   return null;
  // }

  return (
    <Box sx={{ py: 2, backgroundColor: "#f5f5f5", mt: 1 }}>
      <Container maxWidth="lg">
        <SectionHeader marginTop={"1px !important"} gutterBottom>
          Useful Links
        </SectionHeader>

        <Grid spacing={1}>
          {usefulLinks
            .sort((a, b) => a.displayorder - b.displayorder)
            .map((link) => (
              <Grid item xs={12} key={link.link_id}>
                <Card
                  sx={{
                    width: "90%",
                    margin:'auto',
                    backgroundColor: "#ffffff",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: 2,
                    },
                    "& .MuiCardContent-root": { padding: "5px !important" },
                  }}
                  onClick={() => handleLinkClick(link)}
                >
                  <CardContent
                    sx={{
                      textAlign: "center",
                      pt: 1,
                      pb: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography component="span" sx={{ fontWeight: 400 }}>
                      {link.link_name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
        
        {/* YouTube Videos */}
        <YouTubeVideo videoId="6HkZKubvDpI" />
        <YouTubeVideo videoId="U0qBHeNF9I8" />
      </Container>
    </Box>
  );
};

export default UsefulLinks;
