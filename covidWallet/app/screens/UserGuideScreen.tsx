import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const UserGuideScreen = () => {
  return (
    <WebView
      source={{ uri: 'https://www.youtube.com/watch?v=qN4ooNx77u0&list=RDtt2k8PGm-TI&index=2' }}
      style={styles.container}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default UserGuideScreen;
