import React, {createContext, useState} from 'react';

export const UserContext = createContext();

export function UserProvider(props) {
    
    const [currentUser, loginUser] = useState(null);

    return(
        <UserContext.Provider value={{currentUser, loginUser}}>
            {props.children}
        </UserContext.Provider>
    );
}