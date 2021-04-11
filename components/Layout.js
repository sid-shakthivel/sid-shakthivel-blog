import { useReducer } from 'react';

import { ThemeContext } from '../contexts/ThemeContext';

import { themeReducer } from '../reducers/ThemeReducer';

import Theme from './Theme';

export default function Layout({ children }) {
    const [theme, dispatch] = useReducer(themeReducer, 'light');
    return (
        <ThemeContext.Provider value={{ theme: theme, dispatch: dispatch }}>
            <Theme />
            {children}
        </ThemeContext.Provider>
    );
}
