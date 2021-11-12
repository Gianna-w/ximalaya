import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {viewportWidth} from '@/utils/util';
import {ICategory} from '@/models/category';
import {mainColor} from '@/config/theme';

export const parentWidth = viewportWidth - 10;
export const itemWidth = parentWidth / 4;
export const itemHeight = 48;

interface IProps {
  item: ICategory;
  isEdit: boolean;
  selected: boolean;
  disabled?: boolean;
}
const Item: React.FC<IProps> = ({item, isEdit, selected, disabled}: IProps) => {
  return (
    <View style={styles.itemView}>
      <View style={[styles.item, disabled && styles.disabled]}>
        <Text>{item.name}</Text>
        {isEdit && !disabled && (
          <View style={styles.icon}>
            <Text style={styles.iconText}>{selected ? '—' : '+'}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemView: {
    width: itemWidth,
    height: itemHeight,
  },
  item: {
    flex: 1,
    margin: 5,
    borderRadius: 4,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    jusifyContent: 'center',
    backgroundColor: mainColor,
  },
  iconText: {
    color: '#fff',
    lineHeight: 16,
  },
  disabled: {
    backgroundColor: '#efefef',
  },
});
export default Item;
