import React, {Component} from 'react';
import {View, Text, Image, FlatList, StyleSheet, Alert} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import {IGuess} from '@/models/home';
import Touchable from '@/components/Touchable';
import Icon from '@/assets/iconfont/Icon';
import {mainColor} from '@/config/theme';

const mapStateToProps = ({home}: RootState) => {
  return {guess: home.guess};
};
const connector = connect(mapStateToProps);
type ModalState = ConnectedProps<typeof connector>;

interface IProps extends ModalState {
  guess: IGuess[];
  namespace: string;
}

class Guess extends Component<IProps> {
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const {dispatch, namespace} = this.props;
    dispatch({
      type: `${namespace}/fetchGuess`,
    });
  };

  renderItem = ({item}: {item: IGuess}) => {
    return (
      <Touchable style={styles.item} onPress={() => Alert.alert('猜你喜欢')}>
        <Image source={{uri: item.image}} style={styles.image} />
        <Text numberOfLines={2}>{item.title}</Text>
      </Touchable>
    );
  };

  keyExtractor = (item: IGuess) => {
    return item.id;
  };

  render() {
    const {guess} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.flexRow}>
            <Icon name="icon-like" size={14} />
            <Text style={styles.headerTitle}>猜你喜欢</Text>
          </View>
          <View style={styles.flexRow}>
            <Text>更多</Text>
            <Icon name="icon-more" />
          </View>
        </View>
        <FlatList
          data={guess}
          renderItem={this.renderItem}
          numColumns={3}
          keyExtractor={this.keyExtractor}
        />
        <Touchable onPress={this.fetchData}>
          <View style={{...styles.flexRow, ...styles.changeGuess}}>
            <Icon name="icon-update_dafalut" color={mainColor} size={14} />
            <Text style={styles.changeText}>换一批</Text>
          </View>
        </Touchable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 12,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  item: {
    flex: 1,
    marginHorizontal: 6,
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 6,
  },
  flexRow: {flexDirection: 'row', alignItems: 'center'},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    paddingBottom: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dedede',
  },
  headerTitle: {
    marginLeft: 6,
    color: '#676767',
  },
  changeGuess: {
    justifyContent: 'center',
  },
  changeText: {
    marginLeft: 6,
  },
});

export default connector(Guess);
