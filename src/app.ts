import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./db";


const app: Application = express();
// Load config
dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT;

const add = (a: number, b: number) => a + b;
app.get("/", (req: Request, res: Response) => {
    res.send(`Hello worrrr ${add(2, 3)}`);
})

connectDB();

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} in ${process.env.NODE_ENV}`);
});
