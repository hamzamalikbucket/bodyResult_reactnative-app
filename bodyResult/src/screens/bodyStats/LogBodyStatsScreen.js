import AsyncStorage from '@react-native-async-storage/async-storage';
import {format} from 'date-fns';
import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Pressable, Image} from 'react-native';
import {DatePicker} from '../../components/DatePicker';
import {ImagePicker} from '../../components/ImagePicker';
import {Loading} from '../../components/Loading';
import {PrimaryButton} from '../../components/PrimaryButton';
import {Spacer10, Spacer20, Spacer30, Spacer40} from '../../components/Spacer';
import {Text} from '../../components/Text';
import {Toolbar} from '../../components/Toolbar';
import {Volume} from '../../components/Volume';
import {EHomeScreens} from '../../navigation/AppRouts';
import Api from '../../utils/Api';
import {IMAGES} from '../../utils/Images';
import {NavService} from '../../utils/NavService';
import {theme} from '../../utils/Theme';

const LogBodyStatsScreen = () => {
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [date, setDate] = useState(new Date());
  const [currentWeight, setCurrentWeight] = useState(100);
  const [startingWeight, setStartingWeight] = useState(115);
  const [goalWeight, setGoalWeight] = useState(90);
  const [height, setHeight] = useState(196);
  const [arm, setArm] = useState(40);
  const [chest, setChest] = useState(101);
  const [waist, setWaist] = useState(83);
  const [hip, setHip] = useState(105);
  const [leg, setLeg] = useState(10);
  const [loading, setLoading] = useState('');

  const handleSaveWeight = async () => {
    const id = await AsyncStorage.getItem('userId');
    // const params = {
    //   date_added: format(new Date(date), 'yyyy-MM-dd'),
    //   front_image: selectedImage,
    //   current_weight: currentWeight,
    //   user_id: id,
    // };
    // console.log(params);
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('date_added', format(new Date(date), 'yyyy-MM-dd'));
      formData.append('front_image', selectedImage);
      formData.append('current_weight', currentWeight);
      formData.append('user_id', id);
      const res = await Api.postForm(`saveWeight`, formData, {
        'Content-Type': 'multipart/form-data',
      });
      // const res = await Api.post(`saveWeight`, params);
      console.log('response', res.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    }
  };

  const handleSaveMeasurement = async () => {
    const id = await AsyncStorage.getItem('userId');
    const params = {
      date_added: format(new Date(date), 'yyyy-MM-dd'),
      arm: arm,
      chest: chest,
      stomach: waist,
      hips_thigh: hip,
      leg: leg,
      total: arm + chest + waist + hip + leg,
      user_id: id,
    };
    try {
      setLoading(true);
      const res = await Api.post(`saveWeight`, params);
      console.log('response', res.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    }
  };

  const renderPhotoPicker = () => (
    <View>
      <Text variant="body1Regular16" fontWeight="700">
        Add a photo
      </Text>
      <Pressable
        onPress={() => setShowImagePicker(true)}
        style={{alignSelf: 'center'}}>
        <Image style={styles.user} source={selectedImage || IMAGES.userTemp} />
        <Image style={styles.camera} source={IMAGES.camera} />
      </Pressable>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Toolbar title="Log Body Stats" />
      <Spacer30 />
      <Pressable
        onPress={() => NavService.navigate(EHomeScreens.ALL_STATS)}
        style={styles.mainButtonContainer}>
        <Text color="white" variant="body2Regular14" fontWeight="700">
          See all stats
        </Text>
        <Image style={styles.arrow} source={IMAGES.ARROW_WHITE} />
      </Pressable>
      <Spacer30 />
      {renderPhotoPicker()}
      <Spacer20 />
      <DatePicker date={date} setDate={setDate} />
      <Spacer20 />
      <Volume
        title="Current weight (kg)"
        value={currentWeight}
        onChange={setCurrentWeight}
      />
      <Spacer20 />
      <Volume
        title="Starting weight (kg)"
        value={startingWeight}
        onChange={setStartingWeight}
      />
      <Spacer20 />
      <Volume
        title="Goal weight (kg)"
        value={goalWeight}
        onChange={setGoalWeight}
      />
      <Spacer30 />
      <PrimaryButton onPress={handleSaveWeight} title="Save Weight" />
      <Spacer40 />
      <View
        style={{
          height: 1,
          backgroundColor: theme.colors.gray500,
          opacity: 0.1,
        }}
      />
      <Spacer40 />
      <Spacer10 />
      <Volume title="Height (cm)" value={height} onChange={setHeight} />
      <Spacer20 />
      <View style={styles.row}>
        <Volume title="Arm (cm)" value={arm} onChange={setArm} />
        <View style={styles.spacer} />
        <Volume title="Chest (cm)" value={chest} onChange={setChest} />
      </View>
      <Spacer20 />
      <View style={styles.row}>
        <Volume title="Waist (cm)" value={waist} onChange={setWaist} />
        <View style={styles.spacer} />
        <Volume title="Hips (cm)" value={hip} onChange={setHip} />
      </View>
      <Spacer20 />
      <View style={styles.row}>
        <Volume title="Leg (cm)" value={leg} onChange={setLeg} />
        <View style={styles.spacer} />
        <View style={{flex: 1}} />
      </View>
      <Spacer20 />
      <PrimaryButton
        title="Save Measurements"
        onPress={handleSaveMeasurement}
      />
      <ImagePicker
        visibility={showImagePicker}
        onCancel={() => setShowImagePicker(false)}
        onImageSelect={async image => {
          setShowImagePicker(false);

          let nameArray = image.path.split('/');
          nameArray = nameArray.reverse();
          const imageData = {
            uri: image.path,
            type: image.mime,
            name: nameArray[0],
          };
          setSelectedImage(imageData);
        }}
      />
      <Spacer40 />
      {loading && <Loading />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.appPadding,
    backgroundColor: theme.colors.white,
  },
  mainButtonContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    height: 48,
    alignItems: 'center',
    paddingHorizontal: 17,
    justifyContent: 'space-between',
  },
  arrow: {width: 24, height: 24},
  user: {width: 120, height: 120, borderRadius: 120 / 2},
  camera: {
    width: 33,
    height: 33,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  row: {flexDirection: 'row', justifyContent: 'space-between'},
  spacer: {width: 17},
});

export default LogBodyStatsScreen;
