import {mainColor} from '@/config/theme';
import React, {Component} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {SceneRendererProps, TabBar, TabView} from 'react-native-tab-view';
import Introduction from './Introduction';
import List from './List';

interface IRoute {
  key: string;
  title: string;
}
interface IState {
  routes: IRoute[];
  index: number;
}
interface IProps {}
class Tab extends Component<IProps, IState> {
  state = {
    routes: [
      {key: 'introduction', title: '简介'},
      {key: 'albums', title: '节目'},
    ],
    index: 1,
  };

  onIndexChange = (index: number) => {
    this.setState({index});
  };

  renderScene = ({route}: {route: IRoute}) => {
    switch (route.key) {
      case 'introduction':
        return <Introduction />;
      case 'albums':
        return <List />;
    }
  };

  renderTabBar = (props: SceneRendererProps & {navigationState: IState}) => {
    return (
      <TabBar
        {...props}
        scrollEnabled
        style={styles.tabbar}
        tabStyle={styles.tabStyle}
        labelStyle={styles.labelStyle}
        indicatorStyle={styles.indicatorStyle}
      />
    );
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        onIndexChange={this.onIndexChange}
        renderScene={this.renderScene}
        renderTabBar={this.renderTabBar}
      />
    );
  }
}

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: '#fff',
    ...Platform.select({
      android: {
        elevation: 0,
        borderBottomColor: '#e3e3e3',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
    }),
  },
  tabStyle: {
    width: 80,
  },
  labelStyle: {
    color: '#333',
  },
  indicatorStyle: {
    backgroundColor: mainColor,
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderColor: '#fff',
  },
});

export default Tab;
