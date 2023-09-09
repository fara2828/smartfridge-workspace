
//web: 254999790304-qj2jpp2crdvd635s5s6lqqbm5fnceuup.apps.googleusercontent.com
// ios: 254999790304-6r95fe20tp6mhab4i171c2c3730uclmu.apps.googleusercontent.com
// android: 254999790304-9ojr6k3v85acl32i8uko256kk61gag5t.apps.googleusercontent.com
//
import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar, TouchableOpacity } from 'react-native';
import { View, StyleSheet } from "react-native";
import { WebView } from 'react-native-webview';
import { KakaoLoginWebView } from '../components/KakaoLoginWebView';

// 경로는 실제 KakaoLoginWebView 파일의 위치에 따라 달라집니다.
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';

WebBrowser.maybeCompleteAuthSession();
const useProxy = true;


// export const handleLogin = async (platform, username, password, navigation) => {
export const handleLogin = async (platform) => {
  console.log("[handleLogin] Function called with platform:", platform)  // 로그 추가
  if (platform === 'Kakao') {
    


  } else if (platform === 'Naver') {
    // Naver login logic here
  } else if (platform === 'Google') {
    console.log("platform Google");
    try {
      console.log("Google detected");
      const [userInfo, setUserInfo] = React.useState(null);
      const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "254999790304-9ojr6k3v85acl32i8uko256kk61gag5t.apps.googleusercontent.com",
        iosClientId: "254999790304-6r95fe20tp6mhab4i171c2c3730uclmu.apps.googleusercontent.com",
        webClientId: "254999790304-qj2jpp2crdvd635s5s6lqqbm5fnceuup.apps.googleusercontent.com"

      });

      const handleGoogleSignIn = async () => {
        try {
          console.log("Google detected");
          await promptAsync();
        } catch (error) {
          console.log('login: Error:', error.message);
        }
      };

      return (
        <View style={styles.container}> 
          <Text>제발 로그인좀</Text>
          <Button title="Sign in with google" onPress="{handleGoogleSignIn}"></Button>
          <StatusBar />

        </View>
      )
    } catch (error) {
      console.log('login: Error:', error.message);
    }
  
  }
  // navigation.navigate('MyPage');

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    backgroundColor: '#fff',
  },
});
