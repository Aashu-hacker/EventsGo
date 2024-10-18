import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, TextField, Button, InputAdornment, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import REACT_APP_BASE_URL from '../../../../utils/api';
// third party
import * as Yup from 'yup';
import axios from 'axios';
import { Formik } from 'formik';
import Swal from 'sweetalert2';
// project imports
// import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const AuthRegister = ({ ...others }) => {
  const navigate = useNavigate(); 
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);
  // const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const [vendors, setVendors] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const token = localStorage.getItem('authToken');
  const loggedInVendor = JSON.parse(localStorage.getItem('emsLoginData'));

  useEffect(() => {
    const fetchVendors = async () => {
      const response = await axios.get(`${REACT_APP_BASE_URL}/vendor`);
      setVendors(response.data.vendor);
    };

    const fetchCountries = async () => {
      const response = await axios.get(`${REACT_APP_BASE_URL}/country`);
      setCountries(response.data.data);
    };

    fetchVendors();
    fetchCountries();
  }, []);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();

  const googleHandler = async () => {
    console.error('Register');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('123456');
  }, []);

  // Fetch states based on selected country
  const fetchStates = async (countryId) => {
    const response = await axios.get(`${REACT_APP_BASE_URL}/state/${countryId}`);
    setStates(response.data.data);
  };

  // Fetch cities based on selected state
  const fetchCities = async (stateId) => {
    const response = await axios.get(`${REACT_APP_BASE_URL}/city/${stateId}`);
    setCities(response.data.data);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    try {
      const response = await axios.post(`${REACT_APP_BASE_URL}/customer`, values);

      if (response.status === 200 || response.status === 201) {
        Swal.fire('Success', 'Customer added successfully!', 'success');
        resetForm();
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', 'Failed to add customer. Please try again.', 'error');
    }

    setSubmitting(false);
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          {/* <AnimateButton>
            <Button
              variant="outlined"
              fullWidth
              onClick={googleHandler}
              size="large"
              sx={{
                color: 'grey.700',
                backgroundColor: theme.palette.grey[50],
                borderColor: theme.palette.grey[100]
              }}
            >
              <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
              </Box>
              Sign up with Google
            </Button>
          </AnimateButton> */}
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ alignItems: 'center', display: 'flex' }}>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            {/* <Button
              variant="outlined"
              sx={{
                cursor: 'unset',
                m: 2,
                py: 0.5,
                px: 7,
                borderColor: `${theme.palette.grey[100]} !important`,
                color: `${theme.palette.grey[900]}!important`,
                fontWeight: 500,
                borderRadius: `${customization.borderRadius}px`
              }}
              disableRipple
              disabled
            >
              OR
            </Button> */}
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign up with Email address</Typography>
          </Box>
        </Grid>
      </Grid>

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
            <Grid container spacing={matchDownSM ? 2 : 1}>
              {/* Vendor Dropdown */}
              {/* <Grid item xs={12} sm={6}>
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
              </Grid> */}

              {/* Customer Name */}
              <Grid item xs={12} sm={12}>
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
            </Grid>
            <br></br>
            <Grid container spacing={matchDownSM ? 2 : 1}>
              {/* Date of Birth */}
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
            </Grid>
            <br></br>
            <Grid container spacing={matchDownSM ? 2 : 1}>
              {/* Alternate Mobile Number */}
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
            </Grid>
            <br></br>
            <Grid container spacing={matchDownSM ? 2 : 1}>
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
              <Grid item xs={12} sm={6}>
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
            </Grid>
            <br></br>
            <Grid container spacing={matchDownSM ? 2 : 1}>
              {/* State Dropdown */}
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
            </Grid>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                  }
                  label={
                    <Typography variant="subtitle1">
                      Agree with &nbsp;
                      <Typography variant="subtitle1" component={Link} to="#">
                        Terms & Condition.
                      </Typography>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Sign up
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;
