import React, { useState, useEffect } from 'react';
import {
  Paper,
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
  Alert,
  Card,
  CardContent
} from '@mui/material';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import api from '../utils/api';

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    business_id: '',
    amount: '',
    payment_method: ''
  });
  const [businesses, setBusinesses] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const paymentMethods = [
    { id: 'CASH', name: 'Cash' },
    { id: 'BANK_TRANSFER', name: 'Bank Transfer' },
    { id: 'MOBILE_MONEY', name: 'Mobile Money' }
  ];

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await api.get('/api/businesses?payment_status=false');
        setBusinesses(response.data);
      } catch (error) {
        setError('Failed to load businesses');
      }
    };
    fetchBusinesses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/payments', formData);
      setSuccess('Payment processed successfully');
      setFormData({
        business_id: '',
        amount: '',
        payment_method: ''
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Payment failed');
    }
  };

  return (
    <DashboardLayout>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Process Payment
            </Typography>
            
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    select
                    label="Select Business"
                    value={formData.business_id}
                    onChange={(e) => setFormData({...formData, business_id: e.target.value})}
                    required
                  >
                    {businesses.map((business) => (
                      <MenuItem key={business._id} value={business._id}>
                        {business.business_name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Amount"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    select
                    label="Payment Method"
                    value={formData.payment_method}
                    onChange={(e) => setFormData({...formData, payment_method: e.target.value})}
                    required
                  >
                    {paymentMethods.map((method) => (
                      <MenuItem key={method.id} value={method.id}>
                        {method.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Process Payment
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Payment Instructions
              </Typography>
              <Typography variant="body2" color="text.secondary">
                1. Select the business from the dropdown
              </Typography>
              <Typography variant="body2" color="text.secondary">
                2. Enter the payment amount
              </Typography>
              <Typography variant="body2" color="text.secondary">
                3. Choose payment method
              </Typography>
              <Typography variant="body2" color="text.secondary">
                4. Click process payment to complete
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default PaymentPage;