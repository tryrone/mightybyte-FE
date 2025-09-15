import React, { useState } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import Header from "../components/Header";
import VideoGrid from "../components/VideoGrid";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
});

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("programming");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header onSearch={handleSearch} />
      <View style={styles.content}>
        <VideoGrid searchQuery={searchQuery} />
      </View>
    </View>
  );
};

export default Home;
