import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import {LanguageContext} from './contexts/LanguageContext';
import useInputState from './hooks/useInputState';
import './styles/minLogin.css';

const words = {
    english: {
        signIn: 'Sign In',
        userN: 'Username',
        password: 'Password',
        welcome: 'Welcome'
    },
    french: {
        signIn: 'Se Connecter',
        userN: "Nom d'Utilisateur",
        password: 'Mot de Passe',
        welcome: 'Bienvenue',
    },
    spanish: {
        signIn: 'Registrarse',
        userN: 'Nombre de Usuario',
        password: 'Contrasena',
        welcome: 'Bienvenido',
    }
}

function MinLogin() {
    const {language} = useContext(LanguageContext);
    const {currentUser, loginUser} = useContext(UserContext);
    const [login, setLogin] = useState(false);
    const {userN, signIn, password, welcome} = words[language];
    const [user, handleChange] = useInputState('');
    const [passcode, handlePass] = useInputState('');
    const [redirect, setRedirect] = useState(null);

    

    const handleSubmit = e => {
        e.preventDefault();
        setLogin(true);
        setTimeout(()=> {
            loggingIn(user, passcode);
        }, 1500);
    }

    const loggingIn = (username, passcode) => {
        axios('http://localhost:3001/login', {
            data: {
                username: username,
                password: passcode
            },
            method: 'post',
            withCredentials: true
    }).then(res => {
        if(res.status === 200){
            setRedirect('/crypto');
            loginUser(res.data.username);
        }
      }).catch(err => {
          console.log(err);
      });
    }

    if(redirect === '/crypto'){
        return <Redirect to={{ pathname: redirect }} />
    }

    return(
        <div className="wrapper">
            <div className='container'>
                {login ? (
                    <h1 className='fadeIn'>{welcome}</h1>
                ) : (
                    <div>
                        <h1 className='fade'>{signIn}</h1>
                        <form className="form" onSubmit={handleSubmit}>
                            <input id='white' value={user} onChange={handleChange} type="text" placeholder={userN} />
                            <input id='white' value={passcode} onChange={handlePass} type="password" placeholder={password} />
                        <button type="submit" id="login-button">{signIn}</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MinLogin;