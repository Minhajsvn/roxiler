import { useEffect, useState } from 'react'
import './App.css'
import BarChart from './components/BarChart'
import TransactionTable from './components/Dashboard/TransactionTable'
import SaleStats from './components/SaleStats';
import axios from 'axios';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [saleStats, setSaleStats] = useState({})
  const [barStats, setBarStats] = useState([])


  const fetchTransactionStats = async () => {
      const response = await axios.get(`https://roxiler-eqzc.onrender.com/stats?month=${selectedMonth}`);
      setSaleStats(response.data.saleStats);
      console.log(response.data.barChart)
      setBarStats(response.data.barChart);
  }

  useEffect(() => {
      fetchTransactionStats()
  }, [selectedMonth]);

  return (
      <div className='py-8'>
        <h1 className='text-center font-semibold text-3xl py-6 '>Transaction Dashboard</h1>
        <TransactionTable 
          transactions={transactions} 
          setTransactions={setTransactions}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
        <SaleStats selectedMonth={selectedMonth} saleStats={saleStats} />
        <BarChart selectedMonth={selectedMonth} barStats={barStats} />
      </div>
  )
}

export default App
