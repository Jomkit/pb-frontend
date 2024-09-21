// check localStorage and update state

import { useEffect, useState } from "react"

/**
 * Custom hook to use localStorage.
 *
 * @param {string} key - The key to use for localStorage.
 * @param {string | null} [startValue=null] - The initial value to use if no value is set in localStorage.
 * @returns {[string | null, Function]} - An array with the current value and a function to update the value.
 */
const useLocalStorage = (key: string, startValue:(string | null) = null): [(string | null), Function] => {
    const initialValue = localStorage.getItem(key) || startValue;
    const [item, setItem] = useState(initialValue);

    useEffect(() => {
        if(item === null) {
            localStorage.removeItem(key);
        }else {
            localStorage.setItem(key, item);
        }
    }, [item]);
    
    //return getter and setter
    return [item, setItem];
}

export default useLocalStorage;