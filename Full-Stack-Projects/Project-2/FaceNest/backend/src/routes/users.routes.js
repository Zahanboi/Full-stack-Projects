import { Router } from "express";
import { login ,register} from "./../Controllers/user.controller.js";

const router = Router();

router.route("/login").post(login);//whenever someone sends a post request to /login the login fuction will be called and the logic inside it in ran so that means can write the entire login code in this bracket like async `
router.route("/register").post(register);
router.route("/add_to_activity");
router.route("/get_all_activity");

export default router;