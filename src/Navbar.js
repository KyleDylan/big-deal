import React, { useContext } from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import {NavLink} from "react-router-dom";
// import './styles/NavBar.css';
import {LanguageContext} from './contexts/LanguageContext';
import {ThemeContext} from './contexts/ThemeContext';

const content = {
    english: {
        flag: '🇬🇧',
        contact: 'Contact',
        home: 'Home',
        myList: 'My List'
    },
    french: {
        flag: 'French',
        contact: 'Contact',
        home: 'Domicile',
        myList: 'Ma Liste'
    },
    spanish: {
        flag: 'Spanish',
        contact: 'Contacto',
        home: 'Casa',
        myList: 'Mi Lista'
    }
};

function NavBar() {
    const {language} = useContext(LanguageContext);
    const {isDarkMode, toggleTheme} = useContext(ThemeContext);
    const {flag, contact, home, myList} = content[language];
    
    return(
        <div>
            <AppBar position='static' color={isDarkMode ? 'default' : 'primary'}>
                <Toolbar>
                    <IconButton>
                        <span>{flag}</span>
                    </IconButton>
                    <Typography className='title'>
                        Coinz
                    </Typography>
                    <Switch className='switch' onChange={toggleTheme} />
                    <nav>
                    <NavLink id={isDarkMode ? 'dark' : 'navLink'} exact activeClassName='active-link' to='/'>{home}</NavLink>
                    <NavLink id={isDarkMode ? 'dark' : 'navLink'} exact activeClassName='active-link' to='/crypto'>{myList}</NavLink>
                    <NavLink id={isDarkMode ? 'dark' : 'navLink'} exact activeClassName='active-link' to='/contact'>{contact}</NavLink>
                    <NavLink id={isDarkMode ? 'dark' : 'navLink'} exact activeClassName='active-link' to='/mylist'>Crypto</NavLink>
                    </nav>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar;