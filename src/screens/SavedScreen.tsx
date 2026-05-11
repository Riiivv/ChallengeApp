import { useCallback, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import {
    getSavedChallenges,
    removeSavedChallenge,
} from "../storage/SavedChallenges";

import { Challenge } from "../types/Challenge";
import { useThemeMode } from "../hooks/useThemeMode";

export default function SavedScreen() {
    const [savedChallenges, setSavedChallenges] = useState<Challenge[]>([]);
    const { isDarkMode } = useThemeMode();

    async function loadSavedChallenges() {
        const data = await getSavedChallenges();
        setSavedChallenges(data);
    }

    async function handleRemove(index: number) {
        await removeSavedChallenge(index);
        loadSavedChallenges();
    }

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