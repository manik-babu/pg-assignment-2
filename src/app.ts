import express, { Request, Response } from "express";
import initDB from "./config/db";

const app = express();
app.use(express.json());
app.use(express.urlencoded());


// initializing database table
initDB();


app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Hello world!"
    })
})



export default app;