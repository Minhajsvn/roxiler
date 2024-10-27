import { useEffect, useState } from 'react'
import './App.css'
import BarChart from './components/BarChart'
import TransactionTable from './components/Dashboard/TransactionTable'
import SaleStats from './components/SaleStats'
import axios from 'axios'

function App() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:8082/transactions');
      console.log(response.data);
      setTransactions(response.data)   
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
      <div className='py-8'>
        <h1 className='text-center font-semibold text-3xl py-6 '>Transaction Dashboard</h1>
        <TransactionTable transactions={transactions} />
        <SaleStats />
        <BarChart />
      </div>
  )
}

export default App
