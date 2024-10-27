import React from 'react'

export default function SaleStats({ selectedMonth, saleStats }) {


    return (
        <div className='p-14'>
            <h1 className='text-2xl font-medium pl-6 pb-4'>Statistics - {selectedMonth}</h1>
            <div className='w-5/12 bg-neutral-500 text-white p-8 rounded-3xl'>
                <div  className='flex justify-between py-1'>
                    <p>Total Sale</p>
                    <p>{saleStats.totalSaleAmount}</p>
                </div>
                <div className='flex justify-between py-1'>
                    <p>Total sold item</p>
                    <p>{saleStats.soldItemsCount}</p>
                </div>
                <div className='flex justify-between py-1'>
                    <p>Total sold item</p>
                    <p>{saleStats.notSoldItemsCount}</p>
                </div>
            </div>
        </div>
    )
}
