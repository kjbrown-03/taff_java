import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActions, 
  Button, 
  Chip,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const Services = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Room Service',
      description: '24-hour room service with menu selection',
      price: 10.00,
      category: 'ROOM_SERVICE',
      available: true,
      duration: 30,
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 2,
      name: 'Spa Treatment',
      description: 'Full body massage and relaxation treatment',
      price: 120.00,
      category: 'SPA',
      available: true,
      duration: 90,
      imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    }
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  const handleOpenDialog = (service = null) => {
    setCurrentService(service);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentService(null);
  };

  const handleSaveService = (serviceData) => {
    // In a real app, this would make an API call
    if (currentService) {
      // Update existing service
      setServices(services.map(serv => serv.id === currentService.id ? {...serv, ...serviceData} : serv));
    } else {
      // Add new service
      const newService = {...serviceData, id: services.length + 1};
      setServices([...services, newService]);
    }
    handleCloseDialog();
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'ROOM_SERVICE': return 'Room Service';
      case 'SPA': return 'Spa';
      case 'LAUNDRY': return 'Laundry';
      case 'RESTAURANT': return 'Restaurant';
      case 'TRANSPORT': return 'Transport';
      default: return category;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Services Management</Typography>
        <Fab color="primary" aria-label="add" onClick={() => handleOpenDialog()}>
          <AddIcon />
        </Fab>
      </Box>

      <Grid container spacing={3}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image={service.imageUrl}
                alt={service.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {service.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.description}
                </Typography>
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip label={getCategoryLabel(service.category)} size="small" />
                  <Typography variant="h6" color="primary">
                    ${service.price}
                  </Typography>
                </Box>
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Duration: {service.duration} mins
                  </Typography>
                  <Chip 
                    label={service.available ? 'Available' : 'Unavailable'} 
                    color={service.available ? 'success' : 'error'} 
                    size="small" 
                  />
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={<EditIcon />} onClick={() => handleOpenDialog(service)}>
                  Edit
                </Button>
                <Button size="small" color="error" startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {currentService ? `Edit Service ${currentService.name}` : 'Add New Service'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Service Name"
                  fullWidth
                  defaultValue={currentService?.name || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                  defaultValue={currentService?.description || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Price"
                  type="number"
                  fullWidth
                  defaultValue={currentService?.price || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Duration (minutes)"
                  type="number"
                  fullWidth
                  defaultValue={currentService?.duration || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Category</InputLabel>
                  <Select
                    label="Category"
                    defaultValue={currentService?.category || ''}
                  >
                    <MenuItem value="ROOM_SERVICE">Room Service</MenuItem>
                    <MenuItem value="SPA">Spa</MenuItem>
                    <MenuItem value="LAUNDRY">Laundry</MenuItem>
                    <MenuItem value="RESTAURANT">Restaurant</MenuItem>
                    <MenuItem value="TRANSPORT">Transport</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Availability</InputLabel>
                  <Select
                    label="Availability"
                    defaultValue={currentService?.available ? 'Available' : 'Unavailable'}
                  >
                    <MenuItem value="Available">Available</MenuItem>
                    <MenuItem value="Unavailable">Unavailable</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={() => handleSaveService({})} variant="contained" color="primary">
            {currentService ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Services;