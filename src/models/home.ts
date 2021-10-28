import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';

// 首页轮播图
const CAROUSEL_URL = '/mock/11/xmly/carousel';
// 猜你喜欢
const GUESS_URL = '/mock/11/xmly/guess';
export interface ICarousel {
  id: string;
  readonly image: string;
  colors: [string, string];
}
export interface IGuess {
  id: string;
  image: string;
  title: string;
}
interface HomeState {
  carousels: ICarousel[];
  guess: IGuess[];
}

interface HomeModel extends Model {
  namespace: 'home';
  state: HomeState;
  reducers?: {
    setState: Reducer<HomeState>;
  };
  effects?: {
    fetchCarousels: Effect;
    fetchGuess: Effect;
  };
}

const initState = {
  carousels: [],
  guess: [],
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
    *fetchGuess(_, {call, put}) {
      const {data} = yield call(axios.get, GUESS_URL);
      yield put({type: 'setState', payload: {guess: data}});
    },
  },
};

export default homeModel;
