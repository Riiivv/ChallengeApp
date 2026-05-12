// Imports AsyncStorage for local device storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// Imports the Challenge type/model
import { Challenge } from "../types/Challenge";

// Key/name used to store saved challenges
const STORAGE_KEY = "saved_challenges";

// Saves a challenge to AsyncStorage
export async function saveChallenge(challenge: Challenge) {
    try {
        // Load existing saved challenges
        const existing = await getSavedChallenges();

        // Check if the challenge is already saved
        const alreadySaved = existing.some(
            (item) => item.id === challenge.id
        );

        // Stop the function if it is already saved
        if (alreadySaved) {
            return;
        }

        // Create a new array with old challenges + the new challenge
        const updated = [...existing, challenge];

        // Save the updated array in AsyncStorage
        await AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(updated)
        );
    } catch (error) {
        console.log("Error saving challenge");
    }
}

// Loads all saved challenges from AsyncStorage
export async function getSavedChallenges(): Promise<Challenge[]> {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);

        // If saved data exists, convert it from string to array
        if (data !== null) {
            return JSON.parse(data);
        }

        // If nothing is saved yet, return an empty array
        return [];
    } catch (error) {
        console.log("Error loading challenges");
        return [];
    }
}

// Removes one saved challenge by its index
export async function removeSavedChallenge(indexToRemove: number) {
    try {
        // Load existing saved challenges
        const existing = await getSavedChallenges();

        // Create a new array without the selected index
        const updated = existing.filter(
            (_, index) => index !== indexToRemove
        );

        // Save the updated array back to AsyncStorage
        await AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(updated)
        );
    } catch (error) {
        console.log("Error removing challenge");
    }
}