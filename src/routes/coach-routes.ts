import { Router } from "express";
import {
    addCoach,
    deleteCoach,
    getAllCoaches,
    searchCoach,
    updateCoach,
} from "../controller/coach-controller";
import checkLogin from "../middlewares/check-login";
import { getCoachById } from "./../controller/coach-controller";

const router = Router();

router.get("/", getAllCoaches);
router.post("/search", searchCoach);
router.get("/:id", getCoachById);
router.post("/", checkLogin, addCoach);
router.put("/:id", checkLogin, updateCoach);
router.delete("/:id", checkLogin, deleteCoach);

export default router;
