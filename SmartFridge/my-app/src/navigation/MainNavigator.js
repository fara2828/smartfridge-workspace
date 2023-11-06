import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import MyPage from '../screens/MyPage';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AddItem from '../screens/AddItemScreen';
import MyFridge from '../screens/MyFridge';
import KakaoLogin from '../screens/KakaoLoginScreen';
import GptRecipe from '../screens/GptRecipe';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MyPage" component={MyPage} options={{ headerShown: false }}/>
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="AddItem" component={AddItem} options={{ headerShown: false }}/>
      <Stack.Screen name="MyFridge" component={MyFridge} options={{ headerShown: false }}/>
      <Stack.Screen name="KakaoLogin" component={KakaoLogin} options={{ headerShown: false }}/>
      <Stack.Screen
        name="GptRecipe"
        component={GptRecipe}
        options={{ headerShown: false }} // 헤더를 숨기는 옵션을 추가합니다.
      />

    </Stack.Navigator>
  );
};

export default MainNavigator;
