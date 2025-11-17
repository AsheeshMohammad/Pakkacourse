import React, { useState, useEffect } from 'react'; import { Box, IconButton } from '@mui/material'; import { FaInstagram, FaLinkedin, FaYoutube, FaFacebook, FaTwitter, FaGithub } from 'react-icons/fa'; import { jwtAxios } from '../../utils/axios'; import { API_ENDPOINTS } from '../../utils/endpoints';

interface SocialLink {
  link_id: number;
  link_name: string;
  link_url: string;
  linktype: string;
  clicks: string;
  displayorder: number;
}

interface SocialLinksProps {
  isDark?: boolean;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ isDark = false }) => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    try {
      const response = await jwtAxios.get(`${API_ENDPOINTS.LINKS.GET_LIST}?type=social`);
      if (response.data.success) {
        setSocialLinks(response.data.data.links);
      }
    } catch (error) {
      console.error('Error fetching social links:', error);
    }
  };

  const getIcon = (linkName: string, linkUrl: string, isDark = false) => {
    const name = linkName.toLowerCase();
    const url = linkUrl.toLowerCase();
    const iconColor = isDark ? '#333' : undefined;
    
    if (name.includes('instagram') || url.includes('instagram')) {
      return <FaInstagram size={24} color={iconColor || "#E1306C"} />;
    }
    if (name.includes('linkedin') || url.includes('linkedin')) {
      return <FaLinkedin size={24} color={iconColor || "#0A66C2"} />;
    }
    if (name.includes('youtube') || url.includes('youtube') || url.includes('youtu.be')) {
      return <FaYoutube size={24} color={iconColor || "#FF0000"} />;
    }
    if (name.includes('facebook') || url.includes('facebook')) {
      return <FaFacebook size={24} color={iconColor || "#1877F2"} />;
    }
    if (name.includes('twitter') || url.includes('twitter') || url.includes('x.com')) {
      return <FaTwitter size={24} color={iconColor || "#1DA1F2"} />;
    }
    if (name.includes('github') || url.includes('github')) {
      return <FaGithub size={24} color={iconColor || "#333"} />;
    }
    
    return <FaFacebook size={24} color={iconColor || "#1877F2"} />; // Default icon
  };

  const handleClick = async (link: SocialLink) => {
    try {
      await jwtAxios.post(API_ENDPOINTS.LINKS.CLICK_COUNT, { linkId: link.link_id });
      window.open(link.link_url, '_blank');
    } catch (error) {
      console.error('Error incrementing click count:', error);
      window.open(link.link_url, '_blank');
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {socialLinks
        .sort((a, b) => a.displayorder - b.displayorder)
        .map((link) => (
          <Box
            key={link.link_id}
            component="a"
            onClick={() => handleClick(link)}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                transform: 'scale(1.1)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {getIcon(link.link_name, link.link_url, isDark)}
          </Box>
        ))}
    </Box>
  );
};

export default SocialLinks;