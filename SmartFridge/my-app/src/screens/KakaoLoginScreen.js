import React from 'react';
import qs from 'querystring';
import { WebView } from 'react-native-webview';
import { View } from 'react-native';
import { getData, storeUser } from '../asyncStorages/storage'
import { useDispatch } from 'react-redux';
import Config from 'react-native-config';

const REST_API_KEY = Config.REST_API_KEY;

//Storages/storage';

const REDIRECT_URI = Config.REDIRECT_URI;
const userAgent =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1';
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

const grant_type = 'authorization_code';


const requestToken = async (code, navigation, dispatch) => {
  console.log("requestToken params:" + code + navigation)
  const requestTokenUrl = 'https://kauth.kakao.com/oauth/token';
  const requestUserUrl = 'https://kapi.kakao.com/v1/user/access_token_info';


  let ACCESS_TOKEN;
  let body;


  const options = qs.stringify({
    grant_type: grant_type,
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    code,
  });



  try {
    // const formBody = qs.stringify(options);
    const formBody = options;
    const tokenResponse = await fetch(requestTokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: formBody,
    });
    console.log("tokenResponse"+tokenResponse);
     const tokenData = await tokenResponse.json();
     console.log(tokenData);



    ACCESS_TOKEN = tokenData.access_token;
    console.log("ACCESS tOEKN:" + ACCESS_TOKEN);

    body = {
      ACCESS_TOKEN,
      requestUserUrl,
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };

    // 백엔드 API에 요청
    const response = await fetch(REDIRECT_URI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const responseData = await response.json();
    console.log("kakaologin responsedata")
    console.log(responseData);
    const value = responseData.data;
    const result = await storeUser(value);
    console.log(result);
    if (result === 'stored') {
      const user = await getData('user');
      dispatch(read_S(user));
      await navigation.navigate('Main');
    }
    // if (responseData === 'User information saved.') {
    //   navigation.navigate('MyPage');
    // }
  } catch (e) {
    console.log("에러를 확인하시오: " + e);
    console.log()
  }
};

function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const getCode = (target) => {
    const exp = 'code=';
    const condition = target.indexOf(exp);
    if (condition !== -1) {
      const requestCode = target.substring(condition + exp.length);
      console.log(requestCode);
      requestToken(requestCode, navigation, dispatch);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        originWhitelist={['*']}
        scalesPageToFit={false}
        userAgent={userAgent}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={event => {
          const data = event.nativeEvent.url;
          console.log(data);
          getCode(data);
        }}
      />
    </View>
  );
}
export default LoginScreen;
