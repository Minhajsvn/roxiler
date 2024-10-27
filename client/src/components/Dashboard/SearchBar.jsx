import React from 'react'

export default function SearchBar({ search, handleChange }) {
    return (
        <input 
            className='px-8 py-2 bg-emerald-500 rounded-full placeholder:text-gray-50 active:border-none'
            type="text" 
            placeholder='Search transaction' 
            value={search} 
            onChange={handleChange} />
    )
}
