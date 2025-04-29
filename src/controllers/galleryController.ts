import { Request, Response } from "express";
import Gallery from "../models/Gallery";
import { IUser } from "../models/User";

interface CustomRequest extends Request {
  user?: IUser;
}

export const getAllGalleryItems = async (req: Request, res: Response) => {
  try {
    const galleryItems = await Gallery.find().sort("-createdAt");

    res.status(200).json({
      success: true,
      count: galleryItems.length,
      data: galleryItems,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getGalleryItem = async (req: Request, res: Response) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    res.status(200).json({
      success: true,
      data: galleryItem,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const createGalleryItem = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to create gallery items",
      });
    }

    const galleryItem = await Gallery.create({
      ...req.body,
      uploadedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: galleryItem,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateGalleryItem = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update gallery items",
      });
    }

    const galleryItem = await Gallery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    res.status(200).json({
      success: true,
      data: galleryItem,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteGalleryItem = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete gallery items",
      });
    }

    const galleryItem = await Gallery.findByIdAndDelete(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
