import { useState } from "react";
import { GoTrash } from "react-icons/go";
import { GrEdit } from "react-icons/gr";
import { LuSave } from "react-icons/lu";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useTodoStore } from "../stores/useTodoStore";

const TodoApp = () => {
  const { tasks, createTask, removeTask, toggleTask, editTask } =
    useTodoStore();
  const [task, setTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const addTask = () => {
    if (task.trim() === "") return;
    createTask(task);
    setTask("");
  };
  const handleInput = (e) => {
    setTask(e.target.value);
  };

  const deleteTask = (idx) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeTask(idx);
        toast(`Task deleted!`, { position: "top-center" });
      }
    });
  };

  const handleAddKey = (e) => {
    if (e.key === "Enter") {
      addTask();
      toast(`Task added!`, { position: "top-center" });
    }
  };

  const toggleComplete = (idx) => {
    toggleTask(idx);
  };

  const startEdit = (idx) => {
    setEditIndex(idx);
    setEditText(tasks[idx].text);
  };

  const saveEdit = (idx) => {
    if (editText.trim() === "") return;
    editTask(idx, editText);
    setEditIndex(null);
    toast("Task updated!", { position: "top-center" });
  };

  const handleEditKey = (e, idx) => {
    if (e.key === "Enter") saveEdit(idx);
  };
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl mb-5">To-Do App</h1>

      <div className="mb-10">
        <div className="flex items-center gap-x-3 ">
          <input
            value={task}
            onChange={handleInput}
            onKeyDown={handleAddKey}
            placeholder="Add a task..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={addTask}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition"
          >
            Add
          </button>
        </div>
      </div>

      {tasks.length === 0 ? (
        <p className="text-lg text-slate-500/90">No tasks yet</p>
      ) : (
        <ul className="text-lg font-mono">
          {tasks.map((el, idx) => (
            <li key={idx} className={`flex items-center gap-x-3 text-xl`}>
              {editIndex === idx ? (
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => handleEditKey(e, idx)}
                  className="flex-1 mr-2 border px-2 py-1 rounded"
                />
              ) : (
                <span
                  className={`${
                    el.completed ? "line-through text-gray-500" : ""
                  }`}
                  onClick={() => toggleComplete(idx)}
                >
                  {el.text}
                </span>
              )}

              {editIndex === idx ? (
                <LuSave
                  className="text-blue-500 hover:text-blue-600 cursor-pointer active:scale-95"
                  onClick={() => saveEdit(idx)}
                />
              ) : (
                <GrEdit
                  onClick={() => startEdit(idx)}
                  className="text-green-500 hover:text-green-600 cursor-pointer active:scale-95"
                />
              )}
              <GoTrash
                onClick={() => deleteTask(idx)}
                className="text-red-500 hover:text-red-600 cursor-pointer active:scale-95 "
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoApp;
