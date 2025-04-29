import mongoose, { Document, Schema } from "mongoose";

export interface IService extends Document {
  name: string;
  description: string;
  basePrice: number;
  category: string;
}

const serviceSchema = new Schema<IService>(
  {
    name: {
      type: String,
      required: [true, "Please provide service name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide service description"],
    },
    basePrice: {
      type: Number,
      required: [true, "Please provide base price"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Please provide service category"],
      enum: [
        "venue",
        "catering",
        "photography",
        "entertainment",
        "decor",
        "other",
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IService>("Service", serviceSchema);
