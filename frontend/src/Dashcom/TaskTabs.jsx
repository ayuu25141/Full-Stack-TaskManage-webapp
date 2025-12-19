import { useState } from "react";

export default function TaskTabs() {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "completed", label: "Completed" },
  ];

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-1 flex">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition
            ${
              activeTab === tab.id
                ? "bg-white text-black"
                : "text-gray-400 hover:text-white"
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
