import { Button, StyleSheet, Text, View } from "react-native";
import { useThemeMode } from "../hooks/useThemeMode";

export default function SettingsScreen() {
    const { isDarkMode, toggleTheme } = useThemeMode();

    return (
        <View
            style={[
                styles.container,
                isDarkMode && styles.darkContainer,
            ]}
        >
            <Text
                style={[
                    styles.title,
                    isDarkMode && styles.darkText,
                ]}
            >
                Settings / About
            </Text>

            <View
                style={[
                    styles.card,
                    isDarkMode && styles.darkCard,
                ]}
            >
                <Text
                    style={[
                        styles.cardTitle,
                        isDarkMode && styles.darkText,
                    ]}
                >
                    Appearance
                </Text>

                <Text
                    style={[
                        styles.text,
                        isDarkMode && styles.darkSubText,
                    ]}
                >
                    Current mode: {isDarkMode ? "Dark" : "Light"}
                </Text>

                <Button
                    title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    onPress={toggleTheme}
                />
            </View>

            <View
                style={[
                    styles.card,
                    isDarkMode && styles.darkCard,
                ]}
            >
                <Text
                    style={[
                        styles.cardTitle,
                        isDarkMode && styles.darkText,
                    ]}
                >
                    ChallengeMe
                </Text>

                <Text
                    style={[
                        styles.text,
                        isDarkMode && styles.darkSubText,
                    ]}
                >
                    A daily challenge app built with React Native, TypeScript and Expo.
                </Text>
            </View>

            <View
                style={[
                    styles.card,
                    isDarkMode && styles.darkCard,
                ]}
            >
                <Text
                    style={[
                        styles.cardTitle,
                        isDarkMode && styles.darkText,
                    ]}
                >
                    Project Requirements
                </Text>

                <Text style={[styles.check, isDarkMode && styles.darkText]}>✓ Android + iOS support</Text>
                <Text style={[styles.check, isDarkMode && styles.darkText]}>✓ Responsive design</Text>
                <Text style={[styles.check, isDarkMode && styles.darkText]}>✓ Dynamic list</Text>
                <Text style={[styles.check, isDarkMode && styles.darkText]}>✓ Async API calls</Text>
                <Text style={[styles.check, isDarkMode && styles.darkText]}>✓ Web API integration</Text>
                <Text style={[styles.check, isDarkMode && styles.darkText]}>✓ Local storage with AsyncStorage</Text>
                <Text style={[styles.check, isDarkMode && styles.darkText]}>✓ Sensor integration with accelerometer</Text>
                <Text style={[styles.check, isDarkMode && styles.darkText]}>✓ Navigation with 4 tabs</Text>
                <Text style={[styles.check, isDarkMode && styles.darkText]}>✓ Dark mode with saved preference</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f7f7f7",
    },

    darkContainer: {
        backgroundColor: "#111827",
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
    },

    card: {
        backgroundColor: "white",
        padding: 18,
        borderRadius: 16,
        marginBottom: 14,
    },

    darkCard: {
        backgroundColor: "#1f2937",
    },

    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },

    text: {
        fontSize: 15,
        color: "gray",
        lineHeight: 22,
        marginBottom: 12,
    },

    check: {
        fontSize: 15,
        marginBottom: 8,
    },

    darkText: {
        color: "white",
    },

    darkSubText: {
        color: "#d1d5db",
    },
});