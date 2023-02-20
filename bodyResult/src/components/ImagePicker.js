import React from 'react';
import {Image, Modal, Pressable, View, StyleSheet} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {theme} from '../utils/Theme';
import {Text} from './Text';

export const ImagePicker = ({visibility, onImageSelect, onCancel}) => {
  const handleCamera = () => {
    ImageCropPicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: true,
      includeExif: true,
    }).then(image => {
      onImageSelect(image);
    });
  };
  const handleGallery = () => {
    ImageCropPicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    }).then(image => {
      onImageSelect(image);
    });
    // RNImagePicker.launchImageLibrary(
    //   {
    //     selectionLimit: 0,
    //     mediaType: 'photo',
    //     includeBase64: false,
    //     includeExtra,
    //   },
    //   onImageSelect,
    // );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visibility}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>Upload Image</Text>
          <View style={styles.spacer} />
          <Pressable onPress={handleCamera} style={styles.action}>
            <Text color="primary">Select From Camera</Text>
          </Pressable>
          <View style={styles.spacer} />
          <Pressable onPress={handleGallery} style={styles.action}>
            <Text color="primary">Select From Gallery</Text>
          </Pressable>
          <View style={styles.spacer} />
          <View style={styles.spacer} />
          <Pressable
            onPress={onCancel}
            style={[styles.action, {borderColor: theme.colors.danger}]}>
            <Text color="danger">Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000090',
  },
  modalView: {
    margin: 20,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  spacer: {height: 20},
  action: {
    borderWidth: 1,
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    borderColor: theme.colors.primary,
  },
});
