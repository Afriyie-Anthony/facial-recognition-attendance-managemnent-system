import React from "react";
import MetricsCards from "../../components/teacher/components/MetricsCards";
import WeektlyAttendanceChart from "../../components/teacher/components/WeektlyAttendanceChart";

const TeachersDashboard = () => {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold mb-1">Teacher Dashboard</h1>
        <p className="text-gray-400">
          Welcome to your dashboard, where you can manage your classes and
          students.
        </p>
      </div>
      <div className="mt-6">
        <MetricsCards />
      </div>
      <div className="my-6">
        <WeektlyAttendanceChart />
      </div>
    </div>
  );
};

export default TeachersDashboard;
