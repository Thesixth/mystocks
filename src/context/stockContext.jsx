
import React, { createContext, useState } from 'react'


export const StockContext = createContext()

export const StockContextProvider = (props) => {
    const [watchList , setWatchList] = useState(["TMBR", "F", "HIVE", "LCID", "NCLH"])

    const addStock = (stock) => {
       if(watchList.indexOf(stock) === -1) {
        setWatchList([...watchList, stock])
       }
    }

    const deleteStock = (stock) => {
        setWatchList(watchList.filter((el) => {
            return el !== stock
        }))
    }

    return <StockContext.Provider value={{ watchList, addStock, deleteStock }}>
        {props.children}
    </StockContext.Provider>
}