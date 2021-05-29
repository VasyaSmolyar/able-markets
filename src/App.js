import React, { useState } from "react";

import './App.css';
import Candles from './components/Candles';
import SearchBar from './components/SearchBar';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { Container, AppBar, Toolbar, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
	  flexGrow: 1,
	},
	menuButton: {
	  marginRight: theme.spacing(2),
	},
	title: {
	  flexGrow: 1,
	},
}));
  

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

	const classes = useStyles();

	const redirect = () => {
		document.location = 'https://tinkoffcreditsystems.github.io/invest-openapi/';
	}

	return ( 
		<div>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						AbleMarkets
					</Typography>
					<Button color="inherit" onClick={redirect}>Powered by Tinkoff OpenAPI</Button>
				</Toolbar>
     		</AppBar>
			<Container maxWidth="lg">
				<CssBaseline />
				<SearchBar setStock={setStock} />
				<Candles stock={stock}></Candles>
			</Container>
		</div>
	)
}

export default App;
