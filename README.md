# Travel Booking API

A Node.js/Express API for travel booking system with user authentication, hotel bookings, equipment rentals, and more.

## Features

- User authentication (login/register)
- Hotel booking management
- Equipment rental system
- Booking management
- File upload support
- JWT-based authentication
- MongoDB database

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/travel_booking_db
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
NODE_ENV=development
```

### 3. Database Setup

Make sure MongoDB is running on your system. If using a local MongoDB instance:

```bash
# Start MongoDB (if not running as a service)
mongod
```

### 4. Start the Server

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Hotels

- `GET /api/hotels` - Get all hotels
- `POST /api/hotels` - Create new hotel
- `PUT /api/hotels/:id` - Update hotel
- `DELETE /api/hotels/:id` - Delete hotel

### Bookings

- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking

### Equipment

- `GET /api/equipment` - Get all equipment
- `POST /api/equipment` - Create new equipment
- `PUT /api/equipment/:id` - Update equipment
- `DELETE /api/equipment/:id` - Delete equipment

### Equipment Bookings

- `GET /api/equipment-bookings` - Get all equipment bookings
- `POST /api/equipment-bookings` - Create new equipment booking
- `PUT /api/equipment-bookings/:id` - Update equipment booking
- `DELETE /api/equipment-bookings/:id` - Delete equipment booking

## Database Models

- **User**: username, email, firstName, lastName, password, role
- **Hotel**: name, description, location, price, amenities
- **Booking**: user, hotel, checkIn, checkOut, totalPrice, status
- **Equipment**: name, description, category, dailyRate, availability
- **EquipmentBooking**: user, equipment, startDate, endDate, totalPrice, status

## Frontend Connection

The API is configured to work with the React frontend running on:

- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (Alternative dev server)

CORS is configured to allow these origins in development.
