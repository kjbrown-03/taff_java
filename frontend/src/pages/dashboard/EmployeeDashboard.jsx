import { useState, useEffect } from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Chip
} from '@mui/material';
import { 
  MeetingRoom as RoomsIcon,
  BookOnline as ReservationsIcon,
  Badge as StaffIcon,
  AccessTime as TimesheetIcon,
  LocalHotel as OccupiedRoomsIcon,
  People as GuestsIcon
} from '@mui/icons-material';
import api from '../../services/api';

const EmployeeDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [occupiedRooms, setOccupiedRooms] = useState([]);
  const [staff, setStaff] = useState([]);
  const [timesheet, setTimesheet] = useState({ checkIn: '', checkOut: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch all rooms
        const roomsResponse = await api.get('/rooms');
        setRooms(roomsResponse.data);
        
        // Fetch occupied rooms
        const occupiedRoomsResponse = await api.get('/rooms/occupied');
        setOccupiedRooms(occupiedRoomsResponse.data);
        
        // Fetch staff
        const staffResponse = await api.get('/staff');
        setStaff(staffResponse.data);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleCheckIn = async () => {
    try {
      await api.post('/timesheet/checkin', { time: timesheet.checkIn });
      alert('Check-in recorded successfully');
    } catch (err) {
      setError('Failed to record check-in');
    }
  };

  const handleCheckOut = async () => {
    try {
      await api.post('/timesheet/checkout', { time: timesheet.checkOut });
      alert('Check-out recorded successfully');
    } catch (err) {
      setError('Failed to record check-out');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTimesheet(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const statsData = [
    { title: 'Total Rooms', value: rooms.length, icon: <RoomsIcon sx={{ fontSize: 40 }} />, color: '#1976d2' },
    { title: 'Occupied Rooms', value: occupiedRooms.length, icon: <OccupiedRoomsIcon sx={{ fontSize: 40 }} />, color: '#4caf50' },
    { title: 'Total Staff', value: staff.length, icon: <StaffIcon sx={{ fontSize: 40 }} />, color: '#ff9800' },
    { title: 'Available Rooms', value: rooms.length - occupiedRooms.length, icon: <ReservationsIcon sx={{ fontSize: 40 }} />, color: '#9c27b0' },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Typography variant="h6">Loading dashboard...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Employee Dashboard
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
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

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                All Rooms
              </Typography>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Room Number</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rooms.slice(0, 5).map((room, index) => (
                      <TableRow key={index}>
                        <TableCell>{room.number}</TableCell>
                        <TableCell>{room.type}</TableCell>
                        <TableCell>
                          <Chip 
                            label={room.status} 
                            color={room.status === 'OCCUPIED' ? 'error' : 'success'} 
                            size="small" 
                          />
                        </TableCell>
                        <TableCell>${room.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Occupied Rooms
              </Typography>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Room Number</TableCell>
                      <TableCell>Guest</TableCell>
                      <TableCell>Check-in</TableCell>
                      <TableCell>Check-out</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {occupiedRooms.slice(0, 5).map((room, index) => (
                      <TableRow key={index}>
                        <TableCell>{room.roomNumber}</TableCell>
                        <TableCell>{room.guestName}</TableCell>
                        <TableCell>{room.checkInDate}</TableCell>
                        <TableCell>{room.checkOutDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
              All Staff
              </Typography>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {staff.slice(0, 5).map((staffMember, index) => (
                      <TableRow key={index}>
                        <TableCell>{staffMember.name}</TableCell>
                        <TableCell>{staffMember.role}</TableCell>
                        <TableCell>{staffMember.department}</TableCell>
                        <TableCell>
                          <Chip 
                            label={staffMember.status} 
                            color={staffMember.status === 'ACTIVE' ? 'success' : 'warning'} 
                            size="small" 
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Timesheet
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Check-in Time"
                  type="time"
                  name="checkIn"
                  value={timesheet.checkIn}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleCheckIn}
                  startIcon={<TimesheetIcon />}
                >
                  Check In
                </Button>
                
                <TextField
                  label="Check-out Time"
                  type="time"
                  name="checkOut"
                  value={timesheet.checkOut}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  sx={{ mt: 2 }}
                />
                <Button 
                  variant="contained" 
                  color="secondary" 
                  onClick={handleCheckOut}
                  startIcon={<TimesheetIcon />}
                >
                  Check Out
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeDashboard;