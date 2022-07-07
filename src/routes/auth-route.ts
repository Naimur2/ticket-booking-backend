import { Router } from "express";
import checkLogin from "../middlewares/check-login";
import {
    loginController,
    registerController,
    validationController,
} from "../controller/auth-controller";

const router = Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.get("/validate", checkLogin, validationController);

export default router;
