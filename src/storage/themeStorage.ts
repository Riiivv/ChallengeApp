import AsyncStorage from "@react-native-async-storage/async-storage";

const THEME_KEY = "theme_mode";

export async function saveThemeMode(isDarkMode: boolean) {
    await AsyncStorage.setItem(THEME_KEY, JSON.stringify(isDarkMode));
}

export async function getThemeMode(): Promise<boolean> {
    const value = await AsyncStorage.getItem(THEME_KEY);

    if (value === null) {
        return false;
    }

    return JSON.parse(value);
}