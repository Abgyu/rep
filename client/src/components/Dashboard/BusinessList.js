import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const BusinessList = ({ businesses, onView, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Business Name</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Payment Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {businesses.map((business) => (
            <TableRow key={business._id}>
              <TableCell>{business.business_name}</TableCell>
              <TableCell>{business.owner_id?.full_name}</TableCell>
              <TableCell>{business.business_type_id?.name}</TableCell>
              <TableCell>{business.city_id?.name}</TableCell>
              <TableCell>
                <Chip
                  label={business.status}
                  color={getStatusColor(business.status)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={business.payment_status ? 'Paid' : 'Unpaid'}
                  color={business.payment_status ? 'success' : 'error'}
                  size="small"
                />
              </TableCell>
              <TableCell align="center">
                <Tooltip title="View">
                  <IconButton onClick={() => onView(business)}>
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton onClick={() => onEdit(business)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => onDelete(business._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BusinessList;