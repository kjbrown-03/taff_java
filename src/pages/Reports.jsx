import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Reports = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Mock data for charts
  const occupancyData = [
    { name: 'Jan', occupancy: 75 },
    { name: 'Feb', occupancy: 68 },
    { name: 'Mar', occupancy: 82 },
    { name: 'Apr', occupancy: 70 },
    { name: 'May', occupancy: 85 },
    { name: 'Jun', occupancy: 90 },
  ];

  const revenueData = [
    { name: 'Room Revenue', value: 40000 },
    { name: 'Service Revenue', value: 15000 },
    { name: 'Other Revenue', value: 5000 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const reservationData = [
    { id: 1, guest: 'John Doe', room: '101', checkIn: '2025-12-25', checkOut: '2025-12-30', status: 'Confirmed' },
    { id: 2, guest: 'Jane Smith', room: '201', checkIn: '2025-12-28', checkOut: '2026-01-02', status: 'Pending' },
    { id: 3, guest: 'Robert Johnson', room: '301', checkIn: '2025-12-30', checkOut: '2026-01-05', status: 'Confirmed' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Reports & Analytics
      </Typography>

      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Overview" />
        <Tab label="Occupancy" />
        <Tab label="Revenue" />
        <Tab label="Reservations" />
      </Tabs>

      {activeTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Occupancy Rate
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={occupancyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="occupancy" fill="#1976d2" name="Occupancy (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Revenue Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={revenueData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {revenueData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {activeTab === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Occupancy Report
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Month</TableCell>
                    <TableCell align="right">Occupancy Rate (%)</TableCell>
                    <TableCell align="right">Available Rooms</TableCell>
                    <TableCell align="right">Occupied Rooms</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>January</TableCell>
                    <TableCell align="right">75%</TableCell>
                    <TableCell align="right">100</TableCell>
                    <TableCell align="right">75</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>February</TableCell>
                    <TableCell align="right">68%</TableCell>
                    <TableCell align="right">100</TableCell>
                    <TableCell align="right">68</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>March</TableCell>
                    <TableCell align="right">82%</TableCell>
                    <TableCell align="right">100</TableCell>
                    <TableCell align="right">82</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {activeTab === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Revenue Report
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Month</TableCell>
                    <TableCell align="right">Room Revenue</TableCell>
                    <TableCell align="right">Service Revenue</TableCell>
                    <TableCell align="right">Total Revenue</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>January</TableCell>
                    <TableCell align="right">$40,000</TableCell>
                    <TableCell align="right">$12,000</TableCell>
                    <TableCell align="right">$52,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>February</TableCell>
                    <TableCell align="right">$38,000</TableCell>
                    <TableCell align="right">$10,000</TableCell>
                    <TableCell align="right">$48,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>March</TableCell>
                    <TableCell align="right">$45,000</TableCell>
                    <TableCell align="right">$15,000</TableCell>
                    <TableCell align="right">$60,000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {activeTab === 3 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Reservation Report
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Guest</TableCell>
                    <TableCell>Room</TableCell>
                    <TableCell>Check-in</TableCell>
                    <TableCell>Check-out</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reservationData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.guest}</TableCell>
                      <TableCell>{row.room}</TableCell>
                      <TableCell>{row.checkIn}</TableCell>
                      <TableCell>{row.checkOut}</TableCell>
                      <TableCell>{row.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Reports;