import express from "express";
const router = express.Router();

// @desc    Login/Landing
// @route   GET /
router.get("/", (req: express.Request, res: express.Response) => {
    res.render('login');    // Handlebars
});

// @desc    Dashboard
// @route   GET /dashboard
router.get("/dashboard", (req: express.Request, res: express.Response) => {
    res.render('dashboard');
});
export default router;
