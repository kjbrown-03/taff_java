import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Box, Toolbar, Typography } from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  MeetingRoom as RoomsIcon,
  BookOnline as ReservationsIcon,
  People as GuestsIcon,
  Badge as StaffIcon,
  RoomService as ServicesIcon,
  Payment as PaymentsIcon,
  Assessment as ReportsIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import AuthService from '../services/authService';

const drawerWidth = 240;

const Sidebar = () => {
  const location = useLocation();
  const userRole = AuthService.getUserRole();
  
  // Define menu items based on user role
  const getMenuItems = () => {
    const baseItems = [
      { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    ];
    
    switch(userRole) {
      case 'ADMIN':
        return [
          ...baseItems,
          { text: 'Chambres', icon: <RoomsIcon />, path: '/rooms' },
          { text: 'Réservations', icon: <ReservationsIcon />, path: '/reservations' },
          { text: 'Clients', icon: <GuestsIcon />, path: '/guests' },
          { text: 'Personnel', icon: <StaffIcon />, path: '/staff' },
          { text: 'Services', icon: <ServicesIcon />, path: '/services' },
          { text: 'Paiements', icon: <PaymentsIcon />, path: '/payments' },
          { text: 'Rapports', icon: <ReportsIcon />, path: '/reports' },
        ];
      
      case 'RECEPTIONIST':
        return [
          ...baseItems,
          { text: 'Chambres', icon: <RoomsIcon />, path: '/rooms' },
          { text: 'Réservations', icon: <ReservationsIcon />, path: '/reservations' },
          { text: 'Clients', icon: <GuestsIcon />, path: '/guests' },
          { text: 'Paiements', icon: <PaymentsIcon />, path: '/payments' },
        ];
      
      case 'MANAGER':
        return [
          ...baseItems,
          { text: 'Chambres', icon: <RoomsIcon />, path: '/rooms' },
          { text: 'Réservations', icon: <ReservationsIcon />, path: '/reservations' },
          { text: 'Clients', icon: <GuestsIcon />, path: '/guests' },
          { text: 'Personnel', icon: <StaffIcon />, path: '/staff' },
          { text: 'Rapports', icon: <ReportsIcon />, path: '/reports' },
        ];
      
      default:
        return baseItems;
    }
  };
  
  const menuItems = getMenuItems();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        {/* Display current user role */}
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="subtitle2" color="textSecondary">
            Connecté en tant que:
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {userRole === 'ADMIN' && 'Administrateur'}
            {userRole === 'RECEPTIONIST' && 'Réceptionniste'}
            {userRole === 'MANAGER' && 'Manager'}
          </Typography>
        </Box>
        <Divider />
        
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
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;