import{useEffect, useState} from "react"

function useCurrencyInfo(currency){
    useEffect(() => {
        fetch(`https://cdn.jsdeliver.net/gh/fawazahmed0/currency-api@1/latest/currencies/inr.json`)
    },[])

}