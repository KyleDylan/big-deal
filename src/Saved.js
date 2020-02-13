import React, {useState, useContext} from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import {ThemeContext} from './contexts/ThemeContext';
import './styles/Saved.css';

function Saved(){
    const {isDarkMode} = useContext(ThemeContext);
    const [coins, setCoins] = useState(JSON.parse(window.localStorage.getItem('coins') || "[]"));
    
    const numberWithCommas = x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const clear = () => {
        window.localStorage.setItem('coins', '');
        setCoins([]);
    }

    const removeCoin = (e, coin) => {
        e.preventDefault();
        setCoins(coins.filter(c => (c.name !== coin.name)));
        window.localStorage.setItem("coins", JSON.stringify(coins));
    }

        return(
            <div className='main'>
                <div className='list'>
                    <h1 className={isDarkMode ? 'dark' : 'light'}>My List <span><IconButton onClick={clear} className='deleteAll' aria-label='delete all'><DeleteSweepIcon /></IconButton></span></h1>
                    <table className='mylist'>
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Symbol</td>
                                <td>Price</td>
                                <td>Change (24hr)</td>
                                <td>Market Cap</td>
                                <td>Logo</td>
                                <td>Select</td>
                            </tr>
                        </thead>
                        <tbody>
                            {coins.map(c => (
                                <tr key={c.currency}>
                                    <td>{c.name}</td>
                                    <td>{c.currency}</td>
                                    <td>${(c.price  * 1).toFixed(2)}</td>
                                    <td>{(c['1d'].price_change_pct * 100).toFixed(2)} %</td>
                                    <td>${numberWithCommas((c.market_cap * 1))}</td>
                                    <td><img src={c.logo_url} alt='logo'></img></td>
                                    <td><IconButton aria-label='select' onClick={e => removeCoin(e, c)}><AddCircleIcon /></IconButton></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

export default Saved;

