import React from 'react';
import './App.css';
import {Route, Switch, BrowserRouter} from "react-router-dom";
import Home from './Home';
import Navbar from './Navbar';
import {LanguageProvider} from './contexts/LanguageContext';
import {ThemeProvider} from './contexts/ThemeContext';
import Main from './Main';
import Saved from './Saved';
import Login from './Login';
import SignUp from './SignUp';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path='/' render={() => <Home />} />
            <Route exact path='/login' render={() => <Login />} />
            <Route exact path='/register' render={() => <SignUp />} />
            <Route exact path='/crypto' render={() => <Main />} />
            <Route exact path='/saved' render={() => <Saved />} />
          </Switch>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
