
import React, { createContext, useEffect, useState } from 'react'


export const StockContext = createContext()

export const StockContextProvider = (props) => {
    const [watchList , setWatchList] = useState(
        localStorage.getItem("watchList")?.split(",") || ["TMBR", "F", "HIVE", "LCID", "NCLH"]
    )

    useEffect(() => {
        localStorage.setItem("watchList", watchList)
    }, [watchList])

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