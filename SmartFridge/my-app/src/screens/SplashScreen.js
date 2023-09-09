import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // 로딩이 완료된 후 마이 페이지로 이동하는 로직
    setTimeout(() => {
      navigation.navigate('LoginScreen'); // return 문을 제거했습니다.
    }, 2000); // 예: 2초 후 이동
  }, [navigation]);

  return ( // 컴포넌트 렌더링 부분을 추가했습니다.
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>똑똑한 냉장고</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default SplashScreen;
