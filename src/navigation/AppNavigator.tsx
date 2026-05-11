import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import ChallengesScreen from "../screens/ChallengesScreen";
import SavedScreen from "../screens/SavedScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ChallengeDetailScreen from "../screens/ChallengeDetailScreen";
import { useThemeMode } from "../hooks/useThemeMode";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
    const { isDarkMode } = useThemeMode();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = "home";

                    if (route.name === "Home") iconName = "home";
                    else if (route.name === "Challenges") iconName = "list";
                    else if (route.name === "Saved") iconName = "heart";
                    else if (route.name === "Settings") iconName = "settings";

                    return <Ionicons name={iconName} size={size} color={color} />;
                },

                tabBarActiveTintColor: "#2563eb",
                tabBarInactiveTintColor: isDarkMode ? "#9ca3af" : "gray",

                tabBarStyle: {
                    backgroundColor: isDarkMode ? "#1f2937" : "white",
                    borderTopColor: isDarkMode ? "#374151" : "#e5e7eb",
                },

                headerStyle: {
                    backgroundColor: isDarkMode ? "#1f2937" : "white",
                },

                headerTintColor: isDarkMode ? "white" : "black",
                headerTitleAlign: "center",
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Challenges" component={ChallengesScreen} />
            <Tab.Screen name="Saved" component={SavedScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    const { isDarkMode } = useThemeMode();

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: isDarkMode ? "#1f2937" : "white",
                    },
                    headerTintColor: isDarkMode ? "white" : "black",
                    headerTitleAlign: "center",
                }}
            >
                <Stack.Screen
                    name="Tabs"
                    component={Tabs}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="ChallengeDetail"
                    component={ChallengeDetailScreen}
                    options={{ title: "Challenge Details" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}