import { Request, Response } from "express";
import mongoose from "mongoose";
import Booking from "../models/Booking";
import { IUser } from "../models/User";

interface CustomRequest extends Request {
  user?: IUser;
}

export const createBooking = async (req: CustomRequest, res: Response) => {
  try {
    const { eventDate, service } = req.body;

    console.log("Request body:", req.body);
    console.log("User:", req.user);

    if (!eventDate || !service) {
      console.log("Missing required fields:", { eventDate, service });
      return res.status(400).json({
        success: false,
        message: "Event date and service are required",
      });
    }

    // Check if event date is in the past
    const eventDateTime = new Date(eventDate).getTime();
    const currentDateTime = new Date().getTime();

    if (eventDateTime < currentDateTime) {
      console.log("Event date is in the past:", eventDate);
      return res.status(400).json({
        success: false,
        message: "Event date cannot be in the past",
      });
    }

    // Create booking with user ID
    const bookingData = {
      ...req.body,
      service: new mongoose.Types.ObjectId(service),
      userId: req.user?._id,
      status: "pending",
    };

    console.log("Creating booking with data:", bookingData);

    const booking = await Booking.create(bookingData);

    // Populate service details
    await booking.populate("service", "name basePrice");
    await booking.populate("userId", "name email");

    console.log("Created booking:", booking);

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error: any) {
    console.error("Error creating booking:", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyBookings = async (req: CustomRequest, res: Response) => {
  try {
    const bookings = await Booking.find({ userId: req.user?._id })
      .populate("service", "name basePrice")
      .populate("userId", "name email")
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email")
      .populate("service", "name basePrice")
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBookingStatus = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const { status } = req.body;

    // Validate status
    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid status. Must be one of: pending, confirmed, cancelled",
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
      .populate("service", "name basePrice")
      .populate("userId", "name email");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
