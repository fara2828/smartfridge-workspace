// KakaoLoginWebView.js
import React from 'react';
import { View, StyleSheet } from "react-native";
import { WebView } from 'react-native-webview';

export const KakaoLoginWebView = () => {
  const REST_API_KEY = '76220cd03a0e12c5f44c41aa4cce2037';
  const REDIRECT_URI = 'http://192.168.219.103:19000';
  
 

  const handleWebViewNavigationStateChange = (data) => {
    console.log("[handleWebViewNavigationStateChange] Function called with data:", data);  // 로그 추가
//    const exp = "code=";
    // var condition = data.indexOf(exp);    
    // if (condition != -1) {
    //   var authorize_code = data.substring(condition + exp.length);
    //   console.log(authorize_code);
    // } else {
    //   console.log("Condition is -1, 'code=' not found in data");  // 조건이 거짓일 때 로그 추가
    // }
    console.log(data);
  }

  return (
    <View style={Styles.container}>      
      <WebView
        style={{ flex: 1 }}
        originWhitelist={['*']}
        scalesPageToFit={false}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        javaScriptEnabled
        onNavigationStateChange={event => {
          console.log("onNavigationStateChange event:", event);  // 이 로그를 추가
          handleWebViewNavigationStateChange(event["url"]);
          console.log("event url 은?!: "+ event["url"]);
        }}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView received error: ', nativeEvent);
        }}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    backgroundColor: '#fff',
  },    
});


