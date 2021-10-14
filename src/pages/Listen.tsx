import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {RootStackNavigation} from '@/navigator/index';

interface IProps {
  navigation: RootStackNavigation;
}
class Listen extends Component<IProps> {
  render() {
    return (
      <View>
        <Text>我听</Text>
      </View>
    );
  }
}

export default Listen;
