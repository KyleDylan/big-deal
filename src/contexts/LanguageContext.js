import React, {createContext, useState} from 'react';
import '../styles/Language.css';

export const LanguageContext = createContext();

export function LanguageProvider(props) {
    const [language, setLanguage] = useState('english');

    const changeLanguage = e => {
        setLanguage(e.target.value);
    }
    return(
        <LanguageContext.Provider value={{language, changeLanguage}}>
            {props.children}
        </LanguageContext.Provider>
    );
}