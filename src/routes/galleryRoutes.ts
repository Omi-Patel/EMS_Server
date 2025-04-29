import express, { RequestHandler } from "express";
import { protect } from "../middlewares/authMiddleware";
import {
  getAllGalleryItems,
  getGalleryItem,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "../controllers/galleryController";

const router = express.Router();

// Public routes
router.get("/", getAllGalleryItems as RequestHandler);
router.get("/:id", getGalleryItem as RequestHandler);

// Protected routes
router.use(protect as RequestHandler);

router.post("/", createGalleryItem as RequestHandler);
router.put("/:id", updateGalleryItem as RequestHandler);
router.delete("/:id", deleteGalleryItem as RequestHandler);

export default router;
