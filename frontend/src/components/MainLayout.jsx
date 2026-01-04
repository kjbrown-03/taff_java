import { useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  IconButton, 
  Box, 
  Menu, 
  MenuItem, 
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Badge,
  Switch,
  FormControlLabel,
  Select,
  FormControl,
  InputLabel,
  MenuItem as MuiMenuItem
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  AccountCircle, 
  Logout,
  Dashboard as DashboardIcon,
  MeetingRoom as RoomsIcon,
  BookOnline as ReservationsIcon,
  People as GuestsIcon,
  Badge as StaffIcon,
  RoomService as ServicesIcon,
  Payment as PaymentsIcon,
  Assessment as ReportsIcon,
  Settings as SettingsIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Language as LanguageIcon
} from '@mui/icons-material';
import AuthService from '../services/authService';

const drawerWidth = 240;

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  return savedTheme ? savedTheme === 'dark' : false;
};

const MainLayout = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeMenuAnchorEl, setThemeMenuAnchorEl] = useState(null);
  const [languageMenuAnchorEl, setLanguageMenuAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(getInitialTheme);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = AuthService.getCurrentUser();
  
  // Get user name for display
  const displayName = currentUser?.name || currentUser?.username || 'User';
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setThemeMenuAnchorEl(null);
    setLanguageMenuAnchorEl(null);
  };
  
  const handleThemeMenu = (event) => {
    setThemeMenuAnchorEl(event.currentTarget);
  };
  
  const handleLanguageMenu = (event) => {
    setLanguageMenuAnchorEl(event.currentTarget);
  };
  
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    handleClose();
  };
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    handleClose();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    AuthService.logout();
    handleClose();
    navigate('/login');
  };
  
  const handleProfileClick = () => {
    handleClose();
    navigate('/dashboard/profile');
  };

  const menuItems = [
    { text: t('dashboard'), icon: <DashboardIcon />, path: '/' },
    { text: t('rooms'), icon: <RoomsIcon />, path: '/rooms' },
    { text: t('reservations'), icon: <ReservationsIcon />, path: '/reservations' },
    { text: t('guests'), icon: <GuestsIcon />, path: '/guests' },
    { text: t('staff'), icon: <StaffIcon />, path: '/staff' },
    { text: t('services'), icon: <ServicesIcon />, path: '/services' },
    { text: t('payments'), icon: <PaymentsIcon />, path: '/payments' },
    { text: t('reports'), icon: <ReportsIcon />, path: '/reports' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {t('hotel_management_system')}
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleProfileClick}>
              <AccountCircle sx={{ mr: 1 }} /> {displayName}
            </MenuItem>
            <MenuItem onClick={handleThemeMenu}>
              <SettingsIcon sx={{ mr: 1 }} /> {t('theme')}
            </MenuItem>
            <MenuItem onClick={handleLanguageMenu}>
              <LanguageIcon sx={{ mr: 1 }} /> {t('language')}
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <Logout sx={{ mr: 1 }} /> {t('logout')}
            </MenuItem>
          </Menu>
          
          {/* Theme Menu - separate from main menu */}
          <Menu
            id="theme-menu"
            anchorEl={themeMenuAnchorEl}
            open={Boolean(themeMenuAnchorEl)}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'theme-menu-button',
            }}
          >
            <MenuItem onClick={toggleDarkMode}>
              <ListItemIcon>
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </ListItemIcon>
              {darkMode ? t('light_mode') : t('dark_mode')}
            </MenuItem>
          </Menu>
          
          {/* Language Menu */}
          <Menu
            id="language-menu"
            anchorEl={languageMenuAnchorEl}
            open={Boolean(languageMenuAnchorEl)}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'language-menu-button',
            }}
          >
            <MenuItem onClick={() => changeLanguage('en')}>
              English
            </MenuItem>
            <MenuItem onClick={() => changeLanguage('fr')}>
              Français
            </MenuItem>
            <MenuItem onClick={() => changeLanguage('es')}>
              Español
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          display: { xs: 'none', sm: 'block' }
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem 
                button 
                key={item.text} 
                component={Link} 
                to={item.path}
                selected={location.pathname === item.path}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem button onClick={() => {
              handleClose();
              navigate('/dashboard/profile');
            }}>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary={t('profile')} />
            </ListItem>
            <ListItem button onClick={handleThemeMenu}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={t('settings')} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;