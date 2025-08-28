import React, { useEffect, useState } from 'react';
import { Users, UserCheck, TrendingUp, Clock } from 'lucide-react';

type Metric = {
  title: string;
  value: string | number;
  description: string;
};

const cardStylesMap: { [key: string]: string } = {
  "Total Students": 'bg-gradient-to-br from-blue-50 to-white border border-blue-100',
  "Present Today": 'bg-gradient-to-br from-green-50 to-white border border-green-100',
  "Average Attendance": 'bg-white border border-gray-200',
  "Late Arrivals": 'bg-gradient-to-br from-orange-50 to-white border border-orange-100',
};

const iconMap: { [key: string]: JSX.Element } = {
  "Total Students": <Users size={32} className="text-blue-400" />,
  "Present Today": <UserCheck size={32} className="text-green-500" />,
  "Average Attendance": <TrendingUp size={32} className="text-gray-400" />,
  "Late Arrivals": <Clock size={32} className="text-orange-400" />,
};

const MetricsCards = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      const BASE_URL = "https://facial-recognition-backend-rmti.onrender.com";
      try {
        const response = await fetch(`${BASE_URL}/api/v1/dashboard/metrics`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Metric[] = await response.json();
        setMetrics(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return <div className="text-center">Loading dashboard metrics...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {metrics.map((metric, idx) => (
        <div
          key={metric.title}
          className={`rounded-xl p-6 flex flex-col justify-between min-w-[220px] ${cardStylesMap[metric.title] || 'bg-white border border-gray-200'}`}
          style={{ boxShadow: '0 2px 12px 0 rgba(0,0,0,0.03)' }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="text-gray-700 font-semibold text-base mb-1">{metric.title}</div>
            <div>{iconMap[metric.title] || <Users size={32} className="text-gray-400" />}</div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
          {metric.description && <div className="text-gray-400 text-xs mt-2">{metric.description}</div>}
        </div>
      ))}
    </div>
  );
};

export default MetricsCards;