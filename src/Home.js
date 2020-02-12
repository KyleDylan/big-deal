import React from 'react';
import './styles/Home.css';
import Button from '@material-ui/core/Button';

function Home() {
    return(
        <span class='main'>
            <p>Coinz<div><Button variant='contained' id='butt'>Get Started</Button></div></p>
        </span>
    );
}

export default Home;