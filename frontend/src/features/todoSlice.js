import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api/todo";

// Fetch Todos
export const fetchTodos = createAsyncThunk("/", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

// Add Todo
export const addTodo = createAsyncThunk("/add", async (title) => {
  const res = await axios.post(API_URL, { text });
  return res.data;
});

// Update Todo
export const updateTodo = createAsyncThunk("/:id", async ({ id, data }) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
});

// Delete Todo
export const deleteTodo = createAsyncThunk("/:id", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const todoSlice = createSlice({
  name: "todos",
  initialState: { items: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (t) => t._id === action.payload._id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t._id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
