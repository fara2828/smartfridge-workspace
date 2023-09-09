import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';


const LoginScreen = ({ navigation }) => {

  const [view, setView] = useState(null);  // 추가된 부분


  const handleLogin = async (platform) => {
    console.log("handleLogin called with platform:", platform);    
    if (platform === 'Kakao') {
      navigation.navigate('KakaoLogin');
      return;
    }


  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.h1}>똑똑한 냉장고</Text>
      </View>
      <View style={styles.main}>
        <Text style={styles.h1}>로그인</Text>
        <TouchableOpacity style={styles.button} onPress={() => handleLogin('Kakao')}>
          <Text>카카오 계정으로 로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleLogin('Naver')}>
          <Text>네이버 계정으로 로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleLogin('Google')}>
          <Text>구글 계정으로 로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleLogin('Signup')}>
          <Text>회원가입</Text>
        </TouchableOpacity>
        {view}   
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  button: {
    width: '80%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
});


export default LoginScreen;

