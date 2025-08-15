import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const data = [
  { day: 'Mon', present: 29, absent: 3 },
  { day: 'Tue', present: 31, absent: 1 },
  { day: 'Wed', present: 27, absent: 4 },
  { day: 'Thu', present: 30, absent: 2 },
  { day: 'Fri', present: 24, absent: 6 },
  { day: 'Sat', present: 18, absent: 9 },
];

const WeektlyAttendanceChart = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-5">
    <div className="font-semibold text-lg mb-2">Weekly Attendance Trend</div>
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
        <XAxis dataKey="day" tick={{ fontSize: 13, fill: '#6b7280' }} axisLine={false} tickLine={false} />
        <YAxis domain={[0, 32]} tick={{ fontSize: 13, fill: '#6b7280' }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ borderRadius: 8, fontSize: 13 }} />
        <Line type="monotone" dataKey="present" stroke="#22c55e" strokeWidth={2.5} dot={{ r: 5, fill: '#22c55e' }} activeDot={{ r: 7 }} />
        <Line type="monotone" dataKey="absent" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 5, fill: '#ef4444' }} activeDot={{ r: 7 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default WeektlyAttendanceChart;
