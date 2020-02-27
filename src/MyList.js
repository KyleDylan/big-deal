import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {ThemeContext} from './contexts/ThemeContext';
import {LanguageContext} from './contexts/LanguageContext';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import './styles/MyList.css';

const content = {
    english: {
        name: 'Name',
        symbol: 'Symbol',
        price: 'Price',
        change: 'Change (24hr)',
        market: 'Market Cap',
        logo: 'Logo',
        remove: 'Remove'
    },
    spanish: {
        name: 'Nombre',
        symbol: 'Simbolo',
        price: 'Precio',
        change: 'Cambio',
        market: 'Cap de Mercado',
        logo: 'Logo',
        remove: 'Remove'
    },
    french: {
        name: 'Nom',
        symbol: 'Symbole',
        price: 'Prix',
        change: 'Changement',
        market: 'Marche Cap',
        logo: 'Logo',
        remove: 'Remove'
    }
}


function MyList(props) {
    const {isDarkMode} = useContext(ThemeContext);
    const {language} = useContext(LanguageContext);
    const {name, symbol, price, change, market, logo, remove} = content[language];
    const [coins, setCoins] = useState([]);
    const [safe, setSafe] = useState();

    useEffect(() => {
         async function getPrices() {
            const response = await axios('http://localhost:3001/mylist', {
                method: 'get',
                withCredentials: true
            });
            setCoins(response.data);
        }
        getPrices();
    }, [safe]);

    const numberWithCommas = x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const removeCoin = (e, coin) => {
        e.preventDefault();
        axios("http://localhost:3001/coin", {
            method: 'delete',
            data: coin,
            withCredentials: true
        }).then(res => {
            if(res.status === 200){
              const newCoins = coins.filter(c => (c.name !== coin.name));
              setCoins(newCoins);
              setSafe(1);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    const clear = () => {
        setCoins([]);
    }

    return(
        <div id='total'>
            <p className='myCoins'>My Coins</p>
                <div id='borderML'>
                    <ReactTable
                    id='mylist'
                    showPaginationBottom={false}
                    showPageSizeOptions={false}
                    data={coins}
                    columns={[
                        {
                        Header: `${name}`,
                        columns: [
                            {
                            accessor: "name"
                            }
                        ],
                        headerStyle: {fontWeight: '600'}
                        },
                        // {
                        // Header: `${symbol}`,
                        // columns: [
                        //     {
                        //     accessor: "currency"
                        //     }
                        // ],
                        // headerStyle: {fontWeight: '600'}
                        // },
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
                        // {
                        // Header: `${logo}`,
                        // columns: [
                        //     {
                        //     accessor: "high",
                        //     Cell: (props) => { return <img src={props.original.logo_url} alt='logo'></img> }
                        //     }
                        // ],
                        // headerStyle: {fontWeight: '600'}
                        // },
                        {
                            Header: `${remove}`,
                            columns: [
                                {
                                    Cell: (props) => { return <div id='delete'><button id='delete' onClick={e => removeCoin(e, props.original)}>Remove</button></div> }

                                }
                            ],
                            headerStyle: {fontWeight: '600'}
                        }
                    ]}
                    defaultPageSize={25}
                    style={{
                        height: "500px", width: '1100px'  // This will force the table body to overflow and scroll, since there is not enough room
                    }}
                    className="-striped -highlight"
                    />
            </div>
      </div>
    );
}

export default MyList;