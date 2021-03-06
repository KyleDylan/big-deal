import React, { useContext } from 'react';
import axios from 'axios';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from "@material-ui/core/Switch";
import {NavLink} from "react-router-dom";
import './styles/Navbar.css';
import {LanguageContext} from './contexts/LanguageContext';
import {ThemeContext} from './contexts/ThemeContext';
import { UserContext } from './contexts/UserContext';

const content = {
    english: {
        flag: '🇬🇧',
        login: 'Login',
        signUp: 'Sign Up',
        logout: 'Log Out',
        home: 'Home',
        myList: 'My List'
    },
    french: {
        flag: 'French',
        login: 'Se Connecter',
        signUp: "S'inscrire",
        logout: 'Se Déconnecter',
        home: 'Domicile',
        myList: 'Ma Liste'
    },
    spanish: {
        flag: 'Spanish',
        login: 'Iniciar Sesión',
        signUp: 'Regístrate',
        logout: 'Cerrar Sesión',
        home: 'Casa',
        myList: 'Mi Lista'
    }
};

function NavBar() {
    const {language, changeLanguage} = useContext(LanguageContext);
    const {currentUser, loginUser} = useContext(UserContext);
    const {isDarkMode, toggleTheme} = useContext(ThemeContext);
    const {flag, login, signUp, logout, home, myList} = content[language];

    const handleClick = e => {
        e.preventDefault();
        logOutUser();
    }

    const logOutUser = () => {
        axios.get('http://localhost:3001/logout').then(res => {
            if(res.status === 200){
                loginUser(null);
                alert('You have successfully logged out.');
            }
        }).catch(err => {
            console.log('log out error', err);
        });
    }

    
    return(
            <AppBar position='fixed' id={isDarkMode ? 'darkMode' : 'lightMode'}>
                <Toolbar>
                    <Typography id={isDarkMode ? 'title' : 'titleD'}>
                        Coinz
                    </Typography>
                        <Select id={isDarkMode ? 'lang' : 'langD'} value={language} onChange={changeLanguage}>
                            <MenuItem value='english'>English</MenuItem>
                            <MenuItem value='spanish'>Spanish</MenuItem>
                            <MenuItem value='french'>French</MenuItem>
                        </Select>
                    <Switch className='switch' onChange={toggleTheme} />
                    <nav>
                        <NavLink id={isDarkMode ? 'navLink' : 'navLinkD'} exact activeClassName='active-link' to='/'>{home}</NavLink>
                        <NavLink id={isDarkMode ? 'navLink' : 'navLinkD'} exact activeClassName='active-link' to='/crypto'>Crypto</NavLink>
                        {currentUser ? (
                            <NavLink id={isDarkMode ? 'navLink' : 'navLinkD'} exact activeClassName='active-link' to='/saved'>{myList}</NavLink>
                        ): (null)}
                        <span className='right'>
                            {currentUser ? (
                                <NavLink id={isDarkMode ? 'navLink' : 'navLinkD'} exact activeClassName='active-link' to='/logout'
                                    onClick={handleClick} >{logout}</NavLink>
                            ) : (
                                <span>
                                    <NavLink id={isDarkMode ? 'navLink' : 'navLinkD'} exact activeClassName='active-link' to='/login'>{login}</NavLink>
                                    <NavLink id={isDarkMode ? 'navLink' : 'navLinkD'} exact activeClassName='active-link' to='/register'>{signUp}</NavLink>
                                </span>
                            )}
                        </span>
                    </nav>
                </Toolbar>
            </AppBar>
    );
}

export default NavBar;