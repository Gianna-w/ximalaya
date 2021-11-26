import {IProgram} from '@/models/album';
import {RootState} from '@/models/index';
import React, {Component} from 'react';
import {View, ListRenderItemInfo, FlatList, StyleSheet} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import Item from './Item';

const mapStateToProps = ({album}: RootState) => {
  return {
    list: album.list,
  };
};

const connector = connect(mapStateToProps);
type ModalState = ConnectedProps<typeof connector>;
interface IProps extends ModalState {}

class List extends Component<IProps> {
  onPress = (item: IProgram) => {
    console.log(item);
  };

  renderItem = ({item, index}: ListRenderItemInfo<IProgram>) => {
    return (
      <View>
        <Item data={item} index={index} onPress={() => this.onPress(item)} />
      </View>
    );
  };

  render() {
    const {list} = this.props;
    return (
      <FlatList data={list} renderItem={this.renderItem} style={styles.list} />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#fff',
  },
});

export default connector(List);
