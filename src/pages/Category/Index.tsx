import {ICategory} from '@/models/category';
import {RootState} from '@/models/index';
import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {groupBy} from 'lodash';
import {DragSortableView} from 'react-native-drag-sort';
import Item, {itemHeight, itemWidth, parentWidth} from './Item';
import {RootStackNavigation} from '@/navigator/index';
import HeaderRightBtn from './HeaderRightBtn';
import Touchable from '@/components/Touchable';

const fixedItemsIndex = [0, 1]; // 固定不可编辑的两个分类
const mapStateToProps = ({category}: RootState) => {
  return {
    myCategorys: category.myCategorys,
    categorys: category.categorys,
    isEdit: category.isEdit,
  };
};
const connector = connect(mapStateToProps);
type modelState = ConnectedProps<typeof connector>;

interface IProps extends modelState {
  navigation: RootStackNavigation;
}
interface IState {
  myCategorys: ICategory[];
}
class Category extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const {navigation, myCategorys} = props;
    this.state = {myCategorys};
    navigation.setOptions({
      headerRight: () => <HeaderRightBtn onToggle={this.toggleEdit} />,
    });
  }

  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch({type: 'category/setState', payload: {isEdit: false}});
  }

  // 切换编辑/完成
  toggleEdit = () => {
    const {dispatch, isEdit, navigation} = this.props;
    const {myCategorys} = this.state;
    dispatch({type: 'category/toggle', payload: {myCategorys}});
    if (isEdit) {
      navigation.goBack();
    }
  };

  // 点击添加/删除
  onPress = (item: ICategory, index: number, selected: boolean) => {
    const {isEdit} = this.props;
    const {myCategorys} = this.state;
    const disabled = fixedItemsIndex.indexOf(index) > -1;
    if (isEdit) {
      if (selected) {
        if (disabled) {
          return;
        }
        this.setState({
          myCategorys: myCategorys.filter(
            slectedItem => slectedItem.id !== item.id,
          ),
        });
      } else {
        this.setState({myCategorys: myCategorys.concat([item])});
      }
    }
  };

  // 长按编辑
  onLongPress = () => {
    const {dispatch} = this.props;
    dispatch({type: 'category/setState', payload: {isEdit: true}});
  };

  renderItem = (item: ICategory, index: number) => {
    const {isEdit} = this.props;
    const disabled = fixedItemsIndex.indexOf(index) > -1;
    return (
      <Item
        key={item.id}
        item={item}
        isEdit={isEdit}
        selected
        disabled={disabled}
      />
    );
  };

  onDataChange = (data: ICategory[]) => {
    this.setState({myCategorys: data});
  };

  onClickItem = (data: ICategory[], item: ICategory) => {
    this.onPress(item, data.indexOf(item), true);
  };

  renderUnselectItem = (item: ICategory, index: number) => {
    const {isEdit} = this.props;
    return (
      <Touchable
        key={item.id}
        onPress={() => this.onPress(item, index, false)}
        onLongPress={this.onLongPress}>
        <Item item={item} isEdit={isEdit} selected={false} />
      </Touchable>
    );
  };

  render() {
    const {categorys, isEdit} = this.props;
    const {myCategorys} = this.state;
    const classifyGroup = groupBy(categorys, 'classify');
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.classifyName}>我的分类</Text>
        <View style={styles.classifyView}>
          {/* TODO 目前不知道为什么没办法拖动 */}
          <DragSortableView
            dataSource={myCategorys}
            renderItem={this.renderItem}
            sortable={isEdit}
            keyExtractor={item => item.id}
            onDataChange={this.onDataChange}
            onClickItem={this.onClickItem}
            fixedItems={fixedItemsIndex}
            parentWidth={parentWidth}
            childrenWidth={itemWidth}
            childrenHeight={itemHeight}
          />
        </View>
        {Object.keys(classifyGroup).map(classify => (
          <View key={classify}>
            <Text style={styles.classifyName}>{classify}</Text>
            <View style={styles.classifyView}>
              {classifyGroup[classify].map((item, index) => {
                if (
                  myCategorys.find(selectedItem => selectedItem.id === item.id)
                ) {
                  return null;
                }
                return this.renderUnselectItem(item, index);
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f6f6',
  },
  classifyName: {
    fontSize: 16,
    marginTop: 14,
    marginBottom: 8,
    marginLeft: 10,
  },
  classifyView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
  },
});

export default connector(Category);
