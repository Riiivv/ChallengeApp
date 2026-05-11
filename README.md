# ChallengeMe

ChallengeMe is a cross-platform daily challenge app built with React Native, TypeScript and Expo.

## Features

- Random daily challenges
- Web API integration
- Async API calls
- Fallback challenges if API fails
- Save favorite challenges
- Local storage with AsyncStorage
- Remove saved challenges
- Shake sensor using accelerometer
- Bottom tab navigation
- Detail screen
- Responsive design
- Dark mode with saved preference

## Technologies

- React Native
- TypeScript
- Expo
- React Navigation
- AsyncStorage
- Expo Sensors

## API

The app uses:

https://bored-api.appbrewery.com/random

On web, the API may be blocked by CORS, so fallback challenges are used.
On mobile with Expo Go, the API works correctly.

## Screens

- Home
- Challenges
- Saved
- Settings
- Challenge Detail

## Run project

```bash
npm install
npx expo start