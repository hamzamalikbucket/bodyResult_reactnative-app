import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {InputField} from '../../components/InputField';
import {PasswordInputField} from '../../components/PasswordInputField';
import {Spacer20, Spacer40} from '../../components/Spacer';
import {Text} from '../../components/Text';
import {theme} from '../../utils/Theme';
import {NavService} from '../../utils/NavService';
import {EAuthScreens, EStacks} from '../../navigation/AppRouts';
import LinearGradient from 'react-native-linear-gradient';
import Api from '../../utils/Api';
import {Loading} from '../../components/Loading';
import {showDialog} from '../../utils/Alert';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email) {
      showDialog({message: 'Enter email address'});
    } else if (!password) {
      showDialog({message: 'Enter password'});
    } else {
      try {
        setLoading(true);
        const params = {email, password};
        const res = await Api.post(`login`, params);
        console.log('response', res.data);
        setLoading(false);
        if (res.data.success == true) {
          await AsyncStorage.setItem('userId', res.data.user.ID);
          await AsyncStorage.setItem('name', res.data.user.display_name);
          await AsyncStorage.setItem('email', res.data.user.user_email);
          NavService.navigate(EStacks.TAB_STACK);
        } else {
          showDialog({message: 'Invalid email or password.'});
        }
      } catch (error) {
        setLoading(false);
        showDialog({message: 'Invalid email or password.'});
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        style={{height: 630, width: '100%', resizeMode: 'cover'}}
        source={require('../../assets/images/login_bgs.png')}
      />
      <LinearGradient
        colors={[theme.colors.primary, '#078383']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.body}>
        <View style={styles.bar} />
        <Spacer40 />
        <Text color="white" variant="displayBold32">
          Login
        </Text>
        <Text color="white" variant="body2Regular14">
          Please add the following details for proceed
        </Text>
        <Spacer20 />
        <InputField
          placeholder="Email"
          icon={require('../../assets/images/message.png')}
          keyboardType="email-address"
          onChangeText={setEmail}
        />
        <View style={styles.space16} />
        <PasswordInputField
          placeholder="Password"
          icon={require('../../assets/images/lock.png')}
          onChangeText={setPassword}
        />
        <View style={styles.space16} />
        <View style={styles.forgetPasswordContainer}>
          <TouchableOpacity
            onPress={() => NavService.navigate(EAuthScreens.FORGET_PASSWORD)}>
            <Text color="white" variant="body2Regular14">
              Forget Password?
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
          <Text color="primary" variant="body1Regular16" fontWeight="700">
            Login
          </Text>
        </TouchableOpacity>
        <Spacer40 />
        {loading && <Loading />}
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    marginTop: '-60%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 31,
  },
  bar: {
    width: 80,
    height: 4,
    backgroundColor: theme.colors.white,
    borderRadius: 12,
  },
  space16: {
    height: 16,
  },
  forgetPasswordContainer: {
    alignItems: 'flex-end',
    width: '100%',
  },
  btnLogin: {
    height: 48,
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
});
export default LoginScreen;
