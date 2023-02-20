import React from 'react';
import {Image, View, StyleSheet, Pressable} from 'react-native';
import {IMAGES} from '../utils/Images';
import {NavService} from '../utils/NavService';
import {Text} from './Text';

export const Toolbar = ({title, back = true}) => {
  return (
    <View style={styles.container}>
      {back && (
        <Pressable onPress={() => NavService.goBack()} style={styles.back}>
          <Image style={styles.image} source={IMAGES.BACK} />
        </Pressable>
      )}
      <Text variant="h2Regular20" fontWeight="700">
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginTop: 40, alignItems: 'center', justifyContent: 'center'},
  back: {position: 'absolute', left: 0},
  image: {width: 32, height: 32},
});
