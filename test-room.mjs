import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

async function testRoomCreation() {
  try {
    console.log('Testing room creation...');
    
    // First, let's verify room types exist
    console.log('Checking room types...');
    const roomTypes = await axios.get(`${API_BASE}/room-types`);
    console.log('Available room types:', roomTypes.data.map(rt => ({id: rt.id, name: rt.name})));
    
    const roomData = {
      roomNumber: '101',
      roomType: 1,  // Use the first room type
      floor: 1,
      price: 100.00,
      maxOccupancy: 2,
      status: 'AVAILABLE',
      description: 'Test room'
    };

    console.log('Sending room data:', roomData);
    
    const response = await axios.post(`${API_BASE}/rooms`, roomData);
    console.log('Room created successfully:', response.data);
  } catch (error) {
    console.log('Error creating room:');
    console.log('Status:', error.response?.status);
    console.log('Data:', error.response?.data);
    console.log('Message:', error.message);
  }
}

testRoomCreation();