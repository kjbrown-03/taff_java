# Hotel Management System - Backend

## Prerequisites

Before running the backend, ensure you have the following installed:

- Java 17 or higher
- Maven 3.6.0 or higher
- MySQL 8.0 or higher

## Database Setup

1. Make sure MySQL is running
2. The application will automatically create the database if it doesn't exist
3. Default database name: `hotel_management`
4. Default credentials: 
   - Username: `root`
   - Password: (empty)

## Running the Application

### Using Maven (Recommended)

```bash
# Navigate to the backend directory
cd backend

# Build and run the application
mvn spring-boot:run
```

### Using Executable JAR

```bash
# Build the application
mvn clean package

# Run the JAR file
java -jar target/hotel-management-backend-1.0.0.jar
```

## Configuration

The application can be configured using the `src/main/resources/application.properties` file:

- Server port: 8080
- Database connection: localhost:3306
- JWT expiration: 24 hours
- CORS allowed origins: http://localhost:3000, http://localhost:5173

## API Endpoints

- Authentication: `POST /api/auth/login`
- Registration: `POST /api/auth/register`
- Rooms: `GET/POST/PUT/DELETE /api/rooms`
- Reservations: `GET/POST/PUT/DELETE /api/reservations`
- Guests: `GET/POST/PUT/DELETE /api/guests`
- Staff: `GET/POST/PUT/DELETE /api/staff`
- Services: `GET/POST/PUT/DELETE /api/services`
- Payments: `GET/POST/PUT/DELETE /api/payments`

## Troubleshooting

If you encounter issues:

1. Ensure MySQL is running
2. Check that the database credentials in `application.properties` are correct
3. Verify that port 8080 is not in use by another application