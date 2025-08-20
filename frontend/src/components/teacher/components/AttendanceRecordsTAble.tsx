import { Clock, UserCheck, UserX } from 'lucide-react'
import React, { useState } from 'react'

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'present':
      return (
        <div className='gap-1 bg-green-200 text-green-500 border-green-500 rounded-full p-1 text-sm flex items-center justify-center'>
          <UserCheck className='h-3 w-3' />
          Present
        </div>
      )
    case 'late':
      return (
        <div className='gap-1 bg-yellow-100 text-yellow-500 border-yellow-500 rounded-full p-1 text-sm flex items-center justify-center'>
          <Clock className='h-3 w-3' />
          Late
        </div>
      )
    case 'absent':
      return (
        <div className='gap-1 bg-red-100 text-red-500 border-red-500 rounded-full p-1 text-sm flex items-center justify-center'>
          <UserX className='h-3 w-3' />
          Absent
        </div>
      )
    case 'early_out':
      return (
        <div className='gap-1 bg-red-100 text-red-500 border-red-500 rounded-full p-1 text-sm flex items-center justify-center'>
          <Clock className='h-3 w-3' />
          Early Out
        </div>
      )
    case 'leave':
      return (
        <div className='gap-1 bg-blue-100 text-blue-500 border-blue-500 rounded-full p-1 text-sm flex items-center justify-center'>
          <Clock className='h-3 w-3' />
          Leave
        </div>
      )
    case 'holiday':
      return (
        <div className='gap-1 bg-gray-100 text-gray-500 border-gray-500 rounded-full p-1 text-sm flex items-center justify-center'>
          <Clock className='h-3 w-3' />
          Holiday
        </div>
      )
    default:
      return <div className='gap-1 bg-gray-100 text-gray-500 border-gray-500 rounded-full p-1 text-sm flex items-center justify-center'>{status}</div>
  }
}

const AttendanceRecordsTAble = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('today')

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch =
      record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === 'all' || record.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    present: attendanceRecords.filter(r => r.status === 'present').length,
    late: attendanceRecords.filter(r => r.status === 'late').length,
    absent: attendanceRecords.filter(r => r.status === 'absent').length,
    total: attendanceRecords.length
  }

  return (
    <div className='w-full overflow-x-auto rounded-md border border-gray-200 bg-white'>
      <table className='w-full text-sm text-gray-500 border-collapse'>
        <thead>
          <tr className='bg-gray-100 text-gray-500'>
            <th className='text-left p-4'>Student Name</th>
            <th className='text-left p-4'>Student ID</th>
            <th className='text-left p-4'>Date</th>
            <th className='text-left p-4'>Time</th>
            <th className='text-left p-4'>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map(record => (
            <tr key={record.id} className='border-b border-gray-200'>
              <td className='text-left p-4'>{record.studentName}</td>
              <td className='text-left p-4'>{record.studentId}</td>
              <td className='text-left p-4'>{record.date}</td>
              <td className='text-left p-4'>{record.time}</td>
              <td className='text-left p-4'>{getStatusBadge(record.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AttendanceRecordsTAble

// Sample attendance data
const attendanceRecords = [
  {
    id: 1,
    studentName: 'John Smith',
    studentId: 'STU001',
    date: '2024-03-15',
    time: '09:15 AM',
    status: 'present',
    method: 'facial_recognition'
  },
  {
    id: 2,
    studentName: 'Sarah Johnson',
    studentId: 'STU002',
    date: '2024-03-15',
    time: '09:22 AM',
    status: 'late',
    method: 'facial_recognition'
  },
  {
    id: 3,
    studentName: 'Mike Davis',
    studentId: 'STU003',
    date: '2024-03-15',
    time: 'N/A',
    status: 'absent',
    method: 'N/A'
  },
  {
    id: 4,
    studentName: 'Emily Brown',
    studentId: 'STU004',
    date: '2024-03-15',
    time: '09:05 AM',
    status: 'present',
    method: 'facial_recognition'
  },
  {
    id: 5,
    studentName: 'David Wilson',
    studentId: 'STU005',
    date: '2024-03-15',
    time: '09:45 AM',
    status: 'late',
    method: 'facial_recognition'
  }
]
