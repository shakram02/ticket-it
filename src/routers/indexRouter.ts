import express from "express";
import userRotuer from "./userRouter";

const router = express.Router();

// @desc    Login/Landing
// @route   GET /
router.get("/", (req: express.Request, res: express.Response) => {
    res.send("Owa");
});

// @desc    Dashboard
// @route   GET /dashboard
router.get("/dashboard", (req: express.Request, res: express.Response) => {
    res.render('dashboard');
});

router.use("/users", userRotuer)
export default router;
