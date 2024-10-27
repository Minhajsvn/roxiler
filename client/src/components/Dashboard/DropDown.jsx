import React from 'react'

export default function DropDown({ selectedMonth, setSelectedMonth, setPage }) {

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const handleChange = (e) => {
        setSelectedMonth(e.target.value);
        setPage(1);
    };

    return (
        <div className='relative inline-block w-72'>
            <select
            value={selectedMonth}
            onChange={handleChange}
            className='block w-full px-4 py-2 border border-gray-300 rounded-3xl appearance-none focus:outline-none focus:ring focus:ring-blue-300'
        >
            <option value="" disabled>Select a month</option>
            {months.map((month, index) => (
                <option key={index} value={month}>
                    {month}
                </option>
            ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg 
            className="w-4 h-4 text-gray-700" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 10l5 5 5-5H7z" />
        </svg>
    </div>
        </div>
    )
}