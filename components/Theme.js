import React, { useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon as fullMoon } from '@fortawesome/free-solid-svg-icons';
import { faSun as sun } from '@fortawesome/free-regular-svg-icons';

import themeStyles from '../styles/theme.module.css';

import { ThemeContext } from '../contexts/ThemeContext';

export const lightTheme = {
    backgroundColor: '#f8f8f8',
    color: '#070707',
};

export const darkTheme = {
    backgroundColor: '#080a0d',
    color: '#f8f8f8',
};

export default function Theme() {
    const themeContext = useContext(ThemeContext);
    return (
        <div className={themeStyles.themeIcon}>
            {themeContext.theme === 'light' ? (
                <FontAwesomeIcon
                    className={themeStyles.themeIcon_moon}
                    onClick={() => {
                        window.localStorage.setItem("theme", "dark");
                        themeContext.dispatch({ type: 'dark' })
                    }}
                    icon={fullMoon}
                    size="4x"
                />
            ) : (
                <FontAwesomeIcon
                    className={themeStyles.themeIcon_sun}
                        onClick={() => {
                            window.localStorage.setItem("theme", "light");
                            themeContext.dispatch({ type: 'light' })
                    }}
                    icon={sun}
                    size="4x"
                />
            )}
        </div>
    );
}
