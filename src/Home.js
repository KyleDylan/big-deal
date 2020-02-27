import React, { useContext } from 'react';
import './styles/Home.css';
import {LanguageContext} from './contexts/LanguageContext';
import Button from '@material-ui/core/Button';

const content = {
    english: {
        subtitle: 'Secure Your Future',
        start: 'Get Started'
    },
    spanish: {
        subtitle: 'Asegura tu Futuro',
        start: 'Empezar'
    },
    french: {
            subtitle: 'Sécurisez Votre Avenir',
            start: 'Commencer'
    }
}

function Home() {
    const {language} = useContext(LanguageContext);
    const {subtitle, start} = content[language];
    return(
        <div id='main'>
            <div id='homeT'>
                <p id='name'>Coinz</p>
                <div id='sub'><h3>{subtitle}</h3></div>
                <span className='home'><Button variant='contained' id='butt' href='/crypto'>{start}</Button></span>
            </div>
            <div id='photo'><img src='https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/024011495256/media/14992957091/medium/1582687912/enhance' alt='piggybank'></img></div>
        </div>
    );
}

export default Home;