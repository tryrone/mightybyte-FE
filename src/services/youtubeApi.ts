import {YouTubeSearchResponse} from '../types/youtube';
import {API_KEY} from '../config/env';

const API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

export interface SearchVideosParams {
  query?: string;
  maxResults?: number;
  pageToken?: string;
}

export const searchVideos = async ({
  query = 'programming',
  maxResults = 25,
  pageToken,
}: SearchVideosParams = {}): Promise<YouTubeSearchResponse> => {
  console.log('API_KEY check:', API_KEY ? 'Found' : 'Not found');

  if (!API_KEY) {
    throw new Error(
      'YouTube API key is not configured. Please set YOUTUBE_API_KEY or REACT_APP_YOUTUBE_API_KEY in your .env file.',
    );
  }

  const params = new URLSearchParams({
    part: 'snippet',
    type: 'video',
    q: query,
    maxResults: maxResults.toString(),
    key: API_KEY,
  });

  if (pageToken) {
    params.append('pageToken', pageToken);
  }

  const url = `${API_BASE_URL}/search?${params.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `YouTube API error: ${response.status} ${response.statusText}`,
      );
    }

    const data: YouTubeSearchResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    throw error;
  }
};

export const formatPublishDate = (publishedAt: string): string => {
  const date = new Date(publishedAt);
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
};
