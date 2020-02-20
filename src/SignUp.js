import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LanguageIcon from '@material-ui/icons/Language';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles/LoginStyles';
import './styles/Login.css';
import {LanguageContext} from './contexts/LanguageContext';
import useInputState from './hooks/useInputState';
import axios from 'axios';

const words = {
    english: {
        signUp: 'Sign Up',
        email: 'Email Address',
        password: 'Password',
        remember: 'Remember Me',
    },
    french: {
        signUp: "S'Inscrire",
        email: 'Adresse Electronique',
        password: 'Mot de Passe',
        remember: 'Souviens-toi De Moi',
    },
    spanish: {
        signUp: 'Registrarse',
        email: 'Correo Electronico',
        password: 'Contrasena',
        remember: 'Recuedame',
    }
}

function Form(props) {
    const {language, changeLanguage} = useContext(LanguageContext);
    const {userName, loginUser} = useContext(UserContext);
    const {classes} = props;
    const {email, signUp, password, remember} = words[language];

    const [username, handleChange] = useInputState('');
    const [passcode, handlePass] = useInputState('');
    const [redirect, setRedirect] = useState(null);

    const handleClick = e => {
        e.preventDefault();
        createUser(username, passcode);
    }

    const createUser = (username, passcode) => {
        axios.post('http://localhost:3001/register', {
        username: username,
        password: passcode
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
        <div id='login-container'>
            <main id='logins' className={classes.login}>
                    <Paper id='papers' className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LanguageIcon />
                        </Avatar>
                        <Typography variant='h5'>{signUp}</Typography>
                        <Select value={language} onChange={changeLanguage}>
                            <MenuItem value='english'>English</MenuItem>
                            <MenuItem value='spanish'>Spanish</MenuItem>
                            <MenuItem value='french'>French</MenuItem>
                        </Select>
                        <form className={classes.form}>
                            <FormControl margin='normal' required fullWidth>
                                <InputLabel htmlFor='email'>{email}</InputLabel>
                                <Input id='email' value={username} onChange={handleChange} name='username' autoFocus />
                            </FormControl>
                            <FormControl margin='normal' required password fullWidth>
                                <InputLabel htmlFor='password'>{password}</InputLabel>
                                <Input id='password' value={passcode} onChange={handlePass} name='password' type='password' autoFocus />
                            </FormControl>
                            <FormControlLabel 
                                control={<Checkbox color='primary' />}
                                label={remember} 
                            />
                            <Button
                                variant='contained'
                                type='submit'
                                fullWidth
                                onClick={handleClick}
                                className={classes.submit}
                                >
                                    {signUp}
                            </Button>
                        </form>
                    </Paper>
                </main>
            </div>
    )
}

export default withStyles(styles)(Form);