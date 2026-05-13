// Imports the Challenge type so every fallback challenge has the correct structure
import { Challenge } from "../types/Challenge";

// Local backup data used if the API does not work
export const fallbackChallenges: Challenge[] = [
    {
        id: "1",
        title: "Go for a walk",
        category: "health",
    },
    {
        id: "2",
        title: "Drink a glass of water",
        category: "health",
},
    {
        id: "3",
        title: "Call a friend",
        category: "social",
    },
];