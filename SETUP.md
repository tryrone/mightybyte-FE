# Quick Setup Guide

## 🚀 Getting Started

### 1. Set up your YouTube API Key

1. **Get API Key:**

   - Go to [Google Cloud Console](https://console.developers.google.com/)
   - Create/select a project
   - Enable **YouTube Data API v3**
   - Create credentials → API Key
   - Copy your API key

2. **Configure Environment:**
   - Open `.env` file in project root
   - Replace `YOUR_API_KEY_HERE` with your actual API key:
   ```
   REACT_APP_YOUTUBE_API_KEY=your_actual_api_key_here
   ```

### 2. Install & Run

```bash
npm install
npm start
```

### 3. Test Features

- ✅ **Hover Effects**: Hover over video cards to see popup
- ✅ **Infinite Scroll**: Scroll down to load more videos
- ✅ **Search**: Use search bar to find different videos
- ✅ **Responsive**: Resize window to see responsive grid

## 📱 Mobile Testing

The app works on mobile devices with touch-friendly interactions (hover effects are disabled on mobile).

## ⚠️ Troubleshooting

**API Errors?**

- Check your API key in `.env`
- Ensure YouTube Data API v3 is enabled
- Check browser console for error details

**No videos loading?**

- Verify API key is correct
- Check network connectivity
- Look for CORS issues in browser console
