import React, { useState } from "react";

import './App.css';
import Candles from './components/Candles';
import SearchBar from './components/SearchBar';

import CssBaseline from '@material-ui/core/CssBaseline';


function App() {
	const [ stock, setStock ] = useState({
		figi: "BBG000BCTLF6",
		ticker: "BAC", 
		isin: "US0605051046",
		minPriceIncrement: 0.01,
		lot: 1,
		currency: "USD",
		name: "Bank of America Corp",
		type: "Stock"
	});

	return ( 
		<div>
			<CssBaseline />
			<SearchBar setStock={setStock} />
			<Candles ticker={stock.ticker}></Candles>
		</div>
	)
}

export default App;
