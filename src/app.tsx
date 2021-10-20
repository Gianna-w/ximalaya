import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from '@/config/dva';
import Navigator from './navigator';

class Entry extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}

export default Entry;
