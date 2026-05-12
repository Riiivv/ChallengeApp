// Imports navigation containers and navigators
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Imports icons for the bottom tabs
import { Ionicons } from "@expo/vector-icons";

// Imports all screens used in navigation
import HomeScreen from "../screens/HomeScreen";
import ChallengesScreen from "../screens/ChallengesScreen";
import SavedScreen from "../screens/SavedScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ChallengeDetailScreen from "../screens/ChallengeDetailScreen";

// Imports dark mode state
import { useThemeMode } from "../hooks/useThemeMode";

// Creates bottom tab navigator and stack navigator
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
    // Gets current dark mode value
    const { isDarkMode } = useThemeMode();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                // Chooses an icon based on the current tab name
                tabBarIcon: ({ color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = "home";

                    if (route.name === "Home") iconName = "home";
                    else if (route.name === "Challenges") iconName = "list";
                    else if (route.name === "Saved") iconName = "heart";
                    else if (route.name === "Settings") iconName = "settings";

                    return <Ionicons name={iconName} size={size} color={color} />;
                },

                // Active and inactive tab colors
                tabBarActiveTintColor: "#2563eb",
                tabBarInactiveTintColor: isDarkMode ? "#9ca3af" : "gray",

                // Bottom tab bar styling
                tabBarStyle: {
                    backgroundColor: isDarkMode ? "#1f2937" : "white",
                    borderTopColor: isDarkMode ? "#374151" : "#e5e7eb",
                },

                // Header styling for tab screens
                headerStyle: {
                    backgroundColor: isDarkMode ? "#1f2937" : "white",
                },

                headerTintColor: isDarkMode ? "white" : "black",
                headerTitleAlign: "center",
            })}
        >
            {/* Main menu tabs */}
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Challenges" component={ChallengesScreen} />
            <Tab.Screen name="Saved" component={SavedScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    // Gets current dark mode value
    const { isDarkMode } = useThemeMode();

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    // Header styling for stack screens
                    headerStyle: {
                        backgroundColor: isDarkMode ? "#1f2937" : "white",
                    },
                    headerTintColor: isDarkMode ? "white" : "black",
                    headerTitleAlign: "center",
                }}
            >
                {/* Tabs are the main app navigation */}
                <Stack.Screen
                    name="Tabs"
                    component={Tabs}
                    options={{ headerShown: false }}
                />

                {/* Detail screen opens on top of the tab navigation */}
                <Stack.Screen
                    name="ChallengeDetail"
                    component={ChallengeDetailScreen}
                    options={{ title: "Challenge Details" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}