import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
  title: string;
  type: string;
  description: string;
  date: Date;
  guestCount: number;
  services: mongoose.Types.ObjectId[];
  budget: number;
  status: "pending" | "approved" | "rejected" | "completed";
  createdBy: mongoose.Types.ObjectId;
  assignedTo?: mongoose.Types.ObjectId;
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, "Please provide event title"],
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Please provide event type"],
      enum: ["wedding", "birthday", "corporate", "social", "other"],
    },
    description: {
      type: String,
      required: [true, "Please provide event description"],
    },
    date: {
      type: Date,
      required: [true, "Please provide event date"],
    },
    guestCount: {
      type: Number,
      required: [true, "Please provide guest count"],
      min: [1, "Guest count must be at least 1"],
    },
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
    budget: {
      type: Number,
      required: [true, "Please provide budget"],
      min: [0, "Budget cannot be negative"],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "pending",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IEvent>("Event", eventSchema);
