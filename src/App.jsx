import { useState } from 'react'
import './App.css'
import CurrencyConvertor from './Componemts/CurrencyConvertor'

function App() {


  return (
   <>
   <div className='min-h-screen bg-gray-500
   flex flex-col items-center justify-center
   text-black'>
    
    <div className='container'>
      <CurrencyConvertor/>
    </div>

   </div>
   </>
  )
}

export default App
