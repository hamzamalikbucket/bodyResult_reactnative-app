import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Spacer10, Spacer20, Spacer30, Spacer40} from '../../components/Spacer';
import {Text} from '../../components/Text';
import {EHomeScreens} from '../../navigation/AppRouts';
import Api from '../../utils/Api';
import {IMAGES} from '../../utils/Images';
import {NavService} from '../../utils/NavService';
import {theme} from '../../utils/Theme';
const WIDTH = Dimensions.get('window').width;

const BodyStatsScreen = () => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    currentWeight: 0,
    height: 0,
    activityLevel: 0,
  });
  useFocusEffect(
    useCallback(() => {
      initData();
    }, []),
  );

  const initData = async () => {
    const id = await AsyncStorage.getItem('userId');
    try {
      setLoading(true);
      const params = {user_id: id};
      const res = await Api.post(`activityStatus`, params);
      console.log('response', res.data);
      setState({
        currentWeight: res.data.currentWeight,
        height: res.data.height,
        activityLevel: res.data.activityLevel,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    }
  };

  const renderMainButton = (title, onPress) => (
    <Pressable onPress={onPress || null} style={styles.mainButtonContainer}>
      <Text color="primary" variant="body2Regular14" fontWeight="700">
        {title}
      </Text>
      <Image style={styles.arrow} source={IMAGES.ARROW_RIGHT} />
    </Pressable>
  );

  const renderIndicators = ({title, value, scale, color}) => (
    <View>
      <Text color="gray500" fontWeight="700" variant="body1Regular16">
        {title}
      </Text>
      <Spacer10 />
      <Text color={color} fontWeight="700" style={{fontSize: 36}}>
        {value}
        <Text color={color} fontWeight="700" style={{fontSize: 16}}>
          {`  ${scale}`}
        </Text>
      </Text>
    </View>
  );

  const renderChart = () => (
    <View style={styles.chartContainer}>
      <Text fontWeight={'700'} style={styles.center}>
        Life time weight (lbs)
      </Text>
      <LineChart
        data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              data: [180, 90, 110, 200, 150, 70],
            },
          ],
        }}
        width={WIDTH} // from react-native
        height={220}
        withInnerLines={false}
        withHorizontalLines={true}
        chartConfig={{
          decimalPlaces: 0,
          fillShadowGradientFrom: '#fff',
          fillShadowGradientTo: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 0.24) => `rgba(68, 182, 86, ${opacity})`,
          labelColor: () => `black`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '0',
            strokeWidth: '0',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Pressable>
        <Image source={IMAGES.LEFT} style={styles.imgLeft} />
      </Pressable>
      <View>
        <Text style={styles.toolbar} fontWeight="700" variant="h2Regular20">
          Activity Stats
        </Text>
        <Text style={{textAlign: 'center'}} variant="body1Regular12">
          Lifetime
        </Text>
      </View>
      <Pressable>
        <Image source={IMAGES.RIGHT} style={styles.imgLeft} />
      </Pressable>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {renderHeader()}
      <Spacer40 />
      {renderMainButton('Update Body Stats', () =>
        NavService.navigate(EHomeScreens.LOG_BODY_STATS),
      )}
      <Spacer10 />
      {renderMainButton('Update Activity')}
      <Spacer30 />
      <View style={styles.centerView}>
        <Image style={styles.imgWeight} source={IMAGES.WEIGHT_INDICATOR} />
        <View style={styles.statsMain}>
          <Text color="white" fontWeight="700" variant="body1Regular16">
            Current weight (lbs)
          </Text>
          <Text
            color="white"
            variant="body1Regular12"
            fontWeight="700"
            style={{fontSize: 48}}>
            {state.activityLevel}
          </Text>
        </View>
      </View>
      <Spacer30 />
      <View style={styles.indicatorRoot}>
        {renderIndicators({
          title: 'Starting weight',
          value: '0',
          scale: 'lbs',
          color: 'danger',
        })}
        {renderIndicators({
          title: 'Goal Weight',
          value: '0',
          scale: 'lbs',
          color: 'success',
        })}
      </View>
      <Spacer40 />
      <Spacer20 />
      <View style={styles.indicatorRoot}>
        {renderIndicators({
          title: 'Height',
          value: state.height,
          scale: 'cm',
          color: 'black',
        })}
        {renderIndicators({
          title: 'Activity level',
          value: state.activityLevel,
          scale: 'min/day',
          color: 'black',
        })}
      </View>
      {renderChart()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: theme.colors.white,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  toolbar: {textAlign: 'center'},
  mainButtonContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.colors.primary,
    height: 48,
    alignItems: 'center',
    paddingHorizontal: 17,
    justifyContent: 'space-between',
  },
  centerView: {alignItems: 'center', justifyContent: 'center'},
  statsMain: {position: 'absolute', alignItems: 'center'},
  arrow: {width: 24, height: 24},
  imgWeight: {width: '100%', height: 307, resizeMode: 'contain'},
  indicatorRoot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  chartContainer: {
    borderRadius: 15,
    paddingVertical: 20,
    marginTop: 70,
  },
  center: {textAlign: 'center', marginVertical: 20},
  imgLeft: {width: 48, height: 56},
});
export default BodyStatsScreen;
