import React, {Component} from 'react';
import {
  View,
  Text,
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
import {IChannel, IGuess} from '@/models/home';
import ChannelItem from './components/ChannelItem';
import {RouteProp} from '@react-navigation/core';
import {HomeParamsList} from '@/navigator/HomeTabs';

const mapStateToProps = (
  state: RootState,
  {route}: {route: RouteProp<HomeParamsList, string>},
) => {
  const {namespace} = route.params;
  const modelState = state[namespace];
  return {
    namespace,
    modelState,
    channels: modelState.channels,
    hasMore: modelState.pagination.hasMore,
    loading: state.loading.effects[`${namespace}/fetchChannels`],
    linearVisible: modelState.linearVisible,
  };
};
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
    const {dispatch, namespace} = this.props;
    dispatch({
      type: `${namespace}/fetchCarousels`,
    });
  };

  fetchChannels = () => {
    const {dispatch, namespace} = this.props;
    dispatch({
      type: `${namespace}/fetchChannels`,
    });
  };

  renderItem = ({item}: ListRenderItemInfo<IChannel>) => {
    return <ChannelItem item={item} onPress={this.goAlbum} />;
  };

  get header() {
    const {namespace} = this.props;
    return (
      <View>
        <Carousel />
        <View style={styles.whiteBg}>
          <Guess namespace={namespace} goAlbum={this.goAlbum} />
        </View>
      </View>
    );
  }

  get footer() {
    const {loading, hasMore, channels} = this.props;
    if (channels.length === 0) {
      return <Text style={styles.footer}>????????????</Text>;
    }
    if (loading) {
      return <Text style={styles.footer}>???????????????...</Text>;
    }
    if (!hasMore) {
      return <Text style={styles.footer}>--??????????????????--</Text>;
    }
  }

  goAlbum = (data: IChannel | IGuess) => {
    const {navigation} = this.props;
    navigation.navigate('Album', {item: data});
  };

  keyExtractor = (item: IChannel) => {
    return item.id;
  };

  // ????????????
  onEndReached = () => {
    const {hasMore, loading, dispatch, namespace} = this.props;
    if (!hasMore || loading) {
      return;
    }
    dispatch({
      type: `${namespace}/fetchChannels`,
      payload: {loadMore: true},
    });
  };

  // ????????????
  onRefresh = () => {
    this.setState({refreshing: true});
    const {dispatch, namespace} = this.props;
    dispatch({
      type: `${namespace}/fetchChannels`,
      callback: () => {
        this.setState({refreshing: false});
      },
    });
  };

  // ??????
  onScroll = ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newLinearVisible = nativeEvent.contentOffset.y < itemHeight;
    const {linearVisible, dispatch, namespace} = this.props;
    if (linearVisible !== newLinearVisible) {
      dispatch({
        type: `${namespace}/setState`,
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
