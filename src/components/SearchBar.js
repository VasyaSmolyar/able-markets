import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Popper, List, MenuItem, Grid, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
      border: '1px solid',
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
      maxHeight: '250px',
      'overflow-y': 'scroll',
      'overflow-x': 'hidden',
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

    const onFocus = (event) => {
        const value = ticker;

        if(value === '') {
            setList([]);
            setAnchorEl(null);
        } else {
            setAnchorEl(event.target);
        }
    }

    const options = list.map((stock) => {
        return (
            <MenuItem key={stock.ticker} onClick={() => {
                setAnchorEl(null);
                setStock(stock);
            }}>
                <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                >
                    <div style={{paddingRight: '5ch'}}>{stock.name}</div>
                    <Button disabled variant="contained">{stock.type}</Button>
                </Grid>
            </MenuItem>
        )
    })

    return (
        <div>
            <TextField value={ticker} style={{marginTop: 20, marginBottom: 30}} onChange={onChange} onFocus={onFocus} placeholder="Введите тикер бумаги" aria-describedby={id} />
            <Popper anchorEl={anchorEl} id={id} open={open}>
                <List className={classes.paper}>
                    {options}
                </List>
            </Popper>
        </div>
    )
}