import React, {Component} from 'react';
import {
  RouteProp,
  TabNavigationState,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '@/pages/Home';
import Found from '@/pages/Found';
import Listen from '@/pages/Listen';
import Account from '@/pages/Account';
import {RootStackNavigation, RootStackParamList} from './index';
import Icon from '@/assets/iconfont/Icon';

export type BottomTabParamList = {
  Home: undefined;
  Found: undefined;
  Listen: undefined;
  Account: undefined;
};

type Route = RouteProp<RootStackParamList, 'BottomTabs'> & {
  state?: TabNavigationState<BottomTabParamList>;
};

interface IProps {
  navigation: RootStackNavigation;
  route: Route;
}

const Tab = createBottomTabNavigator<BottomTabParamList>();

class Navigator extends Component<IProps> {
  componentDidUpdate() {
    const {navigation, route} = this.props;
    navigation.setOptions({
      headerTitle: this.getHeaderTitle(route),
    });
  }

  getHeaderTitle = (route: any) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    switch (routeName) {
      case 'Home':
        return '首页';
      case 'Listen':
        return '我听';
      case 'Found':
        return '发现';
      case 'Account':
        return '账户';
      default:
        return '首页';
    }
  };

  render() {
    return (
      <Tab.Navigator tabBarOptions={{activeTintColor: '#f86442'}}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: '首页',
            tabBarIcon: ({color, size}) => (
              <Icon color={color} size={size} name="icon-home-fill" />
            ),
          }}
        />
        <Tab.Screen
          name="Listen"
          component={Listen}
          options={{
            title: '我听',
            tabBarIcon: ({color, size}) => (
              <Icon color={color} size={size} name="icon-collection" />
            ),
          }}
        />
        <Tab.Screen
          name="Found"
          component={Found}
          options={{
            title: '发现',
            tabBarIcon: ({color, size}) => (
              <Icon color={color} size={size} name="icon-fill-find" />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            title: '我的',
            tabBarIcon: ({color, size}) => (
              <Icon color={color} size={size} name="icon-account" />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default Navigator;
