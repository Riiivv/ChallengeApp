// Imports the Challenge type/model
import { Challenge } from "../types/Challenge";

// Imports local fallback challenges in case the API fails
import { fallbackChallenges } from "../data/fallbackChallenges";

// API endpoint used to get random challenges
const API_URL = "https://bored-api.appbrewery.com/random";

// Async function that returns one Challenge object
export async function getRandomChallenge(): Promise<Challenge> {
    try {
        // Sends a request to the API
        const response = await fetch(API_URL);

        // If the API response is not OK, throw an error
        if (!response.ok) {
            throw new Error("API request failed");
        }

        // Converts the API response into JSON data
        const data = await response.json();

        // Converts the API data into my own Challenge structure
        return {
            id: data.key ?? Date.now().toString(),
            title: data.activity ?? "Try something new today",
            category: data.type ?? "general",
        };
    } catch (error) {
        // If the API fails, choose a random fallback challenge instead
        const randomIndex = Math.floor(Math.random() * fallbackChallenges.length);
        return fallbackChallenges[randomIndex];
    }
}