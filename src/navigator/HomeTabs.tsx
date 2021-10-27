import React, {Component} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from '@/pages/Home';
import {mainColor} from '@/config/theme';

const Tab = createMaterialTopTabNavigator();

class HomeTabs extends Component {
  render() {
    return (
      <Tab.Navigator
        lazy
        tabBarOptions={{
          scrollEnabled: true,
          activeTintColor: mainColor,
          inactiveTintColor: '#333',
          tabStyle: {width: 80},
          indicatorStyle: {
            width: 20,
            height: 4,
            marginLeft: 30,
            borderRadius: 2,
            backgroundColor: mainColor,
          },
        }}>
        <Tab.Screen name="Home" component={Home} options={{title: '推荐'}} />
      </Tab.Navigator>
    );
  }
}

export default HomeTabs;
