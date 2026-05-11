import { createContext, useContext, useEffect, useState } from "react";

import {
    getThemeMode,
    saveThemeMode,
} from "../storage/themeStorage";

type ThemeContextType = {
    isDarkMode: boolean;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
    isDarkMode: false,
    toggleTheme: () => {},
});

export function ThemeProvider({ children }: any) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        async function loadTheme() {
            const savedTheme = await getThemeMode();
            setIsDarkMode(savedTheme);
        }

        loadTheme();
    }, []);

    async function toggleTheme() {
        const newValue = !isDarkMode;

        setIsDarkMode(newValue);
        await saveThemeMode(newValue);
    }

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useThemeMode() {
    return useContext(ThemeContext);
}