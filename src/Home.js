import React from 'react';
import './styles/Home.css';
import Button from '@material-ui/core/Button';

function Home() {
    return(
        <div id='main'>
            <p id='name'>Coinz<span className='home'><Button variant='contained' id='butt' href='/crypto'>Get Started</Button></span></p>
        </div>
    );
}

export default Home;