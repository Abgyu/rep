import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

const DashboardLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          ml: '240px',
          minHeight: '100vh',
          backgroundColor: '#f5f5f5'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;