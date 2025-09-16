import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../components/Header';
import VideoGrid from '../components/VideoGrid';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
});

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('react native');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <View style={styles.container}>
      <Header onSearch={handleSearch} />
      <View style={styles.content}>
        <VideoGrid searchQuery={searchQuery} />
      </View>
    </View>
  );
};

export default Home;
