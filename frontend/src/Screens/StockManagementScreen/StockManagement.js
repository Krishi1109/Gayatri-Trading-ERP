import React from 'react'
import StockTable from './StockTable'

const StockManagement = () => {
  return (
    <div className='container mx-auto'>
        <h1 className='text-center my-4 font-bold text-xl border-b'>Stock Management</h1>
      
        <StockTable />
    </div>
  )
}

export default StockManagement