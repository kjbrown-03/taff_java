# Hotel Management System - Frontend

## Prerequisites

Before running the frontend, ensure you have the following installed:

- Node.js 16 or higher
- npm or yarn package manager

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Features

- Dashboard with key metrics
- Room management
- Reservation management
- Guest management
- Staff management
- Service management
- Payment processing
- Reporting and analytics
- User authentication

## Project Structure

- `src/components/` - Reusable UI components
- `src/pages/` - Page components for different sections
- `src/services/` - API services and authentication
- `src/App.jsx` - Main application component
- `src/main.jsx` - Entry point

## API Integration

The frontend communicates with the backend API at `http://localhost:8080/api` by default. You can change this in `src/services/api.js`.

## Troubleshooting

If you encounter issues:

1. Ensure the backend server is running on port 8080
2. Check that all dependencies are installed (`npm install`)
3. Clear npm cache if needed (`npm cache clean --force`)
4. Delete `node_modules` and reinstall if issues persist