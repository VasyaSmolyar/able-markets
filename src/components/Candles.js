import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Container } from '@material-ui/core';

export default function Candles({ stock }) {

    const [candles, setCandles] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/candles/${stock.ticker}`).then((res) => {
            return res.json()
        }).then((res) => {
            setCandles(res.candles);
        });
    }, [stock]);

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