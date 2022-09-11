import React, { useContext, useEffect, useState } from 'react'
import finnHub from '../apis/finnHub'
import { StockContext } from '../context/stockContext'

function Search() {
    const [search, setSearch] = useState("")
    const [result, setResult] = useState([])
    const {addStock} = useContext(StockContext)

    const renderDropdown = () => {
        const dropdownClass = search ? "show" : null
        return (
            <ul style={{
                height: "500px",
                overflowY: "scroll",
                overflowX: "hidden",
                cursor: "pointer"
            }} className={`dropdown-menu ${dropdownClass}`}>
                {result.map((result) => {
                    return (
                        <li key={result.symbol} className='dropdown-item'
                        onClick={() => {
                            addStock(result.symbol)
                            setSearch("")
                            }}>
                            {result.description}({result.symbol})
                        </li>
                    )
                })}
            </ul>
        )
    }
    useEffect(() => {
        let ismounted = true
      const fetchStock = async () => {
        try {
            const response = await finnHub.get("/search", {
                params: {
                    q: search
                }
            })
            console.log(response);
            if (ismounted) {
                setResult(response.data.result)
            }
        } catch (error) {
            
        }
      }
      if(search.length > 0){
        fetchStock()
      }else{
        setResult([])
      }
      return () => ismounted = false
    }, [search])
    
  return (
    <div className='w-50 p-5 rounded mx-auto'>
        <div className="form-floating dropdown">
            <input id='search' className='form-control' 
            type="text" placeholder='Search' autoComplete='off'
            value={search} onChange={(e) => setSearch(e.target.value)}/>
            <label htmlFor="serach">Search</label>
            {renderDropdown()}
        </div>
    </div>
  )
}

export default Search