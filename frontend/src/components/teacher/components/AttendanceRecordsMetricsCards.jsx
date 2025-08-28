import React, { useEffect, useState } from 'react'
import { UserCheck, Clock, UserX, Calendar } from 'lucide-react';

const AttendanceRecordsMetricsCards = () => {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      const BASE_URL = "https://facial-recognition-backend-rmti.onrender.com";
      try {
        const response = await fetch(`${BASE_URL}/api/v1/attendance/metrics`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Map API response to component's expected structure
        const mappedMetrics = data.map(item => {
          let iconComponent;
          let valueClass;
          switch (item.title.toLowerCase()) {
            case 'present':
              iconComponent = <UserCheck size={32} className="text-green-500" />;
              valueClass = 'text-green-600';
              break;
            case 'late':
              iconComponent = <Clock size={32} className="text-orange-400" />;
              valueClass = 'text-orange-500';
              break;
            case 'absent':
              iconComponent = <UserX size={32} className="text-red-500" />;
              valueClass = 'text-red-500';
              break;
            default:
              iconComponent = <Calendar size={32} className="text-blue-500" />;
              valueClass = 'text-black';
          }
          return {
            label: item.title,
            value: item.value,
            icon: iconComponent,
            valueClass: valueClass,
          };
        });
        setMetrics(mappedMetrics);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return <div className="text-center">Loading metrics...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading metrics: {error.message}</div>;
  }

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