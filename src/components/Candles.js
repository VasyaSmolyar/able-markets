import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

export default function Candles({ ticker }) {

    const [candles, setCandles] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/candles/${ticker}`).then((res) => {
            return res.json()
        }).then((res) => {
            setCandles(res.candles);
        });
    }, [ticker]);

    const options = {
          chart: {
            type: 'candlestick',
            height: 350
          },
          title: {
            text: 'CandleStick Chart',
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

    console.log(data);

    return (
        <Chart series={[{data: data}]} options={options} type="candlestick" height={700} width={1200}></Chart>
    )
}