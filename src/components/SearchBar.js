import React, { useState } from "react";

export default function SearchBar({setStock}) {
    const [ ticker, setTicker ] = useState('');
    const [ list, setList ] = useState([]);

    const onChange = (event) => {
        const value = event.target.value;
        setTicker(value);

        if(value === '') {
            setList([]);
        } else {
            fetch(`http://localhost:5000/list/${value}`).then((res) => {
                return res.json();
            }).then((res) => {
                setList(res);
            });
        }
    }

    const options = list.map((stock) => {
        return (
            <li key={stock.ticker} onClick={() => setStock(stock)}>
                {stock.name}
            </li>
        )
    })

    return (
        <div>
            <input value={ticker} onChange={onChange} />
            <ul>
                {options}
            </ul>
        </div>
    )
}