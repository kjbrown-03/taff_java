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
  Alert
} from '@mui/material';
import { 
  BookOnline as ReservationsIcon,
  Payment as PaymentsIcon,
  People as GuestsIcon,
  LocalHotel as RoomsIcon,
  Chat as ChatIcon
} from '@mui/icons-material';
import api from '../../services/api';

const ClientDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [payments, setPayments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch client reservations
        const reservationsResponse = await api.get('/reservations/my');
        setReservations(reservationsResponse.data);
        
        // Fetch client payments
        const paymentsResponse = await api.get('/payments/my');
        setPayments(paymentsResponse.data);
        
        // Fetch client messages
        const messagesResponse = await api.get('/messages/my');
        setMessages(messagesResponse.data);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statsData = [
    { title: 'Total Reservations', value: reservations.length, icon: <ReservationsIcon sx={{ fontSize: 40 }} />, color: '#1976d2' },
    { title: 'Total Payments', value: payments.length, icon: <PaymentsIcon sx={{ fontSize: 40 }} />, color: '#4caf50' },
    { title: 'Unpaid Amount', value: '$0', icon: <PaymentsIcon sx={{ fontSize: 40 }} />, color: '#ff9800' },
    { title: 'Active Reservations', value: reservations.filter(r => r.status === 'CONFIRMED').length, icon: <RoomsIcon sx={{ fontSize: 40 }} />, color: '#9c27b0' },
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
        Client Dashboard
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
                My Reservations
              </Typography>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Room</TableCell>
                      <TableCell>Check-in</TableCell>
                      <TableCell>Check-out</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reservations.slice(0, 5).map((reservation, index) => (
                      <TableRow key={index}>
                        <TableCell>{reservation.roomNumber}</TableCell>
                        <TableCell>{reservation.checkInDate}</TableCell>
                        <TableCell>{reservation.checkOutDate}</TableCell>
                        <TableCell>{reservation.status}</TableCell>
                        <TableCell>${reservation.totalAmount}</TableCell>
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
                My Payments
              </Typography>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Method</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {payments.slice(0, 5).map((payment, index) => (
                      <TableRow key={index}>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>${payment.amount}</TableCell>
                        <TableCell>{payment.method}</TableCell>
                        <TableCell>{payment.status}</TableCell>
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
                Messages
              </Typography>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>From</TableCell>
                      <TableCell>Subject</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {messages.slice(0, 5).map((message, index) => (
                      <TableRow key={index}>
                        <TableCell>{message.from}</TableCell>
                        <TableCell>{message.subject}</TableCell>
                        <TableCell>{message.date}</TableCell>
                        <TableCell>{message.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Button variant="outlined" startIcon={<ChatIcon />}>Send Message</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Payment Options
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button variant="contained" color="primary" size="large">
                  Pay with Visa
                </Button>
                <Button variant="outlined" size="large">
                  Pay with Mastercard
                </Button>
                <Button variant="outlined" size="large">
                  Pay with PayPal
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClientDashboard;