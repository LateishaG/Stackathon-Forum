import React from 'react';
import { Box, Icon, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box textAlign='center'>
      <Typography
        variant='h2'
        sx={{
          mr: 2,
          fontFamily: 'monospace',
          fontWeight: 700,
          color: 'inherit'
        }}
      >
        Welcome To Universal Dialog
      </Typography>

      <Icon
        sx={{ mr: 1, width: 400, height: 400 }}
        component='img'
        src='/static/universe.png'
        title='created by Icongeek26'
      />
    </Box>
  );
};

export default Home;
