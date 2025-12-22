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
      email: 'michael.johnson@hotel.com',
      position: 'Receptionist',
      department: 'Front Office',
      employeeId: 'EMP001',
      isActive: true
    },
    {
      id: 2,
      firstName: 'Sarah',
      lastName: 'Williams',
      email: 'sarah.williams@hotel.com',
      position: 'Housekeeper',
      department: 'Housekeeping',
      employeeId: 'EMP002',
      isActive: true
    }
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);

  const handleOpenDialog = (staffMember = null) => {
    setCurrentStaff(staffMember);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentStaff(null);
  };

  const handleSaveStaff = (staffData) => {
    // In a real app, this would make an API call
    if (currentStaff) {
      // Update existing staff member
      setStaff(staff.map(member => member.id === currentStaff.id ? {...member, ...staffData} : member));
    } else {
      // Add new staff member
      const newStaff = {...staffData, id: staff.length + 1};
      setStaff([...staff, newStaff]);
    }
    handleCloseDialog();
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
        {staff.map((member) => (
          <Grid item xs={12} sm={6} md={4} key={member.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {member.firstName} {member.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Employee ID: {member.employeeId}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Position: {member.position}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Department: {member.department}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: {member.email}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Chip 
                    label={member.isActive ? 'Active' : 'Inactive'} 
                    color={member.isActive ? 'success' : 'error'} 
                    size="small" 
                  />
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={<EditIcon />} onClick={() => handleOpenDialog(member)}>
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
          {currentStaff ? `Edit Staff Member ${currentStaff.firstName} ${currentStaff.lastName}` : 'Add New Staff Member'}
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
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Employee ID"
                  fullWidth
                  defaultValue={currentStaff?.employeeId || ''}
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
                <FormControl fullWidth margin="dense">
                  <InputLabel>Department</InputLabel>
                  <Select
                    label="Department"
                    defaultValue={currentStaff?.department || ''}
                  >
                    <MenuItem value="Front Office">Front Office</MenuItem>
                    <MenuItem value="Housekeeping">Housekeeping</MenuItem>
                    <MenuItem value="Food & Beverage">Food & Beverage</MenuItem>
                    <MenuItem value="Maintenance">Maintenance</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    defaultValue={currentStaff?.isActive ? 'Active' : 'Inactive'}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
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