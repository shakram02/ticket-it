import express from "express";
import controller from "../controllers/userController";
import passport from "passport";
import { Response } from "express";
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

router.post("/login", passport.authenticate("local",
    { successRedirect: "/", failureRedirect: "/users/login" })
);
export default router;
