import { Router } from "express";
import authRoute from "./auth-route";
import locationRoutes from "./location-routes";
import busRoutes from "./bus-routes";

const router = Router();

router.use("/auth", authRoute);
router.use("/locations", locationRoutes);
router.use("/bus", busRoutes);

export default router;
