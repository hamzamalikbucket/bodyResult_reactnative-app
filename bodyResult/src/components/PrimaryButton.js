import React from 'react';
import {ActivityIndicator, Image, Pressable, StyleSheet} from 'react-native';
import {theme} from '../utils/Theme';
import {Text} from './Text';

export const PrimaryButton = props => {
  return (
    <Pressable
      style={styles.button}
      onPress={!props.loading ? props.onPress : undefined}>
      <Image
        style={{
          height: 48,
          width: '100%',
          resizeMode: 'cover',
          position: 'absolute',
        }}
        source={require('../assets/images/button.png')}
      />
      {!props.loading ? (
        <Text color="white" variant="body1Regular16" fontWeight="700">
          {props.title}
        </Text>
      ) : (
        <ActivityIndicator color="white" size="large" />
      )}
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 11,
  },
});
