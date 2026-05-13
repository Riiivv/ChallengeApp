// Imports React hooks
import { useCallback, useState } from "react";
// Imports React Native UI components
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
// Runs code when this screen becomes active/focused
import { useFocusEffect } from "@react-navigation/native";
// Imports functions for loading and removing saved challenges
import { getSavedChallenges, removeSavedChallenge, } from "../storage/SavedChallenges";
// Imports the Challenge type/model
import { Challenge } from "../types/Challenge";
// Imports dark mode state
import { useThemeMode } from "../hooks/useThemeMode";

export default function SavedScreen() {
    // Stores all saved challenges
    const [savedChallenges, setSavedChallenges] = useState<Challenge[]>([]);

    // Gets current dark mode value
    const { isDarkMode } = useThemeMode();

    // Loads saved challenges from AsyncStorage
    async function loadSavedChallenges() {
        const data = await getSavedChallenges();
        setSavedChallenges(data);
    }

    // Removes one challenge and reloads the list
    async function handleRemove(index: number) {
        await removeSavedChallenge(index);
        loadSavedChallenges();
    }

    // Reloads saved challenges every time the screen is opened
    useFocusEffect(
        useCallback(() => {
            loadSavedChallenges();
        }, [])
    );

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <Text style={[styles.title, isDarkMode && styles.darkText]}>
                Saved Challenges
            </Text>

            {/* Shows a message if there are no saved challenges */}
            {savedChallenges.length === 0 ? (
                <View style={[styles.emptyCard, isDarkMode && styles.darkCard]}>
                    <Text style={[styles.emptyTitle, isDarkMode && styles.darkText]}>
                        No saved challenges
                    </Text>

                    <Text style={[styles.emptyText, isDarkMode && styles.darkSubText]}>
                        Save a challenge from the home or detail page.
                    </Text>
                </View>
            ) : (
                // Shows saved challenges in a dynamic list
                <FlatList
                    data={savedChallenges}
                    keyExtractor={(item, index) => item.id + index}
                    contentContainerStyle={styles.list}
                    renderItem={({ item, index }) => (
                        <View style={[styles.card, isDarkMode && styles.darkCard]}>
                            <Text style={[styles.challengeTitle, isDarkMode && styles.darkText]}>
                                {item.title}
                            </Text>

                            <Text style={[styles.category, isDarkMode && styles.darkSubText]}>
                                {item.category}
                            </Text>

                            <Button
                                title="Remove"
                                onPress={() => handleRemove(index)}
                            />
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    // Light mode screen background
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f7f7f7",
    },

    // Dark mode screen background
    darkContainer: {
        backgroundColor: "#111827",
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
    },

    list: {
        paddingBottom: 20,
    },

    card: {
        backgroundColor: "white",
        padding: 18,
        borderRadius: 16,
        marginBottom: 12,
    },

    emptyCard: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 16,
    },

    darkCard: {
        backgroundColor: "#1f2937",
    },

    challengeTitle: {
        fontSize: 18,
        fontWeight: "600",
    },

    category: {
        fontSize: 14,
        color: "gray",
        marginTop: 6,
        marginBottom: 12,
        textTransform: "capitalize",
    },

    emptyTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },

    emptyText: {
        fontSize: 15,
        color: "gray",
    },

    darkText: {
        color: "white",
    },

    darkSubText: {
        color: "#d1d5db",
    },
});