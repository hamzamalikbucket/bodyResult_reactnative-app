import React from 'react';
import {Image, StyleSheet, TextInput as RNTextInput, View} from 'react-native';
import {theme} from '../utils/Theme';
import {useTheme} from '../utils/ThemeProvider';
import {Text} from './Text';

export const InputField = ({label, error, icon, ...rest}) => {
  const {appTheme} = useTheme();
  return (
    <View style={styles.container}>
      {label ? (
        <Text variant="body1Regular16" color="black">
          {label}
        </Text>
      ) : null}
      <RNTextInput
        style={styles.input}
        placeholderTextColor={appTheme.colors.textForeground}
        {...rest}
      />
      {icon && <Image style={styles.icon} source={icon} />}
      {error ? (
        <Text color="warning" style={{fontSize: 12}}>
          {error}
        </Text>
      ) : null}
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
    height: 56,
    borderRadius: 5,
    paddingRight: 10,
    paddingLeft: 46,
    backgroundColor: theme.colors.white,
  },
  line: {
    width: '100%',
    borderColor: theme.colors.secondary,
    borderWidth: 1,
  },
  icon: {
    position: 'absolute',
    width: 24,
    height: 24,
    marginTop: 16,
    marginLeft: 12,
  },
});
