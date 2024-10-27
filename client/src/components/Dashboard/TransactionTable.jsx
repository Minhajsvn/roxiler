import React from 'react'
import SearchBar from './SearchBar'
import DropDown from './DropDown'

export default function TransactionTable({ transactions }) {
    return (
        <div className='flex flex-col items-center'>
            <div className='w-[90vw] flex justify-between items-start mb-10'>
                <SearchBar />
                <DropDown />
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
                            <td className='flex justify-center items-center px-4 py-2'>
                                <img 
                                    className='mix-blend-multiply py-2'
                                    src={transaction.image} 
                                    alt={transaction.title} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    )
}
