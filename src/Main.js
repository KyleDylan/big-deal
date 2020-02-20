import React, {useState, useContext} from 'react';
import axios from 'axios';
import { UserContext } from './contexts/UserContext';
import Crypto from './Crypto';
import {ThemeContext} from './contexts/ThemeContext';
import './styles/Main.css';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

function Main(){
    const {isDarkMode} = useContext(ThemeContext);
    const {userName, loginUser} = useContext(UserContext);
    const [coins, setCoins] = useState(JSON.parse(window.localStorage.getItem('coins') || "[]"));
    
    const numberWithCommas = x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const addCoin = newCoin => {
        setCoins([...coins, newCoin]);
        window.localStorage.setItem("coins", JSON.stringify(coins));
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/coin', {
            newCoin: newCoin
    }).then(res => {
        if(res.status === 200){
            console.log(res);
        }
      }).catch(err => {
          console.log(err);
      });
    }

    const clear = () => {
        const newCoins = [];
        setCoins(newCoins);
        window.localStorage.setItem("coins", JSON.stringify(newCoins));
    }

    const removeCoin = (e, coin) => {
        e.preventDefault();
        const newCoins = coins.filter(c => (c.name !== coin.name));
        setCoins(newCoins);
        window.localStorage.setItem("coins", JSON.stringify(newCoins));
    }

    const myCoins = coins.map(c => (
        <div id='coin'>
            <li><img src={c.logo_url} alt='logo'></img> {c.name}<IconButton aria-label='select' onClick={e => removeCoin(e, c)}><DeleteIcon /></IconButton></li>
        </div>
    ));

        return(
            <div className='all'>
                <div>
                    <div className='crypto'>
                        <Crypto addCoin={addCoin} />
                    </div>
                    <div className='added'>
                        <p>Currencies Added</p>
                        <ul className='list'>
                            {myCoins}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

export default Main;

