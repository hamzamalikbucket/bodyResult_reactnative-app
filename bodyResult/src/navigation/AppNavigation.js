import React, {useRef, useCallback, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavService} from '../utils/NavService';
import {EHomeScreens, EStacks} from './AppRouts';
import AuthStack from './AuthStack';
import {BottomTabs} from './BottomTabs';
import LogBodyStatsScreen from '../screens/bodyStats/LogBodyStatsScreen';
import AllStatsScreen from '../screens/bodyStats/AllStatsScreen';
import AddEntryScreen from '../screens/dairy/AddEntryScreen';
import EditEntryScreen from '../screens/dairy/EditEntryScreen';
import ChangePasswordScreen from '../screens/settings/ChangePasswordScreen';
import ChangeEmailScreen from '../screens/settings/ChangeEmailScreen';

const Stack = createStackNavigator();
const Navigation = () => {
  const routeName = useRef();

  const handleScreenChange = useCallback(async () => {
    const prevRouteName = routeName.current;
    const currentRouteName = NavService.getCurrentRoute();
    if (!NavService.isCurrentRoute(prevRouteName)) {
      // trackScreen(currentRouteName)
    }
    routeName.current = currentRouteName;
  }, []);
  return (
    <NavigationContainer
      ref={NavService.getNavRef()}
      onStateChange={handleScreenChange}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={EStacks.AUTh_STACK}>
        <Stack.Screen name={EStacks.AUTh_STACK} component={AuthStack} />
        <Stack.Screen name={EStacks.TAB_STACK} component={BottomTabs} />
        <Stack.Screen
          name={EHomeScreens.LOG_BODY_STATS}
          component={LogBodyStatsScreen}
        />
        <Stack.Screen
          name={EHomeScreens.ALL_STATS}
          component={AllStatsScreen}
        />

        <Stack.Screen
          name={EHomeScreens.CHANGE_PASSWORD}
          component={ChangePasswordScreen}
        />
        <Stack.Screen
          name={EHomeScreens.CHANGE_EMAIL}
          component={ChangeEmailScreen}
        />
        <Stack.Screen
          name={EHomeScreens.ADD_ENTRY}
          component={AddEntryScreen}
        />
        <Stack.Screen
          name={EHomeScreens.EDIT_ENTRY}
          component={EditEntryScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
