import React from 'react'
import { Filter, Download } from 'lucide-react';
import AttendanceRecordsMetricsCards from '../../components/teacher/components/AttendanceRecordsMetricsCards';
import AttendanceFilter from '../../components/teacher/components/AttendanceFilter';
import AttendanceRecordsTable from '../../components/teacher/components/AttendanceRecordsTAble';

const AttendanceRecords = () => {
  return (
    <div className="p-0 md:p-2 lg:p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Attendance Records</h1>
          <p className="text-gray-400 text-sm mt-1">View and manage student attendance history</p>
        </div>
        <div className="flex gap-2 items-center self-end md:self-auto">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 text-gray-700 font-medium">
            <Filter size={18} /> Advanced Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow">
            <Download size={18} /> Export Records
          </button>
        </div>
      </div>
      <div>
        <AttendanceRecordsMetricsCards/>
      </div>
      {/* Filter section */}
      <div className="my-5">
        <AttendanceFilter/>
      </div>
      {/* attendance records table */}
      <div className="my-5">
        <AttendanceRecordsTable/>
      </div>
    </div>
  )
}

export default AttendanceRecords