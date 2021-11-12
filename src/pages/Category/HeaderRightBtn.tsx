import {RootState} from '@/models/index';
import React, {Component} from 'react';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = ({category}: RootState) => {
  return {isEdit: category.isEdit};
};
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  onToggle: () => void;
}

class HeaderRightBtn extends Component<IProps> {
  render() {
    const {isEdit, onToggle} = this.props;
    return (
      <HeaderButtons>
        <Item title={isEdit ? '完成' : '编辑'} onPress={onToggle} />
      </HeaderButtons>
    );
  }
}

export default connector(HeaderRightBtn);
