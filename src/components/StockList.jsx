import React, { useContext, useEffect, useState } from 'react'
import {BsFillCaretDownFill, BsFillCaretUpFill} from "react-icons/bs"
import { useNavigate } from 'react-router-dom'
import finnHub from '../apis/finnHub'
import { StockContext } from '../context/stockContext'

function StockList() {
    const [stock, setStock] = useState([])
    const { watchList } = useContext(StockContext)

    const changeColor = (c) => {
        return c > 0 ? "success":"danger" 
    }
    const renderIcon = (c) => {
        return c < 0 ? <BsFillCaretDownFill/> : <BsFillCaretUpFill /> 
    }
    const navigate = useNavigate()

    const handleStock = (symbol) => {
        navigate(`detail/${symbol}`)
    }

    useEffect(() => {
        let isMounted = true
      const fetchData = async ()=> {
        try {
           const responses = await Promise.all(watchList.map((stock) => {
            return finnHub.get("/quote", {
                params: {
                    symbol: stock
                }
            })
           }))
           const data = responses.map((res) => {
            return {
                data: res.data,
                symbol: res.config.params.symbol
            }
           })
           if (isMounted){
            setStock(data)
           }
        } catch (error) {
            
        }
      }
    
      fetchData()
      return () => (isMounted = false)
    }, [watchList])
    

  return (
    <div>h
        <table className='table hover mt-5'>
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Last</th>
                    <th scope="col">Chg</th>
                    <th scope="col">Chg%</th>
                    <th scope="col">High</th>
                    <th scope="col">Low</th>
                    <th scope="col">Open</th>
                    <th scope="col">Prev close</th>
                </tr>
            </thead>
            <tbody>
                {stock.map((stockData) => {
                    return(
                        <tr className='table-row' key={stockData.symbol}
                        onClick={() => handleStock(stockData.symbol)}
                        style={{cursor: "pointer"}}
                        >
                            <th scope='row'>{stockData.symbol}</th>
                            <td>{stockData.data.c}</td>
                            <td className={`text-${changeColor(stockData.data.d)}`}>
                                {stockData.data.d}{renderIcon(stockData.data.d)}
                            </td>
                            <td className={`text-${changeColor(stockData.data.d)}`}>
                                {stockData.data.dp}
                                {renderIcon(stockData.data.d)}
                            </td>
                            <td>{stockData.data.h}</td>
                            <td>{stockData.data.l}</td>
                            <td>{stockData.data.o}</td>
                            <td>{stockData.data.pc}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default StockList