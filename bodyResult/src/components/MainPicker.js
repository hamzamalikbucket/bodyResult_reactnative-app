import React, {useState} from 'react';
import {StyleSheet, TextInput as RNTextInput, View} from 'react-native';
import {theme} from '../utils/Theme';
import {Text} from './Text';
import {Picker as RnPicker} from '@react-native-picker/picker';
export const MainPicker = props => {
  return (
    <View style={styles.container}>
      {props.label ? (
        <Text variant="body2Regular14" color="gray500" fontWeight="700">
          {'Select ' + props.label}
        </Text>
      ) : null}
      <View style={styles.input}>
        <RnPicker
          dropdownIconColor={theme.colors.primary}
          style={{fontSize: 12}}
          selectedValue={props.selected}
          onValueChange={(itemValue, itemIndex) => props.onChange(itemValue)}>
          {props.label && (
            <RnPicker.Item
              style={{fontSize: 12}}
              color="#535262"
              label={`${props.label} ...`}
              value=""
            />
          )}
          {props?.list?.map(item => (
            <RnPicker.Item
              style={{fontSize: 12}}
              label={item.name}
              value={item}
            />
          ))}
        </RnPicker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    ...theme.textVariants.inputMedium14,
    width: '100%',
    height: 48,
    borderRadius: 5,
    backgroundColor: theme.colors.primary500,
    marginTop: 12,
  },
  line: {
    width: '100%',
    borderColor: theme.colors.secondary,
    borderWidth: 1,
  },
});
