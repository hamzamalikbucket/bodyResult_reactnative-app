import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {IMAGES} from '../utils/Images';
import {EBottomTabs, EHomeScreens} from './AppRouts';
import {theme} from '../utils/Theme';

import DashboardScreen from '../screens/DashboardScreen';
import BodyStatsScreen from '../screens/bodyStats/BodyStatsScreen';
import CalculatorScreen from '../screens/CalculatorScreen';

import SettingsScreen from '../screens/settings/SettingsScreen';
import DairyScreen from '../screens/dairy/DairyScreen';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AddEntryScreen from '../screens/dairy/AddEntryScreen';
import EditEntryScreen from '../screens/dairy/EditEntryScreen';
import {NavService} from '../utils/NavService';
const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const DiaryStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={'diary'} component={DairyScreen} />
      <Stack.Screen name={EHomeScreens.ADD_ENTRY} component={AddEntryScreen} />
      <Stack.Screen
        name={EHomeScreens.EDIT_ENTRY}
        component={EditEntryScreen}
      />
    </Stack.Navigator>
  );
};

export const BottomTabs = () => {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      initialRouteName={EBottomTabs.JOBS}
      // tabBarOptions={{
      //   showLabel: false,
      // }}
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({focused}) => {
          let iconName = '';
          let myRoute = '';
          switch (route.name) {
            case EBottomTabs.DASHBOARD:
              iconName = focused ? IMAGES.TABS.home_active : IMAGES.TABS.home;
              myRoute = EBottomTabs.DASHBOARD;
              break;
            case EBottomTabs.BODY_STATS:
              iconName = focused
                ? IMAGES.TABS.activity_active
                : IMAGES.TABS.activity;
              myRoute = EBottomTabs.BODY_STATS;
              break;
            case EBottomTabs.CALCULATOR:
              iconName = focused
                ? IMAGES.TABS.calculator_active
                : IMAGES.TABS.calculator;
              myRoute = EBottomTabs.CALCULATOR;
              break;
            case EBottomTabs.DIARY:
              iconName = focused ? IMAGES.TABS.book_active : IMAGES.TABS.book;
              myRoute = EBottomTabs.DIARY;
              break;
            case EBottomTabs.SETTINGS:
              iconName = focused ? IMAGES.TABS.user_active : IMAGES.TABS.user;
              myRoute = EBottomTabs.SETTINGS;
              break;
          }

          return myRoute == EBottomTabs.CALCULATOR ? (
            <View>
              <Pressable
                // {"date_added": "2017-03-03", "id": "1", "meal_record": [], "name": "Breakfast",
                onPress={() =>
                  NavService.navigate(EHomeScreens.ADD_ENTRY, {
                    meal: {
                      id: '1',
                      name: 'Breakfast',
                    },
                  })
                }
                style={styles.container}>
                <Image
                  source={IMAGES.ADD}
                  style={{width: 56, height: 56, marginTop: -65}}
                />
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate(myRoute)}
                style={styles.container}>
                <Image source={iconName} style={styles.image} />
              </Pressable>
            </View>
          ) : (
            <Pressable
              onPress={() => navigation.navigate(myRoute)}
              style={styles.container}>
              <Image source={iconName} style={styles.image} />
            </Pressable>
          );
        },
        tabBarStyle: {...styles.tabStyle},
      })}>
      <Tab.Screen
        name={EBottomTabs.DASHBOARD}
        component={DashboardScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={EBottomTabs.BODY_STATS}
        component={BodyStatsScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={EBottomTabs.CALCULATOR}
        component={CalculatorScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={EBottomTabs.DIARY}
        component={DiaryStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={EBottomTabs.SETTINGS}
        component={SettingsScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabStyle: {
    height: Platform.OS === 'ios' ? 90 : 80,
    paddingTop: Platform.OS === 'ios' ? 25 : 25,
  },
  container: {
    alignItems: 'center',
  },
  image: {width: 30, height: 30, resizeMode: 'contain'},
  text: {fontSize: 10, marginTop: 5},
  textFocused: {color: theme.colors.primary, fontSize: 10, marginTop: 5},
  indicator: {
    width: 7,
    height: 7,
    backgroundColor: theme.colors.danger,
    position: 'absolute',
    borderRadius: 4,
    right: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
