import {Dimensions} from 'react-native';
import {NavigationState} from 'react-native-tab-view';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
const wp = (percentage: number) => {
  const value = Math.round((percentage * viewportWidth) / 100);
  return value;
};

const hp = (percentage: number) => {
  const value = Math.round((percentage * viewportHeight) / 100);
  return value;
};

const getActiveRouteName = (state: NavigationState) => {
  let route;
  route = state.routes[state.index];
  while (route.state && route.state.index) {
    route.state.routes[route.state.index];
  }
  return route.name;
};

export {viewportWidth, viewportHeight, wp, hp, getActiveRouteName};
