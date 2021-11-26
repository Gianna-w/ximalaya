import {RootState} from '@/models/index';
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = ({album}: RootState) => {
  return {
    introduction: album.introduction,
  };
};

const connector = connect(mapStateToProps);
type ModalState = ConnectedProps<typeof connector>;

class Introduction extends Component<ModalState> {
  render() {
    const {introduction} = this.props;
    return (
      <View>
        <Text>{introduction}</Text>
      </View>
    );
  }
}

export default connector(Introduction);
