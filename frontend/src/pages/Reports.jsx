import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Paper
} from '@mui/material';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Reports = () => {
  const [reportType, setReportType] = useState('revenue');
  const [dateRange, setDateRange] = useState({
    startDate: '2025-01-01',
    endDate: '2025-12-31'
  });

  // Sample data for different reports
  const revenueData = [
    { name: 'Jan', revenue: 4000, expenses: 2400 },
    { name: 'Feb', revenue: 3000, expenses: 1398 },
    { name: 'Mar', revenue: 2000, expenses: 9800 },
    { name: 'Apr', revenue: 2780, expenses: 3908 },
    { name: 'May', revenue: 1890, expenses: 4800 },
    { name: 'Jun', revenue: 2390, expenses: 3800 },
  ];

  const occupancyData = [
    { name: 'Standard', occupancy: 75 },
    { name: 'Deluxe', occupancy: 60 },
    { name: 'Suite', occupancy: 45 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const roomTypeData = [
    { name: 'Standard', value: 15 },
    { name: 'Deluxe', value: 7 },
    { name: 'Suite', value: 3 },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Reports & Analytics
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="dense">
            <InputLabel>Report Type</InputLabel>
            <Select
              value={reportType}
              label="Report Type"
              onChange={(e) => setReportType(e.target.value)}
            >
              <MenuItem value="revenue">Revenue Report</MenuItem>
              <MenuItem value="occupancy">Occupancy Report</MenuItem>
              <MenuItem value="guests">Guest Analysis</MenuItem>
              <MenuItem value="rooms">Room Utilization</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Start Date"
            type="date"
            fullWidth
            value={dateRange.startDate}
            onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="End Date"
            type="date"
            fullWidth
            value={dateRange.endDate}
            onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>

      {reportType === 'revenue' && (
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Revenue & Expenses
                </Typography>
                <Box sx={{ height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={revenueData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="revenue" fill="#1976d2" name="Revenue" />
                      <Bar dataKey="expenses" fill="#e57373" name="Expenses" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Summary
                </Typography>
                <Paper sx={{ p: 2, mb: 2 }}>
                  <Typography variant="body1">Total Revenue: <strong>$15,000</strong></Typography>
                </Paper>
                <Paper sx={{ p: 2, mb: 2 }}>
                  <Typography variant="body1">Total Expenses: <strong>$8,500</strong></Typography>
                </Paper>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="body1">Net Profit: <strong>$6,500</strong></Typography>
                </Paper>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {reportType === 'occupancy' && (
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Room Occupancy Rate
                </Typography>
                <Box sx={{ height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={occupancyData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="occupancy" fill="#4caf50" name="Occupancy Rate (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Room Type Distribution
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={roomTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {roomTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {reportType === 'guests' && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Guest Analysis
                </Typography>
                <Typography variant="body1">
                  This section would contain guest demographics, booking patterns, and satisfaction metrics.
                </Typography>
                <Paper sx={{ p: 2, mt: 2 }}>
                  <Typography variant="body1">Total Guests: <strong>1,250</strong></Typography>
                  <Typography variant="body1">Repeat Guests: <strong>340</strong></Typography>
                  <Typography variant="body1">Average Stay: <strong>2.5 days</strong></Typography>
                </Paper>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {reportType === 'rooms' && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Room Utilization Report
                </Typography>
                <Typography variant="body1">
                  This section would contain room utilization statistics, maintenance schedules, and revenue per room.
                </Typography>
                <Paper sx={{ p: 2, mt: 2 }}>
                  <Typography variant="body1">Total Rooms: <strong>25</strong></Typography>
                  <Typography variant="body1">Available: <strong>6</strong></Typography>
                  <Typography variant="body1">Occupied: <strong>15</strong></Typography>
                  <Typography variant="body1">Under Maintenance: <strong>4</strong></Typography>
                </Paper>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Button variant="contained" color="primary">
          Generate Report
        </Button>
      </Box>
    </Box>
  );
};

export default Reports;