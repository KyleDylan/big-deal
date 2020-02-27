import React, {useState, useContext} from 'react';
import axios from 'axios';
import { UserContext } from './contexts/UserContext';
import Table from './Table';
import {ThemeContext} from './contexts/ThemeContext';
import './styles/Main.css';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

function Main(){
    const {isDarkMode} = useContext(ThemeContext);
    const {currentUser, loginUser} = useContext(UserContext);
    const [coins, setCoins] = useState([]);
    
    const numberWithCommas = x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const addCoin = newCoin => {
        setCoins([...coins, newCoin]);
        axios("http://localhost:3001/coin", {
                method: "put",
                data: newCoin,
                withCredentials: true
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
    }

    const removeCoin = (e, coin) => {
        e.preventDefault();
        const newCoins = coins.filter(c => (c.name !== coin.name));
        setCoins(newCoins);
        axios("http://localhost:3001/coin", {
            method: 'delete',
            data: coin,
            withCredentials: true
        }).then(res => {
            if(res.status === 200){
                console.log(res);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    const myCoins = coins.map(c => (
        <div id='coin'>
            <li>
                <img src={c.logo_url} alt='logo'></img> 
                {c.name}       
                <IconButton className='button' aria-label='select' onClick={e => removeCoin(e, c)}>
                    <DeleteIcon />
                </IconButton>
            </li>
        </div>
    ));

        return(
            <div className='all'>
                    <span className="crypto">
                        <p className='title'>Top 25 Crypto Currencies</p>
                        <Table addCoin={addCoin} />
                    </span>
                    <div className='added'>
                        <p>Currencies Added</p>
                        <ul className='list'>
                            {myCoins}
                        </ul>
                    </div>
            </div>
        )
    }

export default Main;

