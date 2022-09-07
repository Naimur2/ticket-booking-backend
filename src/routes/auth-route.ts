import { Router } from "express";
import checkLogin from "../middlewares/check-login";
import {
    loginController,
    registerController,
    validationController,
    getUserInfo,
    updateUserInfo,
} from "../controller/auth-controller";

const router = Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.get("/validate", checkLogin, validationController);
router.post("/user-info", checkLogin, getUserInfo);
router.put("/update-info", checkLogin, updateUserInfo);

export default router;
