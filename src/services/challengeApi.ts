import { Challenge } from "../types/Challenge";
import { fallbackChallenges } from "../data/fallbackChallenges";

const API_URL = "https://bored-api.appbrewery.com/random";

export async function getRandomChallenge(): Promise<Challenge> {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("API request failed");
        }

        const data = await response.json();

        return {
            id: data.key ?? Date.now().toString(),
            title: data.activity ?? "Try something new today",
            category: data.type ?? "general",
        };
    } catch (error) {
        const randomIndex = Math.floor(Math.random() * fallbackChallenges.length);
        return fallbackChallenges[randomIndex];
    }
}