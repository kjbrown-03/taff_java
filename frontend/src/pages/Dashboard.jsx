import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { 
  MeetingRoom as RoomsIcon,
  BookOnline as ReservationsIcon,
  People as GuestsIcon,
  Badge as StaffIcon,
  RoomService as ServicesIcon,
  Payment as PaymentsIcon
} from '@mui/icons-material';

const Dashboard = () => {
  const stats = [
    { title: 'Total Rooms', value: 25, icon: <RoomsIcon sx={{ fontSize: 40 }} />, color: '#1976d2' },
    { title: 'Occupied Rooms', value: 18, icon: <ReservationsIcon sx={{ fontSize: 40 }} />, color: '#4caf50' },
    { title: 'Total Guests', value: 42, icon: <GuestsIcon sx={{ fontSize: 40 }} />, color: '#ff9800' },
    { title: 'Staff Members', value: 15, icon: <StaffIcon sx={{ fontSize: 40 }} />, color: '#9c27b0' },
    { title: 'Services', value: 12, icon: <ServicesIcon sx={{ fontSize: 40 }} />, color: '#f44336' },
    { title: 'Today\'s Revenue', value: '$2,450', icon: <PaymentsIcon sx={{ fontSize: 40 }} />, color: '#00bcd4' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', p: 2 }}>
              <Box sx={{ color: stat.color, mr: 2 }}>
                {stat.icon}
              </Box>
              <CardContent>
                <Typography variant="h6" component="div">
                  {stat.title}
                </Typography>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Recent Activity
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="body1">
              No recent activity to display.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;