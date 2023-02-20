import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {theme} from '../utils/Theme';

export const Loading = () => {
  return (
    <ActivityIndicator
      style={styles.progress}
      size="large"
      color={theme.colors.pink}
    />
  );
};

const styles = StyleSheet.create({
  progress: {
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
