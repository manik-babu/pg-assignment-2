import { Router } from "express";
import vehicleController from "./vehicle.controller";
import auth from "../../middleware/auth";


//   /api/v1/vehicles
const router = Router();

router.post('/', auth("admin"), vehicleController.createVehicle);


export const vehicleRouter = router;