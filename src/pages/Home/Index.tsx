import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootStackNavigation} from '@/navigator/index';
import {RootState} from '@/models/index';
import Carousel from './components/Carousel';

const mapStateToProps = ({home, loading}: RootState) => ({
  carousels: home.carousels,
  loading: loading.effects['home/fetchCarousels'],
});
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
interface IProps extends ModelState {
  navigation: RootStackNavigation;
}
class Home extends Component<IProps> {
  componentDidMount() {
    this.fetchCarousels();
  }

  fetchCarousels = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/fetchCarousels',
    });
  };

  toDetail = () => {
    const {navigation} = this.props;
    navigation.navigate('Found', {id: '1111'});
  };

  render() {
    const {carousels, loading} = this.props;
    return (
      <View>
        <Text>{loading ? '正在加载...' : ''}</Text>
        <Button title="跳转到发现页" onPress={this.toDetail} />
        <Carousel carousels={carousels} />
      </View>
    );
  }
}

export default connector(Home);
