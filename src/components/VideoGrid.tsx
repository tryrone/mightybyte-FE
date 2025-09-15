import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Text,
  RefreshControl,
  Dimensions,
} from "react-native";
import { YouTubeVideo } from "../types/youtube";
import { searchVideos } from "../services/youtubeApi";
import VideoCard from "./VideoCard";

const { width: screenWidth } = Dimensions.get("window");

interface VideoGridProps {
  searchQuery?: string;
}

const VideoGrid: React.FC<VideoGridProps> = ({
  searchQuery = "programming",
}) => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>();
  const [hasMore, setHasMore] = useState(true);

  const loadVideos = useCallback(
    async (pageToken?: string, isRefresh = false) => {
      if (loading) return;

      try {
        setLoading(true);
        setError(null);

        const response = await searchVideos({
          query: searchQuery,
          maxResults: 25,
          pageToken,
        });

        if (isRefresh) {
          setVideos(response.items);
        } else {
          setVideos((prev) => [...prev, ...response.items]);
        }

        setNextPageToken(response.nextPageToken);
        setHasMore(!!response.nextPageToken);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load videos");
        console.error("Error loading videos:", err);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [searchQuery, loading]
  );

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setNextPageToken(undefined);
    setHasMore(true);
    loadVideos(undefined, true);
  }, [loadVideos]);

  const handleLoadMore = useCallback(() => {
    if (hasMore && !loading && nextPageToken) {
      loadVideos(nextPageToken);
    }
  }, [hasMore, loading, nextPageToken, loadVideos]);

  const handleScroll = useCallback(
    (event: any) => {
      const { layoutMeasurement, contentOffset, contentSize } =
        event.nativeEvent;
      const paddingToBottom = 200; // Load more when 200px from bottom

      if (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
      ) {
        handleLoadMore();
      }
    },
    [handleLoadMore]
  );

  useEffect(() => {
    loadVideos(undefined, true);
  }, [searchQuery]);

  const renderVideoGrid = () => {
    const cardsPerRow =
      screenWidth > 1200
        ? 4
        : screenWidth > 800
        ? 3
        : screenWidth > 500
        ? 2
        : 1;
    const rows: YouTubeVideo[][] = [];

    for (let i = 0; i < videos.length; i += cardsPerRow) {
      rows.push(videos.slice(i, i + cardsPerRow));
    }

    return rows.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((video) => (
          <VideoCard
            key={video.id.videoId}
            video={video}
            onPress={() => {
              // Handle video press - could open video player or navigate
              console.log("Video pressed:", video.snippet.title);
            }}
          />
        ))}
      </View>
    ));
  };

  if (error && videos.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.errorSubtext}>
          Make sure you have set your YouTube API key in the .env file
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#ff0000"]}
            tintColor="#ff0000"
          />
        }
      >
        {renderVideoGrid()}

        {loading && videos.length > 0 && (
          <View style={styles.loadingMore}>
            <ActivityIndicator size="large" color="#ff0000" />
            <Text style={styles.loadingText}>Loading more videos...</Text>
          </View>
        )}

        {!hasMore && videos.length > 0 && (
          <View style={styles.endMessage}>
            <Text style={styles.endMessageText}>No more videos to load</Text>
          </View>
        )}
      </ScrollView>

      {loading && videos.length === 0 && (
        <View style={styles.initialLoading}>
          <ActivityIndicator size="large" color="#ff0000" />
          <Text style={styles.loadingText}>Loading videos...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  errorText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#d93025",
    textAlign: "center",
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    color: "#606060",
    textAlign: "center",
    lineHeight: 20,
  },
  initialLoading: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  loadingMore: {
    padding: 20,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: "#606060",
  },
  endMessage: {
    padding: 20,
    alignItems: "center",
  },
  endMessageText: {
    fontSize: 14,
    color: "#909090",
  },
});

export default VideoGrid;
