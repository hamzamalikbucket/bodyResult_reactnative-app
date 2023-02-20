import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Api = axios.create({
  baseURL: 'https://duaacollection.com/lms_app/api/',
});

Api.interceptors.request.use(
  async config => {
    const userId = await AsyncStorage.getItem('userId');
    config.params = {...config.params, loginUserId: userId};
    return config;
  },
  error => Promise.reject(error),
);

Api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log({error});
    if (error?.response?.status === 409) {
      return 'error something went wrong';
    }
    if (error?.response?.status === 400) {
      console.log('err--===--', error.response);
      return Promise.reject(error?.response.data);
    }
    if (error?.response?.status === 401) {
      console.log('---unauthorized---');
      return Promise.reject(error);
    }
    if (error?.response?.status === 500) {
      console.log(error);

      return Promise.reject(error);
    }
    if (error?.response?.status === 426) {
      // NavigationService.navigate('Update');
    }
    if (error?.response?.status === 422) {
      if (error?.response?.data?.errors == null) {
        return false;
      }

      const data = Object.values(error?.response?.data?.errors);

      if (data.length > 0) {
        console.log('********************');
        console.log('ERROR', data);
        console.log('********************');
      }
    }

    return Promise.reject(error);
  },
);

export default Api;
