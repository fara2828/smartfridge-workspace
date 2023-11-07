
import React from 'react';
import { Provider } from 'react-redux'; 
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigation/MainNavigator';


import store from './src/reduxStore/store'; 

const App = () => {
  return (
    // Redux의 <Provider> 컴포넌트로 앱을 감싸 하위 컴포넌트의 스토어 접근 허용
    <Provider store={store}> 
      {/* NavigationContainer는 리액트 네비게이션을 위한 컴포넌트입니다. 
           이 컴포넌트 내에서만 네비게이션 관련 작업이 가능합니다. */}
      <NavigationContainer>
        {/* MainNavigator는 앱 내의 주요 페이지를 관리하는 컴포넌트입니다. */}
        <MainNavigator />
      </NavigationContainer>
    </Provider>
  );
};

// App 컴포넌트를 export하여 다른 파일에서 사용할 수 있게 합니다.
export default App;
