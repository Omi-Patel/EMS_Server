import express, { RequestHandler } from "express";
import { protect, admin } from "../middlewares/authMiddleware";
import {
  getAllServices,
  getService,
  createService,
  updateService,
  deleteService,
} from "../controllers/serviceController";

const router = express.Router();

router
  .route("/")
  .get(getAllServices as RequestHandler)
  .post(
    protect as RequestHandler,
    admin as RequestHandler,
    createService as RequestHandler
  );

router
  .route("/:id")
  .get(getService as RequestHandler)
  .put(
    protect as RequestHandler,
    admin as RequestHandler,
    updateService as RequestHandler
  )
  .delete(
    protect as RequestHandler,
    admin as RequestHandler,
    deleteService as RequestHandler
  );

export default router;
