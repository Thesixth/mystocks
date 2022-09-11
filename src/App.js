
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Stocks from './pages/Stocks';
import StockDetails from './pages/StockDetails';
import { StockContextProvider } from './context/stockContext';

function App() {
  return (
    <main className='container'>
     <StockContextProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Stocks/>}/>
            <Route path="/detail/:symbol" element={<StockDetails/>}/>
          </Routes>
        </BrowserRouter>
     </StockContextProvider>
    </main>
  );
}

export default App;
