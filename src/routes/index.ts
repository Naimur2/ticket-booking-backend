import { Router } from "express";
import authRoute from "./auth-route";
import locationRoutes from "./location-routes";
import cors from "cors";

const router = Router();

router.use(cors());
router.use("/auth", authRoute);
router.use("/locations", locationRoutes);

export default router;
