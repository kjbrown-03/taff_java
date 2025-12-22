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

const Rooms = () => {
  const [rooms, setRooms] = useState([
    {
      id: 1,
      roomNumber: '101',
      roomType: 'Standard Room',
      floor: 1,
      price: 100.00,
      status: 'AVAILABLE',
      maxOccupancy: 2,
      description: 'Standard room with city view',
      imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 2,
      roomNumber: '201',
      roomType: 'Deluxe Room',
      floor: 2,
      price: 150.00,
      status: 'OCCUPIED',
      maxOccupancy: 3,
      description: 'Deluxe room with balcony',
      imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 3,
      roomNumber: '301',
      roomType: 'Suite',
      floor: 3,
      price: 250.00,
      status: 'AVAILABLE',
      maxOccupancy: 4,
      description: 'Luxury suite with panoramic view',
      imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    }
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);

  const handleOpenDialog = (room = null) => {
    setCurrentRoom(room);
    setOpenDialog(true);
  };

  const handleSaveRoom = (roomData) => {
    // In a real app, this would make an API call
    if (currentRoom) {
      // Update existing room
      setRooms(rooms.map(room => room.id === currentRoom.id ? {...room, ...roomData} : room));
    } else {
      // Add new room
      const newRoom = {...roomData, id: rooms.length + 1};
      setRooms([...rooms, newRoom]);
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentRoom(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'AVAILABLE': return 'success';
      case 'OCCUPIED': return 'error';
      case 'MAINTENANCE': return 'warning';
      case 'RESERVED': return 'info';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Rooms Management</Typography>
        <Fab color="primary" aria-label="add" onClick={() => handleOpenDialog()}>
          <AddIcon />
        </Fab>
      </Box>

      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image={room.imageUrl}
                alt={room.roomType}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  Room {room.roomNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {room.description}
                </Typography>
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip label={room.roomType} size="small" />
                  <Chip label={`Floor ${room.floor}`} size="small" variant="outlined" />
                </Box>
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" color="primary">
                    ${room.price}/night
                  </Typography>
                  <Chip 
                    label={room.status.replace('_', ' ')} 
                    color={getStatusColor(room.status)} 
                    size="small" 
                  />
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={<EditIcon />} onClick={() => handleOpenDialog(room)}>
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
          {currentRoom ? `Edit Room ${currentRoom.roomNumber}` : 'Add New Room'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Room Number"
                  fullWidth
                  defaultValue={currentRoom?.roomNumber || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Room Type</InputLabel>
                  <Select
                    label="Room Type"
                    defaultValue={currentRoom?.roomType || ''}
                  >
                    <MenuItem value="Standard Room">Standard Room</MenuItem>
                    <MenuItem value="Deluxe Room">Deluxe Room</MenuItem>
                    <MenuItem value="Suite">Suite</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Floor"
                  type="number"
                  fullWidth
                  defaultValue={currentRoom?.floor || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  label="Price per Night"
                  type="number"
                  fullWidth
                  defaultValue={currentRoom?.price || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    defaultValue={currentRoom?.status || 'AVAILABLE'}
                  >
                    <MenuItem value="AVAILABLE">Available</MenuItem>
                    <MenuItem value="OCCUPIED">Occupied</MenuItem>
                    <MenuItem value="MAINTENANCE">Maintenance</MenuItem>
                    <MenuItem value="RESERVED">Reserved</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                  defaultValue={currentRoom?.description || ''}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={() => handleSaveRoom({})} variant="contained" color="primary">
            {currentRoom ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Rooms;