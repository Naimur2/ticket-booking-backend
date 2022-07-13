import { Router } from "express";
import authRoute from "./auth-route";
import locationRoutes from "./location-routes";
import busRoutes from "./bus-routes";
import coachRoutes from "./coach-routes";

const router = Router();

router.use("/auth", authRoute);
router.use("/locations", locationRoutes);
router.use("/bus", busRoutes);
router.use("/coaches", coachRoutes);

export default router;
