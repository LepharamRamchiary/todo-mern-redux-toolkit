import { Router } from "express";
import {
  addText,
  gitTodoList,
  updateTodo,
  deleteTodo
} from "../controllers/todo.controllers.js";

const router = Router();

router.route("/").post(addText);
router.route("/get-todo-list").get(gitTodoList);
router.route("/:id").put(updateTodo);
router.route("/:id").delete(deleteTodo);

export default router;
