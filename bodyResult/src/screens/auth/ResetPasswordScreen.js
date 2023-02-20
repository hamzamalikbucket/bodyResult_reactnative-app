import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Loading} from '../../components/Loading';
import {PasswordInputField} from '../../components/PasswordInputField';
import {PrimaryButton} from '../../components/PrimaryButton';
import {Spacer20, Spacer30, Spacer40} from '../../components/Spacer';
import {Text} from '../../components/Text';
import {EAuthScreens} from '../../navigation/AppRouts';
import {showDialog} from '../../utils/Alert';
import Api from '../../utils/Api';
import {NavService} from '../../utils/NavService';
import {theme} from '../../utils/Theme';

const ResetPasswordScreen = () => {
  const {email} = useRoute().params;
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!password) {
      showDialog({message: 'Enter new password'});
      return;
    }
    if (password != cPassword) {
      showDialog({message: 'Password did not match'});
      return;
    }
    try {
      setLoading(true);
      const params = {email: email, password: password};
      const res = await Api.post(`resetPassword`, params);
      const resData = res?.data;
      console.log('response', resData);
      if (resData?.success == true) {
        console.log('navigate');
        showDialog({
          message: 'Password updated',
          onOKClick: () => NavService.goBackToTop(),
        });
      } else {
        showDialog({message: 'Invalid server response, please try again'});
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
        Reset Password
      </Text>
      <Text variant="body2Regular14" style={{textAlign: 'center'}}>
        Set the new password for your account
      </Text>
      <Spacer30 />
      <PasswordInputField
        onChangeText={setPassword}
        placeholder="Password"
        icon={require('../../assets/images/lock.png')}
      />
      <Spacer20 />
      <PasswordInputField
        onChangeText={setCPassword}
        placeholder="Confirm Password"
        icon={require('../../assets/images/lock.png')}
      />
      <Spacer40 />
      <PrimaryButton title="Reset Password" onPress={handleSubmit} />
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
export default ResetPasswordScreen;
