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
      amount: 100.00,
      paymentMethod: 'CREDIT_CARD',
      paymentDate: '2025-12-20',
      status: 'COMPLETED'
    },
    {
      id: 2,
      reservationNumber: 'RES-002',
      guestName: 'Jane Smith',
      amount: 0.00,
      paymentMethod: 'CASH',
      paymentDate: '2025-12-22',
      status: 'PENDING'
    }
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);

  const handleOpenDialog = (payment = null) => {
    setCurrentPayment(payment);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentPayment(null);
  };

  const handleSavePayment = (paymentData) => {
    // In a real app, this would make an API call
    if (currentPayment) {
      // Update existing payment
      setPayments(payments.map(pmt => pmt.id === currentPayment.id ? {...pmt, ...paymentData} : pmt));
    } else {
      // Add new payment
      const newPayment = {...paymentData, id: payments.length + 1};
      setPayments([...payments, newPayment]);
    }
    handleCloseDialog();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'warning';
      case 'PROCESSING': return 'info';
      case 'COMPLETED': return 'success';
      case 'FAILED': return 'error';
      case 'REFUNDED': return 'default';
      default: return 'default';
    }
  };

  const getPaymentMethodLabel = (method) => {
    switch (method) {
      case 'CASH': return 'Cash';
      case 'CREDIT_CARD': return 'Credit Card';
      case 'DEBIT_CARD': return 'Debit Card';
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
                  ${payment.amount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Reservation: {payment.reservationNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Guest: {payment.guestName}
                </Typography>
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Method: {getPaymentMethodLabel(payment.paymentMethod)}
                  </Typography>
                  <Chip 
                    label={payment.status} 
                    color={getStatusColor(payment.status)} 
                    size="small" 
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Date: {payment.paymentDate}
                </Typography>
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
          {currentPayment ? `Edit Payment` : 'Add New Payment'}
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
                  defaultValue={currentPayment?.reservationNumber || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
                <FormControl fullWidth margin="dense">
                  <InputLabel>Payment Method</InputLabel>
                  <Select
                    label="Payment Method"
                    defaultValue={currentPayment?.paymentMethod || ''}
                  >
                    <MenuItem value="CASH">Cash</MenuItem>
                    <MenuItem value="CREDIT_CARD">Credit Card</MenuItem>
                    <MenuItem value="DEBIT_CARD">Debit Card</MenuItem>
                    <MenuItem value="BANK_TRANSFER">Bank Transfer</MenuItem>
                    <MenuItem value="MOBILE_PAYMENT">Mobile Payment</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Payment Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  defaultValue={currentPayment?.paymentDate || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    defaultValue={currentPayment?.status || 'PENDING'}
                  >
                    <MenuItem value="PENDING">Pending</MenuItem>
                    <MenuItem value="PROCESSING">Processing</MenuItem>
                    <MenuItem value="COMPLETED">Completed</MenuItem>
                    <MenuItem value="FAILED">Failed</MenuItem>
                    <MenuItem value="REFUNDED">Refunded</MenuItem>
                  </Select>
                </FormControl>
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