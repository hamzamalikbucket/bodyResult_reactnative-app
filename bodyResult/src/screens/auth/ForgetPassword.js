import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {InputField} from '../../components/InputField';
import {Loading} from '../../components/Loading';
import {PrimaryButton} from '../../components/PrimaryButton';
import {Space30, Spacer30, Spacer40} from '../../components/Spacer';
import {Text} from '../../components/Text';
import {EAuthScreens} from '../../navigation/AppRouts';
import {showDialog} from '../../utils/Alert';
import Api from '../../utils/Api';
import {NavService} from '../../utils/NavService';
import {theme} from '../../utils/Theme';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      showDialog({message: 'Enter email address'});
      return;
    }
    try {
      setLoading(true);
      const params = {email: email};
      const res = await Api.post(`forgetPassword`, params);
      const resData = res?.data;
      console.log('response', resData);
      if (resData.success == true) {
        NavService.navigate(EAuthScreens.OTP, {
          email: email,
          code: resData.code,
        });
      } else {
        showDialog({message: resData.message});
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
        Forgot Password?
      </Text>
      <Text variant="body2Regular14">
        Enter the email linked with your account
      </Text>
      <Spacer30 />
      <InputField
        placeholder="Email"
        onChangeText={setEmail}
        icon={require('../../assets/images/message.png')}
        keyboardType="email-address"
      />
      <Spacer40 />
      <PrimaryButton title="continue" onPress={handleSubmit} />
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
export default ForgetPassword;
