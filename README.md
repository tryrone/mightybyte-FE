# YouTube Clone - MightyByte Frontend Challenge

A React Native Web application that mimics YouTube's homepage video grid UI with hover effects, infinite scrolling, and responsive design.

## Features

- ✅ YouTube-like video grid layout
- ✅ Hover effects with video popup (mimics old YouTube behavior)
- ✅ Infinite scrolling with pagination
- ✅ Responsive design (1-4 columns based on screen width)
- ✅ YouTube-style header with search functionality
- ✅ Real YouTube Data API v3 integration
- ✅ Pull-to-refresh functionality
- ✅ Loading states and error handling
- ✅ Mobile-friendly (hover effects disabled on mobile)

## Setup Instructions

### 1. Get YouTube API Key

1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select an existing one
3. Enable the **YouTube Data API v3**
4. Create credentials → Create API Key
5. Copy your API key

### 2. Configure Environment

1. Open the `.env` file in the project root
2. Replace `YOUR_API_KEY_HERE` with your actual YouTube API key:
   ```
   REACT_APP_YOUTUBE_API_KEY=your_actual_api_key_here
   ```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm start
```

The app will open in your browser at `http://localhost:3000`

## Technical Implementation

### Architecture

- **React Native Web**: Allows React Native code to run in browsers
- **TypeScript**: Type-safe development
- **React Query**: Efficient data fetching and caching (optional, using native fetch)
- **YouTube Data API v3**: Real video data

### Key Components

- `VideoCard`: Individual video cards with hover effects and popups
- `VideoGrid`: Infinite scrolling grid layout
- `Header`: YouTube-style header with search
- `Home`: Main screen layout

### Hover Popup Behavior

The hover popup mimics the old YouTube behavior:

- Appears after 500ms hover delay
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

- The app uses React Native Web, so you can write React Native code that runs in browsers
- Hover effects are automatically disabled on mobile devices
- The popup behavior matches the old YouTube design as requested
- All styling uses React Native's StyleSheet API
- No external UI libraries used (as per requirements)

## Troubleshooting

### API Key Issues

- Make sure your API key is correctly set in `.env`
- Ensure YouTube Data API v3 is enabled in Google Cloud Console
- Check browser console for API error messages

### Performance

- The app loads 25 videos per page for optimal performance
- Images are lazy-loaded by React Native's Image component
- Hover timeouts are properly cleaned up to prevent memory leaks

## Demo

The app demonstrates:

1. **Video Grid**: Responsive layout with real YouTube videos
2. **Hover Effects**: Scale animation + popup with video details
3. **Infinite Scroll**: Automatic loading of more videos
4. **Search**: Dynamic search with real-time results
5. **Mobile Support**: Touch-friendly without hover conflicts
