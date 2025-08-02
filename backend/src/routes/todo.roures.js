import { Router } from "express";
import { addText } from "../controllers/todo.controllers.js";

const router = Router();

router.route("/").post(addText);

export default router;
