import { useState } from "react";
import { GoTrash } from "react-icons/go";
import { GrEdit } from "react-icons/gr";
import { IoIosAddCircleOutline } from "react-icons/io";
import { LuSave } from "react-icons/lu";

const HeroSection = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };
  const handleInput = (e) => {
    setTask(e.target.value);
  };

  const deleteTask = (idx) => {
    const newTasks = tasks.filter((el, index) => index !== idx);
    setTasks(newTasks);
  };

  const handleAddKey = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const toggleComplete = (idx) => {
    const updatedTasks = tasks.map((el, index) =>
      index === idx ? { ...el, completed: !el.completed } : el,
    );

    setTasks(updatedTasks);
  };

  const startEdit = (idx) => {
    setEditIndex(idx);
    setEditText(tasks[idx].text);
  };

  const saveEdit = (idx) => {
    const updated = [...tasks];
    updated[idx].text = editText;
    setTasks(updated);
    setEditIndex(null);
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

export default HeroSection;
