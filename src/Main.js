import React, {useState, useContext} from 'react';
import Crypto from './Crypto';
import {ThemeContext} from './contexts/ThemeContext';
import './styles/Main.css';

function Main(){
    const {isDarkMode} = useContext(ThemeContext);
    const [coins, setCoins] = useState(JSON.parse(window.localStorage.getItem('coins') || "[]"));
    
    const numberWithCommas = x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const addCoin = newCoin => {
        setCoins([...coins, newCoin]);
        window.localStorage.setItem("coins", JSON.stringify(coins));
    }

    const clear = () => {
        const newCoins = [];
        setCoins(newCoins);
        window.localStorage.setItem("coins", JSON.stringify(newCoins));
    }

    const removeCoin = coin => {
        const newCoins = coins.filter(c => (c.name !== coin.name));
        setCoins(newCoins);
        window.localStorage.setItem("coins", JSON.stringify(newCoins));
    }

    const myCoins = coins.map(c => (
        <li><img src={c.logo_url} alt='logo'></img> {c.name}</li>
    ));

        return(
            <div className='all'>
                <div className='main'>
                    <div className='crypto'>
                        <Crypto addCoin={addCoin} />
                    </div>
                    <div class='added'>
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

