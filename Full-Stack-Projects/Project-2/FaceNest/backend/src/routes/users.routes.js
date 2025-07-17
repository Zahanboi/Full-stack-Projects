import { Router } from "express";
import { login, register, addToHistory, getUserHistory, validateMeet } from "../controllers/user.controller.js";

const router = Router();

router.route("/login").post(login)
router.route("/register").post(register)
router.route("/add_to_activity").post(addToHistory)
router.route("/get_all_activity").get(getUserHistory)
router.route("/:url").get(validateMeet)

export default router;