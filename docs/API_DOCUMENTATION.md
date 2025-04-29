# Event Management API Documentation

## Table of Contents

1. [Authentication](#authentication)
2. [Services](#services)
3. [Bookings](#bookings)
4. [Gallery](#gallery)

## Authentication

### Register User

**Endpoint:** `POST /api/auth/register`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "password123",
  "isAdmin": false // Optional, defaults to false
}
```

**Success Response (201 Created):**

```json
{
  "success": true,
  "token": "jwt_token_here",
  "data": {
    "user": {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j3",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "isAdmin": false
    }
  }
}
```

### Login

**Endpoint:** `POST /api/auth/login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "token": "jwt_token_here",
  "data": {
    "user": {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j3",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "isAdmin": false
    }
  }
}
```

## Services

### Create Service (Admin Only)

**Endpoint:** `POST /api/services`

**Authentication Required:** Yes (JWT Token with admin privileges)

**Request Body:**

```json
{
  "name": "Wedding Photography",
  "description": "Professional wedding photography service",
  "basePrice": 1000
}
```

**Success Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "name": "Wedding Photography",
    "description": "Professional wedding photography service",
    "basePrice": 1000,
    "createdAt": "2024-03-10T12:00:00.000Z",
    "updatedAt": "2024-03-10T12:00:00.000Z"
  }
}
```

### Get All Services

**Endpoint:** `GET /api/services`

**Success Response (200 OK):**

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
      "name": "Wedding Photography",
      "description": "Professional wedding photography service",
      "basePrice": 1000,
      "createdAt": "2024-03-10T12:00:00.000Z",
      "updatedAt": "2024-03-10T12:00:00.000Z"
    }
  ]
}
```

## Bookings

### Create Booking

**Endpoint:** `POST /api/bookings`

**Authentication Required:** Yes (JWT Token)

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

### Get User Bookings

**Endpoint:** `GET /api/bookings`

**Authentication Required:** Yes (JWT Token)

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

### Get All Bookings (Admin Only)

**Endpoint:** `GET /api/bookings/admin`

**Authentication Required:** Yes (JWT Token with admin privileges)

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

### Update Booking Status (Admin Only)

**Endpoint:** `PUT /api/bookings/:id/status`

**Authentication Required:** Yes (JWT Token with admin privileges)

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

## Gallery

### Create Gallery Item (Admin Only)

**Endpoint:** `POST /api/gallery`

**Authentication Required:** Yes (JWT Token with admin privileges)

**Request Body:**

```json
{
  "title": "Wedding Photography",
  "description": "Beautiful wedding moments",
  "imageUrl": "https://example.com/image.jpg",
  "category": "wedding"
}
```

**Success Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j4",
    "title": "Wedding Photography",
    "description": "Beautiful wedding moments",
    "imageUrl": "https://example.com/image.jpg",
    "category": "wedding",
    "createdAt": "2024-03-10T12:00:00.000Z",
    "updatedAt": "2024-03-10T12:00:00.000Z"
  }
}
```

### Get All Gallery Items

**Endpoint:** `GET /api/gallery`

**Success Response (200 OK):**

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j4",
      "title": "Wedding Photography",
      "description": "Beautiful wedding moments",
      "imageUrl": "https://example.com/image.jpg",
      "category": "wedding",
      "createdAt": "2024-03-10T12:00:00.000Z",
      "updatedAt": "2024-03-10T12:00:00.000Z"
    }
  ]
}
```

### Delete Gallery Item (Admin Only)

**Endpoint:** `DELETE /api/gallery/:id`

**Authentication Required:** Yes (JWT Token with admin privileges)

**Success Response (200 OK):**

```json
{
  "success": true,
  "data": null
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request

```json
{
  "success": false,
  "message": "Error message here"
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 403 Forbidden

```json
{
  "success": false,
  "message": "Not authorized to perform this action"
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Internal server error"
}
```
