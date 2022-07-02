import { Router } from "express";
import authRoute from "./auth-route";

const router = Router();

router.get("/auth", authRoute);

export default router;
