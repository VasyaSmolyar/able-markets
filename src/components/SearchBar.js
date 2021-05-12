import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Popper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
      border: '1px solid',
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
    },
}));

export default function SearchBar({setStock}) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const [ ticker, setTicker ] = useState('');
    const [ list, setList ] = useState([]);

    const onChange = (event) => {
        const value = event.target.value;
        setTicker(value);

        if(value === '') {
            setList([]);
            setAnchorEl(null);
        } else {
            fetch(`http://localhost:5000/list/${value}`).then((res) => {
                return res.json();
            }).then((res) => {
                setAnchorEl(event.target);
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
            <TextField value={ticker} onChange={onChange} placeholder="Введите тикер бумаги" aria-describedby={id} />
            <Popper anchorEl={anchorEl} id={id} open={open}>
                <div className={classes.paper}>
                    {options}
                </div>
            </Popper>
        </div>
    )
}