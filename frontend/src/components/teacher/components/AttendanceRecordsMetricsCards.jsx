import React from 'react'
import { UserCheck, Clock, UserX, Calendar } from 'lucide-react';

const metrics = [
  {
    label: 'Present',
    value: 2,
    icon: <UserCheck size={32} className="text-green-500" />,
    valueClass: 'text-green-600',
  },
  {
    label: 'Late',
    value: 2,
    icon: <Clock size={32} className="text-orange-400" />,
    valueClass: 'text-orange-500',
  },
  {
    label: 'Absent',
    value: 1,
    icon: <UserX size={32} className="text-red-500" />,
    valueClass: 'text-red-500',
  },
  {
    label: 'Total',
    value: 5,
    icon: <Calendar size={32} className="text-blue-500" />,
    valueClass: 'text-black',
  },
];

const AttendanceRecordsMetricsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {metrics.map((m) => (
        <div
          key={m.label}
          className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-between min-w-[180px] shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="text-gray-500 font-medium text-sm mb-1">{m.label}</div>
            <div>{m.icon}</div>
          </div>
          <div className={`text-2xl font-bold ${m.valueClass}`}>{m.value}</div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceRecordsMetricsCards;