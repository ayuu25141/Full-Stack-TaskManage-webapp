import { useState } from "react";
import {
  ListChecks,
  Clock,
  CheckCircle2,
  TrendingUp,
  Plus
} from "lucide-react";
import TaskModal from "./TaskModal";

function StatCard({ title, value, icon, color 
  
}) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-md">
      <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${color}`}>
        {icon}
      </div>
      <p className="text-gray-400 text-sm">{title}</p>
      <h3 className="text-3xl font-bold mt-1">{value}</h3>
    </div>
  );
}

function Overview() {const [open, setOpen] = useState(false);

  return (
    <section className="px-6 py-8 text-white">
    
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Overview</h2>
        <p className="text-gray-400 mt-1">
          Track your progress and manage tasks
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        <StatCard
          title="Total Tasks"
          value="0"
          icon={<ListChecks />}
          color="bg-blue-500/10 text-blue-400"
        />

        <StatCard
          title="Active"
          value="0"
          icon={<Clock />}
          color="bg-orange-500/10 text-orange-400"
        />

        <StatCard
          title="Completed"
          value="0"
          icon={<CheckCircle2 />}
          color="bg-green-500/10 text-green-400"
        />

        <StatCard
          title="Completion Rate"
          value="0%"
          icon={<TrendingUp />}
          color="bg-purple-500/10 text-purple-400"
        />
      </div>
  {/* Add Task Button */}
   <TaskModal isOpen={open} onClose={() => setOpen(false)} />
      <div className="flex justify-center">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-semibold shadow-lg hover:scale-[1.02] transition"
        >
          <Plus size={20} />
          Add New Task
        </button>
      </div>

     

     
    </section>
  );
}

export default Overview;
