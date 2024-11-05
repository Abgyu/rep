import React, { useState, useEffect } from 'react';
import {
  Paper,
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
  Alert
} from '@mui/material';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import api from '../utils/api';

const BusinessRegistration = () => {
  const [formData, setFormData] = useState({
    business_name: '',
    business_type_id: '',
    owner_id: '',
    city_id: '',
    full_address: '',
    description: ''
  });
  const [businessTypes, setBusinessTypes] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [businessTypesRes, citiesRes] = await Promise.all([
          api.get('/api/business-types'),
          api.get('/api/cities')
        ]);
        setBusinessTypes(businessTypesRes.data);
        setCities(citiesRes.data);
      } catch (error) {
        setError('Failed to load form data');
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/businesses', formData);
      setSuccess('Business registered successfully');
      setFormData({
        business_name: '',
        business_type_id: '',
        owner_id: '',
        city_id: '',
        full_address: '',
        description: ''
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <DashboardLayout>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Register New Business
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Business Name"
                value={formData.business_name}
                onChange={(e) => setFormData({...formData, business_name: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Business Type"
                value={formData.business_type_id}
                onChange={(e) => setFormData({...formData, business_type_id: e.target.value})}
                required
              >
                {businessTypes.map((type) => (
                  <MenuItem key={type._id} value={type._id}>
                    {type.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="City"
                value={formData.city_id}
                onChange={(e) => setFormData({...formData, city_id: e.target.value})}
                required
              >
                {cities.map((city) => (
                  <MenuItem key={city._id} value={city._id}>
                    {city.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Address"
                value={formData.full_address}
                onChange={(e) => setFormData({...formData, full_address: e.target.value})}
                required
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Register Business
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </DashboardLayout>
  );
};

export default BusinessRegistration;