import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme as useCustomTheme } from '../context/ThemeContext';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  AppBar,
  Toolbar,
  Modal,
  TextField,
  Alert,
  useMediaQuery,
  useTheme,
  IconButton,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText as MuiListItemText,
  InputAdornment
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Star,
  LocalParking,
  Wifi,
  Pool,
  FitnessCenter,
  LocalDining,
  AirportShuttle,
  Accessibility,
  Menu as MenuIcon,
  Close as CloseIcon,
  AccountCircle as AccountCircleIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Language as LanguageIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  LocationOn as LocationOnIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';
import api from '../services/api';

const Home = () => {
  const { t, i18n } = useTranslation();
  const [availableLanguages, setAvailableLanguages] = useState([
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' }
  ]);
  
  // Load available languages on component mount
  useEffect(() => {
    const savedLanguages = localStorage.getItem('availableLanguages');
    if (savedLanguages) {
      setAvailableLanguages(JSON.parse(savedLanguages));
    }
  }, []);

  const { mode, toggleTheme } = useCustomTheme();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const navigate = useNavigate();

  // Google Maps configuration
  const mapContainerStyle = {
    width: '100%',
    height: '450px',
    borderRadius: '8px',
  };
  
  const center = {
    lat: 48.8566, // Paris coordinates as example
    lng: 2.3522,
  };

  

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');



    // Validate password
    if (!loginForm.password.trim()) {
      setLoginError(t('enter_password'));
      setLoginLoading(false);
      return;
    }

    try {
      // Call the authentication service to login with name, phone, and password
      const response = await api.post('/api/auth/login', {
        username: loginForm.username,
        password: loginForm.password
      });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Redirect based on user role
        const userRole = response.data.user.role?.name || response.data.user.role;
        let redirectPath = '/';
        if (userRole === 'ADMIN' || userRole === 'ROLE_ADMIN') {
          redirectPath = '/dashboard/admin';
        } else if (userRole === 'CLIENT' || userRole === 'ROLE_CLIENT') {
          redirectPath = '/dashboard/client';
        } else if (userRole === 'EMPLOYEE' || userRole === 'ROLE_EMPLOYEE') {
          redirectPath = '/dashboard/employee';
        }
        navigate(redirectPath);
      }
    } catch (error) {
      setLoginError(error.response?.data?.message || t('login_failed'));
      setLoginLoading(false);
    }
  };

  const carouselImages = [
    { id: 1, url: '/images/hotel-exterior.jpg', alt: t('hotel_exterior') },
    { id: 2, url: '/images/luxury-room.jpg', alt: t('luxury_room') },
    { id: 3, url: '/images/swimming-pool.jpg', alt: t('swimming_pool') },
    { id: 4, url: '/images/gym.jpg', alt: t('gym') },
    { id: 5, url: '/images/hotel-lobby.jpg', alt: t('hotel_lobby') },
    { id: 6, url: '/images/conference-room.jpg', alt: t('conference_room') },
    { id: 7, url: '/images/beach-view.jpg', alt: t('beach_view') },
    { id: 8, url: '/images/suite.jpg', alt: t('suite') },
    { id: 9, url: '/images/single-room.jpg', alt: t('single_room') },
    { id: 10, url: '/images/double-room.jpg', alt: t('double_room') },
  ];

  const features = [
    { icon: <LocalParking />, title: t('free_secure_parking'), description: t('complimentary_secure_parking') },
    { icon: <Wifi />, title: t('high_speed_wifi'), description: t('free_high_speed_internet') },
    { icon: <Pool />, title: t('infinity_pool'), description: t('stunning_infinity_pool') },
    { icon: <FitnessCenter />, title: t('twenty_four_seven_gym'), description: t('fully_equipped_gym') },
    { icon: <LocalDining />, title: t('five_star_restaurant'), description: t('gourmet_dining') },
    { icon: <AirportShuttle />, title: t('airport_shuttle'), description: t('complimentary_airport_transfer') },
    { icon: <Accessibility />, title: t('accessible_rooms'), description: t('fully_accessible_rooms') },
    { icon: <Pool />, title: t('spa_wellness'), description: t('luxury_spa_treatments') },
  ];

  const roomTypes = [
    { id: 1, name: t('suite'), image: '/images/suite.jpg', description: t('luxury_suite') },
    { id: 2, name: t('single_room'), image: '/images/single-room.jpg', description: t('comfortable_single') },
    { id: 3, name: t('double_room'), image: '/images/double-room.jpg', description: t('spacious_double') },
    { id: 4, name: t('family_room'), image: '/images/hotel-lobby.jpg', description: t('large_family') },
    { id: 5, name: t('ocean_view'), image: '/images/beach-view.jpg', description: t('stunning_ocean') },
    { id: 6, name: t('accessible'), image: '/images/luxury-room.jpg', description: t('fully_accessible') },
  ];

  const handleLoginModalOpen = () => {
    setLoginModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setLoginModalOpen(false);
    setLoginForm({ username: '', password: '' });
    setLoginError('');
  };


  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleThemeChange = () => {
    toggleTheme();
    handleProfileMenuClose();
  };
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    handleProfileMenuClose();
  };
  
  const addNewLanguage = () => {
    // Common language codes for user selection
    const commonLanguages = [
      { code: 'af', name: 'Afrikaans' },
      { code: 'ar', name: 'Arabic' },
      { code: 'bn', name: 'Bengali' },
      { code: 'zh', name: 'Chinese' },
      { code: 'cs', name: 'Czech' },
      { code: 'da', name: 'Danish' },
      { code: 'nl', name: 'Dutch' },
      { code: 'en', name: 'English' },
      { code: 'et', name: 'Estonian' },
      { code: 'fi', name: 'Finnish' },
      { code: 'fr', name: 'French' },
      { code: 'de', name: 'German' },
      { code: 'el', name: 'Greek' },
      { code: 'he', name: 'Hebrew' },
      { code: 'hi', name: 'Hindi' },
      { code: 'hu', name: 'Hungarian' },
      { code: 'id', name: 'Indonesian' },
      { code: 'it', name: 'Italian' },
      { code: 'ja', name: 'Japanese' },
      { code: 'ko', name: 'Korean' },
      { code: 'lt', name: 'Lithuanian' },
      { code: 'ms', name: 'Malay' },
      { code: 'no', name: 'Norwegian' },
      { code: 'pl', name: 'Polish' },
      { code: 'pt', name: 'Portuguese' },
      { code: 'ro', name: 'Romanian' },
      { code: 'ru', name: 'Russian' },
      { code: 'sk', name: 'Slovak' },
      { code: 'es', name: 'Spanish' },
      { code: 'sv', name: 'Swedish' },
      { code: 'th', name: 'Thai' },
      { code: 'tr', name: 'Turkish' },
      { code: 'uk', name: 'Ukrainian' },
      { code: 'vi', name: 'Vietnamese' }
    ];
    
    // Create a string of language options for the prompt
    let langOptions = 'Select a language:\n';
    commonLanguages.forEach((lang, index) => {
      langOptions += `${index + 1}. ${lang.name} (${lang.code})\n`;
    });
    
    const selection = prompt(langOptions + '\nEnter the number of your language:');
    
    if (selection && !isNaN(selection)) {
      const index = parseInt(selection) - 1;
      if (index >= 0 && index < commonLanguages.length) {
        const selectedLang = commonLanguages[index];
        
        // Check if language already exists
        const exists = availableLanguages.some(lang => lang.code === selectedLang.code);
        if (!exists) {
          const updatedLanguages = [...availableLanguages, selectedLang];
          setAvailableLanguages(updatedLanguages);
          localStorage.setItem('availableLanguages', JSON.stringify(updatedLanguages));
          
          // Ask user if they want to switch to this language immediately
          const switchNow = confirm(`Language ${selectedLang.name} added successfully! Would you like to switch to it now?`);
          if (switchNow) {
            // Since we don't have actual translation files, we'll just show a message
            alert(`Language switched to ${selectedLang.name}. Note: Actual translations would require language files.`);
            // In a real implementation, you would load the translation files here
          }
        } else {
          alert('Language already exists!');
        }
      } else {
        alert('Invalid selection! Please enter a number from the list.');
      }
    }
    handleProfileMenuClose();
  };
  
  const removeLanguage = () => {
    const langToRemove = prompt('Enter the language code to remove (e.g., fr, es, etc.):');
    if (langToRemove) {
      const langIndex = availableLanguages.findIndex(lang => lang.code === langToRemove.toLowerCase());
      if (langIndex !== -1) {
        const langName = availableLanguages[langIndex].name;
        const confirmRemove = confirm(`Are you sure you want to remove ${langName} (${langToRemove})?`);
        if (confirmRemove) {
          const updatedLanguages = availableLanguages.filter(lang => lang.code !== langToRemove.toLowerCase());
          setAvailableLanguages(updatedLanguages);
          localStorage.setItem('availableLanguages', JSON.stringify(updatedLanguages));
          alert(`Language ${langName} removed successfully!`);
        }
      } else {
        alert('Language code not found!');
      }
    }
    handleProfileMenuClose();
  };

  const handleLogout = () => {
    AuthService.logout();
    handleProfileMenuClose();
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1, pb: 8 }}>
      {/* Header - Template Style */}
      <AppBar 
        position="sticky" 
        sx={{ 
          backgroundColor: '#fff',
          color: '#111111',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          py: 1
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography 
                variant="h5" 
                component="div" 
                sx={{ 
                  fontWeight: 'bold',
                  color: '#111111',
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                Luxury Hotel
              </Typography>
              <Box sx={{ display: 'flex', ml: 1 }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} sx={{ fontSize: 16, color: '#FFD700', ml: 0.5 }} />
                ))}
              </Box>
            </Box>
            
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
              <Button 
                color="inherit" 
                onClick={handleLoginModalOpen}
                sx={{ 
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  borderRadius: '25px',
                  border: '2px solid #111111',
                  color: '#111111',
                  '&:hover': {
                    backgroundColor: '#111111',
                    color: '#fff'
                  }
                }}
              >
                {t('connexion')}
              </Button>
              <IconButton
                size="large"
                color="inherit"
                aria-label="profile"
                onClick={handleProfileMenuOpen}
                sx={{
                  width: 45,
                  height: 45,
                  borderRadius: '50%',
                  bgcolor: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&:hover': {
                    bgcolor: '#e0e0e0'
                  }
                }}
              >
                <AccountCircleIcon sx={{ color: '#111111' }} />
              </IconButton>
              
              {/* Profile Menu */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
                onClick={handleProfileMenuClose}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    mt: 1.5,
                    borderRadius: 2,
                    minWidth: 200
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleThemeChange}>
                  <ListItemIcon>
                    {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                  </ListItemIcon>
                  <MuiListItemText>
                    {mode === 'light' ? t('dark_mode') : t('light_mode')}
                  </MuiListItemText>
                </MenuItem>
                {availableLanguages.map((lang) => (
                  <MenuItem key={lang.code} onClick={() => changeLanguage(lang.code)}>
                    <ListItemIcon>
                      <LanguageIcon />
                    </ListItemIcon>
                    <MuiListItemText>{lang.name}</MuiListItemText>
                  </MenuItem>
                ))}
                <Divider />
                <MenuItem onClick={addNewLanguage}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <MuiListItemText>Add Language</MuiListItemText>
                </MenuItem>
                <MenuItem onClick={removeLanguage}>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <MuiListItemText>Remove Language</MuiListItemText>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <MuiListItemText>{t('logout')}</MuiListItemText>
                </MenuItem>
              </Menu>
            </Box>
            
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="profile"
                onClick={handleProfileMenuOpen}
                sx={{
                  width: 45,
                  height: 45,
                  borderRadius: '50%',
                  bgcolor: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <AccountCircleIcon sx={{ color: '#111111' }} />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Banner - Template Style */}
      <Box sx={{ 
        position: 'relative',
        height: { xs: '400px', md: '600px' },
        overflow: 'hidden'
      }}>
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={4000}
          transitionTime={800}
          stopOnHover
          showArrows={true}
          showIndicators={true}
        >
          {carouselImages.slice(0, 3).map((image) => (
            <Box key={image.id} sx={{ position: 'relative', height: '100%' }}>
              <Box
                component="img"
                src={image.url}
                alt={image.alt}
                sx={{
                  width: '100%',
                  height: { xs: '400px', md: '600px' },
                  objectFit: 'cover',
                  filter: 'brightness(0.7)'
                }}
              />
              <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                color: 'white',
                width: '90%',
                maxWidth: '800px'
              }}>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontWeight: 700,
                    mb: 2,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >
                  Welcome to Luxury Hotel
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 4,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >
                  Experience Unparalleled Comfort and Service
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: '#fff',
                    color: '#111111',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderRadius: '30px',
                    fontSize: '1.1rem',
                    '&:hover': {
                      backgroundColor: '#f0f0f0',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                  onClick={handleLoginModalOpen}
                >
                  Book Your Stay
                </Button>
              </Box>
            </Box>
          ))}
        </Carousel>
      </Box>

      {/* Booking Form Overlay - Template Style */}
      <Box sx={{
        position: 'relative',
        mt: -8,
        zIndex: 10,
        px: 2
      }}>
        <Container maxWidth="md">
          <Card sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            p: 4,
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <Typography variant="h4" align="center" sx={{ 
              mb: 3, 
              fontWeight: 600,
              color: '#111111',
              fontFamily: "'Poppins', sans-serif"
            }}>
              Book a Room Online
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Check-in Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px'
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Check-out Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px'
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    height: '100%',
                    backgroundColor: '#111111',
                    color: '#fff',
                    fontWeight: 600,
                    borderRadius: '12px',
                    fontSize: '1.1rem',
                    '&:hover': {
                      backgroundColor: '#333333',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                  onClick={handleLoginModalOpen}
                >
                  Check Availability
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </Box>

      {/* About Section - Template Style */}
      <Container maxWidth="xl" sx={{ py: 10 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ pr: { md: 4 } }}>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 3,
                  color: '#111111',
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                About Our Hotel
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  color: '#666666',
                  mb: 4,
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                Located in the heart of the city, our luxury hotel offers unparalleled comfort and exceptional service. 
                With stunning views, world-class amenities, and dedicated staff, we ensure every guest has an unforgettable experience.
              </Typography>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: '#111111',
                  color: '#111111',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  borderRadius: '30px',
                  '&:hover': {
                    backgroundColor: '#111111',
                    color: '#fff'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Read More
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/images/hotel-lobby.jpg"
              alt="Hotel Lobby"
              sx={{
                width: '100%',
                borderRadius: 3,
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Features Section - Template Style */}
      <Box sx={{ 
        backgroundColor: '#f8f9fa', 
        py: 10 
      }}>
        <Container maxWidth="xl">
          <Typography 
            variant="h3" 
            align="center" 
            sx={{ 
              fontWeight: 700, 
              mb: 2,
              color: '#111111',
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            Our Amenities
          </Typography>
          <Typography 
            variant="h6" 
            align="center" 
            sx={{ 
              mb: 6, 
              color: '#666666',
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            Experience luxury and comfort with our premium facilities
          </Typography>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ 
                  height: '100%', 
                  textAlign: 'center',
                  p: 4,
                  borderRadius: 3,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                  }
                }}>
                  <Box sx={{ 
                    fontSize: 48, 
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: '#111111',
                    color: '#fff',
                    mx: 'auto'
                  }}>
                    {feature.icon}
                  </Box>
                  <CardContent sx={{ p: 0 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600, 
                        mb: 2,
                        color: '#111111',
                        fontFamily: "'Poppins', sans-serif"
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#666666',
                        fontFamily: "'Poppins', sans-serif"
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Room Types Section - Template Style */}
      <Container maxWidth="xl" sx={{ py: 10 }}>
        <Typography 
          variant="h3" 
          align="center" 
          sx={{ 
            fontWeight: 700, 
            mb: 2,
            color: '#111111',
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          Our Room Categories
        </Typography>
        <Typography 
          variant="h6" 
          align="center" 
          sx={{ 
            mb: 6, 
            color: '#666666',
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          Discover our luxurious accommodation options
        </Typography>
        
        <Grid container spacing={4}>
          {roomTypes.slice(0, 3).map((room) => (
            <Grid item xs={12} sm={6} md={4} key={room.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ 
                    height: 250, 
                    objectFit: 'cover' 
                  }}
                  image={room.image}
                  alt={room.name}
                />
                <CardContent sx={{ p: 3 }}>
                  <Typography 
                    gutterBottom 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 600,
                      color: '#111111',
                      fontFamily: "'Poppins', sans-serif"
                    }}
                  >
                    {room.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#666666',
                      mb: 2,
                      fontFamily: "'Poppins', sans-serif"
                    }}
                  >
                    {room.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      borderColor: '#111111',
                      color: '#111111',
                      fontWeight: 600,
                      py: 1,
                      borderRadius: '25px',
                      '&:hover': {
                        backgroundColor: '#111111',
                        color: '#fff'
                      }
                    }}
                    onClick={handleLoginModalOpen}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Gallery Section - Template Style */}
      <Box sx={{ 
        backgroundColor: '#f8f9fa', 
        py: 10 
      }}>
        <Container maxWidth="xl">
          <Typography 
            variant="h3" 
            align="center" 
            sx={{ 
              fontWeight: 700, 
              mb: 2,
              color: '#111111',
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            Photo Gallery
          </Typography>
          <Typography 
            variant="h6" 
            align="center" 
            sx={{ 
              mb: 6, 
              color: '#666666',
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            Explore our beautiful facilities
          </Typography>
          
          <Grid container spacing={2}>
            {carouselImages.slice(0, 8).map((image, index) => (
              <Grid item xs={6} sm={3} key={image.id}>
                <Box
                  component="img"
                  src={image.url}
                  alt={image.alt}
                  sx={{
                    width: '100%',
                    height: { xs: '120px', sm: '150px' },
                    objectFit: 'cover',
                    borderRadius: 2,
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                    }
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contact Section - Template Style */}
      <Container maxWidth="xl" sx={{ py: 10 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700, 
                mb: 3,
                color: '#111111',
                fontFamily: "'Poppins', sans-serif"
              }}
            >
              Contact Us
            </Typography>
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 2,
                  color: '#666666',
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                <strong>Address:</strong> 123 Rue de l'Hôtel, Paris, France
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 2,
                  color: '#666666',
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                <strong>Phone:</strong> +33 1 23 45 67 89
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 2,
                  color: '#666666',
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                <strong>Email:</strong> info@luxuryhotel.com
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="large"
              startIcon={<LocationOnIcon />}
              sx={{
                backgroundColor: '#111111',
                color: '#fff',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: '30px',
                '&:hover': {
                  backgroundColor: '#333333',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
              onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=48.8566,2.3522', '_blank')}
            >
              View on Map
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{
              backgroundColor: '#f8f9fa',
              borderRadius: 3,
              p: 4,
              height: '100%'
            }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 600, 
                  mb: 3,
                  color: '#111111',
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                Send us a Message
              </Typography>
              <TextField
                fullWidth
                label="Name"
                margin="normal"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                margin="normal"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={4}
                margin="normal"
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: '#111111',
                  color: '#fff',
                  fontWeight: 600,
                  py: 1.5,
                  borderRadius: '25px',
                  '&:hover': {
                    backgroundColor: '#333333'
                  }
                }}
              >
                Send Message
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Footer - Template Style */}
      <Box sx={{ 
        backgroundColor: '#111111', 
        color: 'white', 
        py: 8 
      }}>
        <Container maxWidth="xl">
          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 600, 
                  mb: 3,
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                Luxury Hotel
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  mb: 2,
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                123 Rue de l'Hôtel, Paris, France
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  mb: 2,
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                Phone: +33 1 23 45 67 89
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                Email: info@luxuryhotel.com
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  mb: 3,
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button 
                  color="inherit" 
                  sx={{ 
                    justifyContent: 'flex-start',
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >
                  Home
                </Button>
                <Button 
                  color="inherit" 
                  sx={{ 
                    justifyContent: 'flex-start',
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >
                  Rooms
                </Button>
                <Button 
                  color="inherit" 
                  sx={{ 
                    justifyContent: 'flex-start',
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >
                  Gallery
                </Button>
                <Button 
                  color="inherit" 
                  sx={{ 
                    justifyContent: 'flex-start',
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >
                  Contact
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  mb: 3,
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                Newsletter
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  size="small"
                  placeholder="Your email"
                  sx={{ 
                    flex: 1,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(255,255,255,0.3)'
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255,255,255,0.5)'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'white'
                      }
                    }
                  }}
                />
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: '#fff',
                    color: '#111111',
                    fontWeight: 600,
                    borderRadius: '20px',
                    minWidth: '80px'
                  }}
                >
                  Subscribe
                </Button>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <IconButton 
                  sx={{ 
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton 
                  sx={{ 
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton 
                  sx={{ 
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  <InstagramIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />
          <Typography 
            variant="body2" 
            align="center"
            sx={{ 
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            © {new Date().getFullYear()} Luxury Hotel. All Rights Reserved.
          </Typography>
        </Container>
      </Box>

      {/* Login Modal */}
      <Modal
        open={loginModalOpen}
        onClose={handleLoginModalClose}
        aria-labelledby="login-modal"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '90%' : 450,
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
              mb: 3, 
              textAlign: 'center',
              fontWeight: 600,
              color: '#111111',
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            Sign In
          </Typography>
          
          {loginError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {loginError}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleLogin}>
            <TextField
              fullWidth
              label={t('username')}
              placeholder={t('enter_username_placeholder')}
              margin="normal"
              value={loginForm.username}
              onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
              required
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px'
                }
              }}
            />
            <TextField
              fullWidth
              label={t('password')}
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              required
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px'
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                py: 1.5,
                backgroundColor: '#111111',
                color: '#fff',
                fontWeight: 600,
                borderRadius: '25px',
                fontSize: '1.1rem',
                '&:hover': {
                  backgroundColor: '#333333'
                }
              }}
              disabled={loginLoading}
            >
              {loginLoading ? t('signing_in') : t('sign_in')}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Home;