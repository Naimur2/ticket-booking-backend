import { Router } from "express";
import authRoute from "./auth-route";
import locationRoutes from "./location-routes";

const router = Router();

router.use("/auth", authRoute);
router.use("/locations", locationRoutes);

export default router;
