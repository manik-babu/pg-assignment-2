import { Request, Response } from "express";
import { pool } from "../../config/db";
import authService from "./auth.service";
const signup = async (req: Request, res: Response) => {
    try {

        const validationError = await authService.formValidationError(req.body);
        if (validationError) {
            return res.status(400).json({
                success: false,
                message: "Accound creation faild!",
                errors: validationError
            });
        }

        const user = await authService.createUser(req.body);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            "data": user
        });


    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Internal server error!',
            errors: error.message
        });
    }
}



const authController = {
    signup,
}
export default authController;