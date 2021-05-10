import React, { useState } from "react";

import './App.css';
import Candles from './components/Candles';
import SearchBar from './components/SearchBar';

function App() {
	const [ stock, setStock ] = useState({ticker: 'BAC'});

	return ( 
		<div>
			<SearchBar setStock={setStock} />
			<Candles ticker={stock.ticker}></Candles>
		</div>
	)
}

export default App;
