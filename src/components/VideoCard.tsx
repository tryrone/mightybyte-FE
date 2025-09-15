import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
} from "react-native";
import { YouTubeVideo } from "../types/youtube";
import { formatPublishDate } from "../services/youtubeApi";

interface VideoCardProps {
  video: YouTubeVideo;
  onPress?: () => void;
}

const { width: screenWidth } = Dimensions.get("window");
const CARD_MARGIN = 8;
const CARDS_PER_ROW =
  screenWidth > 1200 ? 4 : screenWidth > 800 ? 3 : screenWidth > 500 ? 2 : 1;
const CARD_WIDTH =
  (screenWidth - (CARDS_PER_ROW + 1) * CARD_MARGIN * 2) / CARDS_PER_ROW;

const VideoCard: React.FC<VideoCardProps> = ({ video, onPress }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const popupOpacity = useRef(new Animated.Value(0)).current;
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleHoverIn = () => {
    setIsHovered(true);

    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // Start hover animation immediately
    Animated.spring(scaleAnim, {
      toValue: 1.05,
      useNativeDriver: true,
      tension: 300,
      friction: 20,
    }).start();

    // Show popup after delay (like YouTube)
    hoverTimeoutRef.current = setTimeout(() => {
      setShowPopup(true);
      Animated.timing(popupOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }, 500);
  };

  const handleHoverOut = () => {
    setIsHovered(false);
    setShowPopup(false);

    // Clear timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    // Reset animations
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 300,
        friction: 20,
      }),
      Animated.timing(popupOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.card, { transform: [{ scale: scaleAnim }] }]}
      >
        <Pressable
          onPress={onPress}
          onPressIn={handleHoverIn}
          onPressOut={handleHoverOut}
          style={styles.pressable}
        >
          {/* Main Card Content */}
          <View style={styles.thumbnailContainer}>
            <Image
              source={{ uri: video.snippet.thumbnails.medium.url }}
              style={styles.thumbnail}
              resizeMode="cover"
            />
            <View style={styles.duration}>
              <Text style={styles.durationText}>0:00</Text>
            </View>
          </View>

          <View style={styles.videoInfo}>
            <Text style={styles.title} numberOfLines={2}>
              {video.snippet.title}
            </Text>
            <Text style={styles.channelName} numberOfLines={1}>
              {video.snippet.channelTitle}
            </Text>
            <Text style={styles.publishDate}>
              {formatPublishDate(video.snippet.publishedAt)}
            </Text>
          </View>

          {/* Hover Popup */}
          {showPopup && (
            <Animated.View
              style={[
                styles.popup,
                {
                  opacity: popupOpacity,
                },
              ]}
            >
              <View style={styles.popupContent}>
                <Image
                  source={{ uri: video.snippet.thumbnails.high.url }}
                  style={styles.popupThumbnail}
                  resizeMode="cover"
                />
                <View style={styles.popupInfo}>
                  <Text style={styles.popupTitle} numberOfLines={3}>
                    {video.snippet.title}
                  </Text>
                  <Text style={styles.popupChannel}>
                    {video.snippet.channelTitle}
                  </Text>
                  <Text style={styles.popupDescription} numberOfLines={4}>
                    {video.snippet.description}
                  </Text>
                  <Text style={styles.popupDate}>
                    {formatPublishDate(video.snippet.publishedAt)}
                  </Text>
                </View>
              </View>
            </Animated.View>
          )}
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    margin: CARD_MARGIN,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pressable: {
    position: "relative",
  },
  thumbnailContainer: {
    position: "relative",
    width: "100%",
    aspectRatio: 16 / 9,
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  duration: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  videoInfo: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0f0f0f",
    lineHeight: 20,
    marginBottom: 4,
  },
  channelName: {
    fontSize: 13,
    color: "#606060",
    marginBottom: 2,
  },
  publishDate: {
    fontSize: 13,
    color: "#606060",
  },
  popup: {
    position: "absolute",
    top: -20,
    left: -20,
    right: -20,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    zIndex: 1000,
    minWidth: 320,
    maxWidth: 400,
  },
  popupContent: {
    padding: 16,
  },
  popupThumbnail: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 8,
    marginBottom: 12,
  },
  popupInfo: {
    gap: 6,
  },
  popupTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f0f0f",
    lineHeight: 22,
  },
  popupChannel: {
    fontSize: 14,
    color: "#606060",
    fontWeight: "500",
  },
  popupDescription: {
    fontSize: 13,
    color: "#606060",
    lineHeight: 18,
    marginTop: 4,
  },
  popupDate: {
    fontSize: 12,
    color: "#909090",
    marginTop: 4,
  },
});

export default VideoCard;
