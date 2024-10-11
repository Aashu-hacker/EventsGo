import { useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../authentication/auth-forms/AuthLogin'; // For Customer Login Form
import CustomerLogin from '../authentication/auth-forms/CustomerLogin'; // Create a similar form for vendor login
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  // State to track which form to show
  const [loginType, setLoginType] = useState(''); // '' (default), 'vendor', 'customer'

  return (
    <AuthWrapper1>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item sx={{ mb: 3 }}>
                    <Link to="/" aria-label="logo">
                      <Logo />
                    </Link>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container direction={{ xs: 'column-reverse', md: 'row' }} alignItems="center" justifyContent="center">
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography color="secondary.main" gutterBottom variant={downMD ? 'h3' : 'h2'}>
                            Hi, Welcome Back
                          </Typography>
                          <Typography variant="caption" fontSize="16px" textAlign={{ xs: 'center', md: 'inherit' }}>
                            Choose login type to continue
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* Login type buttons */}
                  <Grid item xs={12}>
                    <Stack direction="row" spacing={2} justifyContent="center">
                      <Button
                        variant={loginType === 'vendor' ? 'contained' : 'outlined'}
                        color="secondary"
                        onClick={() => setLoginType('vendor')}
                      >
                        Vendor Login
                      </Button>
                      <Button
                        variant={loginType === 'customer' ? 'contained' : 'outlined'}
                        color="primary"
                        onClick={() => setLoginType('customer')}
                      >
                        Customer Login
                      </Button>
                    </Stack>
                  </Grid>

                  {/* <Grid item xs={12}>
                    <Divider />
                  </Grid> */}

                  {/* Conditionally render the login form based on loginType */}
                  <Grid item xs={12}>
                    {loginType === 'vendor' && <AuthLogin />}
                    {loginType === 'customer' && <CustomerLogin />} {/* Customer Login Form */}
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Login;
