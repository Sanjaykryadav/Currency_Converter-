import React from 'react';
import { HiOutlineStar, HiStar } from "react-icons/hi";


const Dropdowncurrency = ({
    currencies,
    currency,
    setCurrency,
    favorities,
    handlefavorite,
    title="",


}) => {
    const isfavorate = curr => favorities.includes(curr)

  return (
    <div>
        <label htmlFor={title} className='block text-sm font-medium text-gray-700'
        >

        </label>
        <label htmlFor={title}>{title}</label>

        <div className='mt-1 relative'>
            <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
             className='w-full p-2 border-gray-300 rounded-md shadow-sm focus:outline-none
        focus:ring-2 focus:ring-indigo-500 bg-gray-300'>
                {/*favorate reader */}
                {favorities.map((currency) => {
                    return(
                        <option
                        className='bg-gray-200'
                         value={currency} key={currency}>
                               {currency}
                           </option>
                           )
                })}
            <hr />   
        

            {currencies.filter(c => !favorities.includes(c)).map((currency) => {
             return(
             <option value={currency} key={currency}>
                    {currency}
                </option>
                )
            })}
            </select>
            <button onClick={()=> handlefavorite(currency)}
            className='absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5' >
              {isfavorate(currency)  ? <HiStar/> : <HiOutlineStar />}
            </button>

            </div>
    </div>
  )
}

export default Dropdowncurrency
