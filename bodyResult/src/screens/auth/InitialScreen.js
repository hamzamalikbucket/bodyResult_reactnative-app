import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Loading} from '../../components/Loading';
import {PrimaryButton} from '../../components/PrimaryButton';
import {Spacer40} from '../../components/Spacer';
import {Text} from '../../components/Text';
import {EAuthScreens, EStacks} from '../../navigation/AppRouts';
import {NavService} from '../../utils/NavService';

const InitialScreen = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    checkUser();
  }, []);
  const checkUser = async () => {
    const id = await AsyncStorage.getItem('userId');
    setLoading(false);
    if (id != null && id != '') {
      NavService.navigate(EStacks.TAB_STACK);
    }
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/images/login_bg.png')}
      />
      <View style={styles.footer}>
        <Text
          color="white"
          variant="h2Regular20"
          fontWeight="700"
          style={styles.text}>
          Lorem Ipsum Is a Dummy Text used as a placeholder text
        </Text>
        <Spacer40 />
        <PrimaryButton
          title="Login"
          onPress={() => NavService.navigate(EAuthScreens.SIGN_IN_SCREEN)}
        />
      </View>
      {loading && <Loading />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  image: {resizeMode: 'cover', width: '100%', height: '100%'},
  footer: {position: 'absolute', bottom: 60, paddingHorizontal: 40, zIndex: 10},
  text: {textAlign: 'center'},
});

export default InitialScreen;
