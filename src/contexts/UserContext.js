import React, {createContext, useState} from 'react';

export const UserContext = createContext();

export function UserProvider(props) {
    const [userName, setUser] = useState(null);

    const loginUser = user => {
        setUser(user);
    }
    return(
        <UserContext.Provider value={{userName, loginUser}}>
            {props.children}
        </UserContext.Provider>
    );
}