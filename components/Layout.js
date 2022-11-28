import { useReducer, useEffect } from 'react';

import { ThemeContext } from '../contexts/ThemeContext';

import { themeReducer } from '../reducers/ThemeReducer';

import Theme from './Theme';

export default function Layout({ children }) {
    const [theme, dispatch] = useReducer(themeReducer, 'light');

    useEffect(() => {
        let savedTheme = window.localStorage.getItem("theme");

        if (savedTheme === "light") {
            dispatch({ type: 'light' })
        } else if (savedTheme === "dark") {
            dispatch({ type: "dark" })
        }
    }, []);
    
    return (
        <ThemeContext.Provider value={{ theme: theme, dispatch: dispatch }}>
            <Theme />
            {children}
        </ThemeContext.Provider>
    );
}
