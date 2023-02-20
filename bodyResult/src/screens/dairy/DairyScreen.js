import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Spacer10, Spacer20, Spacer30, Spacer40} from '../../components/Spacer';
import {Text} from '../../components/Text';
import {IMAGES} from '../../utils/Images';
import {theme} from '../../utils/Theme';
import * as Progress from 'react-native-progress';
import {EHomeScreens} from '../../navigation/AppRouts';
import {NavService} from '../../utils/NavService';
import {Loading} from '../../components/Loading';
import Api from '../../utils/Api';
import {format, nextFriday, nextMonday, startOfWeek} from 'date-fns';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const WIDTH = Dimensions.get('window').width;

let curr = new Date();
let week = [];
for (let i = 1; i <= 7; i++) {
  let first = curr.getDate() - curr.getDay() + i;
  let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
  week.push(day);
}
const currentWeek = [
  {day: 'SAT', date: week[5]},
  {day: 'FRI', date: week[4]},
  {day: 'THU', date: week[3]},
  {day: 'WED', date: week[2]},
  {day: 'TUE', date: week[1]},
  {day: 'MON', date: week[0]},
];

const DairyScreen = () => {
  const [mealList, setMealList] = useState([]);
  const [totalKcal, setTotalKcal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentDay, setCurrentDay] = useState(new Date().getDate());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [pieChartData, setPieChartData] = useState({
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
      // setCurrentDay(new Date().getDate());
      console.log('date', new Date(currentDate));
      initData(new Date(currentDate));
    }, [currentDate]),
  );

  const initData = async date => {
    const currDate = format(date, 'yyyy-MM-dd');
    const id = await AsyncStorage.getItem('userId');
    try {
      setLoading(true);
      const params = {
        date: currDate,
        user_id: id,
      };
      const res = await Api.post(`getFoodRecord`, params);
      setMealList(res.data.listData);
      setTotalKcal(res.data.totalKcal);
      const pieData = res?.data?.pie;
      // console.log('pie chart', pieData);
      setPieChartData({
        calPer: pieData?.calIntakePer,
        proPer: pieData?.proteinIntakePer,
        carbPer: pieData?.carbsIntakePer,
        fatPer: pieData?.fatIntakePer,
        cal: pieData?.todayCalIntake,
        pro: pieData?.todayProteinIntake,
        carb: pieData?.todayCarbsIntake,
        fat: pieData?.todayFatIntake,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    }
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.toolbar} fontWeight="700" variant="h2Regular20">
          Diary
        </Text>
      </View>
    </View>
  );

  const renderMainButton = (title, onPress) => (
    <Pressable onPress={onPress || null} style={styles.mainButtonContainer}>
      <Text color="white" variant="body2Regular14" fontWeight="700">
        {title}
      </Text>
      <Image style={styles.arrow} source={IMAGES.ARROW_WHITE} />
    </Pressable>
  );

  const renderDate = (item, ind) => {
    const myDay = format(new Date(item.date), 'dd');
    return (
      <TouchableOpacity
        onPress={() => {
          initData(new Date(item.date));
          setCurrentDate(item.date);
          setCurrentDay(myDay);
          console.log('update date', item.date);
        }}
        style={styles.dateContainer}>
        <Text color="gray500" fontWeight="700" variant="body3Regular12">
          {item.day}
        </Text>
        <Text color="black" fontWeight="700" variant="body3Regular12">
          {myDay}
        </Text>
        {currentDay == myDay && <View style={styles.activeDay} />}
      </TouchableOpacity>
    );
  };

  const renderCalendar = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {currentWeek.map((val, ind) => renderDate(val, ind))}
    </ScrollView>
  );

  const renderProgressBar = (title, progress, color, detail) => (
    <View style={styles.centerColumn}>
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
      <Text variant="body3Regular12" fontWeight="700">
        {detail}
      </Text>
    </View>
  );

  const renderDailyIntake = () => (
    <View style={styles.centerColumn}>
      <AnimatedCircularProgress
        size={WIDTH - 60}
        width={10}
        fill={totalKcal == 0 ? 0 : pieChartData.calPer}
        tintColor={theme.colors.primary}
        onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor="#CFD2D7"
        arcSweepAngle={160}
        rotation={-80}
      />
      <View style={styles.indContainer}>
        <Text variant="body3Regular12" fontWeight="700">
          Daily intake
        </Text>
        <Text fontWeight="700">
          <Text style={styles.txtKcl}>{totalKcal}</Text>Cals
        </Text>
        <Text variant="body3Regular12" fontWeight="700">
          {pieChartData.cal} Cals left
        </Text>

        <View style={styles.progressContainer}>
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
  );

  const renderBreakfastRow = (mealType, item, title, total, p, c, f) => (
    <View>
      <TouchableOpacity
        style={{position: 'absolute', right: 10, zIndex: 10}}
        onPress={() => {
          console.log('item', item);
          NavService.navigate(EHomeScreens.EDIT_ENTRY, {
            item: item,
            myMeal: mealType,
            type: 'update',
          });
        }}>
        <Image source={IMAGES.EDIT} style={{width: 16, height: 16}} />
      </TouchableOpacity>
      <Text variant="body3Regular12" fontWeight="700" color="gray500">
        {title}
      </Text>
      <View style={styles.totalContainer}>
        <Text variant="body3Regular12" fontWeight="700" color="gray500">
          {total}
        </Text>
        <View style={styles.spacer} />
        <Text variant="body3Regular12" fontWeight="700" color="success">
          {p}
        </Text>
        <View style={styles.spacer} />
        <Text variant="body3Regular12" fontWeight="700" color="yellow">
          {c}
        </Text>
        <View style={styles.spacer} />
        <Text variant="body3Regular12" fontWeight="700" color="pink">
          {f}
        </Text>
      </View>
    </View>
  );

  const renderBreakfast = item => (
    <View style={styles.breakfastContainer}>
      <View style={styles.editRow}>
        <Text variant="h2Regular20" fontWeight="700">
          {item.name}
        </Text>
        <View style={styles.row}>
          {/* <Pressable
            onPress={() =>
              NavService.navigate(EHomeScreens.EDIT_ENTRY, {mealId: item.id})
            }>
            <Image source={IMAGES.EDIT} style={styles.imgEdit} />
          </Pressable> */}
          <Pressable
            onPress={() =>
              NavService.navigate(EHomeScreens.ADD_ENTRY, {meal: item})
            }>
            <Image source={IMAGES.ADD_CIRCLE} style={styles.imgEdit} />
          </Pressable>
        </View>
      </View>
      <Spacer10 />
      {item.meal_record.map(meal =>
        renderBreakfastRow(
          item, //meal type
          meal,
          meal.name,
          `${meal.calories} Cals`,
          `P : ${meal.protien}g`,
          `C : ${meal.carbs}g`,
          `F : ${meal.fat}g`,
        ),
      )}

      <Spacer20 />
      <View style={styles.hr} />
      <ScrollView horizontal style={styles.totalContainer}>
        <Text variant="body2Regular14" fontWeight="700" color="black">
          TOTAL:
        </Text>
        <View style={styles.spacer14} />
        <Text variant="body3Regular12" fontWeight="700" color="gray500">
          {parseFloat(item.total.kcal).toFixed(1)} Cals
        </Text>
        <View style={styles.spacer14} />
        <Text variant="body3Regular12" fontWeight="700" color="success">
          P: {parseFloat(item.total.prot).toFixed(1)}g
        </Text>
        <View style={styles.spacer14} />
        <Text variant="body3Regular12" fontWeight="700" color="yellow">
          C : {parseFloat(item.total.car).toFixed(1)}g
        </Text>
        <View style={styles.spacer14} />
        <Text variant="body3Regular12" fontWeight="700" color="pink">
          F : {parseFloat(item.total.fat).toFixed(1)}g
        </Text>
      </ScrollView>
      <Spacer10 />
    </View>
  );

  const renderListItem = item => (
    <View style={styles.itemContainer}>
      <Text variant="h2Regular20" fontWeight="700">
        {item.name}
      </Text>
      <Pressable
        onPress={() =>
          NavService.navigate(EHomeScreens.ADD_ENTRY, {meal: item})
        }>
        <Image source={IMAGES.ADD_CIRCLE} style={styles.imgEdit} />
      </Pressable>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {renderHeader()}
      <Spacer30 />
      {/* {renderMainButton('Add a quick meal', () => {
        // NavService.navigate(EHomeScreens.ADD_ENTRY),
      })} */}
      {/* <Spacer40 /> */}
      <Spacer10 />
      {renderCalendar()}
      <Spacer10 />
      <Spacer30 />
      {renderDailyIntake()}
      {mealList.map(item => {
        if (item.meal_record.length > 0) {
          return renderBreakfast(item);
        }
        return renderListItem(item);
      })}
      <Spacer40 />
      {loading && <Loading />}
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  toolbar: {textAlign: 'center'},
  imgLeft: {width: 48, height: 56},
  center: {textAlign: 'center', marginVertical: 20},
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
  centerColumn: {alignItems: 'center'},
  indContainer: {
    position: 'absolute',
    top: 50,
    alignItems: 'center',
  },
  txtKcl: {fontSize: 40, fontWeight: '700'},
  progressContainer: {
    flexDirection: 'row',
    marginTop: 60,
    justifyContent: 'space-between',
    width: WIDTH - 60,
  },
  breakfastContainer: {
    paddingTop: 23,
    backgroundColor: theme.colors.primary500,
    paddingHorizontal: 23,
    borderRadius: 5,
  },
  editRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {flexDirection: 'row'},
  imgEdit: {width: 24, height: 24, marginLeft: 10},
  spacer: {width: 24},
  spacer14: {width: 10},
  totalContainer: {flexDirection: 'row', marginTop: 8},
  hr: {
    height: 1,
    backgroundColor: theme.colors.white,
    marginHorizontal: -23,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.primary500,
    marginTop: 16,
    paddingHorizontal: 23,
    height: 72,
    borderRadius: 5,
  },
  dateContainer: {
    alignItems: 'center',
    marginRight: 40,
  },
  activeDay: {
    width: 9,
    height: 9,
    marginTop: 6,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
});
export default DairyScreen;
