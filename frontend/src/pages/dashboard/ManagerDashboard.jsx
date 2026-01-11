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
  LinearProgress
} from '@mui/material';
import { 
  People, 
  MeetingRoom, 
  AttachMoney, 
  CalendarToday,
  TrendingUp,
  BusinessCenter,
  Assessment,
  SupervisorAccount
} from '@mui/icons-material';
import api from '../../services/api';
import './Dashboard.css';

const ManagerDashboard = () => {
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    occupiedRooms: 0,
    todaysRevenue: 0
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
      // Manager peut utiliser le dashboard admin ou receptionist
      const response = await api.get('/api/dashboard/admin');
      const data = response.data;
      setStats({
        totalRooms: data.totalRooms || 0,
        availableRooms: data.availableRooms || 0,
        occupiedRooms: data.occupiedRooms || 0,
        todaysRevenue: data.todaysRevenue || 0
      });
    } catch (err) {
      console.error('Error loading stats:', err);
      setError('Erreur lors du chargement des statistiques. Vérifiez votre connexion.');
      setStats({
        totalRooms: 0,
        availableRooms: 0,
        occupiedRooms: 0,
        todaysRevenue: 0
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
      title: 'Chambres Occupées',
      value: stats.occupiedRooms,
      icon: <People sx={{ fontSize: 50 }} />,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      title: 'Revenus du Jour',
      value: `€${stats.todaysRevenue.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}`,
      icon: <AttachMoney sx={{ fontSize: 50 }} />,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    }
  ];

  const occupancyRate = stats.totalRooms > 0 
    ? Math.round((stats.occupiedRooms / stats.totalRooms) * 100) 
    : 0;

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
              <BusinessCenter sx={{ mr: 2, verticalAlign: 'middle' }} />
              Tableau de Bord Manager
            </Typography>
            <Chip 
              label="MANAGER" 
              color="secondary" 
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
                      <Assessment sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        Vue d'Ensemble Opérationnelle
                      </Typography>
                    </Box>
                    
                    <Box mb={3}>
                      <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant="body1" color="textSecondary">
                          Taux d'occupation
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          {occupancyRate}%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={occupancyRate} 
                        sx={{ 
                          height: 10, 
                          borderRadius: 5,
                          bgcolor: '#e0e0e0',
                          '& .MuiLinearProgress-bar': {
                            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: 5
                          }
                        }}
                      />
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box className="mini-stat-box">
                          <TrendingUp sx={{ fontSize: 30, color: '#1976d2', mb: 1 }} />
                          <Typography variant="h4" fontWeight="bold">
                            {occupancyRate}%
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Taux d'Occupation
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box className="mini-stat-box">
                          <SupervisorAccount sx={{ fontSize: 30, color: '#2e7d32', mb: 1 }} />
                          <Typography variant="h4" fontWeight="bold">
                            {stats.availableRooms}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Chambres Libres
                          </Typography>
                        </Box>
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
                      Fonctionnalités Manager
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      En tant que manager, vous supervisez les opérations quotidiennes :
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                      {[
                        'Supervision de l\'équipe de réception',
                        'Gestion des performances et des rapports',
                        'Coordination avec les services de nettoyage',
                        'Gestion budgétaire et contrôle des coûts',
                        'Résolution des problèmes clients complexes',
                        'Planification et organisation du travail d\'équipe'
                      ].map((item, idx) => (
                        <Box component="li" key={idx} sx={{ mb: 1.5 }}>
                          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'start' }}>
                            <Chip 
                              label="✓" 
                              size="small" 
                              sx={{ 
                                mr: 1, 
                                bgcolor: '#9c27b0', 
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

export default ManagerDashboard;
