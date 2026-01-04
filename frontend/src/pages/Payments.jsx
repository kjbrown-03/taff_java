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

const Payments = () => {
  const [payments, setPayments] = useState([
    {
      id: 1,
      reservationNumber: 'RES-001',
      guestName: 'John Doe',
      amount: 500.00,
      method: 'CREDIT_CARD',
      status: 'COMPLETED',
      date: '2025-12-20',
      reference: 'REF-001'
    },
    {
      id: 2,
      reservationNumber: 'RES-002',
      guestName: 'Jane Smith',
      amount: 750.00,
      method: 'CASH',
      status: 'COMPLETED',
      date: '2025-12-21',
      reference: 'REF-002'
    },
    {
      id: 3,
      reservationNumber: 'RES-003',
      guestName: 'Robert Brown',
      amount: 150.00,
      method: 'BANK_TRANSFER',
      status: 'PENDING',
      date: '2025-12-22',
      reference: 'REF-003'
    }
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);

  const handleOpenDialog = (payment = null) => {
    setCurrentPayment(payment);
    setOpenDialog(true);
  };

  const handleSavePayment = (paymentData) => {
    // In a real app, this would make an API call
    if (currentPayment) {
      // Update existing payment
      setPayments(payments.map(payment => payment.id === currentPayment.id ? {...payment, ...paymentData} : payment));
    } else {
      // Add new payment
      const newPayment = {...paymentData, id: payments.length + 1};
      setPayments([...payments, newPayment]);
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentPayment(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED': return 'success';
      case 'PENDING': return 'warning';
      case 'FAILED': return 'error';
      case 'CANCELLED': return 'error';
      default: return 'default';
    }
  };

  const getMethodLabel = (method) => {
    switch (method) {
      case 'CREDIT_CARD': return 'Credit Card';
      case 'DEBIT_CARD': return 'Debit Card';
      case 'CASH': return 'Cash';
      case 'BANK_TRANSFER': return 'Bank Transfer';
      case 'MOBILE_PAYMENT': return 'Mobile Payment';
      default: return method;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Payments Management</Typography>
        <Fab color="primary" aria-label="add" onClick={() => handleOpenDialog()}>
          <AddIcon />
        </Fab>
      </Box>

      <Grid container spacing={3}>
        {payments.map((payment) => (
          <Grid item xs={12} sm={6} md={4} key={payment.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {payment.reservationNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Guest:</strong> {payment.guestName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Reference:</strong> {payment.reference}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Date:</strong> {payment.date}
                </Typography>
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" color="primary">
                    ${payment.amount}
                  </Typography>
                  <Chip 
                    label={getMethodLabel(payment.method)} 
                    size="small" 
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  <Chip 
                    label={payment.status.replace('_', ' ')} 
                    color={getStatusColor(payment.status)} 
                    size="small" 
                  />
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={<EditIcon />} onClick={() => handleOpenDialog(payment)}>
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
          {currentPayment ? `Edit Payment ${currentPayment.reference}` : 'Add New Payment'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Reservation Number"
                  fullWidth
                  defaultValue={currentPayment?.reservationNumber || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="Guest Name"
                  fullWidth
                  defaultValue={currentPayment?.guestName || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Amount"
                  type="number"
                  fullWidth
                  defaultValue={currentPayment?.amount || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Reference"
                  fullWidth
                  defaultValue={currentPayment?.reference || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Payment Method</InputLabel>
                  <Select
                    label="Payment Method"
                    defaultValue={currentPayment?.method || 'CREDIT_CARD'}
                  >
                    <MenuItem value="CREDIT_CARD">Credit Card</MenuItem>
                    <MenuItem value="DEBIT_CARD">Debit Card</MenuItem>
                    <MenuItem value="CASH">Cash</MenuItem>
                    <MenuItem value="BANK_TRANSFER">Bank Transfer</MenuItem>
                    <MenuItem value="MOBILE_PAYMENT">Mobile Payment</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    defaultValue={currentPayment?.status || 'PENDING'}
                  >
                    <MenuItem value="PENDING">Pending</MenuItem>
                    <MenuItem value="COMPLETED">Completed</MenuItem>
                    <MenuItem value="FAILED">Failed</MenuItem>
                    <MenuItem value="CANCELLED">Cancelled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  defaultValue={currentPayment?.date || ''}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={() => handleSavePayment({})} variant="contained" color="primary">
            {currentPayment ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Payments;