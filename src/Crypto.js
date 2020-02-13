import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import './styles/Crypto.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import {ThemeContext} from './contexts/ThemeContext';

function Crypto(props) {
    const {isDarkMode} = useContext(ThemeContext);
    const [prices, setPrices] = useState([]);
    const [safe, setSafe] = useState('');

    useEffect(() => {
        async function getPrices() {
            const response = await axios.get("https://api.nomics.com/v1/currencies/ticker?key=07401fbb39ffe42a581721d85011ab9c&ids=BTC,ETH,XRP,USDT,BCH,LTC,EOS,BNB,BSV,XTZ,XLM,TRX,ADA,LEO,XMR,ATOM,LINK,HT,NEO,USDC,MKR,ETC,MIOTA,CRO,HEDG&interval=1d");
            setPrices(response.data);
            // console.log(response);
            // console.log(prices);
        }
        getPrices();
    }, [safe]);

    const numberWithCommas = x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const handleClick = (e, coin) => {
        e.preventDefault();
        props.addCoin(coin);
    }

    return (
      <div>
        <div id='crypto'>
          <h1 className={isDarkMode ? 'dark' : 'light'}>Crypto</h1>
            <p className={isDarkMode ? 'dark' : 'light'}>
              Prices for the top 25 crypto currencies by market cap.
            </p>
          <table id='cryptoTable'>
            <thead>
              <tr>
                <td>Name</td>
                <td>Symbol</td>
                <td>Price</td>
                {/* <td>Change (24hr)</td> */}
                <td>Market Cap</td>
                <td>Logo</td>
                <td>Select</td>
              </tr>
            </thead>
            <tbody>
              {prices.map((p) =>
                <tr key={p.currency}>
                  <td>{p.name}</td>
                  <td>{p.currency}</td>
                  <td>${(p.price  * 1).toFixed(2)}</td>
                  {/* <td>{(p['1d'].price_change_pct * 100).toFixed(2)} %</td> */}
                  <td>${numberWithCommas((p.market_cap * 1))}</td>
                  <td><img src={p.logo_url} alt='logo'></img></td>
                  <td><IconButton aria-label='select' onClick={e => handleClick(e, p)}><AddCircleIcon /></IconButton></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
}

export default Crypto;