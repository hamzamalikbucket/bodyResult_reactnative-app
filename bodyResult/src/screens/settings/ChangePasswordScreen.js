import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Loading} from '../../components/Loading';
import {PasswordInputField} from '../../components/PasswordInputField';
import {PrimaryButton} from '../../components/PrimaryButton';
import {Spacer20, Spacer30, Spacer40} from '../../components/Spacer';
import {Text} from '../../components/Text';
import {showDialog} from '../../utils/Alert';
import Api from '../../utils/Api';
import {NavService} from '../../utils/NavService';
import {theme} from '../../utils/Theme';

const ChangePasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!password) {
      showDialog({message: 'Enter password'});
      return;
    }
    if (password != cPassword) {
      showDialog({message: 'Password did not match'});
      return;
    }
    try {
      const id = await AsyncStorage.getItem('userId');
      setLoading(true);
      const params = {
        password: password,
        user_id: id,
      };
      const res = await Api.post(`changePassword`, params);
      console.log('response', res.data);
      showDialog({message: 'Password updated successfully'});
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="h2Regular24" fontWeight={'600'}>
        Change Password
      </Text>
      <Text variant="body2Regular14" style={{textAlign: 'center'}}>
        Set the new password for your account
      </Text>
      <Spacer30 />
      <PasswordInputField
        placeholder="Password"
        onChangeText={setPassword}
        icon={require('../../assets/images/lock.png')}
      />
      <Spacer20 />
      <PasswordInputField
        placeholder="Confirm Password"
        onChangeText={setCPassword}
        icon={require('../../assets/images/lock.png')}
      />
      <Spacer40 />
      <PrimaryButton onPress={handleSubmit} title="Reset Password" />
      {loading && <Loading />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '40%',
    paddingHorizontal: theme.spacing.appPadding,
  },
});
export default ChangePasswordScreen;
