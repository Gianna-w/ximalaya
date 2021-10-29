import React from 'react';
import {IChannel} from '@/models/home';
import {View, Text, Image, StyleSheet} from 'react-native';
import Icon from '@/assets/iconfont/Icon';
import {mainColor} from '@/config/theme';
import Touchable from '@/components/Touchable';

interface IProps {
  item: IChannel;
  onPress: (data: IChannel) => void;
}
const ChannelItem: React.FC<IProps> = props => {
  const {item} = props;

  const onPressItem = () => {
    const {onPress} = props;
    if (typeof onPress === 'function') {
      onPress(item);
    }
  };

  return (
    <Touchable onPress={onPressItem}>
      <View style={styles.container}>
        <Image source={{uri: item.image}} style={styles.image} />
        <View style={styles.rightContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.remark} numberOfLines={2}>
            {item.remark}
          </Text>
          <View style={styles.bottom}>
            <View style={styles.flexRow}>
              <Icon name="icon-listen" size={14} color={mainColor} />
              <Text style={styles.bottomText}>{item.played}</Text>
            </View>
            <View style={styles.flexRow}>
              <Icon name="icon-Sound-wave" size={14} color={mainColor} />
              <Text style={styles.bottomText}>{item.playing}</Text>
            </View>
          </View>
        </View>
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginHorizontal: 12,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    shadowColor: '#ccc',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#dedede',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
  },
  remark: {
    color: '#999',
  },
  bottom: {
    flexDirection: 'row',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  bottomText: {
    marginLeft: 5,
  },
});

export default ChannelItem;
