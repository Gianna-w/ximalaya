import React, {Component} from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {BlurView} from '@react-native-community/blur';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {RootStackParamList} from '@/navigator/index';
import Tab from './Tab';

const mapStateToProps = ({album}: RootState) => {
  return {
    summary: album.summary,
    author: album.author,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  headerHight: number;
  route: RouteProp<RootStackParamList, 'Album'>;
}

class Album extends Component<IProps> {
  componentDidMount() {
    const {dispatch, route} = this.props;
    const {id} = route.params.item;
    dispatch({
      type: 'album/fetchAlbum',
      payload: {
        id,
      },
    });
  }

  get renderHeader() {
    const {headerHight, summary, author, route} = this.props;
    const {title, image} = route.params.item;
    return (
      <View style={[styles.header, {paddingTop: headerHight}]}>
        <Image source={{uri: image}} style={styles.headerBg} />
        <BlurView
          blurAmount={5}
          blurType="light"
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.headerLeft}>
          <Image source={{uri: image}} style={styles.thumbnail} />
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.summary}>
            <Text numberOfLines={1} style={styles.summaryText}>
              {summary}
            </Text>
          </View>
          <View style={styles.author}>
            <Image source={{uri: author.avatar}} style={styles.avatar} />
            <Text style={styles.name}>{author.name}</Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader}
        <Tab />
      </View>
    );
  }
}

const Wrapper = (props: IProps) => {
  const headerHight = useHeaderHeight();
  return <Album headerHight={headerHight} {...props} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 260,
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: '#ae6785',
    alignItems: 'center',
  },
  headerBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#eee',
  },
  headerLeft: {
    marginRight: 26,
  },
  thumbnail: {
    width: 98,
    height: 98,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#fff',
    backgroundColor: '#fff',
  },
  headerRight: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: '#fff',
  },
  summary: {
    padding: 10,
    marginVertical: 10,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  summaryText: {
    color: '#fff',
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    marginRight: 10,
  },
  name: {
    color: '#fff',
  },
});

export default connector(Wrapper);
