import express from "express";
import controller from "../controllers/users";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("USER ROUTER HERE!");
});

router.get("/me", (req, res) => {
    res.send("Welcome user.");

});

router.post("/register", (req, res) => {
    controller.registerUser(res, req.body);
});
export default router;
