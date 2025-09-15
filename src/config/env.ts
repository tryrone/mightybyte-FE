// Environment configuration
declare const process: {
  env: {
    REACT_APP_YOUTUBE_API_KEY?: string;
    [key: string]: string | undefined;
  };
};

export const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
