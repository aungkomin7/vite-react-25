import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTodoStore = create(
  persist(
    (set) => ({
      tasks: [],

      createTask: (text) =>
        set((state) => ({
          tasks: [...state.tasks, { text, completed: false }],
        })),

      removeTask: (idx) =>
        set((state) => ({
          tasks: state.tasks.filter((_, i) => i !== idx),
        })),

      toggleTask: (idx) =>
        set((state) => ({
          tasks: state.tasks.map((task, i) =>
            i === idx ? { ...task, completed: !task.completed } : task,
          ),
        })),

      editTask: (idx, newText) =>
        set((state) => ({
          tasks: state.tasks.map((task, i) =>
            i === idx ? { ...task, text: newText } : task,
          ),
        })),
    }),
    {
      name: "todo-storage", // 🔑 localStorage key
    },
  ),
);
