import express, { RequestHandler } from "express";
import { protect, admin } from "../middlewares/authMiddleware";
import {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
} from "../controllers/bookingController";

const router = express.Router();

router.use(protect as RequestHandler);

router
  .route("/")
  .post(createBooking as RequestHandler)
  .get(getMyBookings as RequestHandler);

router
  .route("/admin")
  .get(admin as RequestHandler, getAllBookings as RequestHandler);

router
  .route("/:id/status")
  .put(admin as RequestHandler, updateBookingStatus as RequestHandler);

export default router;
