import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, UserCheck, TrendingUp, Clock } from 'lucide-react';

type Metric = {
  title: string;
  value: string | number;
  description: string;
};

const cardStyles = [
  // Total Students
  'bg-gradient-to-br from-blue-50 to-white border border-blue-100',
  // Present Today
  'bg-gradient-to-br from-green-50 to-white border border-green-100',
  // Average Attendance
  'bg-white border border-gray-200',
  // Late Arrivals
  'bg-gradient-to-br from-orange-50 to-white border border-orange-100',
];

const iconMap = [
  <Users size={32} className="text-blue-400" />,
  <UserCheck size={32} className="text-green-500" />,
  <TrendingUp size={32} className="text-gray-400" />,
  <Clock size={32} className="text-orange-400" />,
];



const MetricsCards = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    axios.get('/assets/data/metrics.json')
      .then(res => setMetrics(res.data))
      .catch(() => setMetrics([]));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {metrics.map((metric, idx) => (
        <div
          key={idx}
          className={`rounded-xl p-6 flex flex-col justify-between min-w-[220px] ${cardStyles[idx]}`}
          style={{ boxShadow: '0 2px 12px 0 rgba(0,0,0,0.03)' }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="text-gray-700 font-semibold text-base mb-1">{metric.title}</div>
            <div>{iconMap[idx]}</div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
          {metric.description && <div className="text-gray-400 text-xs mt-2">{metric.description}</div>}
        </div>
      ))}
    </div>
  );
};

export default MetricsCards;