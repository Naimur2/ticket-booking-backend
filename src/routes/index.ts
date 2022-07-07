import { Router } from "express";
import authRoute from "./auth-route";
import cors from "cors";

const router = Router();

router.use(cors());
router.use("/auth", authRoute);

export default router;
