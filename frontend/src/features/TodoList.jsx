import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "./todoSlice.js";

export default function TodoList() {
  const [newTodo, setNewTodo] = useState("");
  
  const todosState = useSelector((state) => {
    console.log("Full Redux state:", state);
    console.log("Todos state:", state.todos);
    console.log("Todos items:", state.todos?.items);
    console.log("Status:", state.todos?.status);
    console.log("Error:", state.todos?.error);
    return state.todos;
  });
  
  const todos = Array.isArray(todosState?.items) ? todosState.items : [];
  const status = todosState?.status || "idle";
  const error = todosState?.error;
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAdd = async () => {
    if (newTodo.trim()) {
      console.log("Dispatching addTodo with:", newTodo);
      try {
        const result = await dispatch(addTodo(newTodo.trim()));
        console.log("Add todo result:", result);
        if (addTodo.fulfilled.match(result)) {
          setNewTodo("");
          console.log("Todo added successfully");
        } else {
          console.error("Failed to add todo:", result.error);
        }
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  };

  console.log("Final todos variable:", todos);
  console.log("Status:", status);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      
      {/* Show error if any */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}
      
      {/* Show loading status */}
      {status === "loading" && (
        <div className="text-blue-600 mb-4">Loading...</div>
      )}

      {/* Add Todo */}
      <div className="flex mb-4">
        <input
          type="text"
          className="border p-2 flex-1 rounded-l-lg"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button
          onClick={handleAdd}
          disabled={status === "loading" || !newTodo.trim()}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 rounded-r-lg"
        >
          {status === "loading" ? "Adding..." : "Add"}
        </button>
      </div>

      {/* List Todos */}
      <ul>
        {todos && Array.isArray(todos) && todos.length > 0 ? (
          todos.map((todo) => (
            <li
              key={todo._id}
              className="flex justify-between items-center p-2 border-b"
            >
              <span
                className={`cursor-pointer ${todo.completed ? "line-through text-gray-500" : ""}`}
                onClick={() =>
                  dispatch(updateTodo({ id: todo._id, data: { completed: !todo.completed } }))
                }
              >
                {todo.text || todo.title || "No text"}
              </span>
              <button
                onClick={() => dispatch(deleteTodo(todo._id))}
                className="text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </li>
          ))
        ) : (
          <li className="text-gray-500 text-center py-4">
            {status === "loading" ? "Loading todos..." : "No todos yet. Add one above!"}
          </li>
        )}
      </ul>
    </div>
  );
}