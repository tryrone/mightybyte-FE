import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  StatusBar,
} from 'react-native';
import {useDebounceHook} from '../hooks';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({onSearch}) => {
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('react native');

  const handleSearchPress = () => {
    setIsSearchMode(true);
  };

  const handleSearchCancel = () => {
    setIsSearchMode(false);
  };

  const handleSearchSubmit = () => {
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setIsSearchMode(false);
    }
  };

  const debouncedSearchQuery = useDebounceHook(searchQuery, 500);

  useEffect(() => {
    if (debouncedSearchQuery) {
      onSearch?.(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery]);

  if (isSearchMode) {
    return (
      <View style={styles.searchModeContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.searchModeHeader}>
          <Pressable style={styles.backButton} onPress={handleSearchCancel}>
            <View style={styles.backArrow} />
          </Pressable>
          <TextInput
            style={styles.searchModeInput}
            placeholder="Search YouTube"
            placeholderTextColor="#606060"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
            autoFocus
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Left Section - Logo */}
      <View style={styles.leftSection}>
        <View style={styles.youtubeLogoContainer}>
          <View style={styles.youtubeLogo}>
            <View style={styles.playIconContainer}>
              <View style={styles.playTriangle} />
            </View>
          </View>
          <Text style={styles.youtubeText}>YouTube</Text>
        </View>
      </View>

      {/* Right Section - Icons */}
      <View style={styles.rightSection}>
        <Pressable style={styles.headerIconButton} onPress={handleSearchPress}>
          <View style={styles.searchIcon}>
            <View style={styles.searchCircle} />
            <View style={styles.searchHandle} />
          </View>
        </Pressable>

        <Pressable style={styles.headerIconButton}>
          <View style={styles.moreIcon}>
            <View style={styles.moreDot} />
            <View style={styles.moreDot} />
            <View style={styles.moreDot} />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Main header container
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10, // Account for status bar
    paddingBottom: 8,
    backgroundColor: '#fff',
    height: 56, // Taller on iOS for status bar
    borderBottomWidth: 0.5,
    borderBottomColor: '#e5e5e5',
  },

  // Left section - YouTube logo
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  youtubeLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  youtubeLogo: {
    width: 32,
    height: 22,
    backgroundColor: '#FF0000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  playIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  playTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderLeftColor: '#fff',
    borderTopWidth: 6,
    borderTopColor: 'transparent',
    borderBottomWidth: 6,
    borderBottomColor: 'transparent',
    marginLeft: 2,
  },
  youtubeText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#030303',
    letterSpacing: -0.8,
  },

  // Right section - Icons
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },

  // Search icon
  searchIcon: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchCircle: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderColor: '#606060',
    borderRadius: 8,
    position: 'absolute',
  },
  searchHandle: {
    width: 8,
    height: 2,
    backgroundColor: '#606060',
    position: 'absolute',
    bottom: 2,
    right: 2,
    transform: [{rotate: '45deg'}],
  },

  // More options icon (3 dots)
  moreIcon: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 18,
  },
  moreDot: {
    width: 4,
    height: 4,
    backgroundColor: '#606060',
    borderRadius: 2,
    marginVertical: 1,
  },

  // Profile section
  profileContainer: {
    marginLeft: 8,
  },
  profileAvatar: {
    width: 32,
    height: 32,
    backgroundColor: '#FF6B35',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  // Search mode styles
  searchModeContainer: {
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  searchModeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 50,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e5e5e5',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  backArrow: {
    width: 0,
    height: 0,
    borderRightWidth: 8,
    borderRightColor: '#606060',
    borderTopWidth: 6,
    borderTopColor: 'transparent',
    borderBottomWidth: 6,
    borderBottomColor: 'transparent',
  },
  searchModeInput: {
    flex: 1,
    fontSize: 16,
    color: '#030303',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    marginRight: 8,
  },
  micButtonSearch: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Microphone icon
  micIcon: {
    width: 14,
    height: 18,
    alignItems: 'center',
  },
  micBody: {
    width: 10,
    height: 12,
    backgroundColor: '#606060',
    borderRadius: 5,
    marginBottom: 2,
  },
  micBase: {
    width: 14,
    height: 2,
    backgroundColor: '#606060',
    borderRadius: 1,
  },
});

export default Header;
