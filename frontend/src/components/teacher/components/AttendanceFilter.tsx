import React from 'react'
import { Search } from 'lucide-react'

const AttendanceFilter = () => {
  return (
    <div className='border border-gray-200 rounded-lg p-4 bg-white w-5xl p-6'>
      <h1 className='text-lg font-bold'>Filter Records</h1>
      <p className='text-sm text-gray-500'>Search and filter attendance records</p>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 my-4'>
        <div className='flex flex-2 items-center gap-2 border border-gray-200 rounded-lg p-2 w-full focus:outline-none focus:border-blue-300'>
            <Search className='w-4 h-4 text-gray-500' />
            <input type="text" placeholder='Search by name or email' className='w-full focus:outline-none' />
        </div>
        <div className='flex flex-1 items-center gap-2 border border-gray-200 rounded-lg p-2 w-full focus:outline-none focus:border-blue-300'>
            <select className='w-full focus:outline-none'>
                <option value=''>Status</option>
                <option value='all'>All</option>
                <option value='present'>Present</option>
                <option value='absent'>Absent</option>
                <option value='late'>Late</option>
                <option value='early_out'>Early Out</option>
                <option value='leave'>Leave</option>
                <option value='holiday'>Holiday</option>
            </select>
        </div>
        <div className='flex flex-1 items-center gap-2 border border-gray-200 rounded-lg p-2 w-full focus:outline-none focus:border-blue-300'>
            <select className='w-full focus:outline-none'>
                <option value=''>Today</option>
                <option value='yesterday'>Yesterday</option>
                <option value='this_week'>This Week</option>
                <option value='last_week'>Last Week</option>
                <option value='this_month'>This Month</option>
                <option value='last_month'>Last Month</option>
                <option value='this_year'>This Year</option>
                <option value='last_year'>Last Year</option>
            </select>
        </div>
      </div>
    </div>
  )
}

export default AttendanceFilter
