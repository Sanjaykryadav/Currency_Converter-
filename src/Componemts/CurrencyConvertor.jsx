import React, { useEffect, useState } from "react";
import DropdownCurrency from "./Dropdowncurrency"; // Corrected component name to PascalCase
import { HiArrowCircleDown, HiArrowDown, HiArrowLeft, HiArrowRight, HiArrowUp, HiSwitchHorizontal, HiSwitchVertical } from "react-icons/hi";

const CurrencyConverter = () => {
    const [currencies, setCurrencies] = useState([]);
    const [amount, setAmount] = useState(1);
    const [fromCurr, setFromCurr] = useState("USD");
    const [toCurr, setToCurr] = useState("INR");

    const [convertAmt, setConveramt] =useState(null)
    const [converting, setConverting] = useState(false)

    const [favorite, setFavorites] = useState(JSON.parse(localStorage.getItem("favorite")) ||["INR"]); 

    // Function to fetch currencies from API
    const fetchCurrencies = async () => {
        try {
            const response = await fetch("https://api.frankfurter.app/currencies");
            const data = await response.json();
            setCurrencies(Object.keys(data));
            console.log(data);
        } catch (error) {
            console.error("Error Fetching", error);
        }
    };

    useEffect(() => {
        fetchCurrencies();
    }, []);

    // Function to handle currency conversion
    const handleConvert = async () => {

        if (!amount){
            return;
            setConverting(true);
        }

        try {
            const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurr}&to=${toCurr}`);
            const data = await response.json();
            setConveramt(data.rates[toCurr]+ " "+toCurr)
        } catch (error) {
            console.error("Error Fetching", error);
        }finally{setConverting(false)}
    
        // You can implement actual conversion logic using an API or calculation here
    };

    // funtion handle favorite currency 

    const handlefavorite = (currency) =>{
        // add to favorite
        let updateFavorities =[...favorite];

        if(favorite.include(currency)){
            updateFavorities = updateFavorities.filter((fav) => fav !== currency);
        }else{
            updateFavorities.push(currency);

        }
        setFavorites(updateFavorities)
        localStorage.setItem("favorite", JSON.stringify(updateFavorities));

    }
    // funtion Swap currency
    const swapCurr =() =>{
        setFromCurr(toCurr)
        setToCurr(fromCurr)

    }

    return (
        <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
            <h2 className="mb-5 text-4xl font-semibold text-gray-900">
                Currency Converter
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3">
                <DropdownCurrency currencies={currencies}
                currency={fromCurr}
                favorities={favorite}
                setCurrency={setFromCurr}
                 title="From:"
                 selectedCurrency={fromCurr} onSelectCurrency={setFromCurr} handlefavorite={handlefavorite} />
                {/* Swap currency button  */}
                <div className=" flex justify-center mt-8 hover:text-green-500" >
                    <button
                    onClick={swapCurr}
                     className="bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 ">
                        <HiSwitchHorizontal className="text-2xl hover:text-green-400"/>
                    </button>
                </div>
                <DropdownCurrency currencies={currencies}
                currency={toCurr}
                favorities={favorite}
                setCurrency={setToCurr}
                 title="To:" selectedCurrency={toCurr} onSelectCurrency={setToCurr} handlefavorite={handlefavorite} />
            </div>
            <div className="mt-4">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                    Amount
                </label>
                <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    className="w-full p-2 bg-gray-200 border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-50"
                />
                <div className="flex justify-end mt-6">
                    <button
                        onClick={handleConvert}
                        className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus-ring-offset-2
                            ${converting?"animate-pulse" : ""}
                            `}
                    >
                        Convert
                    </button>
                </div>
                {/* Display converted amount (dummy text) */}
                <div className="mt-4 text-lg font-medium text-right text-green-400">
                    Converted Amount: ${convertAmt}{/* Placeholder for actual converted amount */}
                </div>
            </div>
        </div>
    );
};

export default CurrencyConverter;
