// Imports React hooks used for state, effects and global context
import { createContext, useContext, useEffect, useState } from "react";

// Imports functions used to save and load the theme from AsyncStorage
import { getThemeMode, saveThemeMode } from "../storage/themeStorage";

// TypeScript type that describes what the ThemeContext contains
type ThemeContextType = {
    isDarkMode: boolean;
    toggleTheme: () => void;
};

// Creates the global ThemeContext with default values
const ThemeContext = createContext<ThemeContextType>({
    isDarkMode: false,
    toggleTheme: () => {},
});

// ThemeProvider wraps the app and shares dark mode data globally
export function ThemeProvider({ children }: any) {

    // State used to store if dark mode is enabled or not
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Runs once when the app loads
    useEffect(() => {

        // Loads the saved theme value from AsyncStorage
        async function loadTheme() {
            const savedTheme = await getThemeMode();

            // Updates the dark mode state
            setIsDarkMode(savedTheme);
        }

        loadTheme();
    }, []);

    // Function used to switch between dark and light mode
    async function toggleTheme() {

        // Reverses the current value
        const newValue = !isDarkMode;

        // Updates the React state
        setIsDarkMode(newValue);

        // Saves the new theme value in AsyncStorage
        await saveThemeMode(newValue);
    }

    // Makes isDarkMode and toggleTheme available to the entire app
    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Custom hook used to access the ThemeContext more easily
export function useThemeMode() {
    return useContext(ThemeContext);
}