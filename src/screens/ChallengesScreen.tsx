import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

// Imports local challenge data
import { fallbackChallenges } from "../data/fallbackChallenges";

// Imports dark mode state
import { useThemeMode } from "../hooks/useThemeMode";

export default function ChallengesScreen({ navigation }: any) {
    // Gets current dark mode value
    const { isDarkMode } = useThemeMode();

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <Text style={[styles.title, isDarkMode && styles.darkText]}>
                Challenge Ideas
            </Text>

            <FlatList
                // Data shown in the list
                data={fallbackChallenges}

                // Unique key for each item
                keyExtractor={(item) => item.id}

                contentContainerStyle={styles.list}

                // Renders each challenge as a clickable card
                renderItem={({ item }) => (
                    <Pressable
                        style={[styles.card, isDarkMode && styles.darkCard]}
                        onPress={() =>
                            navigation.navigate("ChallengeDetail", {
                                challenge: item,
                            })
                        }
                    >
                        <Text style={[styles.challengeTitle, isDarkMode && styles.darkText]}>
                            {item.title}
                        </Text>

                        <Text style={[styles.category, isDarkMode && styles.darkSubText]}>
                            {item.category}
                        </Text>
                    </Pressable>
                )}
            />
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
        textTransform: "capitalize",
    },

    darkText: {
        color: "white",
    },

    darkSubText: {
        color: "#d1d5db",
    },
});