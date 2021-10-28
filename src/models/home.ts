import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';

const CAROUSEL_URL = '/mock/11/xmly/carousel';
export interface ICarousel {
  id: string;
  readonly image: string;
  colors: [string, string];
}
interface HomeState {
  carousels: ICarousel[];
}

interface HomeModel extends Model {
  namespace: 'home';
  state: HomeState;
  reducers?: {
    setState: Reducer<HomeState>;
  };
  effects?: {
    fetchCarousels: Effect;
  };
}

const initState = {
  carousels: [],
};

const homeModel: HomeModel = {
  namespace: 'home',
  state: initState,
  reducers: {
    setState: (state = initState, {payload}) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *fetchCarousels(_, {call, put}) {
      const {data} = yield call(axios.get, CAROUSEL_URL);
      yield put({type: 'setState', payload: {carousels: data}});
    },
  },
};

export default homeModel;
