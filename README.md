# YouTube Clone - MightyByte React Native Challenge

A React Native TypeScript application that mimics YouTube's homepage video grid UI with touch interactions, infinite scrolling, and responsive design.

## Features

- ✅ YouTube-like video grid layout
- ✅ Touch interactions with video popup (mimics YouTube behavior)
- ✅ Infinite scrolling with pagination
- ✅ Responsive design (1-4 columns based on screen width)
- ✅ YouTube-style header with search functionality
- ✅ Real YouTube Data API v3 integration
- ✅ Pull-to-refresh functionality
- ✅ Loading states and error handling
- ✅ Native mobile experience

## Setup Instructions

### 1. Get YouTube API Key

1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select an existing one
3. Enable the **YouTube Data API v3**
4. Create credentials → Create API Key
5. Copy your API key

### 2. Configure Environment

1. Copy `env.example` to `.env` in the project root
2. Replace `your_youtube_api_key_here` with your actual YouTube API key:
   ```
   YOUTUBE_API_KEY=your_actual_api_key_here
   ```

### 3. Install Dependencies

```bash
# Using Yarn (recommended)
yarn install

# Or using npm
npm install
```

### 4. Start Development Server

For React Native development, you'll need to set up the development environment:

#### iOS (macOS only)

```bash
# Install iOS dependencies
cd ios && pod install && cd ..

# Start Metro bundler
yarn start

# In a new terminal, run iOS simulator
yarn ios
```

#### Android

```bash
# Start Metro bundler
yarn start

# In a new terminal, run Android emulator
yarn android
```

### 5. Development Environment Setup

Make sure you have the React Native development environment set up:

- **Node.js** (v16 or newer)
- **Watchman** (for file watching)
- **Xcode** (for iOS development on macOS)
- **Android Studio** (for Android development)
- **Java Development Kit (JDK)**

See [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) for detailed instructions.

## Technical Implementation

### Architecture

- **React Native**: Native mobile application framework
- **TypeScript**: Type-safe development
- **React Query**: Efficient data fetching and caching
- **YouTube Data API v3**: Real video data
- **Metro**: React Native bundler

### Key Components

- `VideoCard`: Individual video cards with hover effects and popups
- `VideoGrid`: Infinite scrolling grid layout
- `Header`: YouTube-style header with search
- `Home`: Main screen layout

### Touch Interaction Behavior

The touch interaction popup mimics YouTube's mobile behavior:

- Appears when pressing on video cards
- Shows larger thumbnail and video details
- Smooth fade-in/out animations
- Positioned above the card with shadow

### Responsive Design

- **Mobile (≤500px)**: 1 column
- **Tablet (501-800px)**: 2 columns
- **Desktop (801-1200px)**: 3 columns
- **Large Desktop (>1200px)**: 4 columns

### API Integration

- Search endpoint: `/youtube/v3/search`
- Parameters: `part=snippet`, `type=video`, `q=programming`
- Pagination with `nextPageToken`
- 25 videos per request

## File Structure

```
src/
├── components/
│   ├── Header.tsx          # YouTube-style header
│   ├── VideoCard.tsx       # Individual video card with hover
│   ├── VideoGrid.tsx       # Grid layout with infinite scroll
│   └── Logo.tsx           # Original logo component
├── screens/
│   └── home.tsx           # Main home screen
├── services/
│   └── youtubeApi.ts      # API service layer
├── types/
│   └── youtube.ts         # TypeScript interfaces
└── assets/
    └── snack-icon.png     # Original icon
```

## Notes

- This is a pure React Native application for mobile devices
- Touch interactions replace hover effects for mobile-first experience
- The popup behavior matches YouTube's mobile design patterns
- All styling uses React Native's StyleSheet API
- No external UI libraries used for components

## Troubleshooting

### API Key Issues

- Make sure your API key is correctly set in `.env`
- Ensure YouTube Data API v3 is enabled in Google Cloud Console
- Check Metro bundler console for API error messages

### Performance

- The app loads 25 videos per page for optimal performance
- Images are lazy-loaded by React Native's Image component
- Hover timeouts are properly cleaned up to prevent memory leaks

## Demo

The app demonstrates:

1. **Video Grid**: Responsive layout with real YouTube videos
2. **Touch Interactions**: Scale animation + popup with video details
3. **Infinite Scroll**: Automatic loading of more videos
4. **Search**: Dynamic search with real-time results
5. **Native Mobile Experience**: Touch-optimized interface
