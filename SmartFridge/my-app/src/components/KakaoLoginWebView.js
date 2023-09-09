// KakaoLoginWebView.js
import React from 'react';
import { View, StyleSheet } from "react-native";
import { WebView } from 'react-native-webview';

const REST_API_KEY = '76220cd03a0e12c5f44c41aa4cce2037';
const REDIRECT_URI = 'http://192.168.219.104:19000';
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;
 
function KakaoLoginWebView() {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={event => {
          const data = event.nativeEvent.url;
          getCode(data);
        }}
      />
    </View>
  );
};
