import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from '@/config/dva';
import Navigator from './navigator';
import {StatusBar} from 'react-native';

class Entry extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent
        />
      </Provider>
    );
  }
}

export default Entry;
