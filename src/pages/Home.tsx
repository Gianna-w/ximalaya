import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {RootStackNavigation} from '@/navigator/index';

interface IProps {
  navigation: RootStackNavigation;
}
class Home extends Component<IProps> {
  toDetail = () => {
    const {navigation} = this.props;
    navigation.navigate('Found', {id: '1111'});
  };

  render() {
    return (
      <View>
        <Text>首页</Text>
        <Button title="跳转到发现页" onPress={this.toDetail} />
      </View>
    );
  }
}

export default Home;
