import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {InputField} from '../../components/InputField';
import {Loading} from '../../components/Loading';
import {PasswordInputField} from '../../components/PasswordInputField';
import {PrimaryButton} from '../../components/PrimaryButton';
import {Spacer20, Spacer30, Spacer40} from '../../components/Spacer';
import {Text} from '../../components/Text';
import {showDialog} from '../../utils/Alert';
import Api from '../../utils/Api';
import {NavService} from '../../utils/NavService';
import {theme} from '../../utils/Theme';

const ChangeEmailScreen = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      showDialog({message: 'Enter email'});
      return;
    }
    if (!password) {
      showDialog({message: 'Enter password'});
      return;
    }
    try {
      const id = await AsyncStorage.getItem('userId');
      setLoading(true);
      const params = {
        password: password,
        email: email,
        user_id: id,
      };
      const res = await Api.post(`changeEmail`, params);
      console.log('response', res.data);
      if (res?.data?.success == false) {
        showDialog({message: res?.data?.message});
      } else {
        showDialog({message: 'Email updated successfully'});
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="h2Regular24" fontWeight={'600'}>
        Change Email
      </Text>
      <Text variant="body2Regular14" style={{textAlign: 'center'}}>
        Set the new email for your account
      </Text>
      <Spacer30 />
      <InputField
        placeholder="Email"
        onChangeText={setEmail}
        icon={require('../../assets/images/message.png')}
        keyboardType="email-address"
      />
      <Spacer20 />
      <PasswordInputField
        placeholder="Enter Password"
        onChangeText={setPassword}
        icon={require('../../assets/images/lock.png')}
      />
      <Spacer40 />
      <PrimaryButton onPress={handleSubmit} title="Change Email" />
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
export default ChangeEmailScreen;
