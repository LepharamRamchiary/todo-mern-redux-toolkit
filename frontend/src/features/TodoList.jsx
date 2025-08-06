import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "./todoSlice.js";
import { Plus, Trash2, CheckCircle2, Circle, AlertCircle, Loader2, Edit3, Check, X } from "lucide-react";

export default function TodoList() {
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [editText, setEditText] = useState("");
  
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

  const handleEditStart = (todo) => {
    setEditingTodo(todo._id);
    setEditText(todo.text || todo.title || "");
  };

  const handleEditSave = async (todoId) => {
    if (editText.trim() && editText.trim() !== "") {
      try {
        const result = await dispatch(updateTodo({ 
          id: todoId, 
          data: { text: editText.trim() } 
        }));
        if (updateTodo.fulfilled.match(result)) {
          setEditingTodo(null);
          setEditText("");
        } else {
          console.error("Failed to update todo:", result.error);
        }
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    }
  };

  const handleEditCancel = () => {
    setEditingTodo(null);
    setEditText("");
  };

  const handleToggleComplete = (todo) => {
    dispatch(updateTodo({ id: todo._id, data: { completed: !todo.completed } }));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  console.log("Final todos variable:", todos);
  console.log("Status:", status);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 mb-6">
          <div className="p-6 sm:p-8 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">
                  Task Manager
                </h1>
                <p className="text-slate-600">
                  Stay organized and productive
                </p>
              </div>
              {totalCount > 0 && (
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{completedCount}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide">Completed</div>
                  </div>
                  <div className="w-px h-10 bg-slate-200"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-700">{totalCount}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide">Total</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Add Todo Section */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  className="w-full px-4 py-3 pr-12 text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="What needs to be done?"
                  onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                />
                {newTodo.trim() && (
                  <button
                    onClick={() => setNewTodo("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>
              <button
                onClick={handleAdd}
                disabled={status === "loading" || !newTodo.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-300 disabled:to-slate-400 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:shadow-none min-w-[120px]"
              >
                {status === "loading" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">
                  {status === "loading" ? "Adding..." : "Add Task"}
                </span>
                <span className="sm:hidden">
                  {status === "loading" ? "..." : "Add"}
                </span>
              </button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-red-800 mb-1">Error occurred</h3>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Todos List */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200">
          {/* Loading State */}
          {status === "loading" && todos.length === 0 && (
            <div className="p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
              <p className="text-slate-600 font-medium">Loading your tasks...</p>
            </div>
          )}

          {/* Empty State */}
          {todos.length === 0 && status !== "loading" && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-700 mb-2">All caught up!</h3>
              <p className="text-slate-500">No tasks yet. Add one above to get started.</p>
            </div>
          )}

          {/* Todos */}
          {todos.length > 0 && (
            <div className="divide-y divide-slate-100">
              {todos.map((todo, index) => (
                <div
                  key={todo._id}
                  className="p-4 sm:p-6 hover:bg-slate-50 transition-colors duration-150 group"
                >
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => handleToggleComplete(todo)}
                      className="flex-shrink-0 mt-1 transition-colors duration-200"
                    >
                      {todo.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 hover:text-green-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                      )}
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      {editingTodo === todo._id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') handleEditSave(todo._id);
                              if (e.key === 'Escape') handleEditCancel();
                            }}
                            className="flex-1 px-3 py-2 text-sm bg-white border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            autoFocus
                          />
                          <button
                            onClick={() => handleEditSave(todo._id)}
                            className="p-1.5 text-green-600 hover:text-green-700 hover:bg-green-50 rounded transition-colors"
                            title="Save changes"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleEditCancel}
                            className="p-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Cancel editing"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 group/text">
                          <p
                            className={`text-base flex-1 transition-all duration-200 ${
                              todo.completed 
                                ? "line-through text-slate-400" 
                                : "text-slate-700"
                            }`}
                          >
                            {todo.text || todo.title || "No text"}
                          </p>
                          <button
                            onClick={() => handleEditStart(todo)}
                            className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded transition-all duration-200 opacity-0 group-hover:opacity-100 group/text-hover:opacity-100"
                            title="Edit task"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      {todo.completed && (
                        <p className="text-xs text-green-600 mt-1 font-medium">
                          ✓ Completed
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => dispatch(deleteTodo(todo._id))}
                      className="flex-shrink-0 p-2 -mr-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                      title="Delete task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Progress Bar */}
          {totalCount > 0 && (
            <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-600">
                  Progress
                </span>
                <span className="text-sm text-slate-500">
                  {completedCount} of {totalCount} completed
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}