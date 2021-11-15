import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
// import LinearGradient from 'react-native-linear-animated-gradient-transition';
import LinearGradient from 'react-native-linear-gradient';
import Touchable from './Touchable';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '../models';
import {mainColor} from '@/config/theme';
import {getActiveRouteName} from '@/utils/util';

const statusBarHeight = getStatusBarHeight();

const mapStateToProps = (state: RootState, props: MaterialTopTabBarProps) => {
  const routeName = getActiveRouteName(props.state);
  const modelState = state[routeName];
  return {
    linearColors: modelState.carousels?.length
      ? modelState.carousels[modelState.activeCarouselIndex].colors
      : ['#e6e6e6', '#efefef', '#f2f2f2'],
    linearVisible: modelState.linearVisible,
  };
};
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
type IProps = MaterialTopTabBarProps & ModelState;

class TabBarWrapper extends Component<IProps> {
  // 跳转到分类页面
  goCategory = () => {
    const {navigation} = this.props;
    navigation.navigate('Category');
  };

  get linearGradient() {
    const {linearVisible, linearColors} = this.props;
    return (
      linearVisible && (
        <LinearGradient
          colors={[...linearColors, '#f2f2f2']}
          style={styles.linearContainer}
        />
      )
    );
  }
  render() {
    const {linearVisible, indicatorStyle, ...restProps} = this.props;
    return (
      <View style={styles.container}>
        {this.linearGradient}
        <View style={styles.tabBarView}>
          <MaterialTopTabBar
            {...restProps}
            activeTintColor={linearVisible ? '#333' : mainColor}
            indicatorStyle={StyleSheet.compose(indicatorStyle, {
              backgroundColor: linearVisible ? '#333' : mainColor,
            })}
            style={styles.tabBar}
          />
          <Touchable style={styles.categoryBtn} onPress={this.goCategory}>
            <Text>分类</Text>
          </Touchable>
        </View>
        <View style={styles.bottom}>
          <Touchable style={styles.searchBtn}>
            <Text>搜索</Text>
          </Touchable>
          <Touchable style={styles.historyBtn}>
            <Text>历史记录</Text>
          </Touchable>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: statusBarHeight,
  },
  linearContainer: {
    ...StyleSheet.absoluteFillObject,
    height: 260,
  },
  tabBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabBar: {
    flex: 1,
    elevation: 0,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  categoryBtn: {
    paddingHorizontal: 12,
    borderLeftColor: '#333',
    borderLeftWidth: StyleSheet.hairlineWidth,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 7,
    marginHorizontal: 12,
  },
  searchBtn: {
    flex: 1,
    height: 30,
    paddingHorizontal: 12,
    borderRadius: 15,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  historyBtn: {
    marginLeft: 24,
  },
});

export default connector(TabBarWrapper);
