# Booking API Documentation

## Create Booking

**Endpoint:** `POST /api/bookings`

**Authentication Required:** Yes (JWT Token in Authorization header)

**Request Body:**

```json
{
  "service": "65f1a2b3c4d5e6f7g8h9i0j1", // MongoDB ObjectId of the service
  "eventDate": "2024-05-15T14:00:00.000Z", // ISO Date string
  "location": "123 Event Street, City",
  "additionalDetails": "Special setup required" // Optional
}
```

**Success Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j2",
    "userId": {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j3",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "service": {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
      "name": "Wedding Photography",
      "basePrice": 1000
    },
    "eventDate": "2024-05-15T14:00:00.000Z",
    "location": "123 Event Street, City",
    "additionalDetails": "Special setup required",
    "status": "pending",
    "createdAt": "2024-03-10T12:00:00.000Z",
    "updatedAt": "2024-03-10T12:00:00.000Z"
  }
}
```

**Error Responses:**

```json
// 400 Bad Request - Missing required fields
{
  "success": false,
  "message": "Event date and service are required"
}

// 400 Bad Request - Invalid event date
{
  "success": false,
  "message": "Event date cannot be in the past"
}

// 401 Unauthorized - No token provided
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

## Get User Bookings

**Endpoint:** `GET /api/bookings`

**Authentication Required:** Yes (JWT Token in Authorization header)

**Success Response (200 OK):**

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j2",
      "userId": {
        "_id": "65f1a2b3c4d5e6f7g8h9i0j3",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "service": {
        "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
        "name": "Wedding Photography",
        "basePrice": 1000
      },
      "eventDate": "2024-05-15T14:00:00.000Z",
      "location": "123 Event Street, City",
      "additionalDetails": "Special setup required",
      "status": "pending",
      "createdAt": "2024-03-10T12:00:00.000Z",
      "updatedAt": "2024-03-10T12:00:00.000Z"
    }
  ]
}
```

## Get All Bookings (Admin Only)

**Endpoint:** `GET /api/bookings/admin`

**Authentication Required:** Yes (JWT Token in Authorization header with admin privileges)

**Success Response (200 OK):**

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j2",
      "userId": {
        "_id": "65f1a2b3c4d5e6f7g8h9i0j3",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "service": {
        "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
        "name": "Wedding Photography",
        "basePrice": 1000
      },
      "eventDate": "2024-05-15T14:00:00.000Z",
      "location": "123 Event Street, City",
      "additionalDetails": "Special setup required",
      "status": "pending",
      "createdAt": "2024-03-10T12:00:00.000Z",
      "updatedAt": "2024-03-10T12:00:00.000Z"
    }
  ]
}
```

## Update Booking Status (Admin Only)

**Endpoint:** `PUT /api/bookings/:id/status`

**Authentication Required:** Yes (JWT Token in Authorization header with admin privileges)

**Request Body:**

```json
{
  "status": "confirmed" // One of: "pending", "confirmed", "cancelled"
}
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j2",
    "userId": {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j3",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "service": {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
      "name": "Wedding Photography",
      "basePrice": 1000
    },
    "eventDate": "2024-05-15T14:00:00.000Z",
    "location": "123 Event Street, City",
    "additionalDetails": "Special setup required",
    "status": "confirmed",
    "createdAt": "2024-03-10T12:00:00.000Z",
    "updatedAt": "2024-03-10T12:00:00.000Z"
  }
}
```

**Error Responses:**

```json
// 400 Bad Request - Invalid status
{
  "success": false,
  "message": "Invalid status. Must be one of: pending, confirmed, cancelled"
}

// 404 Not Found - Booking not found
{
  "success": false,
  "message": "Booking not found"
}

// 403 Forbidden - Not admin
{
  "success": false,
  "message": "Not authorized to perform this action"
}
```
