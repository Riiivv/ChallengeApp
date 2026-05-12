// Imports AsyncStorage for local storage on the device
import AsyncStorage from "@react-native-async-storage/async-storage";

// Key/name used to store the theme value
const THEME_KEY = "theme_mode";

// Saves dark mode as true or false
export async function saveThemeMode(isDarkMode: boolean) {
    await AsyncStorage.setItem(THEME_KEY, JSON.stringify(isDarkMode));
}

// Loads the saved theme value
export async function getThemeMode(): Promise<boolean> {
    const value = await AsyncStorage.getItem(THEME_KEY);

    // If no theme has been saved yet, use light mode as default
    if (value === null) {
        return false;
    }

    // Converts the saved string back to a boolean
    return JSON.parse(value);
}