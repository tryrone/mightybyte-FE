import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("programming");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = () => {
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleSearchSubmit = () => {
    handleSearch();
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {/* Menu Icon */}
        <Pressable style={styles.menuButton}>
          <View style={styles.menuIcon}>
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </View>
        </Pressable>

        {/* YouTube Logo */}
        <Pressable style={styles.logoContainer}>
          <View style={styles.logo}>
            <View style={styles.playButton}>
              <View style={styles.playIcon} />
            </View>
            <Text style={styles.logoText}>YouTube</Text>
          </View>
        </Pressable>
      </View>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <View
          style={[
            styles.searchContainer,
            isSearchFocused && styles.searchContainerFocused,
          ]}
        >
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#909090"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
          />
        </View>
        <Pressable style={styles.searchButton} onPress={handleSearch}>
          <View style={styles.searchIcon}>
            <View style={styles.searchIconCircle} />
            <View style={styles.searchIconHandle} />
          </View>
        </Pressable>
        <Pressable style={styles.micButton}>
          <View style={styles.micIcon}>
            <View style={styles.micBody} />
            <View style={styles.micBase} />
          </View>
        </Pressable>
      </View>

      {/* Right Section */}
      <View style={styles.rightSection}>
        <Pressable style={styles.iconButton}>
          <View style={styles.createIcon}>
            <View style={styles.createIconPlus} />
          </View>
        </Pressable>
        <Pressable style={styles.iconButton}>
          <View style={styles.notificationIcon}>
            <View style={styles.bellShape} />
            <View style={styles.bellClapper} />
          </View>
        </Pressable>
        <Pressable style={styles.profileButton}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileText}>U</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    height: 56,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: screenWidth > 768 ? 0 : 1,
  },
  menuButton: {
    padding: 8,
    marginRight: 8,
  },
  menuIcon: {
    width: 18,
    height: 14,
    justifyContent: "space-between",
  },
  menuLine: {
    width: "100%",
    height: 2,
    backgroundColor: "#030303",
  },
  logoContainer: {
    marginLeft: 8,
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
  },
  playButton: {
    width: 24,
    height: 17,
    backgroundColor: "#ff0000",
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  playIcon: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderLeftColor: "#fff",
    borderTopWidth: 4,
    borderTopColor: "transparent",
    borderBottomWidth: 4,
    borderBottomColor: "transparent",
    marginLeft: 2,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "400",
    color: "#030303",
    letterSpacing: -0.5,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: screenWidth > 768 ? 1 : 0,
    maxWidth: 640,
    marginHorizontal: 40,
  },
  searchContainer: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  searchContainerFocused: {
    borderColor: "#1c62b9",
    shadowColor: "#1c62b9",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#030303",
  },
  searchButton: {
    width: 64,
    height: 40,
    backgroundColor: "#f8f8f8",
    borderWidth: 1,
    borderColor: "#ccc",
    borderLeftWidth: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -1,
  },
  searchIcon: {
    width: 20,
    height: 20,
    position: "relative",
  },
  searchIconCircle: {
    width: 14,
    height: 14,
    borderWidth: 2,
    borderColor: "#030303",
    borderRadius: 7,
    position: "absolute",
    top: 0,
    left: 0,
  },
  searchIconHandle: {
    width: 6,
    height: 2,
    backgroundColor: "#030303",
    position: "absolute",
    bottom: 2,
    right: 2,
    transform: [{ rotate: "45deg" }],
  },
  micButton: {
    width: 40,
    height: 40,
    backgroundColor: "#f8f8f8",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  micIcon: {
    width: 12,
    height: 16,
    alignItems: "center",
  },
  micBody: {
    width: 8,
    height: 10,
    backgroundColor: "#030303",
    borderRadius: 4,
  },
  micBase: {
    width: 12,
    height: 2,
    backgroundColor: "#030303",
    marginTop: 2,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  createIcon: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  createIconPlus: {
    width: 16,
    height: 2,
    backgroundColor: "#030303",
    position: "relative",
  },
  notificationIcon: {
    width: 20,
    height: 20,
    position: "relative",
  },
  bellShape: {
    width: 16,
    height: 14,
    borderWidth: 2,
    borderColor: "#030303",
    borderBottomWidth: 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    position: "absolute",
    top: 2,
    left: 2,
  },
  bellClapper: {
    width: 4,
    height: 4,
    backgroundColor: "#030303",
    borderRadius: 2,
    position: "absolute",
    bottom: 0,
    left: 8,
  },
  profileButton: {
    marginLeft: 8,
  },
  profileIcon: {
    width: 32,
    height: 32,
    backgroundColor: "#ff6b35",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default Header;
