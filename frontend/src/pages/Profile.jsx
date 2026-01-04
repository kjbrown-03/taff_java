import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { CameraAlt as CameraIcon } from '@mui/icons-material';
import AuthService from '../services/authService';
import api from '../services/api';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    username: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [language, setLanguage] = useState('en');
  const [availableLanguages, setAvailableLanguages] = useState([
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' }
  ]);
  const [newLanguageCode, setNewLanguageCode] = useState('');
  const [newLanguageName, setNewLanguageName] = useState('');
  const [showAddLanguage, setShowAddLanguage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Load user profile
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      setUser({
        name: currentUser.name || currentUser.username || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        username: currentUser.username || ''
      });
      setImagePreview(currentUser.avatar || '');
    }

    // Load language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    // Load available languages from localStorage
    const savedLanguages = localStorage.getItem('availableLanguages');
    if (savedLanguages) {
      setAvailableLanguages(JSON.parse(savedLanguages));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    
    // Update i18n if available
    const i18n = window.i18n || (window.__i18n || window.i18next);
    if (i18n && i18n.changeLanguage) {
      i18n.changeLanguage(newLanguage);
    }
  };

  const handleAddLanguage = () => {
    if (newLanguageCode && newLanguageName) {
      const newLanguage = { code: newLanguageCode.toLowerCase(), name: newLanguageName };
      
      // Check if language already exists
      const exists = availableLanguages.some(lang => lang.code === newLanguage.code);
      if (!exists) {
        const updatedLanguages = [...availableLanguages, newLanguage];
        setAvailableLanguages(updatedLanguages);
        localStorage.setItem('availableLanguages', JSON.stringify(updatedLanguages));
        
        // Reset form
        setNewLanguageCode('');
        setNewLanguageName('');
        setSuccessMessage(`Language ${newLanguageName} added successfully!`);
        
        // Close the add language form
        setShowAddLanguage(false);
      } else {
        setErrorMessage('Language code already exists');
      }
    } else {
      setErrorMessage('Please enter both language code and name');
    }
  };

  const toggleAddLanguageForm = () => {
    setShowAddLanguage(!showAddLanguage);
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Update user profile
      const response = await api.put('/user/profile', {
        ...user
      });

      // If image is selected, upload it
      if (profileImage) {
        const formData = new FormData();
        formData.append('avatar', profileImage);
        await api.post('/user/upload-avatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      setSuccessMessage('Profile updated successfully!');
      
      // Update local storage
      const updatedUser = { ...AuthService.getCurrentUser(), ...user };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Profile Settings
        </Typography>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} display="flex" justifyContent="center">
              <Box position="relative" display="inline-block">
                <Avatar
                  src={imagePreview}
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
                <Button
                  variant="contained"
                  component="label"
                  size="small"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    minWidth: 'auto',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    padding: 0
                  }}
                >
                  <CameraIcon fontSize="small" />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={user.username}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Language</InputLabel>
                <Select
                  value={language}
                  label="Language"
                  onChange={handleLanguageChange}
                >
                  {availableLanguages.map((lang) => (
                    <MenuItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={toggleAddLanguageForm}
                sx={{ mt: 2, mb: 2 }}
              >
                {showAddLanguage ? 'Cancel Add Language' : 'Add New Language'}
              </Button>
              
              {showAddLanguage && (
                <Box sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
                  <Typography variant="h6" gutterBottom>Add New Language</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Language Code"
                        placeholder="e.g., de"
                        value={newLanguageCode}
                        onChange={(e) => setNewLanguageCode(e.target.value)}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Language Name"
                        placeholder="e.g., Deutsch"
                        value={newLanguageName}
                        onChange={(e) => setNewLanguageName(e.target.value)}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        onClick={handleAddLanguage}
                        sx={{ mr: 1 }}
                      >
                        Add Language
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={toggleAddLanguageForm}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;