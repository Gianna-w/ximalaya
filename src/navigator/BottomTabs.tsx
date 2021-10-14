import React, {Component} from 'react';
import {RouteProp, TabNavigationState} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '@/pages/Home';
import Found from '@/pages/Found';
import Listen from '@/pages/Listen';
import Account from '@/pages/Account';
import {RootStackNavigation, RootStackParamList} from './index';

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

  getHeaderTitle = (route: Route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : route.params?.screen || 'Home';
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
        <Tab.Screen name="Home" component={Home} options={{title: '首页'}} />
        <Tab.Screen
          name="Listen"
          component={Listen}
          options={{title: '我听'}}
        />
        <Tab.Screen name="Found" component={Found} options={{title: '发现'}} />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{title: '我的'}}
        />
      </Tab.Navigator>
    );
  }
}

export default Navigator;
