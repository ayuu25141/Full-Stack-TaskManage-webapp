import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export default function TaskModal({ isOpen, onClose }) {
  const queryClient = useQueryClient();

  const { mutate: createTask, isPending } = useMutation({
    mutationFn: (newTask) =>
      axios.post("https://full-stack-taskmanage-webapp.onrender.com/createtask", newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onClose();
      toast.success("Task created successfully!", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#4BB543",
          color: "#fff",
        },
      });
    },
    onError: (error) => {
      console.error("Error creating task:", error);
      toast.error("Failed to create task. Please try again.", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#ff4444",
          color: "#fff",
        },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      toast.error("User not authenticated. Please log in.", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#ff4444",
          color: "#fff",
        },
      });
      return;
    }

    const user = JSON.parse(storedUser);
    const userId = user.id;

    const newTask = {
      user_id: userId,
      title: formData.get("title"),
      description: formData.get("description"),
      completed: formData.get("status") === "Completed",
    };

    createTask(newTask);
    e.target.reset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md bg-gray-900 border border-white/10 rounded-2xl p-6 shadow-xl text-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Add New Task</h3>
          <button onClick={onClose}>
            <X className="text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            type="text"
            placeholder="Task title"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <textarea
            name="description"
            placeholder="Description (optional)"
            rows="3"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="status"
            className="w-full bg-black border border-white/10 rounded-lg px-4 py-2"
            defaultValue="Active"
          >
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-gray-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-5 py-2 bg-white text-black rounded-lg font-semibold disabled:opacity-50"
            >
              {isPending ? "Adding..." : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
