import React, {useCallback, useState} from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {Text} from '../components/Text';
import {LineChart, BarChart} from 'react-native-chart-kit';
import {Spacer10, Spacer20, Spacer30, Spacer40} from '../components/Spacer';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {theme} from '../utils/Theme';
import * as Progress from 'react-native-progress';
import {Defs, LinearGradient, Stop} from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../utils/Api';
import {useFocusEffect} from '@react-navigation/native';
import {format} from 'date-fns';
import {showDialog} from '../utils/Alert';
const WIDTH = Dimensions.get('window').width;
let curr = new Date();
let week = [];
let weekDays = [];
let month = format(new Date(), 'MM');
for (let i = 1; i <= 5; i++) {
  let first = curr.getDate() - curr.getDay() + i;
  let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
  week.push(day);
  weekDays.push(format(new Date(day), 'dd'));
}

const DashboardScreen = () => {
  const [loading, setLoading] = useState(false);
  const [weightType, setWeightType] = useState('');
  const [barChartData, setBarChartData] = useState({
    data: [0, 0, 0, 0, 0],
    goal: 0,
    intake: 0,
  });
  const [pieChartData, setPieChartData] = useState({
    intake: 0,
    calPer: 0,
    proPer: 0,
    carbPer: 0,
    fatPer: 0,
    cal: 0,
    pro: 0,
    carb: 0,
    fat: 0,
  });

  useFocusEffect(
    useCallback(() => {
      initData();
    }, []),
  );

  const initData = async () => {
    console.log(week);
    const id = await AsyncStorage.getItem('userId');
    try {
      setLoading(true);
      const params = {
        user_id: id,
        days: JSON.stringify(week),
      };
      const res = await Api.post(`getDashboard`, params);
      console.log('response', res.data);
      const resData = res?.data;
      setBarChartData({
        data: resData?.calories || [0, 0, 0, 0, 0],
        goal: resData?.totalCal || 0,
        intake: resData?.totalCalConsume || 0,
      });
      const pieData = resData?.pie;
      setPieChartData({
        intake: pieData?.todayIntake || 0,
        calPer: pieData?.calIntakePer || 0,
        proPer: pieData?.proteinIntakePer || 0,
        carbPer: pieData?.carbsIntakePer || 0,
        fatPer: pieData?.fatIntakePer || 0,
        cal: pieData?.todayCalIntake || 0,
        pro: pieData?.todayProteinIntake || 0,
        carb: pieData?.todayCarbsIntake || 0,
        fat: pieData?.todayFatIntake || 0,
      });
      setWeightType(resData?.weightType);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error', error);
      showDialog({message: 'Invalid response, please try again.'});
    }
  };

  const Gradient = () => (
    <Defs key={'gradient'}>
      <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
        <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'} />
        <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'} />
      </LinearGradient>
    </Defs>
  );

  const renderProgressBar = (title, progress, color, detail) => (
    <View style={{alignItems: 'center'}}>
      <Text variant="body1Regular16" fontWeight="700">
        {title}
      </Text>
      <Spacer10 />
      <Progress.Bar
        progress={progress}
        width={80}
        height={8}
        color={color}
        unfilledColor={theme.colors.gray400}
        borderWidth={0}
      />
      <Spacer10 />
      <Text variant="body4Regular12" fontWeight="700">
        {detail}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.toolbar} fontWeight="700" variant="h2Regular20">
        Dashboard
      </Text>
      <Spacer30 />
      <View style={styles.chartContainer}>
        <Text fontWeight={'700'} style={styles.center}>
          Life time weight ({weightType})
        </Text>
        <LineChart
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
              {
                data: [0, 0, 0, 0, 0, 0],
                strokeWidth: 4,
              },
            ],
          }}
          svg={{
            strokeWidth: 2,
            stroke: 'url(#gradient)',
          }}
          width={WIDTH}
          height={190}
          withInnerLines={false}
          withHorizontalLines={true}
          chartConfig={{
            decimalPlaces: 0,
            backgroundGradientFrom: '#F6FCF8',
            backgroundGradientTo: '#F6FCF8',
            fillShadowGradientFrom: '#fff',
            fillShadowGradientTo: '#fff',
            color: (opacity = 0.24) => `rgba(68, 182, 86, ${opacity})`,
            labelColor: () => `black`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '0',
              strokeWidth: '0',
            },
            useShadowColorFromDataset: false,
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}>
          <Gradient />
        </LineChart>
      </View>
      <Spacer20 />
      <View style={styles.chartContainer}>
        <Text fontWeight={'700'} style={styles.center}>
          Caloric consumption (last week)
        </Text>
        <BarChart
          style={{}}
          data={{
            labels: [
              `${weekDays[0]}/${month}`,
              `${weekDays[1]}/${month}`,
              `${weekDays[2]}/${month}`,
              `${weekDays[3]}/${month}`,
              `${weekDays[4]}/${month}`,
            ],
            datasets: [{data: barChartData.data}],
          }}
          width={WIDTH - 15}
          height={190}
          showBarTops={false}
          chartConfig={{
            decimalPlaces: 0,
            barPercentage: 0.5,
            backgroundGradientFrom: '#F6FCF8',
            backgroundGradientTo: '#F6FCF8',
            color: (opacity = 0.24) => `rgba(68, 182, 86, ${opacity})`,
            labelColor: () => `black`,
          }}
        />
        <Spacer30 />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 30,
          }}>
          <Text variant="body3Regular12" fontWeight="700">
            Weekly goal : {barChartData?.goal}
          </Text>
          <Text variant="body3Regular12" fontWeight="700">
            Weekly intake: {barChartData?.intake}
          </Text>
        </View>
      </View>
      <Spacer20 />
      <View style={{alignItems: 'center'}}>
        <AnimatedCircularProgress
          size={WIDTH - 60}
          width={10}
          fill={pieChartData.calPer}
          tintColor={theme.colors.primary}
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor="#CFD2D7"
          arcSweepAngle={180}
          rotation={-90}
        />
        <View style={{position: 'absolute', top: 50, alignItems: 'center'}}>
          <Text variant="body3Regular12" fontWeight="700">
            Daily intake
          </Text>
          <Text fontWeight="700">
            <Text style={{fontSize: 60}}>{pieChartData?.intake || 0}</Text>Cals
          </Text>
          <Text variant="body3Regular12" fontWeight="700">
            {pieChartData?.cal} Cals left
          </Text>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 60,
              justifyContent: 'space-between',
              width: WIDTH - 60,
            }}>
            {renderProgressBar(
              'Protien',
              pieChartData.proPer / 100,
              theme.colors.primary,
              `${pieChartData.pro}g left`,
            )}
            {renderProgressBar(
              'Carbs',
              pieChartData.carbPer / 100,
              theme.colors.yellow,
              `${pieChartData.carb}g left`,
            )}
            {renderProgressBar(
              'Fat',
              pieChartData.fatPer / 100,
              '#FD80CB',
              `${pieChartData.fat}g left`,
            )}
          </View>
        </View>
      </View>

      <Spacer40 />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: theme.colors.white,
  },
  toolbar: {textAlign: 'center', marginTop: 40},
  chartContainer: {
    backgroundColor: '#F6FCF8',
    borderRadius: 15,
    paddingVertical: 20,
  },
  center: {textAlign: 'center', marginVertical: 20},
});
export default DashboardScreen;
