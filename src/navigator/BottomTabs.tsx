import React, {Component} from 'react';
import {
  RouteProp,
  TabNavigationState,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeTabs from './HomeTabs';
import Found from '@/pages/Found';
import Listen from '@/pages/Listen';
import Account from '@/pages/Account';
import {RootStackNavigation, RootStackParamList} from './index';
import Icon from '@/assets/iconfont/Icon';
import {mainColor} from '@/config/theme';

export type BottomTabParamList = {
  HomeTabs: undefined;
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
  componentDidMount() {
    this.setHeaderOptions();
  }
  componentDidUpdate() {
    this.setHeaderOptions();
  }

  setHeaderOptions = () => {
    const {navigation, route} = this.props;
    const currrentRoute: any = route;
    const routeName = getFocusedRouteNameFromRoute(currrentRoute) || 'HomeTabs';
    if (routeName === 'HomeTabs') {
      navigation.setOptions({
        headerTransparent: true,
        headerTitle: '',
      });
    } else {
      navigation.setOptions({
        headerTransparent: false,
        headerTitle: this.getHeaderTitle(routeName),
      });
    }
  };

  getHeaderTitle = (routeName: string | undefined) => {
    switch (routeName) {
      case 'HomeTabs':
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
      <Tab.Navigator tabBarOptions={{activeTintColor: mainColor}}>
        <Tab.Screen
          name="HomeTabs"
          component={HomeTabs}
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
