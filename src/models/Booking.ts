import mongoose, { Document, Schema } from "mongoose";

export interface IBooking extends Document {
  userId: mongoose.Types.ObjectId;
  service: mongoose.Types.ObjectId;
  eventDate: Date;
  location: string;
  additionalDetails?: string;
  status: "pending" | "confirmed" | "cancelled";
}

const bookingSchema = new Schema<IBooking>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    eventDate: {
      type: Date,
      required: [true, "Please provide event date"],
    },
    location: {
      type: String,
      required: [true, "Please provide event location"],
    },
    additionalDetails: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBooking>("Booking", bookingSchema);
