import React, {Component} from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import Home from '@/pages/Home/Index';
import {mainColor} from '@/config/theme';
import TabBarWrapper from '@/components/TabBarWrapper';
import {StyleSheet} from 'react-native';

const Tab = createMaterialTopTabNavigator();

class HomeTabs extends Component {
  renderTabBar = (props: MaterialTopTabBarProps) => {
    return <TabBarWrapper {...props} />;
  };

  render() {
    return (
      <Tab.Navigator
        lazy
        tabBar={this.renderTabBar}
        sceneContainerStyle={styles.sceneContainer}
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

const styles = StyleSheet.create({
  sceneContainer: {
    backgroundColor: 'transparent',
  },
});

export default HomeTabs;
