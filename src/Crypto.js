import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import './styles/Crypto.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import {ThemeContext} from './contexts/ThemeContext';
import { StickyTable, Row, Cell } from 'react-sticky-table';

function Crypto(props) {
    const {isDarkMode} = useContext(ThemeContext);
    const [prices, setPrices] = useState([]);
    const [safe, setSafe] = useState('');

    useEffect(() => {
        async function getPrices() {
            const response = await axios.get("https://api.nomics.com/v1/currencies/ticker?key=07401fbb39ffe42a581721d85011ab9c&ids=BTC,ETH,XRP,USDT,BCH,LTC,EOS,BNB,BSV,XTZ,XLM,TRX,ADA,XMR,ATOM,LINK,HT,NEO,USDC,MKR,ETC,MIOTA,CRO,HEDG&interval=1d");
            setPrices(response.data);
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
          <StickyTable id='cryptoTable'>
              <Row>
                <Cell>Name</Cell>
                <Cell>Symbol</Cell>
                <Cell>Price</Cell>
                <Cell>Change (24hr)</Cell>
                <Cell>Market Cap</Cell>
                <Cell>Logo</Cell>
                <Cell>Select</Cell>
              </Row>
              {prices.map((p) =>
                <Row key={p.currency}>
                  <Cell>{p.name}</Cell>
                  <Cell>{p.currency}</Cell>
                  <Cell>${(p.price  * 1).toFixed(2)}</Cell>
                  <Cell>{(p['1d'].price_change_pct * 100).toFixed(2)} %</Cell>
                  <Cell>${numberWithCommas((p.market_cap * 1))}</Cell>
                  <Cell><img src={p.logo_url} alt='logo'></img></Cell>
                  <Cell><IconButton aria-label='select' onClick={e => handleClick(e, p)}><AddCircleIcon /></IconButton></Cell>
                </Row>
              )}
          </StickyTable>
        </div>
      </div>
    )
}

export default Crypto;