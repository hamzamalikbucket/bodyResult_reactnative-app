import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import {Spacer20, Spacer30} from '../../components/Spacer';
import {Text} from '../../components/Text';
import {Toolbar} from '../../components/Toolbar';
import {EHomeScreens} from '../../navigation/AppRouts';
import Api from '../../utils/Api';
import {IMAGES} from '../../utils/Images';
import {NavService} from '../../utils/NavService';
import {theme} from '../../utils/Theme';

const AddEntryScreen = () => {
  const {meal} = useRoute().params;
  const [listItem, setListItem] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState('');
  console.log(meal);
  useEffect(() => {
    searchData('');
  }, []);

  const searchData = async text => {
    try {
      setLoading(true);
      const params = {
        name: text,
      };
      const res = await Api.post(`getFoodParameters`, params);
      // console.log('response', res.data);
      setListItem(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    }
  };

  const renderListItem = item => (
    <Pressable
      key={item.id}
      onPress={() =>
        NavService.navigate(EHomeScreens.EDIT_ENTRY, {
          item: item,
          myMeal: meal,
          type: 'add',
        })
      }
      style={styles.itemContainer}>
      <Text variant="body2Regular14" color="black" fontWeight="700">
        {item.name}
      </Text>
    </Pressable>
  );

  const handleSearch = txt => {
    // setListItem(
    //   items.filter(item => item.title.toLowerCase().search(txt) > -1),
    // );

    searchData(txt);
  };

  return (
    <View style={styles.container}>
      <Toolbar title="Search" />
      <Spacer30 />
      <View>
        <TextInput
          style={styles.searchContainer}
          placeholder="Search for foods"
          placeholderTextColor="#A1DAAA"
          onChangeText={handleSearch}
        />
        <Image style={styles.imgSearch} source={IMAGES.SEARCH} />
      </View>
      <Spacer20 />
      <Text variant="body2Regular14" color="black" fontWeight="700">
        Recent meals
      </Text>
      <Spacer20 />
      <ScrollView>{listItem.map(item => renderListItem(item))}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.appPadding,
    backgroundColor: theme.colors.white,
  },
  searchContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.colors.primary,
    paddingLeft: 47,
    height: 48,
  },
  imgSearch: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 12,
    left: 15,
  },
  itemContainer: {
    backgroundColor: theme.colors.primary500,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginBottom: 16,
  },
});
export default AddEntryScreen;
