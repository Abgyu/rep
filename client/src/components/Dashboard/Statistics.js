import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import {
  Business as BusinessIcon,
  People as PeopleIcon,
  Payment as PaymentIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

const StatCard = ({ title, value, icon, color }) => (
  <Paper elevation={3} sx={{ p: 2 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      {icon}
      <Typography variant="h6" sx={{ ml: 1 }}>
        {title}
      </Typography>
    </Box>
    <Typography variant="h4">{value}</Typography>
  </Paper>
);

const Statistics = ({ stats }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Total Businesses"
          value={stats?.totalBusinesses || 0}
          icon={<BusinessIcon color="primary" />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          icon={<PeopleIcon color="secondary" />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Total Payments"
          value={stats?.totalPayments || 0}
          icon={<PaymentIcon color="success" />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Approved Businesses"
          value={stats?.approvedBusinesses || 0}
          icon={<CheckCircleIcon color="info" />}
        />
      </Grid>
    </Grid>
  );
};

export default Statistics;