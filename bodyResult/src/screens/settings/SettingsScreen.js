import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Switch,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {Spacer10, Spacer30, Spacer40} from '../../components/Spacer';
import {Text} from '../../components/Text';
import {EHomeScreens, EStacks} from '../../navigation/AppRouts';
import {ConfirmationDialog} from '../../utils/Alert';
import {IMAGES} from '../../utils/Images';
import {NavService} from '../../utils/NavService';
import {theme} from '../../utils/Theme';

const SettingsScreen = () => {
  const [metric, setMetric] = useState(false);
  const [showFabric, setShowFabric] = useState(true);
  const [notification, setNotification] = useState(true);

  const handleLogout = () => {
    ConfirmationDialog({
      title: 'Logout...',
      message: 'Are you sure you want to logout?',
      onYesClick: async () => {
        await AsyncStorage.setItem('userId', '');
        await AsyncStorage.setItem('name', '');
        await AsyncStorage.setItem('email', '');
        NavService.navigate(EStacks.AUTh_STACK);
      },
    });
  };

  const renderOption = (title, icon, onPress, showArrow = true) => (
    <Pressable onPress={onPress} style={styles.optionContainer}>
      <View style={styles.row}>
        <Image style={styles.icon} source={icon} />
        <Text variant="body3Regular12" color="black" fontWeight="400">
          {title}
        </Text>
      </View>
      {showArrow && <Image style={styles.arrow} source={IMAGES.ARROW} />}
    </Pressable>
  );

  const renderSwitchOption = (title, icon, value, state) => (
    <View style={styles.optionContainer}>
      <View style={styles.row}>
        <Image style={styles.icon} source={icon} />
        <Text variant="body3Regular12" color="black" fontWeight="400">
          {title}
        </Text>
      </View>
      <Switch
        trackColor={{false: '#9B9B9B', true: theme.colors.primary}}
        thumbColor={'#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => state(previousState => !previousState)}
        value={value}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text
        variant="body2Regular14"
        color="gray500"
        fontWeight="700"
        style={styles.margin}>
        Date & Formats
      </Text>
      {renderOption('Change date', IMAGES.calendar)}
      {renderOption('Date format options', IMAGES.TRELLO)}
      {renderSwitchOption(
        'Use metric (kgs)',
        IMAGES.BOOK_GRAY,
        metric,
        setMetric,
      )}
      <Spacer40 />
      <Spacer10 />
      <Text variant="body2Regular14" color="gray500" fontWeight="700">
        Settings
      </Text>
      <Spacer10 />
      {renderSwitchOption(
        'Show Fibre & Sodium',
        IMAGES.CHECK_CIRCLE,
        showFabric,
        setShowFabric,
      )}
      {renderSwitchOption(
        'Notifications',
        IMAGES.BELL,
        notification,
        setNotification,
      )}
      {renderOption('Change profile password', IMAGES.LOCK_GRAY, () =>
        NavService.navigate(EHomeScreens.CHANGE_PASSWORD),
      )}
      {renderOption('Change profile email', IMAGES.MAIL_GRAY, () =>
        NavService.navigate(EHomeScreens.CHANGE_EMAIL),
      )}
      <Spacer40 />
      <Spacer10 />
      <Text variant="body2Regular14" color="gray500" fontWeight="700">
        Others
      </Text>
      <Spacer10 />
      {renderOption(
        'Privacy Policy & Terms Of Service',
        IMAGES.SHIELD,
        null,
        false,
      )}
      {renderOption('Share this app', IMAGES.SHARE_GRAY, null, false)}
      <Spacer30 />
      <TouchableOpacity onPress={handleLogout} style={{alignSelf: 'center'}}>
        <Image style={styles.logout} source={IMAGES.LOGOUT} />
      </TouchableOpacity>
      <Spacer40 />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.appPadding,
    backgroundColor: theme.colors.white,
  },
  margin: {marginTop: 52},
  optionContainer: {
    flexDirection: 'row',
    height: 53,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  icon: {width: 24, height: 24, marginRight: 9, resizeMode: 'contain'},
  arrow: {width: 24, height: 25},
  logout: {width: 88, height: 24, resizeMode: 'contain'},
});
export default SettingsScreen;
