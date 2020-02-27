import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {LanguageContext} from './contexts/LanguageContext';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import './styles/Table.css';

const content = {
    english: {
        name: 'Name',
        symbol: 'Symbol',
        price: 'Price',
        change: 'Change (24hr)',
        market: 'Market Cap',
        logo: 'Logo',
        select: 'Select'
    },
    spanish: {
        name: 'Nombre',
        symbol: 'Simbolo',
        price: 'Precio',
        change: 'Cambio',
        market: 'Cap de Mercado',
        logo: 'Logo',
        select: 'Seleccione'
    },
    french: {
        name: 'Nom',
        symbol: 'Symbole',
        price: 'Prix',
        change: 'Changement',
        market: 'Marche Cap',
        logo: 'Logo',
        select: 'Choisir'
    }
}

function Rtable(props) {
    const {language} = useContext(LanguageContext);
    const {name, symbol, price, change, market, logo, select} = content[language];
    const [prices, setPrices] = useState();
    const [safe, setSafe] = useState();

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

    

    return(
        <div className='border'>
            <ReactTable
            showPaginationBottom={false}
            showPageSizeOptions={false}
            data={prices}
            columns={[
                {
                    Header: `${name}`,
                    columns: [
                        {
                        accessor: 'name'
                        }
                    ],
                    headerStyle: {fontWeight: '600'}
                },
                {
                    Header: `${symbol}`,
                    columns: [
                        {
                        accessor: "currency"
                        }
                    ],
                    headerStyle: {fontWeight: '600'}
                },
                {
                    Header: `${price}`,
                    columns: [
                        {
                            accessor: 'price',
                            Cell: (props) => { return <p>${(props.original.price * 1).toFixed(2)}</p> }
                        }
                    ],
                    headerStyle: {fontWeight: '600'}
                },
                {
                    Header: `${change}`,
                    columns: [
                        {
                        id: '%change',
                        accessor: d => d['1d'].price_change_pct,
                        Cell: (props) => { return <p>{(props.original['1d'].price_change_pct * 100).toFixed(2)} %</p> }
                        }
                    ],
                    headerStyle: {fontWeight: '600'}
                },
                {
                    Header: `${market}`,
                    columns: [
                        {
                        accessor: "market_cap",
                        Cell: (props) => { return <p>${numberWithCommas((props.original.market_cap * 1))}</p>}
                        }
                    ],
                    headerStyle: {fontWeight: '600'}
                },
                {
                    Header: `${logo}`,
                    columns: [
                        {
                        accessor: "high",
                        Cell: (props) => { return <img src={props.original.logo_url} alt='logo'></img> }
                        }
                    ],
                    headerStyle: {fontWeight: '600'}
                },
                {
                    Header: `${select}`,
                    columns: [
                        {
                            Cell: (props) => { return <div id='add'><button id='add' onClick={e => handleClick(e, props.original)}>Add</button></div> },
                            style: {maxWidth: '70px'}
                        }
                    ],
                    headerStyle: {fontWeight: '600'}
                }
            ]}
            defaultPageSize={25}
            style={{
                height: "500px", width: '1150px'  // This will force the table body to overflow and scroll, since there is not enough room
            }}
            className="-striped -highlight"
            />
      </div>
    );
}

export default Rtable;