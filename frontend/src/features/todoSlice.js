import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api/todo";

// Fetch Todos
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await axios.get(API_URL);
  return res.data.data;
});

// Add Todo - FIXED: Corrected URL and parameter
export const addTodo = createAsyncThunk("todos/addTodo", async (text) => {
  const res = await axios.post(`${API_URL}/add`, { text }); // Fixed: was ${add}
  return res.data.data;
});

// Update Todo
export const updateTodo = createAsyncThunk("todos/updateTodo", async ({ id, data }) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data.data;
});

// Delete Todo
export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

export const todoSlice = createSlice({
  name: "todos",
  initialState: { 
    items: [], 
    status: "idle",
    error: null 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Todos
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      
      // Add Todo
      .addCase(addTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
        state.error = null;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.error("Add todo failed:", action.error);
      })
      
      // Update Todo
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.error = action.error.message;
        console.error("Update todo failed:", action.error);
      })
      
      // Delete Todo
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t._id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.error = action.error.message;
        console.error("Delete todo failed:", action.error);
      });
  },
});

export default todoSlice.reducer;