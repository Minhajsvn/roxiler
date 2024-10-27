import { useState } from 'react'
import './App.css'
import BarChart from './components/BarChart'
import TransactionTable from './components/Dashboard/TransactionTable'
import SaleStats from './components/SaleStats'

function App() {
  const [transactions, setTransactions] = useState([]);

  return (
      <div className='py-8'>
        <h1 className='text-center font-semibold text-3xl py-6 '>Transaction Dashboard</h1>
        <TransactionTable transactions={transactions} setTransactions={setTransactions} />
        <SaleStats />
        <BarChart />
      </div>
  )
}

export default App
