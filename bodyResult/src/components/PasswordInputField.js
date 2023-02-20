import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';

import {InputField} from './InputField';
import {Text} from './Text';

export const PasswordInputField = ({label, error, icon, ...rest}) => {
  const [securePassword, setSecurePassword] = useState(true);
  return (
    <View style={styles.container}>
      <InputField
        {...rest}
        secureTextEntry={securePassword}
        label={label}
        icon={icon}
        error={error}
      />
      <View style={styles.showPasswordContainer}>
        <TouchableOpacity onPress={() => setSecurePassword(prev => !prev)}>
          <Image
            resizeMode={'contain'}
            style={styles.imgPassword}
            source={
              securePassword
                ? require('../assets/images/show_icon.png')
                : require('../assets/images/hide.png')
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
  },
  showPasswordContainer: {position: 'absolute', right: 0, alignItems: 'center'},
  imgPassword: {width: 24, height: 24, marginTop: 16, marginRight: 10},
});
