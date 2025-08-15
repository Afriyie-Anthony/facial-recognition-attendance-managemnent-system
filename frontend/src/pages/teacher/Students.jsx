import React, { useState } from "react";
import { Plus, Filter, MoreVertical } from "lucide-react";

const studentsData = [
  {
    initials: "EW",
    name: "Emma Wilson",
    id: "ST001",
    class: "Math 101",
    attendance: 95,
    status: "active",
    lastSeen: "2 hours ago",
  },
  {
    initials: "JR",
    name: "James Rodriguez",
    id: "ST002",
    class: "Math 101",
    attendance: 87,
    status: "active",
    lastSeen: "1 day ago",
  },
  {
    initials: "SC",
    name: "Sarah Chen",
    id: "ST003",
    class: "Physics 201",
    attendance: 92,
    status: "active",
    lastSeen: "3 hours ago",
  },
  {
    initials: "MB",
    name: "Michael Brown",
    id: "ST004",
    class: "Chemistry 301",
    attendance: 67,
    status: "inactive",
    lastSeen: "1 week ago",
  },
];

const statusColor = {
  active: "bg-blue-100 text-blue-700",
  inactive: "bg-gray-100 text-gray-500",
};

const attendanceColor = (attendance) => {
  if (attendance >= 90) return "text-green-600";
  if (attendance >= 80) return "text-orange-500";
  return "text-red-500";
};

const Students = () => {
  const [search, setSearch] = useState("");
  const filtered = studentsData.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-0 md:p-2 lg:p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your student database and facial recognition profiles.</p>
        </div>
        <div className="flex gap-2 items-center self-end md:self-auto">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow">
            <Plus size={18} /> Add Student
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2 mb-6">
        <input
          type="text"
          placeholder="Search students..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-400 text-sm bg-gray-50"
        />
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 text-gray-700 font-medium">
          <Filter size={18} /> Filter
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 text-gray-700 font-medium">
          <Plus size={18} /> Import
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((student, idx) => (
          <div key={idx} className="bg-white rounded-md border border-gray-200 shadow p-5 flex flex-col justify-between min-h-[210px] relative">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <MoreVertical size={20} />
            </button>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
                {student.initials}
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-base">{student.name}</div>
                <div className="text-xs text-gray-400 font-medium">{student.id}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 items-center mb-2">
              <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium">{student.class}</span>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-xs text-gray-400">Attendance</span>
              <span className={`font-semibold text-sm ${attendanceColor(student.attendance)}`}>{student.attendance}%</span>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-xs text-gray-400">Status</span>
              <span className={`text-xs px-3 py-1 rounded-full font-semibold ${statusColor[student.status]}`}>{student.status}</span>
            </div>
            <div className="text-xs text-gray-400 mt-2">Last seen: {student.lastSeen}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;
