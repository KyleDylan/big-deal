import React from 'react';
import {Route, Switch, BrowserRouter} from "react-router-dom";
import Home from './Home';
import Navbar from './Navbar';
import {LanguageProvider} from './contexts/LanguageContext';
import {ThemeProvider} from './contexts/ThemeContext';
import {UserProvider} from './contexts/UserContext';
import Main from './Main';
import MinLogin from './MinLogin';
import SignUp from './SignUp';
import MyList from './MyList';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <UserProvider>
          <BrowserRouter>
            <Navbar />
            <Switch>
              <Route exact path='/' render={() => <Home />} />
              <Route exact path='/login' render={() => <MinLogin />} />
              <Route exact path='/register' render={() => <SignUp />} />
              <Route exact path='/crypto' render={() => <Main />} />
              <Route exact path='/saved' render={() => <MyList />} />
            </Switch>
          </BrowserRouter>
        </UserProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
