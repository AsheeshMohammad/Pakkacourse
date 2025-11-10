import React from 'react';
import { Box } from '@mui/material';

interface YouTubeVideoProps {
  videoId: string;
  title?: string;
}

const YouTubeVideo: React.FC<YouTubeVideoProps> = ({ videoId, title = "YouTube video player" }) => {
  return (
    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ 
        position: 'relative',
        width: '100%',
        maxWidth: '560px',
        height: 0,
        paddingBottom: '56.25%', // 16:9 aspect ratio
      }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none'
          }}
        />
      </Box>
    </Box>
  );
};

export default YouTubeVideo;