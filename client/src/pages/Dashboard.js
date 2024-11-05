import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, CircularProgress } from '@mui/material';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import Statistics from '../components/Dashboard/Statistics';
import BusinessList from '../components/Dashboard/BusinessList';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentBusinesses, setRecentBusinesses] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, businessesRes] = await Promise.all([
          api.get('/api/stats'),
          api.get('/api/businesses?limit=5')
        ]);
        setStats(statsRes.data);
        setRecentBusinesses(businessesRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  if (!stats) {
    return (
      <DashboardLayout>
        <CircularProgress />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Welcome back, {user?.full_name}
      </Typography>
      
      <Statistics stats={stats} />
      
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Recent Business Registrations
            </Typography>
            <BusinessList 
              businesses={recentBusinesses}
              onView={(business) => console.log('View', business)}
              onEdit={(business) => console.log('Edit', business)}
              onDelete={(id) => console.log('Delete', id)}
            />
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default Dashboard;
