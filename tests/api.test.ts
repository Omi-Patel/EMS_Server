import request from "supertest";
import mongoose from "mongoose";
import { app } from "../src/index";
import User from "../src/models/User";
import Service from "../src/models/Service";
import Booking from "../src/models/Booking";
import Gallery from "../src/models/Gallery";

let userToken: string;
let adminToken: string;
let userId: string;
let adminId: string;
let serviceId: mongoose.Types.ObjectId;
let bookingId: string;
let galleryItemId: string;

describe("Authentication Endpoints", () => {
  beforeAll(async () => {
    // Clear test database
    await User.deleteMany({});
  });

  describe("POST /api/auth/register", () => {
    it("should register a new user successfully", async () => {
      const res = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: "user@test.com",
        phone: "1234567890",
        password: "password123",
      });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
      expect(res.body.data.user.email).toBe("user@test.com");
      userId = res.body.data.user._id;
      userToken = res.body.token;
    });

    it("should register an admin user", async () => {
      const res = await request(app).post("/api/auth/register").send({
        name: "Test Admin",
        email: "admin@test.com",
        phone: "0987654321",
        password: "admin123",
        isAdmin: true,
      });

      expect(res.status).toBe(201);
      adminId = res.body.data.user._id;
      adminToken = res.body.token;
    });

    it("should fail to register with existing email", async () => {
      const res = await request(app).post("/api/auth/register").send({
        name: "Test User 2",
        email: "user@test.com",
        phone: "1234567890",
        password: "password123",
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should fail to register with invalid email format", async () => {
      const res = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: "invalid-email",
        phone: "1234567890",
        password: "password123",
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login successfully with correct credentials", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "user@test.com",
        password: "password123",
      });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
    });

    it("should fail to login with incorrect password", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "user@test.com",
        password: "wrongpassword",
      });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it("should fail to login with non-existent email", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "nonexistent@test.com",
        password: "password123",
      });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });
});

describe("Services Endpoints", () => {
  beforeAll(async () => {
    await Service.deleteMany({});
    // Create a service for testing
    const service = await Service.create({
      name: "Wedding Photography",
      description: "Professional wedding photography service",
      basePrice: 1000,
      category: "photography",
    });
    serviceId = service._id as unknown as mongoose.Types.ObjectId;
  });

  describe("POST /api/services", () => {
    it("should fail to create service without admin token", async () => {
      const res = await request(app)
        .post("/api/services")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          name: "Wedding Photography",
          description: "Professional wedding photography service",
          basePrice: 1000,
          category: "photography",
        });

      expect(res.status).toBe(403);
    });

    it("should create service with admin token", async () => {
      const res = await request(app)
        .post("/api/services")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          name: "Wedding Photography 2",
          description: "Professional wedding photography service",
          basePrice: 1000,
          category: "photography",
        });

      expect(res.status).toBe(201);
      expect(res.body.data.name).toBe("Wedding Photography 2");
    });

    it("should fail to create service with negative price", async () => {
      const res = await request(app)
        .post("/api/services")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          name: "Invalid Service",
          description: "Test service",
          basePrice: -100,
          category: "photography",
        });

      expect(res.status).toBe(400);
    });
  });

  describe("GET /api/services", () => {
    it("should get all services without authentication", async () => {
      const res = await request(app).get("/api/services");

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });
});

describe("Bookings Endpoints", () => {
  beforeAll(async () => {
    await Booking.deleteMany({});
  });

  describe("POST /api/bookings", () => {
    it("should create a booking successfully", async () => {
      // Set future date to one year from now
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);

      const res = await request(app)
        .post("/api/bookings")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          service: serviceId.toString(),
          eventDate: futureDate.toISOString(),
          location: "Test Venue",
          additionalDetails: "Test requirements",
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.service._id.toString()).toBe(serviceId.toString());
      bookingId = res.body.data._id;
    });

    it("should fail to create booking without authentication", async () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);

      const res = await request(app).post("/api/bookings").send({
        service: serviceId.toString(),
        eventDate: futureDate.toISOString(),
        location: "Test Venue",
      });

      expect(res.status).toBe(401);
    });

    it("should fail to create booking with past date", async () => {
      const pastDate = new Date();
      pastDate.setFullYear(pastDate.getFullYear() - 1);

      const res = await request(app)
        .post("/api/bookings")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          service: serviceId.toString(),
          eventDate: pastDate.toISOString(),
          location: "Test Venue",
        });

      expect(res.status).toBe(400);
    });
  });

  describe("GET /api/bookings", () => {
    it("should get user bookings", async () => {
      const res = await request(app)
        .get("/api/bookings")
        .set("Authorization", `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      if (res.body.data.length > 0) {
        expect(res.body.data[0].userId._id.toString()).toBe(userId);
      }
    });

    it("should get all bookings as admin", async () => {
      const res = await request(app)
        .get("/api/bookings/admin")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe("PUT /api/bookings/:id/status", () => {
    it("should update booking status as admin", async () => {
      // First create a booking
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);

      const createRes = await request(app)
        .post("/api/bookings")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          service: serviceId.toString(),
          eventDate: futureDate.toISOString(),
          location: "Test Venue",
          additionalDetails: "Test requirements",
        });

      expect(createRes.status).toBe(201);
      const bookingId = createRes.body.data._id;

      // Then update its status
      const res = await request(app)
        .put(`/api/bookings/${bookingId}/status`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          status: "confirmed",
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe("confirmed");
    });

    it("should fail to update booking status as regular user", async () => {
      const res = await request(app)
        .put(`/api/bookings/${bookingId}/status`)
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          status: "confirmed",
        });

      expect(res.status).toBe(403);
    });

    it("should fail to update with invalid status", async () => {
      const res = await request(app)
        .put(`/api/bookings/${bookingId}/status`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          status: "invalid_status",
        });

      expect(res.status).toBe(400);
    });
  });
});

describe("Gallery Endpoints", () => {
  beforeAll(async () => {
    await Gallery.deleteMany({});
  });

  describe("POST /api/gallery", () => {
    it("should create gallery item as admin", async () => {
      const res = await request(app)
        .post("/api/gallery")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          mediaType: "image",
          url: "https://example.com/image.jpg",
          eventId: serviceId,
          uploadedBy: adminId,
          title: "Test Image",
          description: "Test Description",
          isFeatured: true,
        });

      expect(res.status).toBe(201);
      galleryItemId = res.body.data._id;
    });

    it("should fail to create gallery item without admin rights", async () => {
      const res = await request(app)
        .post("/api/gallery")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          mediaType: "image",
          url: "https://example.com/image.jpg",
          eventId: serviceId,
          uploadedBy: userId,
          title: "Test Image",
        });

      expect(res.status).toBe(403);
    });
  });

  describe("GET /api/gallery", () => {
    it("should get all gallery items without authentication", async () => {
      const res = await request(app).get("/api/gallery");

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe("DELETE /api/gallery/:id", () => {
    it("should delete gallery item as admin", async () => {
      const res = await request(app)
        .delete(`/api/gallery/${galleryItemId}`)
        .set("Authorization", `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
    });

    it("should fail to delete non-existent gallery item", async () => {
      const res = await request(app)
        .delete(`/api/gallery/${new mongoose.Types.ObjectId()}`)
        .set("Authorization", `Bearer ${adminToken}`);

      expect(res.status).toBe(404);
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
