import mongoose, { Document, Schema } from "mongoose";

export interface IGallery extends Document {
  mediaType: "image" | "video";
  url: string;
  eventId: mongoose.Types.ObjectId;
  uploadedBy: mongoose.Types.ObjectId;
  title?: string;
  description?: string;
  isFeatured: boolean;
}

const gallerySchema = new Schema<IGallery>(
  {
    mediaType: {
      type: String,
      enum: ["image", "video"],
      required: [true, "Please provide media type"],
    },
    url: {
      type: String,
      required: [true, "Please provide media URL"],
    },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IGallery>("Gallery", gallerySchema);
