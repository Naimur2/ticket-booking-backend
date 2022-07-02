import { Router } from "express";
import {
    loginController,
    registerController,
    validationController,
} from "../controller/auth-controller";

const router = Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.get("/validate", validationController);

export default router;
