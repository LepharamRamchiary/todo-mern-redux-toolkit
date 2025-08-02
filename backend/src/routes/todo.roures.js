import { Router } from "express";
import { addText, gitTodoList } from "../controllers/todo.controllers.js";

const router = Router();

router.route("/").post(addText);
router.route("/get-todo-list").get(gitTodoList);

export default router;
