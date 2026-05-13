// Imports React hooks
import { useEffect, useRef, useState } from "react";

// Imports React Native UI components
import { ActivityIndicator, Alert, Button, Platform, ScrollView, StyleSheet, Text, useWindowDimensions, View, } from "react-native";

// Imports accelerometer sensor from Expo
import { Accelerometer } from "expo-sensors";

// Imports dark mode state
import { useThemeMode } from "../hooks/useThemeMode";

// Imports API function for getting a random challenge
import { getRandomChallenge } from "../services/challengeApi";

// Imports function for saving a challenge locally
import { saveChallenge } from "../storage/SavedChallenges";

// Imports the Challenge type/model
import { Challenge } from "../types/Challenge";

export default function HomeScreen() {
    // Stores the current challenge shown on the screen
    const [challenge, setChallenge] = useState<Challenge | null>(null);

    // Stores loading state while the app fetches a challenge
    const [loading, setLoading] = useState(false);

    // Stores the last shake time to avoid triggering too many API calls
    const lastShakeTime = useRef(0);

    // Gets current dark mode value
    const { isDarkMode } = useThemeMode();

    // Gets screen width and height for responsive layout
    const { width, height } = useWindowDimensions();

    // Checks if the phone is in landscape mode
    const isLandscape = width > height;

    // Checks if the screen is large, for example web/tablet
    const isLargeScreen = width > 700;

    // Loads a new random challenge from the API
    async function loadChallenge() {
        setLoading(true);

        const newChallenge = await getRandomChallenge();

        setChallenge(newChallenge);
        setLoading(false);
    }

    // Saves the current challenge to AsyncStorage
    async function handleSaveChallenge() {
        if (!challenge) return;

        await saveChallenge(challenge);

        Alert.alert("Saved!", "Challenge saved successfully.");
    }

    // Runs when the screen first loads
    useEffect(() => {
        // Load first challenge automatically
        loadChallenge();

        // Accelerometer does not run on web, so stop here in browser
        if (Platform.OS === "web") {
            return;
        }

        // Controls how often sensor data updates
        Accelerometer.setUpdateInterval(500);

        // Listens for phone movement/shake
        const subscription = Accelerometer.addListener((data) => {
            // Calculates total movement force
            const totalForce =
                Math.abs(data.x) + Math.abs(data.y) + Math.abs(data.z);

            const now = Date.now();

            // If the phone is shaken hard enough, load a new challenge
            if (totalForce > 2.2 && now - lastShakeTime.current > 1500) {
                lastShakeTime.current = now;
                loadChallenge();
            }
        });

        // Removes the sensor listener when the screen is closed
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
                    isLandscape && styles.landscapeCard,
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

                {/* Shows loading spinner while fetching data */}
                {loading ? (
                    <ActivityIndicator size="large" />
                ) : (
                    <>
                        {/* Shows challenge title */}
                        <Text
                            style={[
                                styles.challengeText,
                                isDarkMode && styles.darkText,
                            ]}
                        >
                            {challenge?.title}
                        </Text>

                        {/* Shows challenge category */}
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
    // Main layout for the screen
    scrollContainer: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#f7f7f7",
    },

    // Dark mode background
    darkContainer: {
        backgroundColor: "#111827",
    },

    // Main card container
    card: {
        width: "100%",
        maxWidth: 420,
        backgroundColor: "white",
        padding: 24,
        borderRadius: 18,
        alignItems: "center",
    },

    // Dark mode card color
    darkCard: {
        backgroundColor: "#1f2937",
    },

    // Larger card width for bigger screens
    largeCard: {
        maxWidth: 550,
    },

    // Wider layout for landscape mode
    landscapeCard: {
        maxWidth: 700,
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