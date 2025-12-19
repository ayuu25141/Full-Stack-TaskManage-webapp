import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

function Tasks() {
  const [userId, setUserId] = useState(null);

  // Get user object from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserId(user.id); // Extract the user ID
      
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err);
      }
    }
  }, []);

  // Fetch tasks for the user using TanStack Query
  const { data: tasks = [], isLoading, isError, error } = useQuery({
    queryKey: ["tasks", userId],
    queryFn: async () => {
      if (!userId) return []; // Return empty array if no user ID
      const response = await fetch(`https://full-stack-taskmanage-webapp.onrender.com/tasks?user_id=${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      return Array.isArray(data) ? data : []; // Ensure data is always an array
    },
    enabled: !!userId, // Only fetch if userId is available
  });

  // Render loading state
  if (isLoading) {
    return (
      <section className="px-6 py-8 text-white">
        <h2 className="text-2xl font-bold">Your Tasks</h2>
        <p className="text-gray-400 mb-4">Organize and prioritize your work</p>
        <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl h-64 flex items-center justify-center">
          <p className="text-gray-400">Loading tasks...</p>
        </div>
      </section>
    );
  }

  // Render error state
  if (isError) {
    return (
      <section className="px-6 py-8 text-white">
        <h2 className="text-2xl font-bold">Your Tasks</h2>
        <p className="text-gray-400 mb-4">Organize and prioritize your work</p>
        <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl h-64 flex items-center justify-center">
          <p className="text-red-400">Error: {error.message}</p>
        </div>
      </section>
    );
  }

  // Render tasks or empty state
  return (
    <section className="px-6 py-8 text-white">
      <h2 className="text-2xl font-bold">Your Tasks</h2>
      <p className="text-gray-400 mb-4">Organize and prioritize your work</p>

      {!userId ? (
        // No user ID found
        <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl h-64 flex flex-col items-center justify-center text-center">
          <p className="font-semibold">User not authenticated</p>
          <p className="text-sm text-gray-400">Please log in to view your tasks</p>
        </div>
      ) : tasks.length === 0 ? (
        // Empty state
        <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl h-64 flex flex-col items-center justify-center text-center">
          <p className="font-semibold">No tasks found</p>
          <p className="text-sm text-gray-400">Create a new task to get started</p>
        </div>
      ) : (
        // Task List
        <div className="mt-6 space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white/5 border border-white/10 rounded-xl p-4"
            >
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{task.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                Status: {task.completed ? "Completed" : "Pending"}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Tasks;
