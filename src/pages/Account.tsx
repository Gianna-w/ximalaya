import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {RootStackNavigation} from '@/navigator/index';

interface IProps {
  navigation: RootStackNavigation;
}
class Account extends Component<IProps> {
  render() {
    return (
      <View>
        <Text>我的</Text>
      </View>
    );
  }
}

export default Account;
