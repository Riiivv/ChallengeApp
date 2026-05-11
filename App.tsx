import AppNavigator from "./src/navigation/AppNavigator";
import { ThemeProvider } from "./src/hooks/useThemeMode";

export default function App() {
    return (
        <ThemeProvider>
            <AppNavigator />
        </ThemeProvider>
    );
}