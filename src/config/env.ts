// Environment configuration for React Native/Expo
// Using process.env which works with Metro bundler and Expo

export const API_KEY =
  process.env.YOUTUBE_API_KEY ||
  process.env.REACT_APP_YOUTUBE_API_KEY ||
  'AIzaSyDcL3tvZQRX7QjgvJxzp7ltjwJkNr6-VkY'; // Fallback for development
