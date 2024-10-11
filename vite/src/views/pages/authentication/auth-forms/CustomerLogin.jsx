import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// third party
import * as Yup from 'yup';
import axios from 'axios';
import REACT_APP_BASE_URL from '../../../../utils/api';
import { Formik } from 'formik';

// project imports
// import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// import Google from 'assets/images/icons/social-google.svg';

// ============================|| FIREBASE - LOGIN ||============================ //

const CustomerLogin = ({ ...others }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);
  const [checked, setChecked] = useState(true);
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();
  
  const googleHandler = async () => {
    console.error('Login');
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Axios login API call
  const loginUser = async (values, setSubmitting) => {
    try {
      const response = await axios.post(`${REACT_APP_BASE_URL}/vendor/login`, {
        mobile_no: values.mobile,
        password: values.password
      });

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('authToken', token);
        localStorage.setItem(
          "emsLoginData",
          JSON.stringify(response.data.data)
        );
        setLoginError(null);
        navigate('/admin');
      }
    } catch (error) {
      console.error('Login error', error);
      setLoginError('Invalid mobile number or password');
    } finally {
      setSubmitting(false); // Reset submitting state
    }
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          {/* <AnimateButton>
            <Button
              disableElevation
              fullWidth
              onClick={googleHandler}
              size="large"
              variant="outlined"
              sx={{
                color: 'grey.700',
                backgroundColor: theme.palette.grey[50],
                borderColor: theme.palette.grey[100]
              }}
            >
              <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
              </Box>
              Sign in with Google
            </Button>
          </AnimateButton> */}
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
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
            <Typography variant="subtitle1">Sign in with Email address</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          mobile: '', // Now it's mobile instead of email
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          mobile: Yup.string()
            .matches(/^[0-9]{10}$/, 'Must be a valid 10-digit mobile number') // Validation for mobile number
            .required('Mobile number is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          loginUser(values, setSubmitting); // Call the login function with form values
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            {/* Mobile Number Input */}
            <FormControl fullWidth error={Boolean(touched.mobile && errors.mobile)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-mobile-login">Mobile Number</InputLabel>
              <OutlinedInput
                id="outlined-adornment-mobile-login"
                type="tel" // Type changed to "tel" for mobile number
                value={values.mobile}
                name="mobile"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Mobile Number"
                inputProps={{ maxLength: 10 }} // Limiting to 10 digits for mobile numbers
              />
              {touched.mobile && errors.mobile && (
                <FormHelperText error id="standard-weight-helper-text-mobile-login">
                  {errors.mobile}
                </FormHelperText>
              )}
            </FormControl>

            {/* Password Input */}
            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
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
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {/* Remember me and Forgot password */}
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                }
                label="Remember me"
              />
              <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                Forgot Password?
              </Typography>
            </Stack>

            {/* Login error message */}
            {loginError && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{loginError}</FormHelperText>
              </Box>
            )}

            {/* Form submission error */}
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            {/* Submit Button */}
            <Box sx={{ mt: 2 }}>
              <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                Sign in
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default CustomerLogin;
