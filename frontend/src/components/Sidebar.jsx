import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Box, Toolbar } from '@mui/material';
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

const drawerWidth = 240;

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Rooms', icon: <RoomsIcon />, path: '/rooms' },
    { text: 'Reservations', icon: <ReservationsIcon />, path: '/reservations' },
    { text: 'Guests', icon: <GuestsIcon />, path: '/guests' },
    { text: 'Staff', icon: <StaffIcon />, path: '/staff' },
    { text: 'Services', icon: <ServicesIcon />, path: '/services' },
    { text: 'Payments', icon: <PaymentsIcon />, path: '/payments' },
    { text: 'Reports', icon: <ReportsIcon />, path: '/reports' },
  ];

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