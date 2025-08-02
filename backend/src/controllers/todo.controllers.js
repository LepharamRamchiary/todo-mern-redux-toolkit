import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Todo } from "../models/todo.model.js";
import mongoose from "mongoose";

const addText = asyncHandler(async (req, res) => {
  try {
    if (!req.body.text || typeof req.body.text !== "string") {
      throw new ApiError(400, "Todo text is required and must be a string.");
    }
    const todo = await Todo.create(req.body);
    return res
      .status(201)
      .json(new ApiResponse(201, todo, "add text sucessfully!"));
  } catch (error) {
    throw new ApiError(400, "Something want wrong!");
  }
});

const gitTodoList = asyncHandler(async (req, res) => {
  try {
    const todos = await Todo.find();
    return res
      .status(200)
      .json(new ApiResponse(200, todos, "All todos retrieve sucessfully!"));
  } catch (error) {
    throw new ApiError(
      500,
      "Something going wrong when retrieve the all todos"
    );
  }
});

const updateTodo = asyncHandler(async (req, res) => {
  try {
    const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, updateTodo, "Update the todo sucessfully!"));
  } catch (error) {
    throw new ApiError(400, "Something want wrong when update");
  }
});

export { addText, gitTodoList, updateTodo };
