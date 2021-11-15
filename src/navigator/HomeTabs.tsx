import React, {Component} from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import Home from '@/pages/Home/Index';
import {mainColor} from '@/config/theme';
import TabBarWrapper from '@/components/TabBarWrapper';
import {StyleSheet} from 'react-native';
import {RootState} from '../models';
import {connect, ConnectedProps} from 'react-redux';
import {ICategory} from '@/models/category';
import {createHomeModel} from '@/config/dva';

export type HomeParamsList = {
  [key: string]: {
    namespace: string;
  };
};
const Tab = createMaterialTopTabNavigator<HomeParamsList>();

const mapStateToProps = ({category}: RootState) => {
  return {
    myCategorys: category.myCategorys,
  };
};
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}
class HomeTabs extends Component<IProps> {
  renderTabBar = (props: MaterialTopTabBarProps) => {
    return <TabBarWrapper {...props} />;
  };

  renderScreen = (item: ICategory) => {
    createHomeModel(item.id);
    return (
      <Tab.Screen
        key={item.id}
        name={item.id}
        component={Home}
        options={{title: item.name}}
        initialParams={{namespace: item.id}}
      />
    );
  };

  render() {
    const {myCategorys} = this.props;
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
        {myCategorys.map(this.renderScreen)}
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  sceneContainer: {
    backgroundColor: 'transparent',
  },
});

export default connector(HomeTabs);
