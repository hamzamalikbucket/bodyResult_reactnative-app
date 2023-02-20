import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Image, Alert} from 'react-native';
import {Text} from '../../components/Text';
import {Toolbar} from '../../components/Toolbar';
import {theme} from '../../utils/Theme';
import PieChart from 'react-native-pie-chart';
import {Spacer10, Spacer20, Spacer40} from '../../components/Spacer';
import {MainPicker} from '../../components/MainPicker';
import {Volume} from '../../components/Volume';
import {DatePicker} from '../../components/DatePicker';
import {PrimaryButton} from '../../components/PrimaryButton';
import {useRoute} from '@react-navigation/native';
import Api from '../../utils/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {format} from 'date-fns';
import {Loading} from '../../components/Loading';
import {showDialog} from '../../utils/Alert';
import {NavService} from '../../utils/NavService';
const servingList = [
  {
    id: 1,
    name: 'g',
  },
  {
    id: 2,
    name: 'oz',
  },
  {
    id: 3,
    name: 'serving(s)',
  },
];
const EditEntryScreen = () => {
  const {item, myMeal, type} = useRoute().params;

  const [date, setDate] = useState(
    item?.date_selected ? new Date(item.date_selected) : new Date(),
  );
  const [mealList, setMealList] = useState([]);
  const [meal, setMeal] = useState({
    id: myMeal?.id,
    name: myMeal?.name,
  });

  const [servingSize, setServingSize] = useState(item?.quantity || 0);
  const [servingType, setServingType] = useState({id: 1, name: 'g'});
  const [servingNumber, setServingNumber] = useState(item.serving || 0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      setLoading(true);
      const res = await Api.get(`getMealTypes`);
      setMealList(res.data.map(md => ({id: md.id, name: md.name})));
      setMeal({id: res.data[1].id, name: res.data[1].name});
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    }
  };

  const handleAddDiary = async () => {
    const currDate = format(date, 'yyyy-MM-dd');
    const id = await AsyncStorage.getItem('userId');
    if (!meal) {
      showDialog({message: 'Select meal'});
      return;
    }
    if (servingSize <= 0) {
      showDialog({message: 'Select serving size'});
      return;
    }

    const params = {
      name: item.name,
      decimal_or_fraction: 'Decimals',
      numberofserving: servingNumber,
      first_fractions: '0',
      second_fractions: '0',
      select_options: servingType?.name,
      protien: item.protein,
      fat: item.fat,
      carbs: item.carbs,
      calories: item.calories,
      sodium: item.sodium,
      fibre: item.fibre,
      quantity: servingSize,
      meal_type: meal.id,
      food_state: item.food_group || 'Food',
      serving_w_v: 1,
      food_id: type == 'update' ? item.food_id : item.id,
      user_id: id,
      date_selected: currDate,
    };
    if (type == 'update') {
      params.type = 'update';
      params.update_id = item.id;
    } else {
      params.type = 'insert';
    }
    console.log('post params', params);

    try {
      setLoading(true);
      const res = await Api.post(`saveFoodRecord`, params);
      console.log('response', res.data);
      setLoading(false);
      if (type == 'update') {
        NavService.popTo(1);
      } else {
        NavService.popTo(1);
        NavService.popTo(1);
      }
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    }
  };

  const renderChart = () => {
    const renderIndicator = (color, label, scale) => (
      <View style={{flexDirection: 'row'}}>
        <View style={{...styles.indRoot, backgroundColor: color}} />
        <View style={styles.indText}>
          <Text variant="body3Regular12" color="black" fontWeight="700">
            {label}
          </Text>
          <Text variant="body3Regular12" color="gray500" fontWeight="700">
            {scale}
          </Text>
        </View>
      </View>
    );
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            style={{width: 96, height: 96}}
            source={require('../../assets/images/pie_chart.png')}
          />
          <View style={{position: 'absolute', alignItems: 'center'}}>
            <Text variant="body1Regular16" fontWeight="700">
              {item.calories}
            </Text>
            <Text variant="body3Regular12" fontWeight="700" color="gray500">
              Cal
            </Text>
          </View>
        </View>
        {renderIndicator(theme.colors.primary, `${item.protein}g`, 'Protien')}
        {renderIndicator(theme.colors.yellow, `${item.carbs}g`, 'Carbs')}
        {renderIndicator(theme.colors.pink, `${item.fat}g`, 'Fat')}
      </View>
    );
  };
  return (
    <ScrollView style={styles.container}>
      <Toolbar title={type == 'update' ? 'Update Food' : 'Add Food'} />
      <Text
        style={{marginTop: 52, textAlign: 'center'}}
        color="black"
        variant="body1Regular16"
        fontWeight="500">
        {`${item.name}(${item.brand})`}
      </Text>
      <Text
        style={{textAlign: 'center'}}
        color="black"
        variant="body1Regular16"
        fontWeight="500">
        {`${item.servingsize}`}
      </Text>
      <Spacer20 />
      {renderChart()}
      <Spacer40 />
      <Spacer10 />
      <MainPicker
        label={'Meal'}
        list={mealList}
        selected={meal}
        onChange={val => {
          setMeal(val);
        }}
      />
      <Spacer40 />
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Volume
            title={'Portion Consumed'}
            value={servingSize}
            onChange={setServingSize}
          />
        </View>
        <View style={{flex: 1, marginLeft: 10, marginTop: 22}}>
          <MainPicker
            list={servingList}
            selected={servingType}
            onChange={setServingType}
          />
        </View>
      </View>

      <Spacer40 />
      <DatePicker date={date} setDate={setDate} />
      <Spacer40 />
      <Spacer10 />
      <PrimaryButton
        onPress={handleAddDiary}
        title={type == 'update' ? 'Update to Diary' : 'Add to Diary'}
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

  indRoot: {
    width: 15,
    height: 15,
    borderRadius: 5,
  },
  indText: {marginTop: -4, marginLeft: 8},
});
export default EditEntryScreen;
