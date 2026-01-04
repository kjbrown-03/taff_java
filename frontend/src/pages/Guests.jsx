import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
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

const Guests = () => {
  const [guests, setGuests] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      address: '123 Main St, New York, NY',
      nationality: 'American',
      idNumber: 'ID123456'
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '+0987654321',
      address: '456 Oak Ave, Los Angeles, CA',
      nationality: 'American',
      idNumber: 'ID789012'
    }
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentGuest, setCurrentGuest] = useState(null);

  const handleOpenDialog = (guest = null) => {
    setCurrentGuest(guest);
    setOpenDialog(true);
  };

  const handleSaveGuest = (guestData) => {
    // In a real app, this would make an API call
    if (currentGuest) {
      // Update existing guest
      setGuests(guests.map(guest => guest.id === currentGuest.id ? {...guest, ...guestData} : guest));
    } else {
      // Add new guest
      const newGuest = {...guestData, id: guests.length + 1};
      setGuests([...guests, newGuest]);
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentGuest(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Guests Management</Typography>
        <Fab color="primary" aria-label="add" onClick={() => handleOpenDialog()}>
          <AddIcon />
        </Fab>
      </Box>

      <Grid container spacing={3}>
        {guests.map((guest) => (
          <Grid item xs={12} sm={6} md={4} key={guest.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {guest.firstName} {guest.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Email:</strong> {guest.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Phone:</strong> {guest.phone}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Address:</strong> {guest.address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Nationality:</strong> {guest.nationality}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>ID Number:</strong> {guest.idNumber}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={<EditIcon />} onClick={() => handleOpenDialog(guest)}>
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
          {currentGuest ? `Edit Guest ${currentGuest.firstName} ${currentGuest.lastName}` : 'Add New Guest'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  label="First Name"
                  fullWidth
                  defaultValue={currentGuest?.firstName || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Last Name"
                  fullWidth
                  defaultValue={currentGuest?.lastName || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="Email"
                  fullWidth
                  defaultValue={currentGuest?.email || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="Phone"
                  fullWidth
                  defaultValue={currentGuest?.phone || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="Address"
                  fullWidth
                  multiline
                  rows={2}
                  defaultValue={currentGuest?.address || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Nationality"
                  fullWidth
                  defaultValue={currentGuest?.nationality || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="ID Number"
                  fullWidth
                  defaultValue={currentGuest?.idNumber || ''}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={() => handleSaveGuest({})} variant="contained" color="primary">
            {currentGuest ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Guests;