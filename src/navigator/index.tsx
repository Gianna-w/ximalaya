import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationProp,
} from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import {Platform, StyleSheet} from 'react-native';

export type RootStackParamList = {
  BottomTabs: {
    screen?: string;
  };
  Found: {id: string};
};
export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();
class Navigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          headerMode="float" // 渲染一个保持在顶部的标题并随着屏幕的变化而动画，与ios统一
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyleInterpolator: HeaderStyleInterpolators.forUIKit, // 页面切换风格
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // 水平切换
            gestureEnabled: true, // 使用手势
            gestureDirection: 'horizontal', // 水平手势
            headerStyle: {
              ...Platform.select({
                android: {
                  // 设置安卓标题栏的边框阴影
                  elevation: 0,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                },
              }),
            },
          }}>
          <Stack.Screen name="BottomTabs" component={BottomTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigator;
