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
  Fade,
  Grow,
  Chip,
  CircularProgress
} from '@mui/material';
import { 
  BookOnline as ReservationsIcon,
  Payment as PaymentsIcon,
  People as GuestsIcon,
  LocalHotel as RoomsIcon,
  Chat as ChatIcon,
  AccountCircle,
  Star
} from '@mui/icons-material';
import api from '../../services/api';
import './Dashboard.css';

const ClientDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [payments, setPayments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/dashboard/client');
        const data = response.data;
        
        setUserInfo(data.user);
        setReservations(Array.isArray(data.myReservations) ? data.myReservations : []);
        setPayments([]);
        setMessages([]);
      } catch (err) {
        setError('Erreur lors du chargement des données. Vérifiez votre connexion.');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statsData = [
    { 
      title: 'Mes Réservations', 
      value: reservations.length, 
      icon: <ReservationsIcon sx={{ fontSize: 50 }} />, 
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    { 
      title: 'Chambres Disponibles', 
      value: userInfo?.availableRooms || 0, 
      icon: <RoomsIcon sx={{ fontSize: 50 }} />, 
      gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)'
    },
    { 
      title: 'Réservations Actives', 
      value: reservations.filter(r => r.status === 'CONFIRMED' || r.status === 'CHECKED_IN').length, 
      icon: <PaymentsIcon sx={{ fontSize: 50 }} />, 
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    { 
      title: 'Historique', 
      value: reservations.filter(r => r.status === 'CHECKED_OUT' || r.status === 'CANCELLED').length, 
      icon: <Star sx={{ fontSize: 50 }} />, 
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
  ];

  if (loading) {
    return (
      <Box className="dashboard-container">
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress size={60} thickness={4} sx={{ mb: 2, color: '#1976d2' }} />
          <Typography variant="h6" color="textSecondary">Chargement de votre tableau de bord...</Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="dashboard-container">
        <Alert severity="error" sx={{ mt: 4, borderRadius: 2 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box className="dashboard-container" sx={{ width: '100%' }}>
      <Fade in={true} timeout={800}>
        <Box sx={{ width: '100%' }}>
          <Box className="dashboard-header">
            <Box>
              <Typography variant="h3" className="dashboard-title" gutterBottom>
                <AccountCircle sx={{ mr: 2, verticalAlign: 'middle' }} />
                Mon Tableau de Bord
              </Typography>
              {userInfo && (
                <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
                  Bienvenue, {userInfo.firstName} {userInfo.lastName} !
                </Typography>
              )}
            </Box>
            <Chip 
              label="CLIENT" 
              color="success" 
              sx={{ fontSize: '0.9rem', fontWeight: 'bold', px: 1 }}
            />
          </Box>
          
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {statsData.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Grow in={true} timeout={600 + index * 100}>
                  <Card 
                    className="stat-card"
                    sx={{
                      background: stat.gradient,
                      color: 'white',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                      },
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    <Box className="stat-card-pattern" />
                    <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                        <Box sx={{ 
                          bgcolor: 'rgba(255,255,255,0.2)', 
                          borderRadius: 2, 
                          p: 1.5,
                          backdropFilter: 'blur(10px)'
                        }}>
                          {stat.icon}
                        </Box>
                        <Typography variant="h2" sx={{ fontWeight: 'bold', fontSize: '2.5rem' }}>
                          {stat.value}
                        </Typography>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 500, opacity: 0.95 }}>
                        {stat.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Grow in={true} timeout={1000}>
                <Card className="feature-card">
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                      <ReservationsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Mes Réservations
                    </Typography>
                    {reservations.length > 0 ? (
                      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                              <TableCell><strong>Chambre</strong></TableCell>
                              <TableCell><strong>Check-in</strong></TableCell>
                              <TableCell><strong>Check-out</strong></TableCell>
                              <TableCell><strong>Statut</strong></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {reservations.slice(0, 5).map((reservation, index) => (
                              <TableRow key={index} hover>
                                <TableCell>{reservation.room?.number || 'N/A'}</TableCell>
                                <TableCell>{reservation.checkInDate || 'N/A'}</TableCell>
                                <TableCell>{reservation.checkOutDate || 'N/A'}</TableCell>
                                <TableCell>
                                  <Chip 
                                    label={reservation.status || 'N/A'} 
                                    size="small"
                                    color={
                                      reservation.status === 'CONFIRMED' ? 'success' :
                                      reservation.status === 'CHECKED_IN' ? 'primary' :
                                      reservation.status === 'CHECKED_OUT' ? 'default' :
                                      'error'
                                    }
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    ) : (
                      <Box textAlign="center" py={4}>
                        <Typography variant="body1" color="textSecondary">
                          Aucune réservation pour le moment
                        </Typography>
                        <Button variant="contained" sx={{ mt: 2 }} startIcon={<ReservationsIcon />}>
                          Faire une réservation
                        </Button>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grow>
            </Grid>

            <Grid item xs={12} md={4}>
              <Grow in={true} timeout={1200}>
                <Card className="feature-card">
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                      Options Rapides
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        size="large"
                        startIcon={<ReservationsIcon />}
                        fullWidth
                        sx={{ py: 1.5, borderRadius: 2 }}
                      >
                        Nouvelle Réservation
                      </Button>
                      <Button 
                        variant="outlined" 
                        size="large"
                        startIcon={<ChatIcon />}
                        fullWidth
                        sx={{ py: 1.5, borderRadius: 2 }}
                      >
                        Contacter le Support
                      </Button>
                      <Button 
                        variant="outlined" 
                        size="large"
                        startIcon={<PaymentsIcon />}
                        fullWidth
                        sx={{ py: 1.5, borderRadius: 2 }}
                      >
                        Mes Paiements
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Box>
  );
};

export default ClientDashboard;
