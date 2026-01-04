import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
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
      description: '24/7 room service with a variety of food options',
      price: 15.00,
      category: 'FOOD_BEVERAGE',
      status: 'ACTIVE'
    },
    {
      id: 2,
      name: 'Spa Treatment',
      description: 'Relaxing spa treatments and massages',
      price: 80.00,
      category: 'WELLNESS',
      status: 'ACTIVE'
    },
    {
      id: 3,
      name: 'Airport Transfer',
      description: 'Pickup and drop service to/from the airport',
      price: 35.00,
      category: 'TRANSPORTATION',
      status: 'ACTIVE'
    }
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  const handleOpenDialog = (service = null) => {
    setCurrentService(service);
    setOpenDialog(true);
  };

  const handleSaveService = (serviceData) => {
    // In a real app, this would make an API call
    if (currentService) {
      // Update existing service
      setServices(services.map(service => service.id === currentService.id ? {...service, ...serviceData} : service));
    } else {
      // Add new service
      const newService = {...serviceData, id: services.length + 1};
      setServices([...services, newService]);
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentService(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'success';
      case 'INACTIVE': return 'error';
      default: return 'default';
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'FOOD_BEVERAGE': return 'Food & Beverage';
      case 'WELLNESS': return 'Wellness';
      case 'TRANSPORTATION': return 'Transportation';
      case 'ENTERTAINMENT': return 'Entertainment';
      case 'BUSINESS': return 'Business';
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
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {service.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.description}
                </Typography>
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" color="primary">
                    ${service.price}
                  </Typography>
                  <Chip 
                    label={getCategoryLabel(service.category)} 
                    size="small" 
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  <Chip 
                    label={service.status} 
                    color={getStatusColor(service.status)} 
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
                <FormControl fullWidth margin="dense">
                  <InputLabel>Category</InputLabel>
                  <Select
                    label="Category"
                    defaultValue={currentService?.category || 'FOOD_BEVERAGE'}
                  >
                    <MenuItem value="FOOD_BEVERAGE">Food & Beverage</MenuItem>
                    <MenuItem value="WELLNESS">Wellness</MenuItem>
                    <MenuItem value="TRANSPORTATION">Transportation</MenuItem>
                    <MenuItem value="ENTERTAINMENT">Entertainment</MenuItem>
                    <MenuItem value="BUSINESS">Business</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    defaultValue={currentService?.status || 'ACTIVE'}
                  >
                    <MenuItem value="ACTIVE">Active</MenuItem>
                    <MenuItem value="INACTIVE">Inactive</MenuItem>
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