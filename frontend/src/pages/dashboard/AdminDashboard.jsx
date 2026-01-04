import { useState, useEffect } from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  CircularProgress
} from '@mui/material';
import { 
  MeetingRoom as RoomsIcon,
  BookOnline as ReservationsIcon,
  People as GuestsIcon,
  Badge as StaffIcon,
  RoomService as ServicesIcon,
  Payment as PaymentsIcon,
  Assessment as ReportsIcon,
  AccessTime as TimesheetIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  History as HistoryIcon
} from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import api from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalRooms: 0,
    occupiedRooms: 0,
    totalGuests: 0,
    staffMembers: 0,
    services: 0,
    todayRevenue: 0
  });
  
  const [users, setUsers] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [occupancyData, setOccupancyData] = useState([]);
  const [occupationRate, setOccupationRate] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userForm, setUserForm] = useState({ username: '', email: '', firstName: '', lastName: '', phone: '', role: 'CLIENT' });
  const [tabValue, setTabValue] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch dashboard statistics
      const statsResponse = await api.get('/dashboard/stats');
      setStats(statsResponse.data);
      
      // Fetch users for CRUD
      const usersResponse = await api.get('/users');
      setUsers(usersResponse.data);
      
      // Fetch attendance data
      try {
        const attendanceResponse = await api.get(`/reports/staff-attendance?startDate=2024-01-01&endDate=2024-12-31`);
        setAttendanceData(attendanceResponse.data.attendanceData || []);
      } catch (e) {
        console.error('Error fetching attendance:', e);
      }
      
      // Fetch occupancy data
      const occupancyResponse = await api.get('/reports/occupation');
      setOccupationRate(occupancyResponse.data.currentOccupationRate || 0);
      
      const occupancyChartData = [
        { name: 'Occupied', value: occupancyResponse.data.occupiedRooms || 0 },
        { name: 'Available', value: occupancyResponse.data.availableRooms || 0 },
      ];
      setOccupancyData(occupancyChartData);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setUserForm({ username: '', email: '', firstName: '', lastName: '', phone: '', role: 'CLIENT' });
    setUserDialogOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setUserForm({
      username: user.username || '',
      email: user.email || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      phone: user.phone || '',
      role: user.role?.name || user.role || 'CLIENT'
    });
    setUserDialogOpen(true);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/users/${userId}`);
        fetchDashboardData();
      } catch (err) {
        setError('Failed to delete user');
      }
    }
  };

  const handleSaveUser = async () => {
    try {
      if (selectedUser) {
        await api.put(`/users/${selectedUser.id}`, userForm);
      } else {
        await api.post('/users', { ...userForm, password: 'defaultPassword123' });
      }
      setUserDialogOpen(false);
      fetchDashboardData();
    } catch (err) {
      setError('Failed to save user');
    }
  };

  const handleGenerateAbsenceReport = async () => {
    try {
      const response = await api.get(`/reports/absences?month=${selectedMonth}`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `absences-report-${selectedMonth}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      // If PDF not available, try Excel
      try {
        const response = await api.get(`/reports/absences?month=${selectedMonth}&format=excel`, {
          responseType: 'blob'
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `absences-report-${selectedMonth}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (e) {
        setError('Failed to generate report');
      }
    }
  };

  const statsData = [
    { title: 'Total Rooms', value: stats.totalRooms, icon: <RoomsIcon sx={{ fontSize: 40 }} />, color: '#1976d2' },
    { title: 'Occupied Rooms', value: stats.occupiedRooms, icon: <ReservationsIcon sx={{ fontSize: 40 }} />, color: '#4caf50' },
    { title: 'Total Guests', value: stats.totalGuests, icon: <GuestsIcon sx={{ fontSize: 40 }} />, color: '#ff9800' },
    { title: 'Staff Members', value: stats.staffMembers, icon: <StaffIcon sx={{ fontSize: 40 }} />, color: '#9c27b0' },
    { title: 'Services', value: stats.services, icon: <ServicesIcon sx={{ fontSize: 40 }} />, color: '#f44336' },
    { title: 'Today\'s Revenue', value: `$${stats.todayRevenue?.toFixed(2) || '0.00'}`, icon: <PaymentsIcon sx={{ fontSize: 40 }} />, color: '#00bcd4' },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
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
        Admin Dashboard
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsData.map((stat, index) => (
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

      <Card sx={{ mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
            <Tab label="Users Management" />
            <Tab label="Attendance & Reports" />
            <Tab label="Room Occupancy" />
            <Tab label="History & Logs" />
          </Tabs>
        </Box>

        {/* Users Management Tab */}
        {tabValue === 0 && (
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Users Management</Typography>
              <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateUser}>
                Add User
              </Button>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Username</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.firstName} {user.lastName}</TableCell>
                      <TableCell>{user.phone || '-'}</TableCell>
                      <TableCell>
                        <Chip label={user.role?.name || user.role || 'CLIENT'} size="small" />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" onClick={() => handleEditUser(user)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small" onClick={() => handleDeleteUser(user.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Attendance & Reports Tab */}
        {tabValue === 1 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Staff Attendance & Absences
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <TextField
                type="month"
                label="Select Month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={handleGenerateAbsenceReport}
              >
                Generate Absence Report (PDF/Excel)
              </Button>
            </Box>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Staff Name</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Hours</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendanceData.length > 0 ? (
                    attendanceData.slice(0, 10).map((attendance, index) => (
                      <TableRow key={index}>
                        <TableCell>{attendance.name || attendance.staffName || '-'}</TableCell>
                        <TableCell>{attendance.role || '-'}</TableCell>
                        <TableCell>
                          <Chip 
                            label={attendance.status || 'UNKNOWN'} 
                            color={attendance.status === 'PRESENT' ? 'success' : 'error'} 
                            size="small" 
                          />
                        </TableCell>
                        <TableCell>{attendance.hours || attendance.hoursWorked || '-'}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">No attendance data available</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Room Occupancy Tab */}
        {tabValue === 2 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Room Occupancy Rate: {occupationRate.toFixed(1)}%
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={occupancyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {occupancyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        )}

        {/* History & Logs Tab */}
        {tabValue === 3 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              System History & Logs
            </Typography>
            <Alert severity="info">
              Logs functionality would be implemented with auditing. Currently showing placeholder.
            </Alert>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Timestamp</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4} align="center">No logs available</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Card>

      {/* User Dialog */}
      <Dialog open={userDialogOpen} onClose={() => setUserDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedUser ? 'Edit User' : 'Create User'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Username"
            value={userForm.username}
            onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={userForm.email}
            onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="First Name"
            value={userForm.firstName}
            onChange={(e) => setUserForm({ ...userForm, firstName: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Last Name"
            value={userForm.lastName}
            onChange={(e) => setUserForm({ ...userForm, lastName: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Phone"
            value={userForm.phone}
            onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={userForm.role}
              label="Role"
              onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
            >
              <MenuItem value="ADMIN">Admin</MenuItem>
              <MenuItem value="CLIENT">Client</MenuItem>
              <MenuItem value="EMPLOYEE">Employee</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUserDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveUser} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;
