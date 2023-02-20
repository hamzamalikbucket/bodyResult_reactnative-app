import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {EAuthScreens} from './AppRouts';
import InitialScreen from '../screens/auth/InitialScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import ForgetPassword from '../screens/auth/ForgetPassword';
import OtpScreen from '../screens/auth/OtpScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';
const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={EAuthScreens.INITIAL_SCREEN}
        component={InitialScreen}
      />
      <Stack.Screen
        name={EAuthScreens.SIGN_IN_SCREEN}
        component={LoginScreen}
      />
      <Stack.Screen
        name={EAuthScreens.FORGET_PASSWORD}
        component={ForgetPassword}
      />
      <Stack.Screen name={EAuthScreens.OTP} component={OtpScreen} />
      <Stack.Screen
        name={EAuthScreens.RESET_PASSWORD}
        component={ResetPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
