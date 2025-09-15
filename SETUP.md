# React Native Setup Guide

This project has been converted from a React web app to a React Native TypeScript application.

## Initial Project Setup

Since this project doesn't include the native iOS and Android folders (which are typically large), you'll need to initialize them:

### Method 1: Using React Native CLI (Recommended)

1. **Install React Native CLI globally**:
   ```bash
   npm install -g @react-native-community/cli
   ```

2. **Initialize native projects**:
   ```bash
   # This will create ios/ and android/ directories
   npx react-native init MightyByteApp --template react-native-template-typescript
   
   # Then copy our source code over:
   # Copy src/ folder to the new project
   # Copy package.json dependencies
   # Copy configuration files (metro.config.js, babel.config.js, etc.)
   ```

### Method 2: Using Expo (Alternative)

If you prefer Expo for easier development:

1. **Install Expo CLI**:
   ```bash
   npm install -g @expo/cli
   ```

2. **Initialize Expo project**:
   ```bash
   npx create-expo-app MightyByteApp --template blank-typescript
   ```

3. **Install React Native dependencies** and copy the source code.

## Current Project Structure

The current project includes:

- ✅ **Source Code**: All React Native TypeScript components
- ✅ **Configuration**: Metro, Babel, ESLint, TypeScript configs
- ✅ **Package.json**: React Native dependencies and scripts
- ❌ **iOS Project**: Needs to be generated
- ❌ **Android Project**: Needs to be generated

## Key Files Configured

- `metro.config.js` - Metro bundler configuration
- `babel.config.js` - Babel transpilation setup
- `tsconfig.json` - TypeScript configuration for React Native
- `.eslintrc.js` - ESLint rules for React Native
- `jest.config.js` - Jest testing configuration
- `react-native.config.js` - React Native project configuration
- `.prettierrc.js` - Code formatting rules
- `.gitignore` - Ignores React Native specific files

## Environment Variables

1. Copy `env.example` to `.env`
2. Add your YouTube API key:
   ```
   YOUTUBE_API_KEY=your_youtube_api_key_here
   ```

## Dependencies Added

- React Native 0.72.6
- TypeScript 4.8.4
- React 18.2.0
- React Query for data fetching
- All necessary dev dependencies

## Next Steps

1. Choose your setup method (React Native CLI or Expo)
2. Initialize the native projects
3. Copy the configured source code
4. Install dependencies with `yarn install`
5. Set up your development environment
6. Run the app with `yarn ios` or `yarn android`

## Development Commands

Once set up, you can use:

```bash
# Start Metro bundler
yarn start

# Run on iOS simulator (macOS only)
yarn ios

# Run on Android emulator
yarn android

# Type checking
yarn type-check

# Linting
yarn lint

# Testing
yarn test
```