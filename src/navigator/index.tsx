import React, {Component} from 'react';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationProp,
} from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import Category from '@/pages/Category/Index';
import {Platform, StatusBar, StyleSheet} from 'react-native';
import Album from '@/pages/Album/Index';

export type RootStackParamList = {
  BottomTabs: {
    screen?: string;
  };
  Category: undefined;
  Album: {
    item: {
      id: string;
      title: string;
      image: string;
    };
  };
};
export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

const getAlbumOptions = ({
  route,
}: {
  route: RouteProp<RootStackParamList, 'Album'>;
}) => {
  return {
    headerTitle: route.params.item.title,
    headerTransparent: true,
    headerTitleStyle: {
      opacity: 0,
    },
  };
};
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
            headerStatusBarHeight: StatusBar.currentHeight,
            headerBackTitleVisible: false, // 隐藏返回标题
            headerTintColor: '#333',
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
          <Stack.Screen
            name="BottomTabs"
            component={BottomTabs}
            options={{title: '首页'}}
          />
          <Stack.Screen
            name="Category"
            component={Category}
            options={{title: '分类'}}
          />
          <Stack.Screen
            name="Album"
            component={Album}
            options={getAlbumOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigator;
