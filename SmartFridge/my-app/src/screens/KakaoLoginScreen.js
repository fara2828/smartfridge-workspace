import React from 'react';
import qs from 'querystring';  // 쿼리 문자열을 다루기 위한 라이브러리
import { WebView } from 'react-native-webview';  // 웹뷰를 사용하기 위한 라이브러리
import { View } from 'react-native';  // React Native의 View 컴포넌트
import { getData, storeUser } from '../asyncStorages/storage';  // 로컬 스토리지에서 데이터를 가져오고 저장하는 함수
import { useDispatch } from 'react-redux';  // Redux의 dispatch를 사용하기 위한 hook
import Config from 'react-native-config';  // 환경 변수를 관리하기 위한 라이브러리
import { addUserSuccess } from '../reducers/userReducer';  // 사용자 정보를 저장하기 위한 Redux 액션
import { API_BASE_URL } from '../services/apiConfig';
// Kakao API 정보 (환경 변수에서 불러올 수도 있습니다.)
const REST_API_KEY = "76220cd03a0e12c5f44c41aa4cce2037";
//집 ip
//const REDIRECT_URI = "http://192.168.219.107:3000/login";
const REDIRECT_URI = API_BASE_URL+'/login';

// 웹뷰에 사용할 사용자 에이전트와 자바스크립트 코드
const userAgent = 'Mozilla/5.0 ...';
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

// OAuth2 인증에 사용할 grant_type
const grant_type = 'authorization_code';

// 카카오 OAuth 토큰을 요청하는 함수
const requestToken = async (code, navigation, dispatch) => {

  console.log("requestToken params:" + code + navigation)
  const requestTokenUrl = 'https://kauth.kakao.com/oauth/token'; //  Kakao의 OAuth 토큰을 요청할 URL
  const requestUserUrl = 'https://kapi.kakao.com/v1/user/access_token_info'; // 사용자 정보를 가져올 URL
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
    const tokenData = await tokenResponse.json();

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
    // redirect_uri 에 설정된 /login, userController.js의 login으로 
    const response = await fetch(REDIRECT_URI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const loginResponse = await response.json();
    console.log("kakaologin loginResponse")
    console.log(loginResponse);
    // 카카오 API에서 받아온 사용자 정보 
    /*
    const response = {
      result: 'success',
      items,
      user
    }; */

    // 카카오 사용자 정보를 로컬 스토리지에 저장
    const result = await storeUser(loginResponse);
    console.log('------------------------------------result-------------------------------------------');
    console.log(result);

    // 로컬 스토리지에 성공적으로 저장되었으면
    if (result === 'stored') {
      // Redux의 상태를 업데이트하고 다음 페이지로 이동
      const user = await getData('user');

      dispatch(addUserSuccess(user));
      console.log('addUserSuccess');
     // 변경 후: loginResponse의 user와 items을 MyPage로 전달
      await navigation.navigate('MyPage', { user: loginResponse.user, items: loginResponse.items });

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
