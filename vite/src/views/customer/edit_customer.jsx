import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import REACT_APP_BASE_URL from '../../utils/api';
import Swal from 'sweetalert2';

const token = localStorage.getItem('authToken');

const EditCustomerDialog = ({ open, handleClose, customerId }) => {
  const [customerData, setCustomerData] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Fetch customer details by ID
  useEffect(() => {
    if (customerId) {
      axios
        .get(`${REACT_APP_BASE_URL}/customer/${customerId}`,{
            headers: { Authorization: 'Bearer ' + token }
          })
        .then((response) => setCustomerData(response.data))
        .catch((error) => console.error('Failed to fetch customer data:', error));
    }
  }, [customerId]);

  // Fetch vendors, countries, states, and cities
  useEffect(() => {
    axios.get(`${REACT_APP_BASE_URL}/vendor`,{
        headers: { Authorization: 'Bearer ' + token }
      }).then((response) => setVendors(response.data.vendor));
    axios.get(`${REACT_APP_BASE_URL}/country`,{
        headers: { Authorization: 'Bearer ' + token }
      }).then((response) => setCountries(response.data.data));
  }, []);

  // Fetch states and cities
  const fetchStates = async (countryId) => {
    const response = await axios.get(`${REACT_APP_BASE_URL}/state/${countryId}`,{
        headers: { Authorization: 'Bearer ' + token }
      });
    setStates(response.data.data);
  };

  const fetchCities = async (stateId) => {
    const response = await axios.get(`${REACT_APP_BASE_URL}/city/${stateId}`,{
        headers: { Authorization: 'Bearer ' + token }
      });
    setCities(response.data.data);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.put(`${REACT_APP_BASE_URL}/customer/${customerId}`, values, {
        headers: { Authorization: 'Bearer ' + token },
      });

      Swal.fire('Success', 'Customer updated successfully!', 'success');
      handleClose();
    } catch (error) {
      Swal.fire('Error', 'Failed to update customer. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
    <DialogTitle>Edit Customer</DialogTitle>
    <DialogContent>
      {customerData ? (
        <Formik
          enableReinitialize
          initialValues={{
            vendor_id: customerData.vendor_id || '',
            customer_name: customerData.customer_name || '',
            dob: customerData.dob || '',
            mob_no: customerData.mob_no || '',
            alt_mob_no: customerData.alt_mob_no || '',
            address: customerData.address || '',
            pincode: customerData.pincode || '',
            country_id: customerData.country_id || '',
            state_id: customerData.state_id || '',
            city_id: customerData.city_id || '',
          }}
          validationSchema={Yup.object({
            vendor_id: Yup.string().required('Vendor is required'),
            customer_name: Yup.string().required('Customer Name is required'),
            dob: Yup.string().required('Date of Birth is required'),
            mob_no: Yup.string().required('Mobile number is required').matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
            alt_mob_no: Yup.string().matches(/^[0-9]{10}$/, 'Alternate phone number must be exactly 10 digits'),
            address: Yup.string().required('Address is required'),
            pincode: Yup.string().required('Pincode is required'),
            country_id: Yup.string().required('Country is required'),
            state_id: Yup.string().required('State is required'),
            city_id: Yup.string().required('City is required'),
          })}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* Vendor Dropdown */}
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Vendor</InputLabel>
                    <Select
                      label="Vendor"
                      name="vendor_id"
                      value={values.vendor_id}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.vendor_id && Boolean(errors.vendor_id)}
                    >
                      {vendors.map((vendor) => (
                        <MenuItem key={vendor.id} value={vendor.id}>
                          {vendor.owner_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
  
                {/* Customer Name */}
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Customer Name"
                    name="customer_name"
                    value={values.customer_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.customer_name && Boolean(errors.customer_name)}
                    helperText={touched.customer_name && errors.customer_name}
                  />
                </Grid>
  
                {/* Date of Birth */}
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    name="dob"
                    type="date"
                    value={values.dob}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.dob && Boolean(errors.dob)}
                    helperText={touched.dob && errors.dob}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
  
                {/* Mobile Number */}
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Mobile Number"
                    name="mob_no"
                    value={values.mob_no}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.mob_no && Boolean(errors.mob_no)}
                    helperText={touched.mob_no && errors.mob_no}
                  />
                </Grid>
  
                {/* Alternate Mobile Number */}
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Alternate Mobile Number"
                    name="alt_mob_no"
                    value={values.alt_mob_no}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.alt_mob_no && Boolean(errors.alt_mob_no)}
                    helperText={touched.alt_mob_no && errors.alt_mob_no}
                  />
                </Grid>
  
                {/* Address */}
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                  />
                </Grid>
  
                {/* Pincode */}
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Pincode"
                    name="pincode"
                    value={values.pincode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.pincode && Boolean(errors.pincode)}
                    helperText={touched.pincode && errors.pincode}
                  />
                </Grid>
  
                {/* Country Dropdown */}
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Country</InputLabel>
                    <Select
                      label="Country"
                      name="country_id"
                      value={values.country_id}
                      onChange={(e) => {
                        handleChange(e);
                        fetchStates(e.target.value);
                      }}
                      onBlur={handleBlur}
                      error={touched.country_id && Boolean(errors.country_id)}
                    >
                      {countries.map((country) => (
                        <MenuItem key={country.id} value={country.id}>
                          {country.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
  
                {/* State Dropdown */}
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>State</InputLabel>
                    <Select
                      label="State"
                      name="state_id"
                      value={values.state_id}
                      onChange={(e) => {
                        handleChange(e);
                        fetchCities(e.target.value);
                      }}
                      onBlur={handleBlur}
                      error={touched.state_id && Boolean(errors.state_id)}
                    >
                      {states.map((state) => (
                        <MenuItem key={state.id} value={state.id}>
                          {state.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
  
                {/* City Dropdown */}
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>City</InputLabel>
                    <Select
                      label="City"
                      name="city_id"
                      value={values.city_id}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.city_id && Boolean(errors.city_id)}
                    >
                      {cities.map((city) => (
                        <MenuItem key={city.id} value={city.id}>
                          {city.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
  
                {/* Submit Button */}
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Updating...' : 'Update Customer'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      ) : (
        <p>Loading...</p>
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="secondary">
        Cancel
      </Button>
    </DialogActions>
  </Dialog>
  
  );
};

export default EditCustomerDialog;
