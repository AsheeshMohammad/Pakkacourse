import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  Box,
  Typography,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
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

const getIcon = () => {
  return '🔗';
};

const getIconColor = () => {
  return '#fff';
};

const UsefulLinks: React.FC = () => {
  const [usefulLinks, setUsefulLinks] = useState<UsefulLink[]>([]);

  const navigateToTerms = () => {
    window.location.href = '/terms-and-conditions';
  };

  const navigateToPrivacy = () => {
    window.location.href = '/privacy-policy';
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
    <Box sx={{ py: 4, backgroundColor: "#fff" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            mb: 3,
            fontSize: '14px',
            fontWeight: 400,
            color: '#666',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
        >
          FEATURED LINKS
        </Typography>

        <Box sx={{ maxWidth: '400px', mx: 'auto' }}>
          {usefulLinks
            .sort((a, b) => a.displayorder - b.displayorder)
            .map((link, index) => (
              <Card
                key={link.link_id}
                sx={{
                  mb: 1.5,
                  borderRadius: '25px',
                  border: '1px solid #e8e8e8',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: 'none',
                  '&:hover': {
                    transform: 'translateX(4px)',
                    borderColor: '#d0d0d0',
                  },
                }}
                onClick={() => handleLinkClick(link)}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    py: 1.5,
                    px: 2.5,
                    '&:last-child': { pb: 1.5 },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: getIconColor(),
                        border: '1px solid #e0e0e0',
                        fontSize: '14px',
                      }}
                    >
                      {getIcon()}
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontSize: '15px',
                        color: '#333',
                      }}
                    >
                      {link.link_name}
                    </Typography>
                  </Box>
                  <ArrowForwardIosIcon
                    sx={{
                      fontSize: '14px',
                      color: '#bbb',
                    }}
                  />
                </CardContent>
              </Card>
            ))}
        </Box>
      </Container>
    </Box>
  );
};

export default UsefulLinks;
