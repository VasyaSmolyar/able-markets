import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Container } from '@material-ui/core';

import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:5001', 'on-update');

client.onerror = function() {
    console.log('Connection Error');
};

export default function Candles({ stock }) {

    const [candles, setCandles] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/candles/${stock.ticker}`).then((res) => {
            return res.json()
        }).then((res) => {
            setCandles(res.candles);
        });
    }, [stock]);

	useEffect(() => {
		client.onopen = function() {
			console.log('WebSocket Client Connected');
		
			if (client.readyState === client.OPEN) {
				client.send(`candles/${stock.ticker}`);
			}
		};

		client.onmessage = function(e) {
			if (typeof e.data === 'string') {
				console.log("Received: '" + e.data + "'");
				const data = JSON.parse(e.data);
				var arr = Object.assign([], candles);
				//arr.pop();
				arr.push(data);
				setCandles(arr);
			}
		};
	}, [stock, candles]);

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

    const data = candles.map((candle) => {
        return [Date.parse(candle.time), candle.o, candle.h, candle.l, candle.c];
    })

    return (
      <Container maxWidth="lg">
        <Chart series={[{data: data}]} options={options} type="candlestick"></Chart>
      </Container>
    )
}