import React from "react";
import Search from "../components/Search";
import StockList from "../components/StockList";

function Stocks() {
  return (
    <div>
      <h1 className="watchList">Watch List</h1>
      <Search />
      <StockList />
    </div>
  );
}

export default Stocks;
