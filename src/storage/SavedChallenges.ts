import AsyncStorage from "@react-native-async-storage/async-storage";
import { Challenge } from "../types/Challenge";

const STORAGE_KEY = "saved_challenges";

export async function saveChallenge(challenge: Challenge) {
    try {
        const existing = await getSavedChallenges();

        const alreadySaved = existing.some(
            (item) => item.id === challenge.id
        );

        if (alreadySaved) {
            return;
        }

        const updated = [...existing, challenge];

        await AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(updated)
        );
    } catch (error) {
        console.log("Error saving challenge");
    }
}

export async function getSavedChallenges(): Promise<Challenge[]> {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);

        if (data !== null) {
            return JSON.parse(data);
        }

        return [];
    } catch (error) {
        console.log("Error loading challenges");
        return [];
    }
}

export async function removeSavedChallenge(indexToRemove: number) {
    try {
        const existing = await getSavedChallenges();

        const updated = existing.filter(
            (_, index) => index !== indexToRemove
        );

        await AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(updated)
        );
    } catch (error) {
        console.log("Error removing challenge");
    }
}