import {Image, View, StyleSheet, Pressable} from 'react-native';
import {IMAGES} from '../utils/Images';
import {theme} from '../utils/Theme';
import {Text} from './Text';
import {format, fromUnixTime, parse} from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useState} from 'react';
export const DatePicker = ({date, setDate}) => {
  const [show, setShow] = useState(false);
  return (
    <View>
      <Text color="gray500" variant="body2Regular14" fontWeight="700">
        Date
      </Text>
      <Pressable style={styles.picker} onPress={() => setShow(true)}>
        <Text variant="body2Regular14" fontWeight="700">
          {format(date || new Date(), 'dd/MM/yyyy')}
        </Text>
        <Image style={{width: 24, height: 24}} source={IMAGES.calendar} />
      </Pressable>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date(date) || new Date()}
          onChange={value => {
            setShow(false);
            if (value.type == 'set') {
              setDate(value.nativeEvent.timestamp);
            }
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: 48,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.primary500,
    borderRadius: 5,
    paddingLeft: 9,
    paddingRight: 26,
    marginTop: 12,
  },
});
