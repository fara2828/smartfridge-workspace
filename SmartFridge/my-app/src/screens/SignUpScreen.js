import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignUp = () => {
    // 일반 회원가입 로직
    // 예: API 호출하여 회원가입 처리
    Alert.alert('회원가입 성공', '환영합니다!');
    navigation.navigate('MyPage');
  };

  const handleSocialLogin = (provider) => {
    // 소셜 로그인 로직
    // 예: Kakao, Google, Naver 로그인 처리
    Alert.alert(`${provider}로 회원가입 성공`, '환영합니다!');
    navigation.navigate('MyPage');
  };

  return (
    <View>
      <TextInput placeholder="Username" onChangeText={setUsername} />
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Sign Up with Kakao" onPress={() => handleSocialLogin('Kakao')} />
      <Button title="Sign Up with Google" onPress={() => handleSocialLogin('Google')} />
      <Button title="Sign Up with Naver" onPress={() => handleSocialLogin('Naver')} />
    </View>
  );
};

export default SignUpScreen;
