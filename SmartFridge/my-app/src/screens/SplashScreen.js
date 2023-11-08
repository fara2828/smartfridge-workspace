import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import Loading from '../assets/images/sm_loading.png';
import * as Font from 'expo-font';


const SplashScreen = ({ navigation }) => {
  const [isReady, setIsReady] = useState(false); 
  
  // 폰트 로딩을 위한 useEffect 훅
  useEffect(() => {
    // 비동기 로딩 함수
    const loadFonts = async () => {
      await Font.loadAsync({
        NotoSans: require("../assets/fonts/NotoSans.ttf"),
        Dongle: require("../assets/fonts/Dongle-Regular.ttf"),
      });
      setIsReady(true);
    };
    loadFonts(); // 함수 호출
  }, []);


  useEffect(() => {
    // 로딩이 완료된 후 마이 페이지로 이동하는 로직
    setTimeout(() => {
      navigation.navigate('LoginScreen'); // return 문을 제거
    }, 2000); // 예: 2초 후 이동
  }, [navigation]);


  if (!isReady) {
    return <View><Text>Loading...</Text></View>; // 폰트가 로딩되지 않았을 때 로딩 텍스트를 표시
  }
  return ( // 컴포넌트 렌더링 부분을 추가

    <View style={styles.container}>
      <Text style={styles.title}>똑똑한 냉장고</Text>
      <Image source={Loading} style={styles.loading} />
    </View>

    // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //   <Text style={{ fontSize: 24 }}>똑똑한 냉장고</Text>
    //   <ActivityIndicator size="large" />
    // </View>
  );
};

// StyleSheet info
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  loading: {
    width: 200,
    height: 200,
    marginBottom: 32,
  },
  title: {
    fontSize: 70,
    color: '#000066',
    marginBottom: 48,
    fontFamily: 'Dongle', // 여기에 Dongle-Regular 폰트를 지정
  },

});



export default SplashScreen;
