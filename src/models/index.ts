import {DvaLoadingState} from 'dva-loading-ts';
import home from './home';

const models = [home];

export type RootState = {
  home: typeof home.state;
  loading: DvaLoadingState;
};
export default models;
