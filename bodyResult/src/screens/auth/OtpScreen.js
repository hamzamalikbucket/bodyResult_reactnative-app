import React, {useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {InputField} from '../../components/InputField';
import {PrimaryButton} from '../../components/PrimaryButton';
import {Spacer20, Spacer30, Spacer40} from '../../components/Spacer';
import {Text} from '../../components/Text';
import {NavService} from '../../utils/NavService';
import {theme} from '../../utils/Theme';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {EAuthScreens} from '../../navigation/AppRouts';
import {useRoute} from '@react-navigation/native';
import {showDialog} from '../../utils/Alert';

const OtpScreen = () => {
  const [otp, setOtp] = useState();
  let {code, email} = useRoute().params;
  console.log('code', code);

  const handleSubmit = () => {
    if (otp != code) {
      showDialog({message: 'Invalid Otp, please try again.'});
      return;
    }
    console.log(otp);
    NavService.navigate(EAuthScreens.RESET_PASSWORD, {email: email});
  };

  const handleResend = async () => {
    code = 12;
    return;
    try {
      setLoading(true);
      const params = {
        email: email,
      };
      const res = await Api.post(`resendOtp`, params);
      console.log('response', res.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="h2Regular24" fontWeight={'600'}>
        Verification
      </Text>
      <Text variant="body2Regular14" style={{textAlign: 'center'}}>
        Enter the OTP sent on your email. if you haven’t got it check it in the
        spam folder
      </Text>
      <Spacer30 />
      <OTPInputView
        style={{
          width: '80%',
          height: 100,
        }}
        pinCount={4}
        codeInputFieldStyle={styles.otp}
        onCodeChanged={setOtp}
      />
      <Spacer40 />
      <PrimaryButton title="continue" onPress={handleSubmit} />
      <Spacer20 />
      <Pressable onPress={handleResend}>
        <Text color="primary" variant="body1Regular16" style={styles.underline}>
          Resend OTP
        </Text>
      </Pressable>
      <Pressable style={styles.wrongEmail} onPress={() => NavService.goBack()}>
        <Text color="primary" variant="body1Regular16" style={styles.underline}>
          Entered the wrong email address?
        </Text>
      </Pressable>
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
  otp: {
    color: 'black',
    borderWidth: 0,
    borderColor: 'white',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  underline: {textDecorationLine: 'underline'},
  wrongEmail: {position: 'absolute', bottom: 50},
});
export default OtpScreen;
