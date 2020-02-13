import {useState} from 'react';

function useToggleState(initialVal){

    const [state, setState] = useState(initialVal);

    const toggle = () => {
        setState(!state);
    }

    return [state, toggle];
}

export default useToggleState;