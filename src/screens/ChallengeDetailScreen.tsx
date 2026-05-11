import { Alert, Button, StyleSheet, Text, View } from "react-native";

import { saveChallenge } from "../storage/SavedChallenges";
import { useThemeMode } from "../hooks/useThemeMode";

export default function ChallengeDetailScreen({ route }: any) {
    const { challenge } = route.params;
    const { isDarkMode } = useThemeMode();

    async function handleSave() {
        await saveChallenge(challenge);
        Alert.alert("Saved!", "Challenge saved successfully.");
    }

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <View style={[styles.card, isDarkMode && styles.darkCard]}>
                <Text style={[styles.title, isDarkMode && styles.darkText]}>
                    {challenge.title}
                </Text>

                <Text style={[styles.category, isDarkMode && styles.darkSubText]}>
                    Category: {challenge.category}
                </Text>

                <Text style={[styles.description, isDarkMode && styles.darkSubText]}>
                    Complete this challenge today and improve your daily habits.
                </Text>

                <Button title="Save Challenge" onPress={handleSave} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "#f7f7f7",
    },
    darkContainer: {
        backgroundColor: "#111827",
    },
    card: {
        backgroundColor: "white",
        padding: 22,
        borderRadius: 16,
    },
    darkCard: {
        backgroundColor: "#1f2937",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
    },
    category: {
        fontSize: 18,
        color: "gray",
        marginBottom: 20,
        textTransform: "capitalize",
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 30,
    },
    darkText: {
        color: "white",
    },
    darkSubText: {
        color: "#d1d5db",
    },
});