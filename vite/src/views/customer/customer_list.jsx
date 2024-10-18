import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, CircularProgress, Box, IconButton, Chip } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import REACT_APP_BASE_URL from '../../utils/api';
import MainCard from 'ui-component/cards/MainCard';
import EditCustomerDialog from './edit_customer';

const token = localStorage.getItem('authToken');
const loggedInVendor = JSON.parse(localStorage.getItem('emsLoginData'));
const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false); // State to control modal visibility
  const [selectedCustomerId, setSelectedCustomerId] = useState(null); // State to store the selected customer ID

  // Fetch customer data from API
  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${REACT_APP_BASE_URL}/customer/${loggedInVendor?.id}`, {
        headers: { Authorization: 'Bearer ' + token }
      });
      setCustomers(response.data.data); // Assuming the data comes in the format of an array
    } catch (err) {
      setError('Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

   // Handle edit button click
   const handleEdit = (id) => {
    console.log('Edit customer with ID:', id);
    setSelectedCustomerId(id); // Set the customer ID for editing
    setOpenEditModal(true);    // Open the modal
  };

  // Close the modal
  const handleCloseModal = () => {
    setOpenEditModal(false);
    setSelectedCustomerId(null);
  };
  
  const handleDelete = async (id) => {
    // SweetAlert confirmation popup
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this customer?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Deleting the customer via API
          const response = await axios.delete(`${REACT_APP_BASE_URL}/customer/${id}`,{
            headers: { Authorization: 'Bearer ' + token }
          });
          // Update the state after deleting the customer
          setCustomers(customers.filter((customer) => customer.id !== id));
          // Success message
          Swal.fire(
            'Deleted!',
            'The customer has been deleted.',
            'success'
          );
        } catch (err) {
          console.error('Failed to delete customer:', err);
  
          // Error message
          Swal.fire(
            'Error!',
            'Failed to delete the customer. Please try again.',
            'error'
          );
        }
      }
    });
  };
  

  // Sample columns for the DataGrid
  const columns = [
    // { field: 'id', headerName: 'ID', width: 100, headerAlign: 'center', align: 'center' },
    { field: 'customer_name', headerName: 'Name', width: 200, headerAlign: 'center', align: 'center' },
    { field: 'address', headerName: 'Address', width: 150, headerAlign: 'center', align: 'center' },
    { field: `country_id`, headerName: 'Country', width: 150, headerAlign: 'center', align: 'center' },
    { field: `state_id`, headerName: 'State', width: 150, headerAlign: 'center', align: 'center' },
    { field: `city_id`, headerName: 'City', width: 150, headerAlign: 'center', align: 'center' },
    { field: `pincode`, headerName: 'Pincode', width: 150, headerAlign: 'center', align: 'center' },
    { field: `dob`, headerName: 'DOB', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'mob_no', headerName: 'Phone', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'is_active', headerName: 'Status', width: 150, headerAlign: 'center', align: 'center',
      renderCell: () => (
        <div>
          <Chip label="Active" color='success' size="small" variant="outlined" clickable>Active</Chip>
        </div>
      )
     },
    {
      field: 'Action',
      headerName: 'Action',
      width: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <div>
          <IconButton color="primary" onClick={() => handleEdit(params.row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton color="secondary" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      )
    }
  ];

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  // Show error if fetching fails
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    
    <MainCard title="Customer List">
      <DataGrid
        rows={customers}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        disableSelectionOnClick
      />
       {/* EditCustomerDialog component */}
      {selectedCustomerId && (
        <EditCustomerDialog
          open={openEditModal}
          handleClose={handleCloseModal}
          customerId={selectedCustomerId}
        />
      )}
    </MainCard>
    
  );
};

export default CustomerList;
