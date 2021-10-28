import {Dimensions} from 'react-native';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
const wp = (percentage: number) => {
  const value = Math.round((percentage * viewportWidth) / 100);
  return value;
};

const hp = (percentage: number) => {
  const value = Math.round((percentage * viewportHeight) / 100);
  return value;
};

export {viewportWidth, viewportHeight, wp, hp};
