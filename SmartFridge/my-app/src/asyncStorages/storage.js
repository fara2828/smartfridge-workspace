import AsyncStorage from '@react-native-async-storage/async-storage';
const addUserSuccesss = require('../reducers/userReducer'); // 필요한 경우 주석을 해제하세요
// const ILocation = require('../screens/cLocation'); // 필요한 경우 주석을 해제하세요
// const Iuser = require('../types'); // 필요한 경우 주석을 해제하세요

const storeUser = async (value) => {
  
  console.log('storage.js');
  console.log(value);
  if (value.result === 'success') {
    try {
      const storeData = await AsyncStorage.setItem(
        'user',
        JSON.stringify(value.data)
      );
      return 'stored';
    } catch (e) {
      console.log(e, '스토어 에러');
      return '';
    }
  } else {
    console.log('카카오 로그인 정보 가져오기 실패');
    return '';
  }
};

const getData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return JSON.parse(data);
  } catch (e) {
    console.log('gotDataa error', e);
    return e;
  }
};

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e, 'store 에러');
  }
};

const storeSpot = async (value) => {
  try {
    await AsyncStorage.setItem('spot', JSON.stringify(value));
  } catch (e) {
    console.log(e, '스토어 스팟 에러');
  }
};

const getSpot = async () => {
  try {
    const spot = await AsyncStorage.getItem('spot');
    if (spot === null) throw new Error();
    return JSON.parse(spot);
  } catch (e) {
    console.log(e, 'getSpot 에러');
    return null;
  }
};

const removeItemByKey = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e, 'remove storage error');
  }
};

const setDataToStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e, `${key} setDataToStorage 에러`);
  }
};

module.exports = {
  storeUser,
  getData,
  storeData,
  storeSpot,
  getSpot,
  removeItemByKey,
  setDataToStorage,
};
