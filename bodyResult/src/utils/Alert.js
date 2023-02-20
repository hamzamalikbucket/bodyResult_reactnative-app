import {Alert} from 'react-native';

export const showDialog = props => {
  Alert.alert(
    props.title ?? 'Attention',
    props.message,
    [
      {
        text: 'OK',
        onPress: value => {
          if (props.onOKClick != null) {
            props.onOKClick();
          }
        },
      },
    ],
    {cancelable: false},
  );
};

export const ConfirmationDialog = ({title, message, onYesClick, onNoClick}) => {
  Alert.alert(
    title ?? 'Attention',
    message,
    [
      {
        text: 'Yes',
        onPress: value => {
          if (onYesClick != null) {
            onYesClick();
          }
        },
      },
      {
        text: 'No',
        onPress: value => {
          if (onNoClick != null) {
            onNoClick();
          }
        },
      },
    ],
    {cancelable: false},
  );
};
