import React from 'react';
import './styles/Home.css';
import Button from '@material-ui/core/Button';

function Home() {
    return(
        <div id='main'>
            <p id='name'>Coinz<div><Button variant='contained' id='butt' href='/crypto'>Get Started</Button></div></p>
        </div>
    );
}

export default Home;