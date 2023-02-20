import CheckBox from '@react-native-community/checkbox';
import {View} from 'react-native';
import {theme} from '../utils/Theme';
import {Text} from './Text';

export const Checkbox = ({label, value, onValueChange}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <CheckBox
        tintColor={theme.colors.primary}
        disabled={false}
        value={value}
        onValueChange={onValueChange}
      />
      <Text
        color="black"
        variant="body2Regular14"
        fontWeight="700"
        style={{marginLeft: 8}}>
        {label}
      </Text>
    </View>
  );
};
