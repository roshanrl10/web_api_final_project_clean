# Frontend-Backend Connection Guide

This guide explains how the frontend and backend have been connected for the trekking application.

## Backend Features Added

### 1. Equipment Management

- **Model**: `Equipment.js` - Stores equipment details (name, category, brand, price, etc.)
- **Model**: `EquipmentRental.js` - Tracks equipment rentals
- **Controller**: `equipmentController.js` - Handles CRUD operations
- **Routes**: `/api/equipment` - Equipment management endpoints
- **Routes**: `/api/equipment/rentals` - Rental management endpoints

### 2. Agency Management

- **Model**: `Agency.js` - Stores agency details (name, location, specialties, etc.)
- **Model**: `AgencyBooking.js` - Tracks agency bookings
- **Controller**: `agencyController.js` - Handles CRUD operations
- **Routes**: `/api/agencies` - Agency management endpoints
- **Routes**: `/api/agencies/bookings` - Booking management endpoints

### 3. Weather API Integration

- **Controller**: `weatherController.js` - Integrates with OpenWeatherMap API
- **Routes**: `/api/weather` - Weather data endpoints
- **Features**: Current weather, forecast, trekking recommendations

## Frontend Updates

### 1. API Configuration (`src/lib/api.ts`)

- Added new endpoints for equipment, agencies, and weather
- Created service functions for each feature
- Updated API interceptors for authentication

### 2. Equipment Rental Page

- Updated to use backend API instead of localStorage
- Integrated with `equipmentService` for CRUD operations
- Added error handling and fallback to sample data

### 3. Agency Booking Page

- Updated to use backend API instead of localStorage
- Integrated with `agencyService` for CRUD operations
- Added error handling and fallback to sample data

### 4. Weather Page

- Prepared for backend integration (currently using mock data)
- Added `weatherService` for API calls

## Setup Instructions

### 1. Backend Setup

```bash
cd /path/to/34b-web-api

# Install dependencies
npm install

# Set up environment variables
# Create .env file with:
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# PORT=3000
# OPENWEATHER_API_KEY=your_openweather_api_key (optional)

# Add sample data
node sample-equipment.js
node sample-agencies.js

# Start the server
npm start
```

### 2. Frontend Setup

```bash
cd /path/to/login_signup_frontend

# Install dependencies
npm install

# Set up environment variables
# Create .env file with:
# VITE_API_URL=http://localhost:3000

# Start the development server
npm run dev
```

## API Endpoints

### Equipment

- `GET /api/equipment` - Get all equipment
- `POST /api/equipment` - Create equipment (admin only)
- `PUT /api/equipment/:id` - Update equipment (admin only)
- `DELETE /api/equipment/:id` - Delete equipment (admin only)
- `GET /api/equipment/rentals/all` - Get all rentals
- `POST /api/equipment/rentals` - Create rental
- `PUT /api/equipment/rentals/:id` - Update rental

### Agencies

- `GET /api/agencies` - Get all agencies
- `POST /api/agencies` - Create agency (admin only)
- `PUT /api/agencies/:id` - Update agency (admin only)
- `DELETE /api/agencies/:id` - Delete agency (admin only)
- `GET /api/agencies/bookings/all` - Get all bookings
- `POST /api/agencies/bookings` - Create booking
- `PUT /api/agencies/bookings/:id` - Update booking

### Weather

- `GET /api/weather/current?location=city` - Get current weather
- `GET /api/weather/forecast?location=city` - Get weather forecast
- `GET /api/weather/mock?location=city` - Get mock weather data

## Authentication

All protected endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Error Handling

- Frontend includes fallback to sample data if API calls fail
- Backend includes proper error responses with status codes
- Frontend shows user-friendly error messages via toast notifications

## Next Steps

1. **Weather API**: Get a free API key from OpenWeatherMap and update the backend
2. **Maps Integration**: Add trekking routes and maps functionality
3. **Admin Dashboard**: Complete the admin interface for managing equipment and agencies
4. **Payment Integration**: Add payment processing for bookings
5. **Real-time Updates**: Add WebSocket support for real-time booking updates

## Troubleshooting

### Common Issues

1. **CORS Errors**: Backend is configured to allow all origins (`*`)
2. **Authentication Errors**: Ensure JWT token is properly stored and sent
3. **Database Connection**: Check MongoDB connection string in `.env`
4. **API Endpoints**: Verify all routes are properly registered in `index.js`

### Testing

Use Postman or similar tool to test API endpoints:

1. Register/login to get a JWT token
2. Use the token in Authorization header for protected endpoints
3. Test CRUD operations for equipment and agencies
4. Test booking creation and retrieval
