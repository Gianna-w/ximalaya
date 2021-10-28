import React, {Component} from 'react';
import {View, Text, Button, FlatList, ListRenderItemInfo} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootStackNavigation} from '@/navigator/index';
import {RootState} from '@/models/index';
import Carousel from './components/Carousel';
import Guess from './components/Guess';
import {IChannel} from '@/models/home';
import ChannelItem from './components/ChannelItem';

const mapStateToProps = ({home, loading}: RootState) => ({
  carousels: home.carousels,
  channels: home.channels,
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
    this.fetchChannels();
  }

  fetchCarousels = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/fetchCarousels',
    });
  };

  fetchChannels = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/fetchChannels',
    });
  };

  toDetail = () => {
    const {navigation} = this.props;
    navigation.navigate('Found', {id: '1111'});
  };

  renderItem = ({item}: ListRenderItemInfo<IChannel>) => {
    return <ChannelItem item={item} />;
  };

  get header() {
    const {carousels, loading} = this.props;
    return (
      <View>
        {loading && <Text>'正在加载...'</Text>}
        <Button title="跳转到发现页" onPress={this.toDetail} />
        <Carousel carousels={carousels} />
        <Guess />
      </View>
    );
  }

  render() {
    const {channels} = this.props;
    return (
      <FlatList
        ListHeaderComponent={this.header}
        data={channels}
        renderItem={this.renderItem}
      />
    );
  }
}

export default connector(Home);
