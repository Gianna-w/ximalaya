import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootStackNavigation} from '@/navigator/index';
import {RootState} from '@/models/index';
import Carousel, {itemHeight} from './components/Carousel';
import Guess from './components/Guess';
import {IChannel} from '@/models/home';
import ChannelItem from './components/ChannelItem';

const mapStateToProps = ({home, loading}: RootState) => ({
  channels: home.channels,
  hasMore: home.pagination.hasMore,
  loading: loading.effects['home/fetchChannels'],
  linearVisible: home.linearVisible,
});
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
interface IProps extends ModelState {
  navigation: RootStackNavigation;
}
interface IState {
  refreshing: boolean;
}
class Home extends Component<IProps, IState> {
  state = {refreshing: false};
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
    return <ChannelItem item={item} onPress={this.onPressListItem} />;
  };

  get header() {
    return (
      <View>
        <Button title="跳转到发现页" onPress={this.toDetail} />
        <Carousel />
        <View style={styles.whiteBg}>
          <Guess />
        </View>
      </View>
    );
  }

  get footer() {
    const {loading, hasMore, channels} = this.props;
    if (channels.length === 0) {
      return <Text style={styles.footer}>暂无数据</Text>;
    }
    if (loading) {
      return <Text style={styles.footer}>正在加载中...</Text>;
    }
    if (!hasMore) {
      return <Text style={styles.footer}>--我是有底线的--</Text>;
    }
  }

  onPressListItem = (data: IChannel) => {
    console.log('列表数据', data);
  };

  keyExtractor = (item: IChannel) => {
    return item.id;
  };

  // 上拉加载
  onEndReached = () => {
    const {hasMore, loading, dispatch} = this.props;
    if (!hasMore || loading) {
      return;
    }
    dispatch({
      type: 'home/fetchChannels',
      payload: {loadMore: true},
    });
  };

  // 下拉刷新
  onRefresh = () => {
    this.setState({refreshing: true});
    this.props.dispatch({
      type: 'home/fetchChannels',
      callback: () => {
        this.setState({refreshing: false});
      },
    });
  };

  // 滚动
  onScroll = ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newLinearVisible = nativeEvent.contentOffset.y < itemHeight;
    const {linearVisible, dispatch} = this.props;
    if (linearVisible !== newLinearVisible) {
      dispatch({
        type: 'home/setState',
        payload: {
          linearVisible: newLinearVisible,
        },
      });
    }
  };

  render() {
    const {channels} = this.props;
    const {refreshing} = this.state;
    return (
      <FlatList
        ListHeaderComponent={this.header}
        ListFooterComponent={this.footer}
        data={channels}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.2}
        onRefresh={this.onRefresh}
        refreshing={refreshing}
        onScroll={this.onScroll}
      />
    );
  }
}

const styles = StyleSheet.create({
  whiteBg: {backgroundColor: '#fff'},
  footer: {
    textAlign: 'center',
    paddingVertical: 10,
  },
});

export default connector(Home);
