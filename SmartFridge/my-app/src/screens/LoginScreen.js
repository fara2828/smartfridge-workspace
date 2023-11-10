import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import Logo from '../assets/images/sm_logo.png';

const LoginScreen = ({ navigation }) => {
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

  const handleLogin = async (platform) => {
    console.log("handleLogin called with platform:", platform);    
    if (platform === 'Kakao') {
      navigation.navigate('KakaoLogin');
      return;
    }   
    if (platform === 'Naver') {
      navigation.navigate('GptRecipe');
      return;
    }


  };

  if (!isReady) {
    return <View><Text>Loading...</Text></View>; // 폰트가 로딩되지 않았을 때 로딩 텍스트를 표시
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>똑똑한 냉장고</Text>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.subtitle}>
        {"냉장고에 뭐가 있더라..?\n아.. 맞다!! 냉장고에 있었는데!\n똑똑한 냉장고와 함께라면,\n식재료 관리가 쉬워집니다"}
      </Text>      
      <TouchableOpacity 
        style={styles.buttonKakao} 
        onPress={() => handleLogin('Kakao')}>
        <Text style={styles.buttonKakaoText}>카카오 계정으로 로그인</Text>
      </TouchableOpacity>
    </View>
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
  logo: {
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
  subtitle: {
    textAlign: 'center',
    marginHorizontal: 20, // 좌우 여백
    marginBottom: 24, // '똑똑한 냉장고' 텍스트와 버튼 사이의 간격
    fontSize: 16, // 글자 크기
    lineHeight: 24, // 줄 간격
    fontFamily: 'NotoSans', // 폰트 패밀리 이름
    color: '#434242', // 글자 색상
  },

  buttonKakao: {
    backgroundColor: '#FEE500', // Kakao's brand color
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 3,     
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonKakaoText: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default LoginScreen;