import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Container } from '@material-ui/core';

import { w3cwebsocket as W3CWebSocket } from "websocket";

let client = new W3CWebSocket('ws://127.0.0.1:5001', 'on-update');

client.onerror = function() {
    console.log('Connection Error');
};

export default function Candles({ stock }) {

    const [candles, setCandles] = useState([]);
	const [liveCandle, setLiveCandle] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/candles/${stock.ticker}`).then((res) => {
            return res.json()
        }).then((res) => {
			if (client.readyState === client.OPEN) {
				setLiveCandle({});
				client.send(`candles/${stock.ticker}`);
			}
			
            setCandles(res.candles);
        });
		return 
    }, [stock]);

	
	client.onmessage = function(e) {
		if (typeof e.data === 'string') {
			console.log("Received: '" + e.data + "'");
			const data = JSON.parse(e.data);
			setLiveCandle(data);
		}
	};

    const options = {
        chart: {
            type: 'candlestick',
            height: 350
        },
        title: {
            text: stock.name,
            align: 'left'
        },
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            tooltip: {
              	enabled: true
            }
        }
    };

    let data = candles.map((candle) => {
        return [Date.parse(candle.time), candle.o, candle.h, candle.l, candle.c];
    })

	if(liveCandle !== {}) {
		data.push([Date.parse(liveCandle.time), liveCandle.o, liveCandle.h, liveCandle.l, liveCandle.c]);
	}

    return (
      <Container maxWidth="lg">
        <Chart series={[{data: data}]} options={options} type="candlestick"></Chart>
      </Container>
    )
}