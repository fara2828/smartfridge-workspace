

import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, AsyncStorage } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

export const GoogleLoginComponent = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "254999790304-9ojr6k3v85acl32i8uko256kk61gag5t.apps.googleusercontent.com",
    iosClientId: "254999790304-6r95fe20tp6mhab4i171c2c3730uclmu.apps.googleusercontent.com",
    webClientId: "254999790304-qj2jpp2crdvd635s5s6lqqbm5fnceuup.apps.googleusercontent.com"
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      getUserInfo(authentication.accessToken);
    }
  }, [response]);

  const getUserInfo = async (token) => {
    try {
      const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await res.json();
      await AsyncStorage.setItem('@user', JSON.stringify(user));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Sign in with Google"
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
