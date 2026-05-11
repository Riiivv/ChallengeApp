import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Button,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import { Accelerometer } from "expo-sensors";

import { useThemeMode } from "../hooks/useThemeMode";
import { getRandomChallenge } from "../services/challengeApi";
import { saveChallenge } from "../storage/SavedChallenges";
import { Challenge } from "../types/Challenge";

export default function HomeScreen() {
    const [challenge, setChallenge] = useState<Challenge | null>(null);
    const [loading, setLoading] = useState(false);
    const lastShakeTime = useRef(0);

    const { isDarkMode } = useThemeMode();
    const { width } = useWindowDimensions();
    const isLargeScreen = width > 700;

    async function loadChallenge() {
        setLoading(true);

        const newChallenge = await getRandomChallenge();

        setChallenge(newChallenge);
        setLoading(false);
    }

    async function handleSaveChallenge() {
        if (!challenge) return;

        await saveChallenge(challenge);

        Alert.alert("Saved!", "Challenge saved successfully.");
    }

    useEffect(() => {
        loadChallenge();

        if (Platform.OS === "web") {
            return;
        }

        Accelerometer.setUpdateInterval(500);

        const subscription = Accelerometer.addListener((data) => {
            const totalForce =
                Math.abs(data.x) + Math.abs(data.y) + Math.abs(data.z);

            const now = Date.now();

            if (totalForce > 2.2 && now - lastShakeTime.current > 1500) {
                lastShakeTime.current = now;
                loadChallenge();
            }
        });

        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <ScrollView
            contentContainerStyle={[
                styles.scrollContainer,
                isDarkMode && styles.darkContainer,
            ]}
        >
            <View
                style={[
                    styles.card,
                    isLargeScreen && styles.largeCard,
                    isDarkMode && styles.darkCard,
                ]}
            >
                <Text style={[styles.title, isDarkMode && styles.darkText]}>
                    ChallengeMe
                </Text>

                <Text style={[styles.infoText, isDarkMode && styles.darkSubText]}>
                    {Platform.OS === "web"
                        ? "Press the button to get a challenge."
                        : "Shake your phone or press the button to get a challenge."}
                </Text>

                {loading ? (
                    <ActivityIndicator size="large" />
                ) : (
                    <>
                        <Text
                            style={[
                                styles.challengeText,
                                isDarkMode && styles.darkText,
                            ]}
                        >
                            {challenge?.title}
                        </Text>

                        <Text
                            style={[
                                styles.category,
                                isDarkMode && styles.darkSubText,
                            ]}
                        >
                            {challenge?.category}
                        </Text>
                    </>
                )}

                <View style={styles.buttonContainer}>
                    <Button
                        title="Get New Challenge"
                        onPress={loadChallenge}
                    />

                    <Button
                        title="Save Challenge"
                        onPress={handleSaveChallenge}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#f7f7f7",
    },

    darkContainer: {
        backgroundColor: "#111827",
    },

    card: {
        width: "100%",
        maxWidth: 420,
        backgroundColor: "white",
        padding: 24,
        borderRadius: 18,
        alignItems: "center",
    },

    darkCard: {
        backgroundColor: "#1f2937",
    },

    largeCard: {
        maxWidth: 550,
    },

    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 20,
    },

    infoText: {
        fontSize: 16,
        textAlign: "center",
        color: "gray",
        marginBottom: 30,
    },

    challengeText: {
        fontSize: 24,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 10,
    },

    category: {
        fontSize: 16,
        color: "gray",
        marginBottom: 30,
        textTransform: "capitalize",
    },

    buttonContainer: {
        width: "100%",
        gap: 10,
    },

    darkText: {
        color: "white",
    },

    darkSubText: {
        color: "#d1d5db",
    },
});