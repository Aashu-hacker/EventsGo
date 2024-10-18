import React, { useState, useEffect } from 'react';
import { Box, Grid, Avatar, Typography, IconButton, Button, AppBar, Tabs, Tab, Card, CardMedia, CardContent, Divider } from '@mui/material';
import PersonAddTwoToneIcon from '@mui/icons-material/PersonAddTwoTone';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import PhotoIcon from '@mui/icons-material/Photo';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import bgProfile from '../../assets/images/img-profile-bg.png';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/system';
import axios from 'axios';
import REACT_APP_BASE_URL from '../../utils/api';
import Swal from 'sweetalert2';

// Custom styling for the media card
const MediaCard = styled(Card)(({ theme }) => ({
  maxWidth: 220,
  borderRadius: 10,
  boxShadow: theme.shadows[2]
}));

function ProfilePage() {
  const [galleryData, setGalleryData] = useState([]); // Holds gallery items from backend
  const [servicesData, setServicesData] = useState([]);
  const [servicePackageData, setServicePackageData] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [openCertificateModal, setOpenCertificateModal] = useState(false);
  // const matchDownSM = false; // Just an example. You can use media queries for responsiveness.

  const token = localStorage.getItem('authToken');

  // Handle edit button click
  const handleOpenAddCertificate = () => {
    window.alert('Please enter your new certificate');
    setOpenEditModal(true); 
  };

  // Handling tab change
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  // Helper function for accessibility props
  const a11yProps = (index) => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  });

  const fetchGallery = async () => {
    try {
      const response = await axios.get(`${REACT_APP_BASE_URL}/gallery/${JSON.parse(localStorage.getItem('emsLoginData')).id}`, {
        headers: { Authorization: 'Bearer ' + token }
      });
      setGalleryData(response.data.vendor);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${REACT_APP_BASE_URL}/service/${JSON.parse(localStorage.getItem('emsLoginData')).id}`, {
        headers: { Authorization: 'Bearer ' + token }
      });
      setServicesData(response.data);
    } catch (error) {
      console.error('Error fetching Services:', error);
    }
  };

  const fetchServicePackage = async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_BASE_URL}/service/servicePkg/${JSON.parse(localStorage.getItem('emsLoginData')).service_id}`,
        {
          headers: { Authorization: 'Bearer ' + token }
        }
      );

      setServicePackageData(response.data.data);
    } catch (error) {
      console.error('Error fetching Service Package:', error);
    }
  };

  // Handle file input change (multiple files)
  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  // Handle image upload (POST request)
  const handleUpload = async () => {
    if (selectedFiles) {
      const formData = new FormData();

      // Append each selected file to formData
      Array.from(selectedFiles).forEach((file) => {
        formData.append('images', file);
      });

      // Append vendor_id and service_id from localStorage
      const emsLoginData = JSON.parse(localStorage.getItem('emsLoginData'));
      formData.append('vendor_id', emsLoginData.id);
      formData.append('service_id', emsLoginData.service_id);

      try {
        await axios.post(`${REACT_APP_BASE_URL}/gallery`, formData, {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'multipart/form-data'
          }
        });

        // Re-fetch gallery data to display newly uploaded images
        fetchGallery();
        Swal.fire('Success', 'images: added successfully!', 'success');
      } catch (error) {
        console.error('Error uploading images:', error);
        Swal.fire('Error', 'Error uploading images. Please try again.', 'error');
      }
    }
  };

  const handleDelete = async (id) => {
    // SweetAlert confirmation popup
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this Service Package?',
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
          await axios.delete(`${REACT_APP_BASE_URL}/service/servicePkg/${id}`, {
            headers: { Authorization: 'Bearer ' + token }
          });
          fetchServicePackage();
          Swal.fire('Deleted!', 'Service Package has been deleted.', 'success');
        } catch (err) {
          console.error('Failed to delete Service Package:', err);

          // Error message
          Swal.fire('Error!', 'Failed to delete the Service Package. Please try again.', 'error');
        }
      }
    });
  };

  // Fetch gallery on component mount
  useEffect(() => {
    fetchGallery();
    fetchServices();
    fetchServicePackage();
  }, []);

  return (
    <Box>
      {/* Profile Header Section */}
      <Box
        sx={{
          backgroundImage: `url(${bgProfile})`, // Background image URL from the HTML
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '40px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Grid container direction="row" alignItems="center" justifyContent="space-between" sx={{ padding: '0 55px', marginTop: '10px' }}>
          <Grid item>
            <Grid container direction="row" alignItems="center" spacing={2}>
              {/* Avatar and User Details */}
              <Grid item>
                <Avatar
                  src={`${REACT_APP_BASE_URL.replace('/api', '')}/${JSON.parse(localStorage.getItem('emsLoginData')).logo_image}`} // Profile picture URL from localStorage or prop
                  sx={{ width: 100, height: 100 }}
                />
              </Grid>
              <Grid item>
                <Box>
                  <Typography variant="h5" color="white">
                    {JSON.parse(localStorage.getItem('emsLoginData')).owner_name}
                  </Typography>
                  <Typography variant="subtitle1" color="white">
                    {JSON.parse(localStorage.getItem('emsLoginData')).company_name}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            {/* Buttons */}
            <Grid container direction="row" spacing={2}>
              <Grid item>
                <Button variant="contained" color="warning">
                  Message
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" startIcon={<PersonAddTwoToneIcon />}>
                  Send Request
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/* Tabs Section */}
      <AppBar position="static" color="transparent" sx={{ marginTop: '10px' }}>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="Profile" {...a11yProps(0)} icon={<PersonIcon />} />
          <Tab label="Services" {...a11yProps(1)} icon={<GroupIcon />} />
          <Tab label="Events" {...a11yProps(1)} icon={<EmojiEventsIcon />} />
          <Tab label="Certifications" {...a11yProps(2)} icon={<CardMembershipIcon />} />
          <Tab label="Gallery" {...a11yProps(3)} icon={<PhotoIcon />} />
          {/* <Tab label="Contact Information" {...a11yProps(4)} icon={<PersonAddIcon />} /> */}
        </Tabs>
      </AppBar>
      <br></br>
      {/* Tab Content */}
      {tabIndex === 0 && (
        <Box sx={{ p: 4, backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)' }}>
          {/* Vendor Info Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
              About the Vendor
            </Typography>
            <div className="">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col  mb-4 mb-lg-0">
                  <div className="card mb-1" style={{ borderRadius: '.5rem' }}>
                    <div className="row g-0">
                      <div
                        className="col-lg-4 gradient-custom text-center d-flex flex-column align-items-center justify-content-center "
                        style={{
                          borderTopLeftRadius: '.5rem',
                          borderBottomLeftRadius: '.5rem'
                        }}
                      >
                        {JSON.parse(localStorage.getItem('emsLoginData')).logo_image !== null && (
                          <img
                            src={`${REACT_APP_BASE_URL.replace('/api', '')}/${JSON.parse(localStorage.getItem('emsLoginData')).logo_image}`}
                            alt="Avatar"
                            className="img-fluid my-5"
                            style={{
                              maxWidth: '150px',
                              minWidth: 'auto',
                              maxHeight: '150px',
                              minHeight: 'auto'
                            }}
                          />
                        )}
                        <h5>{JSON.parse(localStorage.getItem('emsLoginData')).owner_name}</h5>
                        <p>{JSON.parse(localStorage.getItem('emsLoginData')).company_name}</p>
                      </div>
                      <div className="col-lg-8">
                        <div className="card-body p-4">
                          <h6>Personal Information</h6>
                          <hr className="mt-0 mb-4" />
                          <div className="row pt-1">
                            <div className="col-lg-6 mb-1">
                              <h6>Mobile Number</h6>
                              <p className="text-muted">{JSON.parse(localStorage.getItem('emsLoginData')).mob_no}</p>
                            </div>
                            <div className="col-lg-6 mb-1">
                              <h6>Alternate Mobile Number</h6>
                              <p className="text-muted">{JSON.parse(localStorage.getItem('emsLoginData')).alt_mob_no}</p>
                            </div>
                            <div className="col-lg-6 mb-1">
                              <h6>Pincode</h6>
                              <p className="text-muted">{JSON.parse(localStorage.getItem('emsLoginData')).pincode}</p>
                            </div>
                            <div className="col-lg-6 mb-1">
                              <h6>City</h6>
                              <p className="text-muted">{JSON.parse(localStorage.getItem('emsLoginData')).city_id}</p>
                            </div>
                            <div className="col-lg-6 mb-1">
                              <h6>State</h6>
                              <p className="text-muted">{JSON.parse(localStorage.getItem('emsLoginData')).state_id}</p>
                            </div>
                            <div className="col-lg-6 mb-1">
                              <h6>Country</h6>
                              <p className="text-muted">{JSON.parse(localStorage.getItem('emsLoginData')).country_id}</p>
                            </div>
                            <div className="col-lg-12 mb-1">
                              <h6>Address</h6>
                              <p className="text-muted">{JSON.parse(localStorage.getItem('emsLoginData')).address}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Box>
      )}
      {tabIndex === 1 && (
        <Box sx={{ p: 4, backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)' }}>
          {/* Services Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 500, mb: 2, color: '#333' }}>
              Services Offered
            </Typography>
            <Grid container spacing={2}>
              {servicesData && (
                <Grid item xs={12} md={4}>
                  <Card
                    sx={{
                      p: 3,
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                      borderRadius: '10px',
                      textAlign: 'center',
                      alignItems: 'center'
                    }}
                  >
                    {/* Profile Avatar for Service */}
                    <Box
                      sx={{
                        backgroundImage: `url(${bgProfile})`, // Background image URL from the HTML
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 100,
                        mb: 2
                      }}
                    />
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                      {servicesData.data.service_name}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" color="textSecondary">
                      {servicesData.data.description}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    {/* <Button variant="contained" sx={{ mx: 1, backgroundColor: '#1976d2', color: '#fff' }}>
                      View Details
                    </Button> */}
                    {/* <Button variant="outlined" sx={{ mx: 1, color: '#d32f2f', borderColor: '#d32f2f' }}>
                      Delete
                    </Button> */}
                  </Card>
                </Grid>
              )}
            </Grid>
          </Box>

          {/* Service Packages Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 500, mb: 2, color: '#333' }}>
              Service Packages
            </Typography>
            <Grid container spacing={2}>
              {servicePackageData.map((item, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card
                    sx={{
                      p: 3,
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                      borderRadius: '10px',
                      textAlign: 'center',
                      alignItems: 'center'
                    }}
                  >
                    {/* Package Title */}
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                      {item.package_name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      Amount: ₹{item.amount}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Validity: {item.validity_in_days} days
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body2" sx={{ mb: 2, color: '#777' }}>
                      {item.description}
                    </Typography>
                    {/* Action Buttons */}
                    {/* <Button variant="contained" sx={{ mx: 1, backgroundColor: '#1976d2', color: '#fff' }}>
                      Subscribe
                    </Button> */}
                    <Button
                      variant="outlined"
                      sx={{ mx: 1, color: '#d32f2f', borderColor: '#d32f2f' }}
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      )}
      {tabIndex === 2 && (
        <Box sx={{ p: 4, backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)' }}>
          {/* Contact Information Section */}
          {/* <Box>
            <Typography variant="h5" sx={{ fontWeight: 500, mb: 2, color: '#333' }}>
              Contact Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" sx={{ fontWeight: 500, color: '#555' }}>
                  Email:
                </Typography>
                <Typography variant="body2" sx={{ color: '#777' }}>
                  vendor@example.com
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" sx={{ fontWeight: 500, color: '#555' }}>
                  Phone:
                </Typography>
                <Typography variant="body2" sx={{ color: '#777' }}>
                  +1 234 567 8900
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" sx={{ fontWeight: 500, color: '#555' }}>
                  Location:
                </Typography>
                <Typography variant="body2" sx={{ color: '#777' }}>
                  123 Business Street, Tech City, Country
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" sx={{ fontWeight: 500, color: '#555' }}>
                  Website:
                </Typography>
                <Typography variant="body2" sx={{ color: '#777' }}>
                  www.vendorwebsite.com
                </Typography>
              </Grid>
            </Grid>
          </Box> */}
        </Box>
      )}
      {tabIndex === 3 && (
        <Box sx={{ p: 4, backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)' }}>
          {/* Certifications Section */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5">Certifications</Typography>
            <div>
              {/* <input type="file" accept="image/*" multiple onChange={handleFileChange} style={{ display: 'none' }} id="upload-button" />
              <label htmlFor="upload-button">
                <Button variant="contained" color="primary" component="span">
                  Add Certificate
                </Button>
              </label> */}
              {/* <Button variant="contained" color="primary" onClick={handleUpload} disabled={!selectedFiles} style={{ marginLeft: '10px' }}>
                Upload
              </Button> */}
              <Button variant="contained" color="secondary" onClick={() => handleOpenAddCertificate()} style={{ marginLeft: '10px' }}>
                Add Certificate
              </Button>
            </div>
          </Box>
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card sx={{ p: 2, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    Certified Scrum Master
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#777' }}>
                    Scrum Master certified for leading Agile development teams and projects.
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ p: 2, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    AWS Certified Developer
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#777' }}>
                    Amazon Web Services certified developer with expertise in cloud solutions.
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
      {tabIndex === 4 && (
        <Box
          sx={{
            p: 4,
            justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: '#f9f9f9',
            borderRadius: '10px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)'
          }}
        >
          {/* Gallery Header with Add Photos Button */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5">Gallery</Typography>
            <div>
              <input type="file" accept="image/*" multiple onChange={handleFileChange} style={{ display: 'none' }} id="upload-button" />
              <label htmlFor="upload-button">
                <Button variant="contained" color="primary" component="span">
                  Add Photos
                </Button>
              </label>
              <Button variant="contained" color="primary" onClick={handleUpload} disabled={!selectedFiles} style={{ marginLeft: '10px' }}>
                Upload
              </Button>
            </div>
          </Box>

          {/* Gallery Grid */}
          <Grid container spacing={2}>
            {galleryData.map((item, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <MediaCard>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`${REACT_APP_BASE_URL.replace('/api', '')}/images/gallery/${item.images}`} // Image source from gallery data
                    alt={item.title}
                  />
                  <CardContent>
                    <Typography variant="subtitle1">{item.images}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {new Date(item.createdAt)
                        .toLocaleDateString('fr-CA', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit'
                        })
                        .split('-')
                        .reverse()
                        .join('-')}
                    </Typography>
                    {/* <IconButton size="small" sx={{ float: 'right'}}>
                      <MoreVertIcon />
                    </IconButton> */}
                  </CardContent>
                </MediaCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {tabIndex === 5 && (
        <Box sx={{ p: 4, backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)' }}>
          {/* Contact Information Section */}
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 500, mb: 2, color: '#333' }}>
              Contact Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" sx={{ fontWeight: 500, color: '#555' }}>
                  Email:
                </Typography>
                <Typography variant="body2" sx={{ color: '#777' }}>
                  vendor@example.com
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" sx={{ fontWeight: 500, color: '#555' }}>
                  Phone:
                </Typography>
                <Typography variant="body2" sx={{ color: '#777' }}>
                  +1 234 567 8900
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" sx={{ fontWeight: 500, color: '#555' }}>
                  Location:
                </Typography>
                <Typography variant="body2" sx={{ color: '#777' }}>
                  123 Business Street, Tech City, Country
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" sx={{ fontWeight: 500, color: '#555' }}>
                  Website:
                </Typography>
                <Typography variant="body2" sx={{ color: '#777' }}>
                  www.vendorwebsite.com
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default ProfilePage;
