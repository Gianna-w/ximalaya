import Icon from '@/assets/iconfont/Icon';
import Touchable from '@/components/Touchable';
import {mainColor} from '@/config/theme';
import {IProgram} from '@/models/album';
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface IProps {
  data: IProgram;
  index: number;
  onPress: (item: IProgram) => void;
}

class Item extends Component<IProps> {
  onPress = () => {
    const {onPress, data} = this.props;
    if (typeof onPress === 'function') {
      onPress(data);
    }
  };
  render() {
    const {data, index} = this.props;
    return (
      <Touchable style={styles.items} onPress={this.onPress}>
        <Text style={styles.serial}>{index + 1}</Text>
        <View style={styles.content}>
          <Text style={styles.title}>{data.title}</Text>
          <View style={styles.playWrapper}>
            <View style={styles.playFlex}>
              <Icon name="icon-listen" size={14} color={mainColor} />
              <Text style={styles.playText}>{data.playVolume}</Text>
            </View>
            <View style={styles.playFlex}>
              <Icon name="icon-Sound-wave" size={14} color={mainColor} />
              <Text style={styles.playText}>{data.duration}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.date}>{data.date}</Text>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  items: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e3e3e3',
    alignItems: 'center',
  },
  title: {
    fontWeight: '500',
    marginBottom: 15,
  },
  content: {
    flex: 1,
    marginHorizontal: 25,
  },
  serial: {
    fontSize: 14,
    color: '#838383',
    fontWeight: '800',
  },
  playWrapper: {
    flexDirection: 'row',
  },
  playFlex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playText: {
    marginHorizontal: 10,
    color: '#939393',
  },
  date: {
    color: '#939393',
  },
});

export default Item;
