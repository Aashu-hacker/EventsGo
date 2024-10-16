import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Grid, TextField, Button, InputAdornment, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import MainCard from 'ui-component/cards/MainCard';
import REACT_APP_BASE_URL from '../../utils/api';

const AddCustomer = () => {
  const navigate = useNavigate(); 
  const [vendors, setVendors] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');



  const token = localStorage.getItem('authToken');
  const loggedInVendor = JSON.parse(localStorage.getItem('emsLoginData')); // Get logged-in vendor details
  // Fetch vendors, countries, states, cities
  useEffect(() => {
    const fetchVendors = async () => {
      const response = await axios.get(`${REACT_APP_BASE_URL}/vendor`, {
        headers: { Authorization: 'Bearer ' + token }
      });
      setVendors(response.data.vendor);
    };

    const fetchCountries = async () => {
      const response = await axios.get(`${REACT_APP_BASE_URL}/country`, {
        headers: { Authorization: 'Bearer ' + token }
      });
      setCountries(response.data.data);
    };

    fetchVendors();
    fetchCountries();
  }, []);

    // Password strength calculation (simple example)
  const calculatePasswordStrength = (password) => {
    if (password.length > 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      return 'Strong';
    } else if (password.length > 5) {
      return 'Moderate';
    } else {
      return 'Weak';
    }
  };

  // Fetch states based on selected country
  const fetchStates = async (countryId) => {
    const response = await axios.get(`${REACT_APP_BASE_URL}/state/${countryId}`, {
      headers: { Authorization: 'Bearer ' + token }
    });
    setStates(response.data.data);
  };

  // Fetch cities based on selected state
  const fetchCities = async (stateId) => {
    const response = await axios.get(`${REACT_APP_BASE_URL}/city/${stateId}`, {
      headers: { Authorization: 'Bearer ' + token }
    });
    setCities(response.data.data);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    try {
      const response = await axios.post(`${REACT_APP_BASE_URL}/customer/${loggedInVendor?.id}`, values, {
        headers: { Authorization: 'Bearer ' + token }
      });

      if (response.status === 200 || response.status === 201) {
        Swal.fire('Success', 'Customer added successfully!', 'success');
        resetForm();
        navigate('/customer-list'); 
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', 'Failed to add customer. Please try again.', 'error');
    }

    setSubmitting(false);
  };

  return (
    <MainCard>
      <Formik
        initialValues={{
          vendor_id: loggedInVendor?.id || '', // Set the logged-in vendor by default
          customer_name: '',
          dob: '',
          mob_no: '',
          alt_mob_no: '',
          address: '',
          pincode: '',
          country_id: '',
          state_id: '',
          city_id: ''
        }}
        validationSchema={Yup.object({
          vendor_id: Yup.string().required('Vendor is required'),
          customer_name: Yup.string().required('Customer Name is required'),
          dob: Yup.string().required('Date of Birth is required'),
          mob_no: Yup.string()
            .required('Mobile number is required')
            .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
          alt_mob_no: Yup.string().matches(/^[0-9]{10}$/, 'Alternate phone number must be exactly 10 digits'),
          address: Yup.string().required('Address is required'),
          pincode: Yup.string().required('Pincode is required'),
          country_id: Yup.string().required('Country is required'),
          state_id: Yup.string().required('State is required'),
          city_id: Yup.string().required('City is required')
        })}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Vendor Dropdown */}
              <Grid item xs={2}>
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
              <Grid item xs={2}>
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
              <Grid item xs={2}>
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
              <Grid item xs={2}>
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
              <Grid item xs={2}>
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

              {/* Pincode */}
              <Grid item xs={2}>
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

              {/* Country Dropdown */}
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <InputLabel>Country</InputLabel>
                  <Select
                    label="Country"
                    name="country_id" // Store the country name
                    value={values.country_name}
                    onChange={(e) => {
                      const selectedCountry = countries.find((country) => country.id === e.target.value);
                      setFieldValue('country_id', selectedCountry.name); // Store the name
                      fetchStates(selectedCountry.id); // Fetch states based on country ID
                    }}
                    onBlur={handleBlur}
                    error={touched.country_name && Boolean(errors.country_name)}
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
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <InputLabel>State</InputLabel>
                  <Select
                    label="State"
                    name="state_id" // Store the state name
                    value={values.state_name}
                    onChange={(e) => {
                      const selectedState = states.find((state) => state.id === e.target.value);
                      setFieldValue('state_id', selectedState.name); // Store the name
                      fetchCities(selectedState.id); // Fetch cities based on state ID
                    }}
                    onBlur={handleBlur}
                    error={touched.state_name && Boolean(errors.state_name)}
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
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <InputLabel>City</InputLabel>
                  <Select
                    label="City"
                    name="city_id" // Store the city name
                    value={values.city_name}
                    onChange={(e) => {
                      const selectedCity = cities.find((city) => city.id === e.target.value);
                      setFieldValue('city_id', selectedCity.name); // Store the name
                    }}
                    onBlur={handleBlur}
                    error={touched.city_name && Boolean(errors.city_name)}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city.id} value={city.id}>
                        {city.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Password Field */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={(e) => {
                  handleChange(e);
                  setPasswordStrength(calculatePasswordStrength(e.target.value));
                }}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <p>Password strength: {passwordStrength}</p>
            </Grid>

            {/* Confirm Password Field */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>


              {/* Submit Button */}
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="secondary" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Add Customer'}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </MainCard>
  );
};

export default AddCustomer;
