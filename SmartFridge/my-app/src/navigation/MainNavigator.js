import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; //
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import SplashScreen from '../screens/SplashScreen';
import MyPage from '../screens/MyPage';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AddItem from '../screens/AddItemScreen';
import MyFridge from '../screens/MyFridge';
import KakaoLogin from '../screens/KakaoLoginScreen';
import GptRecipe from '../screens/GptRecipe';
import * as Font from 'expo-font';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator(); // 탭 네비게이터 생성

// 각 스크린을 포함하는 스택 네비게이터 
function StackNavigator() {
  const [isReady, setIsReady] = useState(false); 

  // 폰트 로딩을 위한 useEffect 훅
  useEffect(() => {
    // 비동기 로딩 함수
    const loadFonts = async () => {
      await Font.loadAsync({
        NotoSans: require("../assets/fonts/NotoSans.ttf"),
        Dongle: require("../assets/fonts/Dongle-Regular.ttf"),
      });
      setIsReady(true);
    };
    loadFonts(); // 함수 호출
  }, []);

  if (!isReady) {
    return <View><Text>Loading...</Text></View>; // 폰트가 로딩되지 않았을 때 로딩 텍스트를 표시
  }
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MyPage" component={MyPage} options={{ 
            title: '나의 냉장고', // 헤더 타이틀 변경
            headerStyle: {
              backgroundColor: '#0054FF', // 헤더 배경색 변경
            },
            headerTintColor: '#fff', // 헤더 타이틀 색상 변경
            headerTitleStyle: {
              fontSize: 30,
              fontFamily: 'Dongle'
            },            
          }}  />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AddItem" component={AddItem} options={{ 
            title: '냉장고 재료 추가', // 헤더 타이틀 변경
            headerStyle: {
              backgroundColor: '#0054FF', // 헤더 배경색 변경
            },
            headerTintColor: '#fff', // 헤더 타이틀 색상 변경
            headerTitleStyle: {
              fontSize: 30,
              fontFamily: 'Dongle'
            },            
          }}  />
      <Stack.Screen name="MyFridge" component={MyFridge} options={{ headerShown: false }} />
      <Stack.Screen name="KakaoLogin" component={KakaoLogin} options={{ headerShown: false }} />
      <Stack.Screen name="GptRecipe" component={GptRecipe} options={{ 
            title: '냉장고 요리 추천', // 헤더 타이틀 변경
            headerStyle: {
              backgroundColor: '#0054FF', // 헤더 배경색 변경
            },
            headerTintColor: '#fff', // 헤더 타이틀 색상 변경
            headerTitleStyle: {
              fontSize: 30,
              fontFamily: 'Dongle'
            },            
          }} 
      />

    </Stack.Navigator>

  );
}
const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          elevation: 0,
          backgroundColor: '#ffffff',
          borderTopStartRadius: 15,
          height: 60,
          ...styles.shadow,
        },
      }}>
      <Tab.Screen name="Home" component={StackNavigator} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#0000ff' : 'grey',
              }}
              source={require('../assets/icons/fridge.jpg')}
            />
          </View>
        ),

      }} />
      <Tab.Screen name="AddItem" component={AddItem} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#0000ff' : 'grey',
              }}
              source={require('../assets/icons/add.png')}
            />
          </View>
        ),
      }} />
      <Tab.Screen name="GptRecipe" component={GptRecipe} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#0000ff' : 'grey',
              }}
              source={require('../assets/icons/recipe.png')}
            />
          </View>
        )
      }} />
      <Tab.Screen name="MyPage" component={MyPage} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#0000ff' : 'grey',
              }}
              source={require('../assets/icons/my.jpg')}
            />
          </View>
        )
      }} />
    </Tab.Navigator>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  button: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'grey',
    shadowOpacity: 0.1,
    shadowOffset: { x: 2, y: 0 },
    shadowRadius: 2,
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    right: 0,
    top: 5,
    left: 5,
    shadowOpacity: 5.0,
  },
  actionBtn: {
    backgroundColor: '#1E90FF',
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
});
