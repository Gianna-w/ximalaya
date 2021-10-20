import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootStackNavigation} from '@/navigator/index';
import {RootState} from '@/models/index';

const mapStateToProps = ({home, loading}: RootState) => ({
  num: home.num,
  loading: loading.effects['home/asyncAdd'],
});
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
interface IProps extends ModelState {
  navigation: RootStackNavigation;
}
class Home extends Component<IProps> {
  addNum = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/add',
      payload: {num: 10},
    });
  };
  asyncAddNum = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/asyncAdd',
      payload: {num: 2},
    });
  };
  toDetail = () => {
    const {navigation} = this.props;
    navigation.navigate('Found', {id: '1111'});
  };

  render() {
    const {num, loading} = this.props;
    return (
      <View>
        <Text>首页</Text>
        <Text>{num}</Text>
        <Text>{loading ? '正在加载...' : ''}</Text>
        <Button title="添加" onPress={this.addNum} />
        <Button title="异步添加" onPress={this.asyncAddNum} />
        <Button title="跳转到发现页" onPress={this.toDetail} />
      </View>
    );
  }
}

export default connector(Home);
