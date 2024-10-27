import React, { useEffect } from 'react'
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the scales and other components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart({ selectedMonth, barStats }) {

    const sortedData = barStats.sort((a, b) => {
        
        const startA = parseInt(a.priceRange.split('-')[0], 10);
        const startB = parseInt(b.priceRange.split('-')[0], 10);
        return startA - startB;
    });

    const chartData = {
        labels: sortedData.map(item => item.priceRange),
        datasets: [
            {
                label: 'Number of Items',
                data: sortedData.map(item => item.count),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Items',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Price Range',
                },
            },
        },
    };

    return (
        <div className="h-72 w-11/12 pl-10">
            <h1 className='text-2xl font-medium pl-6 pb-4'>Bar Chart Stats - {selectedMonth}</h1>
            <Bar data={chartData} options={options} />
        </div>
    )
}
