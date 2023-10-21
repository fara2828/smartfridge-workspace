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
      <Stack.Screen name="MyPage" component={MyPage} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="AddItem" component={AddItem} />
      <Stack.Screen name="MyFridge" component={MyFridge} />
      <Stack.Screen name="KakaoLogin" component={KakaoLogin} />
      <Stack.Screen name="GptRecipe" component={GptRecipe} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
