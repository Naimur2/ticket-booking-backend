import { Router } from "express";
import {
    getAllBuses,
    getBusById,
    updateBus,
    addBus,
    deleteBus,
} from "../controller/bus-controller";
import { uploadBusImage } from "../middlewares/upload-bus-Image";
import checkLogin from "../middlewares/check-login";

const route = Router();

route.get("/", checkLogin, getAllBuses);
route.get("/:id", checkLogin, getBusById);
route.post("/", checkLogin, uploadBusImage, addBus);
route.put("/:id", checkLogin, uploadBusImage, updateBus);
route.delete("/:id", checkLogin, deleteBus);

export default route;
