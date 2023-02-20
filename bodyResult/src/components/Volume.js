import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {IMAGES} from '../utils/Images';
import {theme} from '../utils/Theme';
import {Text} from './Text';

export const Volume = ({title, value, onChange}) => {
  return (
    <View style={{flex: 1}}>
      <Text color="gray500" variant="body2Regular14" fontWeight="700">
        {title}
      </Text>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => {
            value = Number(value) - 1;
            onChange(value);
          }}>
          <Image style={styles.image} source={IMAGES.minus} />
        </TouchableOpacity>
        {/* <Text color="black" variant="body1Regular16" fontWeight="700">
          {value}
        </Text> */}
        <TextInput
          value={`${value}`}
          onChangeText={onChange}
          keyboardType="decimal-pad"
          selectTextOnFocus
          style={{
            height: 48,
            fontSize: 16,
            textAlign: 'center',
          }}
        />
        <TouchableOpacity
          onPress={() => {
            value = Number(value) + 1;
            onChange(value);
          }}>
          <Image style={styles.image} source={IMAGES.plus} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    height: 48,
    flexDirection: 'row',
    backgroundColor: theme.colors.primary500,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginTop: 12,
  },
  image: {width: 20, height: 20},
});
