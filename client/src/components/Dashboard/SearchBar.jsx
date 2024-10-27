import React from 'react'

export default function SearchBar({ search, setSearch, setPage }) {

    const handleChange = (e) => {
        setSearch(e.target.value);
        setPage(1)
    }

    return (
        <input 
            className='w-72 px-4 py-2 border border-gray-300 rounded-full'
            type="text" 
            placeholder='Search transaction' 
            value={search} 
            onChange={handleChange} 
        />
    )
}
