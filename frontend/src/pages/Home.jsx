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
  Paper,
  TextField,
  Alert,
  useMediaQuery,
  useTheme,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText as MuiListItemText,
  InputAdornment
} from '@mui/material';
import {
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import {
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
      {/* Header */}
      <AppBar position="sticky" color="primary" sx={{ boxShadow: 3 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              {t('luxury_hotel')}
            </Typography>
            <Box sx={{ display: 'flex', ml: 1 }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} sx={{ fontSize: 16, color: 'common.white', ml: 0.5 }} />
              ))}
            </Box>
          </Box>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <Button color="inherit" onClick={handleLoginModalOpen}>
              {t('connexion')}
            </Button>
            <IconButton
              size="large"
              color="inherit"
              aria-label="profile"
              onClick={handleProfileMenuOpen}
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: 'primary.light',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
              onClick={handleProfileMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
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
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: 'primary.light',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
              onClick={handleProfileMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
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
        </Toolbar>
      </AppBar>



      {/* Hero Section with Carousel */}
      <Box sx={{ width: '100%', mb: 6 }}>
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={2000}
          transitionTime={500}
          stopOnHover
        >
          {carouselImages.map((image) => (
            <div key={image.id}>
              <img 
                src={image.url} 
                alt={image.alt} 
                style={{ 
                  width: '100%', 
                  height: isMobile ? '300px' : '500px', 
                  objectFit: 'cover' 
                }} 
              />
              <p className="legend">{image.alt}</p>
            </div>
          ))}
        </Carousel>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 6 }}>
          {t('hotel_features')}
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                textAlign: 'center',
                p: 3,
                boxShadow: 3,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                }
              }}>
                <Box sx={{ 
                  fontSize: 40, 
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText'
                }}>
                {feature.icon}
                </Box>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Room Types Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 6 }}>
          {t('room_categories')}
        </Typography>
        <Grid container spacing={4}>
          {roomTypes.map((room) => (
            <Grid item xs={12} sm={6} md={4} key={room.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  boxShadow: 3,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                  width: '100%'
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ height: 200, objectFit: 'cover', width: '100%', minHeight: 200, maxHeight: 200, display: 'block' }}
                  image={room.image}
                  alt={room.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                    {room.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {room.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Location Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 6 }}>
          {t('find_us')}
        </Typography>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            {t('our_location')}
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1" color="text.secondary">
              123 Rue de l'Hôtel, Paris, France
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Phone: +33 1 23 45 67 89
            </Typography>
            
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ mt: 2, px: 4, py: 1.5, fontSize: '1.1rem' }} 
              startIcon={<LocationOnIcon />}
              onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=48.8566,2.3522', '_blank')}
            >
              {t('view_on_google_maps')}
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{ 
        backgroundColor: 'primary.main', 
        color: 'white', 
        py: 6, 
        mt: 8 
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                {t('luxury_hotel')}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                123 Rue de l'Hôtel, Paris, France
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Phone: +33 1 23 45 67 89
              </Typography>
              <Typography variant="body2">
                Email: info@luxuryhotel.com
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                {t('contact_us')}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {t('reception_available')}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {t('concierge_available')}
              </Typography>
              <Typography variant="body2">
                {t('reservations')}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3, bgcolor: 'rgba(255, 255, 255, 0.3)' }} />
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} {t('luxury_hotel')}. {t('all_rights_reserved')}
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
            width: isMobile ? '90%' : 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" component="h2" sx={{ mb: 3, textAlign: 'center' }}>
            {t('connexion')}
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
            />
            <TextField
              fullWidth
              label={t('password')}
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              required
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
              sx={{ mt: 3, py: 1.5 }}
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