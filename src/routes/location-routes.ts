import { Router } from "express";
import {
    getAllLocation,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation,
} from "../controller/location-controller";
import checkLogin from "../middlewares/check-login";

const router = Router();

router.get("/", checkLogin, getAllLocation);
router.get("/:id", checkLogin, getLocationById);
router.post("/", checkLogin, createLocation);
router.put("/:id", checkLogin, updateLocation);
router.delete("/:id", checkLogin, deleteLocation);

export default router;
