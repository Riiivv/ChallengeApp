import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { fallbackChallenges } from "../data/fallbackChallenges";
import { useThemeMode } from "../hooks/useThemeMode";

export default function ChallengesScreen({ navigation }: any) {
    const { isDarkMode } = useThemeMode();

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <Text style={[styles.title, isDarkMode && styles.darkText]}>
                Challenge Ideas
            </Text>

            <FlatList
                data={fallbackChallenges}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
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