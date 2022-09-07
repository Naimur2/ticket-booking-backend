import { Router } from "express";
import {
    addCoach,
    deleteCoach,
    getAllCoaches,
    searchCoach,
    updateCoach,
    getCoachById,
    bookTicket,
    getUserTickets,
    cancelTicket,
} from "../controller/coach-controller";
import checkLogin from "../middlewares/check-login";

const router = Router();

router.get("/", getAllCoaches);
router.post("/search", searchCoach);
router.get("/:id", getCoachById);
router.get("/user-tickets/:id", checkLogin, getUserTickets);
router.post("/", checkLogin, addCoach);
router.put("/book/:id", checkLogin, bookTicket);
router.put("/cancel/:id", checkLogin, cancelTicket);
router.put("/:id", checkLogin, updateCoach);
router.delete("/:id", checkLogin, deleteCoach);

export default router;
