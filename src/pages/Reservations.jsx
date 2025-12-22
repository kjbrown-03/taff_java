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
  MenuItem,
  DatePicker
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const Reservations = () => {
  const [reservations, setReservations] = useState([
    {
      id: 1,
      reservationNumber: 'RES-001',
      guestName: 'John Doe',
      roomNumber: '101',
      checkInDate: '2025-12-25',
      checkOutDate: '2025-12-30',
      status: 'CONFIRMED',
      totalAmount: 500.00,
      paidAmount: 100.00
    },
    {
      id: 2,
      reservationNumber: 'RES-002',
      guestName: 'Jane Smith',
      roomNumber: '201',
      checkInDate: '2025-12-28',
      checkOutDate: '2026-01-02',
      status: 'PENDING',
      totalAmount: 750.00,
      paidAmount: 0.00
    }
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentReservation, setCurrentReservation] = useState(null);

  const handleOpenDialog = (reservation = null) => {
    setCurrentReservation(reservation);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentReservation(null);
  };

  const handleSaveReservation = (reservationData) => {
    // In a real app, this would make an API call
    if (currentReservation) {
      // Update existing reservation
      setReservations(reservations.map(res => res.id === currentReservation.id ? {...res, ...reservationData} : res));
    } else {
      // Add new reservation
      const newReservation = {...reservationData, id: reservations.length + 1};
      setReservations([...reservations, newReservation]);
    }
    handleCloseDialog();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'warning';
      case 'CONFIRMED': return 'success';
      case 'CHECKED_IN': return 'info';
      case 'CHECKED_OUT': return 'default';
      case 'CANCELLED': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Reservations Management</Typography>
        <Fab color="primary" aria-label="add" onClick={() => handleOpenDialog()}>
          <AddIcon />
        </Fab>
      </Box>

      <Grid container spacing={3}>
        {reservations.map((reservation) => (
          <Grid item xs={12} sm={6} md={4} key={reservation.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {reservation.reservationNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Guest: {reservation.guestName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Room: {reservation.roomNumber}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Check-in: {reservation.checkInDate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Check-out: {reservation.checkOutDate}
                  </Typography>
                </Box>
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" color="primary">
                    ${reservation.totalAmount}
                  </Typography>
                  <Chip 
                    label={reservation.status.replace('_', ' ')} 
                    color={getStatusColor(reservation.status)} 
                    size="small" 
                  />
                </Box>
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Paid: ${reservation.paidAmount} / Balance: ${reservation.totalAmount - reservation.paidAmount}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={<EditIcon />} onClick={() => handleOpenDialog(reservation)}>
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
          {currentReservation ? `Edit Reservation ${currentReservation.reservationNumber}` : 'Add New Reservation'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Reservation Number"
                  fullWidth
                  defaultValue={currentReservation?.reservationNumber || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Guest Name"
                  fullWidth
                  defaultValue={currentReservation?.guestName || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Room Number"
                  fullWidth
                  defaultValue={currentReservation?.roomNumber || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    defaultValue={currentReservation?.status || 'PENDING'}
                  >
                    <MenuItem value="PENDING">Pending</MenuItem>
                    <MenuItem value="CONFIRMED">Confirmed</MenuItem>
                    <MenuItem value="CHECKED_IN">Checked In</MenuItem>
                    <MenuItem value="CHECKED_OUT">Checked Out</MenuItem>
                    <MenuItem value="CANCELLED">Cancelled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Check-in Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  defaultValue={currentReservation?.checkInDate || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Check-out Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  defaultValue={currentReservation?.checkOutDate || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Total Amount"
                  type="number"
                  fullWidth
                  defaultValue={currentReservation?.totalAmount || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Paid Amount"
                  type="number"
                  fullWidth
                  defaultValue={currentReservation?.paidAmount || ''}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={() => handleSaveReservation({})} variant="contained" color="primary">
            {currentReservation ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Reservations;