
//web: 254999790304-qj2jpp2crdvd635s5s6lqqbm5fnceuup.apps.googleusercontent.com
// ios: 254999790304-6r95fe20tp6mhab4i171c2c3730uclmu.apps.googleusercontent.com
// android: 254999790304-9ojr6k3v85acl32i8uko256kk61gag5t.apps.googleusercontent.com
//
import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar, TouchableOpacity, View, StyleSheet, Text, Button } from 'react-native';
import { WebView } from 'react-native-webview';


WebBrowser.maybeCompleteAuthSession();
const useProxy = true;
export const GoogleLoginComponent = () => {
    console.log("Google detected");
    const [userInfo, setUserInfo] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const [request, response, promptAsync] = Google.useAuthRequest({
      androidClientId: "254999790304-9ojr6k3v85acl32i8uko256kk61gag5t.apps.googleusercontent.com",
      iosClientId: "254999790304-6r95fe20tp6mhab4i171c2c3730uclmu.apps.googleusercontent.com",
      webClientId: "254999790304-qj2jpp2crdvd635s5s6lqqbm5fnceuup.apps.googleusercontent.com"

    });

    const handleGoogleSignIn = async () => {
      console.log('hi from GoogleLogin')
      try {
        await promptAsync();
      } catch (error) {
        console.log('login: Error:', error.message);
      }
    };
  
    return (
      <View style={styles.container}>
        <Text>제발 로그인좀</Text>
        <Button title="Sign in with Google" onPress={handleGoogleSignIn} />
        <StatusBar />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 24,
      backgroundColor: '#fff',
    },
  });

