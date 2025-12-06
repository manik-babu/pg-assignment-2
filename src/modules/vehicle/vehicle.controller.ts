import { Request, Response } from "express";
import vehicleService from "./vehicle.service";

const createVehicle = async (req: Request, res: Response) => {
    try {
        const formValidationError = await vehicleService.formValidationError(req.body);
        // Error response
        if (formValidationError) {
            return res.status(400).json({
                success: false,
                message: "Vehicle creation faild!",
                errors: formValidationError
            })
        }

        // vehicle creation
        const vehicle = await vehicleService.createVehicle(req.body);

        // success response
        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: vehicle
        });

    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error!',
            errors: error.message
        });
    }
}
const getAllVehicles = async (req: Request, res: Response) => {
    try {
        const result = await vehicleService.getAllVehicles();

        res.status(200).json({
            success: true,
            message: result.message,
            data: result.data
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Internal server error!',
            errors: error.message
        });
    }
}

const vehicleController = {
    createVehicle,
    getAllVehicles,
};
export default vehicleController;