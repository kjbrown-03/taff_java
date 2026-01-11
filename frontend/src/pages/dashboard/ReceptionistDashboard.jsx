import { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  CircularProgress,
  Alert,
  Fade,
  Grow,
  Chip,
  Button
} from '@mui/material';
import { 
  People, 
  MeetingRoom, 
  AttachMoney, 
  CalendarToday,
  Login as CheckInIcon,
  Logout as CheckOutIcon,
  Phone,
  PersonAdd
} from '@mui/icons-material';
import api from '../../services/api';
import './Dashboard.css';

const ReceptionistDashboard = () => {
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    occupiedRooms: 0,
    checkInsToday: 0,
    checkOutsToday: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get('/api/dashboard/receptionist');
      const data = response.data;
      setStats({
        totalRooms: data.totalRooms || 0,
        availableRooms: data.availableRooms || 0,
        occupiedRooms: data.occupiedRooms || 0,
        checkInsToday: data.checkInsToday || 0,
        checkOutsToday: data.checkOutsToday || 0
      });
    } catch (err) {
      console.error('Error loading stats:', err);
      setError('Erreur lors du chargement des statistiques. Vérifiez votre connexion.');
      setStats({
        totalRooms: 0,
        availableRooms: 0,
        occupiedRooms: 0,
        checkInsToday: 0,
        checkOutsToday: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Chambres Totales',
      value: stats.totalRooms,
      icon: <MeetingRoom sx={{ fontSize: 50 }} />,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      title: 'Chambres Disponibles',
      value: stats.availableRooms,
      icon: <MeetingRoom sx={{ fontSize: 50 }} />,
      gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    },
    {
      title: 'Check-ins Aujourd\'hui',
      value: stats.checkInsToday,
      icon: <CheckIn sx={{ fontSize: 50 }} />,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      title: 'Check-outs Aujourd\'hui',
      value: stats.checkOutsToday,
      icon: <CheckOut sx={{ fontSize: 50 }} />,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    }
  ];

  if (loading) {
    return (
      <Box className="dashboard-container">
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress size={60} thickness={4} sx={{ mb: 2, color: '#1976d2' }} />
          <Typography variant="h6" color="textSecondary">Chargement des statistiques...</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="dashboard-container" sx={{ width: '100%' }}>
      <Fade in={true} timeout={800}>
        <Box sx={{ width: '100%' }}>
          <Box className="dashboard-header">
            <Typography variant="h3" className="dashboard-title" gutterBottom>
              <Phone sx={{ mr: 2, verticalAlign: 'middle' }} />
              Tableau de Bord Réceptionniste
            </Typography>
            <Chip 
              label="RÉCEPTIONNISTE" 
              color="primary" 
              sx={{ fontSize: '0.9rem', fontWeight: 'bold', px: 1 }}
            />
          </Box>
          
          {error && (
            <Alert 
              severity="warning" 
              sx={{ 
                mb: 3, 
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
              onClose={() => setError('')}
            >
              {error}
            </Alert>
          )}

          <Grid container spacing={3} sx={{ mb: 4 }}>
            {statCards.map((card, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Grow in={true} timeout={600 + index * 100}>
                  <Card 
                    className="stat-card"
                    sx={{
                      background: card.gradient,
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
                          {card.icon}
                        </Box>
                        <Typography variant="h2" sx={{ fontWeight: 'bold', fontSize: '2.5rem' }}>
                          {card.value}
                        </Typography>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 500, opacity: 0.95 }}>
                        {card.title}
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
                    <Box display="flex" alignItems="center" mb={3}>
                      <CalendarToday sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        Actions Rapides
                      </Typography>
                    </Box>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={4}>
                        <Button
                          fullWidth
                          variant="contained"
                          startIcon={<PersonAdd />}
                          sx={{
                            py: 2,
                            borderRadius: 2,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                            }
                          }}
                        >
                          Nouvelle Réservation
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <Button
                          fullWidth
                          variant="contained"
                          startIcon={<CheckIn />}
                          color="success"
                          sx={{
                            py: 2,
                            borderRadius: 2,
                          }}
                        >
                          Check-in Client
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <Button
                          fullWidth
                          variant="contained"
                          startIcon={<CheckOut />}
                          color="warning"
                          sx={{
                            py: 2,
                            borderRadius: 2,
                          }}
                        >
                          Check-out Client
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>

            <Grid item xs={12} md={4}>
              <Grow in={true} timeout={1200}>
                <Card className="feature-card">
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                      Fonctionnalités Réceptionniste
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      En tant que réceptionniste, vos principales responsabilités incluent :
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                      {[
                        'Gestion des arrivées et départs des clients',
                        'Prise de réservations téléphoniques et en personne',
                        'Attribution des chambres aux clients',
                        'Gestion des paiements et facturation',
                        'Traitement des demandes spéciales des clients',
                        'Maintenance de la base de données clientèle'
                      ].map((item, idx) => (
                        <Box component="li" key={idx} sx={{ mb: 1.5 }}>
                          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'start' }}>
                            <Chip 
                              label="✓" 
                              size="small" 
                              sx={{ 
                                mr: 1, 
                                bgcolor: '#1976d2', 
                                color: 'white',
                                height: 20,
                                fontSize: '0.7rem'
                              }} 
                            />
                            {item}
                          </Typography>
                        </Box>
                      ))}
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

export default ReceptionistDashboard;
