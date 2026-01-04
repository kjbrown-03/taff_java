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

const Staff = () => {
  const [staff, setStaff] = useState([
    {
      id: 1,
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael.johnson@example.com',
      phone: '+1122334455',
      position: 'Manager',
      department: 'Management',
      salary: 5000,
      hireDate: '2023-01-15',
      status: 'ACTIVE'
    },
    {
      id: 2,
      firstName: 'Sarah',
      lastName: 'Williams',
      email: 'sarah.williams@example.com',
      phone: '+2233445566',
      position: 'Front Desk Agent',
      department: 'Reception',
      salary: 2500,
      hireDate: '2023-03-20',
      status: 'ACTIVE'
    },
    {
      id: 3,
      firstName: 'Robert',
      lastName: 'Brown',
      email: 'robert.brown@example.com',
      phone: '+3344556677',
      position: 'Housekeeping',
      department: 'Housekeeping',
      salary: 2000,
      hireDate: '2023-05-10',
      status: 'ON_LEAVE'
    }
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);

  const handleOpenDialog = (staffMember = null) => {
    setCurrentStaff(staffMember);
    setOpenDialog(true);
  };

  const handleSaveStaff = (staffData) => {
    // In a real app, this would make an API call
    if (currentStaff) {
      // Update existing staff
      setStaff(staff.map(member => member.id === currentStaff.id ? {...member, ...staffData} : member));
    } else {
      // Add new staff
      const newStaff = {...staffData, id: staff.length + 1};
      setStaff([...staff, newStaff]);
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentStaff(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'success';
      case 'INACTIVE': return 'error';
      case 'ON_LEAVE': return 'warning';
      case 'SUSPENDED': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Staff Management</Typography>
        <Fab color="primary" aria-label="add" onClick={() => handleOpenDialog()}>
          <AddIcon />
        </Fab>
      </Box>

      <Grid container spacing={3}>
        {staff.map((staffMember) => (
          <Grid item xs={12} sm={6} md={4} key={staffMember.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {staffMember.firstName} {staffMember.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Position:</strong> {staffMember.position}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Department:</strong> {staffMember.department}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Email:</strong> {staffMember.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Phone:</strong> {staffMember.phone}
                </Typography>
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" color="primary">
                    ${staffMember.salary}/month
                  </Typography>
                  <Chip 
                    label={staffMember.status.replace('_', ' ')} 
                    color={getStatusColor(staffMember.status)} 
                    size="small" 
                  />
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={<EditIcon />} onClick={() => handleOpenDialog(staffMember)}>
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
          {currentStaff ? `Edit Staff ${currentStaff.firstName} ${currentStaff.lastName}` : 'Add New Staff'}
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
                  defaultValue={currentStaff?.firstName || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Last Name"
                  fullWidth
                  defaultValue={currentStaff?.lastName || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="Email"
                  fullWidth
                  defaultValue={currentStaff?.email || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="Phone"
                  fullWidth
                  defaultValue={currentStaff?.phone || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Position"
                  fullWidth
                  defaultValue={currentStaff?.position || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Department"
                  fullWidth
                  defaultValue={currentStaff?.department || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Salary"
                  type="number"
                  fullWidth
                  defaultValue={currentStaff?.salary || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    defaultValue={currentStaff?.status || 'ACTIVE'}
                  >
                    <MenuItem value="ACTIVE">Active</MenuItem>
                    <MenuItem value="INACTIVE">Inactive</MenuItem>
                    <MenuItem value="ON_LEAVE">On Leave</MenuItem>
                    <MenuItem value="SUSPENDED">Suspended</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="Hire Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  defaultValue={currentStaff?.hireDate || ''}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={() => handleSaveStaff({})} variant="contained" color="primary">
            {currentStaff ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Staff;