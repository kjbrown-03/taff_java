import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Fade,
  Slide,
  Card,
  CardContent
} from '@mui/material';
import { 
  LockOutlined, 
  PersonOutlined, 
  Visibility, 
  VisibilityOff,
  Hotel as HotelIcon,
  Star as StarIcon
} from '@mui/icons-material';
import api from '../services/api';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const token = localStorage.getItem('token');
    if (token) {
      const userRole = localStorage.getItem('userRole');
      if (userRole) {
        switch(userRole) {
          case 'ADMIN':
            navigate('/dashboard/admin');
            break;
          case 'RECEPTIONIST':
            navigate('/dashboard/receptionist');
            break;
          case 'CLIENT':
            navigate('/dashboard/client');
            break;
          default:
            navigate('/dashboard');
        }
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!username.trim()) {
      setError('Veuillez entrer votre nom d\'utilisateur');
      setLoading(false);
      return;
    }

    if (!password.trim()) {
      setError('Veuillez entrer votre mot de passe');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/api/auth/login', {
        username: username.trim(),
        password: password
      });

      if (response.data && response.data.token) {
        // Stocker le token et les informations utilisateur
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('userRole', response.data.role);
        
        // Rediriger selon le rôle
        const role = response.data.role;
        let path = '/dashboard';
        
        switch(role) {
          case 'ADMIN':
            path = '/dashboard/admin';
            break;
          case 'RECEPTIONIST':
            path = '/dashboard/receptionist';
            break;
          case 'CLIENT':
            path = '/dashboard/client';
            break;
          case 'MANAGER':
            path = '/dashboard/manager';
            break;
          default:
            path = '/dashboard';
        }
        
        navigate(path);
      } else {
        setError('Réponse invalide du serveur');
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.error || 
                          err.response?.data?.message || 
                          'Échec de la connexion. Veuillez vérifier vos identifiants.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="login-container">
      <Container maxWidth="sm" className="login-wrapper">
        <Fade in={true} timeout={1000}>
          <Paper 
            elevation={0}
            className="login-paper"
            sx={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 100%)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              borderRadius: '32px',
              overflow: 'hidden',
              position: 'relative',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Decorative top border */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '6px',
                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                backgroundSize: '200% 100%',
                animation: 'gradientShift 3s ease infinite',
              }}
            />
            
            <Box className="login-header" sx={{ pt: 4, pb: 2 }}>
              <Slide direction="down" in={true} timeout={600}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                  <Box className="logo-container">
                    <HotelIcon sx={{ fontSize: 64, color: '#667eea', zIndex: 1, position: 'relative' }} />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(102, 126, 234, 0.2) 0%, transparent 70%)',
                        animation: 'pulse 2s ease-in-out infinite',
                      }}
                    />
                  </Box>
                </Box>
              </Slide>
              
              <Slide direction="down" in={true} timeout={800}>
                <Typography 
                  variant="h3" 
                  component="h1" 
                  className="login-title"
                  sx={{
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    mb: 1.5,
                    animation: 'gradientShift 3s ease infinite',
                    letterSpacing: '-1.5px',
                    lineHeight: 1.2,
                  }}
                >
                  Système de Gestion
                </Typography>
                <Typography 
                  variant="h4" 
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #764ba2 0%, #f093fb 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    mb: 2,
                  }}
                >
                  Hôtelière
                </Typography>
              </Slide>
              
              <Slide direction="down" in={true} timeout={1000}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 4 }}>
                  <StarIcon sx={{ fontSize: 16, color: '#f59e0b' }} />
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontSize: '1rem',
                      color: 'text.secondary',
                      fontWeight: 500,
                      letterSpacing: '0.5px'
                    }}
                  >
                    Connectez-vous pour accéder à votre tableau de bord
                  </Typography>
                  <StarIcon sx={{ fontSize: 16, color: '#f59e0b' }} />
                </Box>
              </Slide>
            </Box>
            
            {error && (
              <Fade in={true}>
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 3,
                    mx: 3,
                    borderRadius: '16px',
                    boxShadow: '0 4px 16px rgba(211, 47, 47, 0.2)',
                    border: '1px solid rgba(211, 47, 47, 0.2)',
                    '& .MuiAlert-icon': {
                      fontSize: '1.5rem'
                    }
                  }}
                  onClose={() => setError('')}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {error}
                  </Typography>
                </Alert>
              </Fade>
            )}
            
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ px: 3, pb: 4 }}>
              <Slide direction="up" in={true} timeout={1200}>
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  id="username"
                  label="Nom d'utilisateur"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlined sx={{ color: '#667eea', fontSize: 22 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '16px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 24px rgba(102, 126, 234, 0.2)',
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                      },
                      '&.Mui-focused': {
                        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                        transform: 'translateY(-2px)',
                      },
                      '& fieldset': {
                        borderColor: 'rgba(102, 126, 234, 0.3)',
                        borderWidth: '2px',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(102, 126, 234, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#667eea',
                        borderWidth: '2px',
                      }
                    },
                    '& .MuiInputLabel-root': {
                      fontWeight: 500,
                      '&.Mui-focused': {
                        color: '#667eea',
                        fontWeight: 600,
                      }
                    }
                  }}
                />
              </Slide>
              
              <Slide direction="up" in={true} timeout={1400}>
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  name="password"
                  label="Mot de passe"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined sx={{ color: '#667eea', fontSize: 22 }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          disabled={loading}
                          sx={{
                            color: '#667eea',
                            '&:hover': {
                              backgroundColor: 'rgba(102, 126, 234, 0.1)',
                            }
                          }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '16px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 24px rgba(102, 126, 234, 0.2)',
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                      },
                      '&.Mui-focused': {
                        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                        transform: 'translateY(-2px)',
                      },
                      '& fieldset': {
                        borderColor: 'rgba(102, 126, 234, 0.3)',
                        borderWidth: '2px',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(102, 126, 234, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#667eea',
                        borderWidth: '2px',
                      }
                    },
                    '& .MuiInputLabel-root': {
                      fontWeight: 500,
                      '&.Mui-focused': {
                        color: '#667eea',
                        fontWeight: 600,
                      }
                    }
                  }}
                />
              </Slide>
              
              <Slide direction="up" in={true} timeout={1600}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  className="login-button"
                  sx={{
                    mt: 4,
                    mb: 3,
                    py: 1.75,
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    letterSpacing: '0.5px',
                    boxShadow: '0 12px 32px rgba(102, 126, 234, 0.4)',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                      transform: 'translateY(-4px) scale(1.02)',
                      boxShadow: '0 16px 48px rgba(102, 126, 234, 0.5)',
                    },
                    '&:active': {
                      transform: 'translateY(-2px) scale(1)',
                    },
                    '&.Mui-disabled': {
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      opacity: 0.7
                    }
                  }}
                >
                  {loading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <CircularProgress size={24} sx={{ color: 'white' }} />
                      <span>Connexion en cours...</span>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LockOutlined sx={{ fontSize: 20 }} />
                      <span>Se connecter</span>
                    </Box>
                  )}
                </Button>
              </Slide>
              
              <Fade in={true} timeout={1800}>
                <Card 
                  elevation={0}
                  sx={{ 
                    mt: 3,
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                    borderRadius: '20px',
                    border: '1px solid rgba(102, 126, 234, 0.1)',
                  }}
                >
                  <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        textAlign: 'center',
                        fontWeight: 600,
                        color: 'text.primary',
                        mb: 1.5,
                        fontSize: '0.9rem'
                      }}
                    >
                      Comptes de démonstration
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 1.5,
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.6)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.9)',
                          transform: 'translateX(4px)',
                        }
                      }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#667eea' }}>
                          Administrateur
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>
                          admin / admin123
                        </Typography>
                      </Box>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 1.5,
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.6)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.9)',
                          transform: 'translateX(4px)',
                        }
                      }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#764ba2' }}>
                          Réceptionniste
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>
                          john_receptionist / staff123
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default Login;
