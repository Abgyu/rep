import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Alert
} from '@mui/material';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import BusinessList from '../components/Dashboard/BusinessList';
import api from '../utils/api';

const BusinessListPage = () => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [statusOptions] = useState(['Pending', 'Approved', 'Rejected']);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const response = await api.get('/api/businesses');
      setBusinesses(response.data);
    } catch (error) {
      setError('Failed to load businesses');
    }
  };

  const handleStatusChange = async (business) => {
    setSelectedBusiness(business);
    setOpenDialog(true);
  };

  const handleUpdateStatus = async (newStatus) => {
    try {
      await api.put(`/api/businesses/${selectedBusiness._id}/status`, {
        status: newStatus
      });
      setSuccess('Status updated successfully');
      fetchBusinesses();
      setOpenDialog(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Update failed');
    }
  };

  const handleDelete = async (businessId) => {
    if (window.confirm('Are you sure you want to delete this business?')) {
      try {
        await api.delete(`/api/businesses/${businessId}`);
        setSuccess('Business deleted successfully');
        fetchBusinesses();
      } catch (error) {
        setError(error.response?.data?.message || 'Delete failed');
      }
    }
  };

  return (
    <DashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Business Registrations
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href="/business/register"
        >
          Register New Business
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Paper sx={{ p: 2 }}>
        <BusinessList
          businesses={businesses}
          onView={(business) => console.log('View', business)}
          onEdit={handleStatusChange}
          onDelete={handleDelete}
        />
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Update Business Status</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            {statusOptions.map((status) => (
              <Button
                key={status}
                variant="outlined"
                sx={{ mr: 1 }}
                onClick={() => handleUpdateStatus(status)}
              >
                {status}
              </Button>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default BusinessListPage;