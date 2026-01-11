import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

async function populateSampleData() {
  try {
    console.log('Populating sample data...');
    
    // Create sample room types first
    const roomTypes = [
      {
        name: 'Standard Room',
        description: 'Basic room with essential amenities',
        basePrice: 100.00,
        capacity: 2
      },
      {
        name: 'Deluxe Room',
        description: 'Upgraded room with premium amenities',
        basePrice: 150.00,
        capacity: 3
      },
      {
        name: 'Suite',
        description: 'Luxury suite with panoramic views',
        basePrice: 250.00,
        capacity: 4
      }
    ];

    console.log('Creating room types...');
    const createdRoomTypes = [];
    for (const roomType of roomTypes) {
      try {
        const response = await axios.post(`${API_BASE}/room-types`, roomType);
        console.log(`Created room type ${response.data.name} with ID ${response.data.id}`);
        createdRoomTypes.push(response.data);
      } catch (error) {
        console.log(`Room type ${roomType.name} already exists or error:`, error.message);
        // Try to get existing room types
        try {
          const existingTypes = await axios.get(`${API_BASE}/room-types`);
          const existingType = existingTypes.data.find(rt => rt.name === roomType.name);
          if (existingType) {
            createdRoomTypes.push(existingType);
            console.log(`Using existing room type ${existingType.name} with ID ${existingType.id}`);
          }
        } catch (getErr) {
          console.log('Error getting existing room types:', getErr.message);
        }
      }
    }

    // Create sample rooms using the created room types
    const rooms = [
      {
        roomNumber: '101',
        roomType: createdRoomTypes[0]?.id || 1, // Use Standard Room
        floor: 1,
        price: 100.00,
        maxOccupancy: 2,
        status: 'AVAILABLE',
        description: 'Standard room with city view'
      },
      {
        roomNumber: '102',
        roomType: createdRoomTypes[0]?.id || 1, // Use Standard Room
        floor: 1,
        price: 100.00,
        maxOccupancy: 2,
        status: 'AVAILABLE',
        description: 'Standard room with garden view'
      },
      {
        roomNumber: '201',
        roomType: createdRoomTypes[1]?.id || 2, // Use Deluxe Room
        floor: 2,
        price: 150.00,
        maxOccupancy: 3,
        status: 'OCCUPIED',
        description: 'Deluxe room with balcony'
      },
      {
        roomNumber: '301',
        roomType: createdRoomTypes[2]?.id || 3, // Use Suite
        floor: 3,
        price: 250.00,
        maxOccupancy: 4,
        status: 'AVAILABLE',
        description: 'Luxury suite with panoramic view'
      }
    ];

    console.log('Creating rooms...');
    for (const room of rooms) {
      try {
        await axios.post(`${API_BASE}/rooms`, room);
        console.log(`Created room ${room.roomNumber}`);
      } catch (error) {
        console.log(`Room ${room.roomNumber} already exists or error:`, error.message);
      }
    }

    // Create sample guests
    const guests = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        address: '123 Main St, New York, NY',
        nationality: 'American',
        idNumber: 'ID123456'
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '+0987654321',
        address: '456 Oak Ave, Los Angeles, CA',
        nationality: 'American',
        idNumber: 'ID789012'
      }
    ];

    console.log('Creating guests...');
    for (const guest of guests) {
      try {
        await axios.post(`${API_BASE}/guests`, guest);
        console.log(`Created guest ${guest.firstName} ${guest.lastName}`);
      } catch (error) {
        console.log(`Guest ${guest.firstName} ${guest.lastName} already exists or error:`, error.message);
      }
    }

    console.log('Sample data population completed!');
  } catch (error) {
    console.error('Error populating data:', error.message);
  }
}

populateSampleData();