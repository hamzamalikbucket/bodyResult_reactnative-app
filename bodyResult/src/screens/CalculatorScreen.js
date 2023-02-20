import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {Checkbox} from '../components/Checkbox';
import {Loading} from '../components/Loading';
import {MainPicker} from '../components/MainPicker';
import {PrimaryButton} from '../components/PrimaryButton';
import {Spacer10, Spacer20, Spacer30, Spacer40} from '../components/Spacer';
import {Text} from '../components/Text';
import {Toolbar} from '../components/Toolbar';
import {Volume} from '../components/Volume';
import {showDialog} from '../utils/Alert';
import Api from '../utils/Api';
import {EFontFamily, theme} from '../utils/Theme';

const genderList = [
  {id: 1, name: 'Male'},
  {id: 2, name: 'Female'},
];
var dailyActivity = [
  {
    label: 'Spend most of the day sitting (Bank Teller, Desk Job)',
    value: 'Light Activity',
  },
  {
    label: 'Spend a good part of the day standing(Teacher, Salesman)',
    value: 'Sedentary',
  },
  {
    label:
      'Spend a good part of the day doing physical activity (Waitress, Mailman)',
    value: 'Active',
  },
  {
    label:
      'Spend most of the day doing heavy physical activity (Messenger, Carpenter)',
    value: 'Very Active',
  },
];
const exerciseData = [
  {
    label:
      'I walk, jog, run, play a sport, do resistance training and or do a bit of weights training',
    value: 'Light',
  },
  {
    label: 'I lift weights, I push myself, And I am toning or building muscles',
    value: 'Moderate',
  },
  {
    label: 'I am a body builder. I train hard and I am massive.',
    value: 'Difficult',
  },
  {
    label:
      'I train to be bigger than a Greek God. I eat body builders for breakfast!',
    value: 'High',
  },
];
const goalList = [
  {label: 'Fat loss/Toning', value: 'fatloss'},
  {label: 'Maximum energy', value: 'maximumenergy'},
  {label: 'Building muscles', value: 'buildingmuscles'},
];
const days = [0, 1, 2, 3, 4, 5, 6, 7];
const CalculatorScreen = () => {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState(0);
  const [unit, setUnit] = useState('im');
  const [height, setHeight] = useState({ft: 0, in: 0});
  const [weight, setWeight] = useState(0);
  const [dailyActive, setDailyActive] = useState('Light Activity');
  const [selectedDay, setSelectedDay] = useState(0);
  const [exercise, setExercise] = useState(0);
  const [intenseExercise, setIntenseExercise] = useState('Light');
  const [goal, setGoal] = useState('fatloss');
  const [chkNone, setChkNone] = useState(false);
  const [chkCardio, setChkCardio] = useState(false);
  const [chkWeight, setChkWeight] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    if (!gender) {
      showDialog({message: 'Select gender'});
    } else {
      var tempUnit = {};
      var convertToKg = weight;
      var converToCms = height.ft;
      if (unit == 'im') {
        tempUnit = {
          height_ft: height.ft,
          height_inch: height.in,
          weight_lbs: weight,
        };
        convertToKg = weight / 2.2;
        converToCms = (height.ft * 12 + height.in) / 2.54;
      } else if (unit == 'me') {
        tempUnit = {
          height_inch: height.ft,
          weight_kgs: weight,
        };
      }
      var bmr = 5 + 10 * convertToKg + 6.25 * converToCms - 5 * age;
      var suggestedFat = Math.round(convertToKg * 0.77);
      if (gender.name == 'Female') {
        bmr = -161 + 10 * convertToKg + 6.25 * converToCms - 5 * age;
        suggestedFat = Math.round(convertToKg * 0.88);
      }
      var _dailyActivity = 0;
      switch (dailyActive) {
        case 'Sedentary':
          _dailyActivity = 1.15;
          break;
        case 'Light Activity':
          _dailyActivity = 1.25;
          break;
        case 'Active':
          _dailyActivity = 1.35;
          break;
        case 'Very Active':
          _dailyActivity = 1.4;
          break;
      }
      const tdee = bmr * _dailyActivity;
      var suggestedCalories = 0;
      switch (goal) {
        case 'fatloss':
          suggestedCalories = Math.round(tdee * 0.8);
          break;
        case 'maximumenergy':
          suggestedCalories = Math.round(tdee);
          break;
        case 'buildingmuscles':
          suggestedCalories = Math.round(tdee * 1.1);
          break;
      }
      var suggestedProtein = 0;
      if (chkNone == true) {
        suggestedProtein = Math.round(weight * 1);
      }
      if (chkCardio == true) {
        suggestedProtein = Math.round(weight * 1.35);
      }
      if (chkWeight == true) {
        suggestedProtein = Math.round(weight * 1.8);
      }

      const caloriesProteinFat = Math.round(
        suggestedProtein * 4 + suggestedFat * 9,
      );

      const suggestedCarbs =
        Math.round(suggestedCalories - caloriesProteinFat) / 4;

      console.log('Suggested calories', suggestedCalories);
      console.log('Suggested Protein', suggestedProtein);
      console.log('Suggested Carbs', suggestedCarbs);
      console.log('Suggested Fat', suggestedFat);

      const id = await AsyncStorage.getItem('userId');
      const name = await AsyncStorage.getItem('name');
      const email = await AsyncStorage.getItem('email');

      const params = {
        name: name,
        email: email,
        gender: gender?.name || '',
        age: age,
        ...tempUnit,
        daily_activities: dailyActive,

        days_per_week_exercise: selectedDay,
        minutes_per_day_exercise: exercise,
        intense_exercise: intenseExercise,
        training_do_you_do_none: chkNone == true ? 'none' : '',
        training_do_you_do_cardio: chkCardio == true ? 'cardio' : '',
        training_do_you_do_weightresistance:
          chkWeight == true ? 'weightsresistance' : '',
        goals: goal,
        user_id: id,
        protein_result: suggestedProtein,
        fat_result: suggestedFat,
        carbs_result: suggestedCarbs,
        calories_result: suggestedCalories,
      };
      try {
        setLoading(true);
        const res = await Api.post(`calculator`, params);
        showDialog({message: 'Data added successfully.'});
        setLoading(false);
      } catch (error) {
        setLoading(false);
        showDialog({message: 'An error occurs, please try again.'});
        console.log('error', error);
      }
    }
  };

  const renderSwitch = () => (
    <View style={styles.switchContainer}>
      <Pressable
        onPress={() => setUnit('im')}
        style={unit == 'im' ? styles.active : styles.notActive}>
        <Text
          color={unit == 'im' ? 'white' : 'primary'}
          variant="body2Regular14"
          fontWeight="700">
          IMPERIAL
        </Text>
      </Pressable>
      <Pressable
        onPress={() => setUnit('me')}
        style={unit == 'me' ? styles.active : styles.notActive}>
        <Text
          color={unit == 'me' ? 'white' : 'primary'}
          variant="body2Regular14"
          fontWeight="700">
          METRIC
        </Text>
      </Pressable>
    </View>
  );

  const renderHeightWeight = () => (
    <View style={styles.hwContainer}>
      <View style={{flex: 1}}>
        <Text variant="body2Regular14" color="gray500" fontWeight="700">
          Enter your height
        </Text>
        {unit == 'im' ? (
          <View style={styles.heightContainer}>
            <View style={styles.ftContainer}>
              <TextInput
                style={styles.txtFt}
                placeholderTextColor="black"
                placeholder="0"
                keyboardType="number-pad"
                onChangeText={val => setHeight({...height, ft: val})}
              />
              <Text variant="body3Regular12" color="primary" fontWeight="700">
                Ft
              </Text>
            </View>
            <View style={styles.inContainer}>
              <TextInput
                style={styles.txtIn}
                placeholderTextColor="black"
                placeholder="0"
                keyboardType="number-pad"
                onChangeText={val => setHeight({...height, in: val})}
              />
              <Text variant="body3Regular12" color="primary" fontWeight="700">
                in
              </Text>
            </View>
          </View>
        ) : (
          <View style={[styles.ftContainer, {marginTop: 24}]}>
            <TextInput
              style={styles.txtFt}
              placeholderTextColor="black"
              placeholder="0"
              keyboardType="number-pad"
              onChangeText={val => setHeight({...height, ft: val})}
            />
            <Text variant="body3Regular12" color="primary" fontWeight="700">
              cms
            </Text>
          </View>
        )}
      </View>
      <View style={styles.weightContainer}>
        <Text variant="body2Regular14" color="gray500" fontWeight="700">
          Enter your weight
        </Text>
        {unit == 'im' ? (
          <View style={styles.lbsBody}>
            <TextInput
              style={styles.txtLbs}
              placeholderTextColor="black"
              placeholder="00"
              keyboardType="number-pad"
              onChangeText={setWeight}
            />
            <Text variant="body3Regular12" color="primary" fontWeight="700">
              lbs
            </Text>
          </View>
        ) : (
          <View style={styles.lbsBody}>
            <TextInput
              style={styles.txtLbs}
              placeholderTextColor="black"
              placeholder="00"
              keyboardType="number-pad"
              onChangeText={setWeight}
            />
            <Text variant="body3Regular12" color="primary" fontWeight="700">
              kgs
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderDailyActivity = () => (
    <View>
      <Text variant="body2Regular14" color="gray500" fontWeight="700">
        Describe your normal daily activities?
      </Text>
      <Spacer20 />
      <RadioForm>
        {dailyActivity.map((obj, i) => (
          <RadioButton labelHorizontal={true} key={i}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButtonInput
                obj={obj}
                index={i}
                isSelected={dailyActive === obj.value}
                onPress={value => setDailyActive(value)}
                borderWidth={1}
                buttonInnerColor={theme.colors.primary}
                buttonOuterColor={
                  dailyActive === obj.value
                    ? theme.colors.primary
                    : theme.colors.black
                }
                selectedButtonColor={theme.colors.primary}
                buttonSize={15}
                buttonOuterSize={30}
                buttonStyle={{borderWidth: 2, marginTop: 15}}
              />
              <RadioButtonLabel
                obj={obj}
                index={i}
                labelHorizontal={true}
                onPress={value => setDailyActive(value)}
                labelStyle={{
                  marginRight: 30,
                  fontSize: 14,
                  fontWeight: '700',
                  fontFamily: EFontFamily.REGULAR,
                  color: theme.colors.gray500,
                  marginTop: 15,
                }}
                labelWrapStyle={{}}
              />
            </View>
          </RadioButton>
        ))}
      </RadioForm>
    </View>
  );

  const renderWeekExercise = () => (
    <View>
      <Text variant="body2Regular14" color="gray500" fontWeight="700">
        Days per Week Exercising?
      </Text>
      <Spacer20 />
      <ScrollView horizontal>
        {days.map(val => (
          <Pressable
            onPress={() => setSelectedDay(val)}
            style={
              val == selectedDay ? styles.selectedDayActive : styles.selectedDay
            }>
            <Text
              variant="body2Regular14"
              color={val == selectedDay ? 'white' : 'primary'}
              fontWeight="700">
              {val}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );

  const renderIntenseExercise = () => (
    <View>
      <Text variant="body2Regular14" color="gray500" fontWeight="700">
        How intense is your exercise?
      </Text>
      <Spacer20 />
      <RadioForm
      // radio_props={exerciseData}
      // initial={0}
      // buttonOuterSize={30}
      // buttonSize={15}
      // buttonColor={theme.colors.black}
      // selectedButtonColor={theme.colors.primary}
      // onPress={value => setIntenseExercise(value)}
      // labelStyle={styles.radioLabel}
      >
        {exerciseData.map((obj, i) => (
          <RadioButton labelHorizontal={true} key={i}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButtonInput
                obj={obj}
                index={i}
                isSelected={intenseExercise === obj.value}
                onPress={value => setIntenseExercise(value)}
                borderWidth={1}
                buttonInnerColor={theme.colors.primary}
                buttonOuterColor={
                  intenseExercise === obj.value
                    ? theme.colors.primary
                    : theme.colors.black
                }
                selectedButtonColor={theme.colors.primary}
                buttonSize={15}
                buttonOuterSize={30}
                buttonStyle={{borderWidth: 2, marginTop: 15}}
              />
              <RadioButtonLabel
                obj={obj}
                index={i}
                labelHorizontal={true}
                onPress={value => setIntenseExercise(value)}
                labelStyle={{
                  marginRight: 30,
                  fontSize: 14,
                  fontWeight: '700',
                  fontFamily: EFontFamily.REGULAR,
                  color: theme.colors.gray500,
                  marginTop: 15,
                }}
                labelWrapStyle={{}}
              />
            </View>
          </RadioButton>
        ))}
      </RadioForm>
    </View>
  );

  const renderTraining = () => (
    <View>
      <Text variant="body2Regular14" color="gray500" fontWeight="700">
        What training do you do?
      </Text>
      <Spacer20 />
      <Checkbox label="None" value={chkNone} onValueChange={setChkNone} />
      <Checkbox
        label="Cardio / Sport"
        value={chkCardio}
        onValueChange={setChkCardio}
      />
      <Checkbox
        label="Weights / Resistance"
        value={chkWeight}
        onValueChange={setChkWeight}
      />
    </View>
  );

  const renderGoals = () => (
    <View>
      <Text variant="body2Regular14" color="gray500" fontWeight="700">
        What are your goals?
      </Text>
      <Spacer20 />
      <RadioForm
      // radio_props={goalList}
      // initial={0}
      // buttonOuterSize={30}
      // buttonSize={15}
      // buttonColor={theme.colors.black}
      // selectedButtonColor={theme.colors.primary}
      // onPress={value => setGoal(value)}
      // labelStyle={styles.radioLabel}
      >
        {goalList.map((obj, i) => (
          <RadioButton labelHorizontal={true} key={i}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButtonInput
                obj={obj}
                index={i}
                isSelected={goal === obj.value}
                onPress={value => setGoal(value)}
                borderWidth={1}
                buttonInnerColor={theme.colors.primary}
                buttonOuterColor={
                  goal === obj.value ? theme.colors.primary : theme.colors.black
                }
                selectedButtonColor={theme.colors.primary}
                buttonSize={15}
                buttonOuterSize={30}
                buttonStyle={{borderWidth: 2, marginTop: 15}}
              />
              <RadioButtonLabel
                obj={obj}
                index={i}
                labelHorizontal={true}
                onPress={value => setGoal(value)}
                labelStyle={{
                  marginRight: 30,
                  fontSize: 14,
                  fontWeight: '700',
                  fontFamily: EFontFamily.REGULAR,
                  color: theme.colors.gray500,
                  marginTop: 15,
                }}
                labelWrapStyle={{}}
              />
            </View>
          </RadioButton>
        ))}
      </RadioForm>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Toolbar title="Calculator" back={false} />
      <Spacer40 />
      <MainPicker
        label={'Gender'}
        list={genderList}
        selected={gender}
        onChange={setGender}
      />
      <Spacer20 />
      <Volume title="Enter your age" value={age} onChange={setAge} />
      {renderSwitch()}
      {renderHeightWeight()}
      <Spacer40 />
      <Spacer20 />
      {renderDailyActivity()}
      <Spacer40 />
      <Spacer20 />
      {renderWeekExercise()}
      <Spacer40 />
      <Spacer20 />
      <Volume
        title="Minutes/day exercising (Including Cardio)?"
        value={exercise}
        onChange={setExercise}
      />
      <Spacer40 />
      <Spacer20 />
      {renderIntenseExercise()}
      <Spacer40 />
      <Spacer20 />
      {renderTraining()}
      <Spacer40 />
      <Spacer20 />
      {renderGoals()}
      <Spacer30 />
      {loading && <ActivityIndicator size="large" color={theme.colors.pink} />}
      <Spacer10 />
      <PrimaryButton onPress={handleCalculate} title="Let’s Calculate" />
      <Spacer40 />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.appPadding,
    backgroundColor: theme.colors.white,
  },
  switchContainer: {
    alignSelf: 'center',
    marginVertical: 56,
    width: 188,
    height: 32,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    flexDirection: 'row',
  },
  active: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  notActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioLabel: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: EFontFamily.REGULAR,
    color: theme.colors.gray500,
    height: 55,
  },
  hwContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heightContainer: {flexDirection: 'row', marginTop: 24},
  ftContainer: {flex: 1, alignItems: 'center'},
  txtFt: {
    backgroundColor: theme.colors.primary500,
    width: '100%',
    textAlign: 'center',
    borderRadius: 5,
  },
  inContainer: {flex: 1, marginLeft: 8, alignItems: 'center'},
  txtIn: {
    backgroundColor: theme.colors.primary500,
    width: '100%',
    textAlign: 'center',
    borderRadius: 5,
  },
  weightContainer: {flex: 1, marginLeft: 18},
  lbsBody: {
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
    marginTop: 24,
    borderRadius: 5,
  },
  txtLbs: {
    backgroundColor: theme.colors.primary500,
    width: '100%',
    textAlign: 'center',
  },
  selectedDay: {
    width: 32,
    height: 40,
    backgroundColor: theme.colors.white,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  selectedDayActive: {
    width: 32,
    height: 40,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
});
export default CalculatorScreen;
