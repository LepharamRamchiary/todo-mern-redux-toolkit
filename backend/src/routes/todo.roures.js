import { Router } from "express";
import {
  addText,
  gitTodoList,
  updateTodo,
} from "../controllers/todo.controllers.js";

const router = Router();

router.route("/").post(addText);
router.route("/get-todo-list").get(gitTodoList);
router.route("/:id").put(updateTodo);

export default router;
