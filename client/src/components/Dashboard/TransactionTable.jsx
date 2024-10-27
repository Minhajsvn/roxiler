import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import DropDown from './DropDown'
import axios from 'axios'

export default function TransactionTable({ transactions, setTransactions, selectedMonth, setSelectedMonth }) {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const perPage = 10;

    const filterBySearchAndMonth = async (search, selectedMonth) => {

        let url = `https://roxiler-eqzc.onrender.com/transactions?month=${selectedMonth}&page=${page}`;

        if (search) {
            url += `&search=${search}`;
        }
        
        const response = await axios.get(url);

        setTransactions(response.data);
        
    }

    const handleNextPage = () => setPage(prev => prev + 1);
    const handlePreviousPage = () => setPage(prev => Math.max(prev - 1, 1));

    useEffect(() => {
        filterBySearchAndMonth(search, selectedMonth);
    }, [search, selectedMonth, page])

    return (
        <div className='flex flex-col items-center'>
            <div className='w-[90vw] flex justify-between items-start mb-10'>
                <SearchBar search={search} setSearch={setSearch} setPage={setPage} />
                <DropDown selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} setPage={setPage} />
            </div>
            <div>
            <table className='bg-neutral-200 w-[90vw] rounded-2xl'>
                <thead>
                    <tr>
                        <th className='w-12 py-4 bg-neutral-400 rounded-l-2xl'>ID</th>
                        <th className='w-48 py-2 bg-neutral-400'>Title</th>
                        <th className='w-96 py-2 bg-neutral-400'>Description</th>
                        <th className='w-20 py-2 bg-neutral-400'>Price</th>
                        <th className='w-32 py-2 bg-neutral-400'>Category</th>
                        <th className='w-12 py-2 bg-neutral-400'>Sold</th>
                        <th className='w-24 py-2 bg-neutral-400 rounded-r-2xl'>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.productId}>
                            <td className='px-4 py-2 text-center'>{transaction.productId}</td>
                            <td className='px-4 py-2 text-left'>{transaction.title}</td>
                            <td className='text-xs py-2 px-4'>{transaction.description}</td>
                            <td className='px-4 py-2 text-center'>₹ {transaction.price}</td>
                            <td className='px-4 py-2 text-center'>{transaction.category}</td>
                            <td className='px-4 py-2 text-center'>{transaction.sold ? '✔' : '❌'}</td>
                            <td className='px-4 py-2'>
                                <img 
                                    className='mix-blend-multiply py-2'
                                    src={transaction.image} 
                                    alt={transaction.title} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex justify-center space-x-4 py-4 '>
                <button 
                    className={`px-4 py-2 mx-2 rounded text-white ${page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                    onClick={handlePreviousPage} 
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                <button 
                    className={`px-4 py-2 mx-2 rounded text-white ${transactions.length < perPage ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                    onClick={handleNextPage} 
                    disabled={transactions.length < perPage}
                >
                    Next
                </button>
            </div>
            </div>
        </div>
    )
}
