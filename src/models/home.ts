import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';
import {RootState} from '.';

// 首页轮播图
const CAROUSEL_URL = '/mock/11/xmly/carousel';
// 猜你喜欢
const GUESS_URL = '/mock/11/xmly/guess';
// 列表
const CHANNEL_URL = '/mock/11/xmly/channel';

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
export interface IChannel {
  id: string;
  image: string;
  title: string;
  remark: string;
  played: number;
  playing: number;
}
interface IPagination {
  current: number;
  total: number;
  hasMore: boolean;
}
interface HomeState {
  carousels: ICarousel[];
  guess: IGuess[];
  channels: IChannel[];
  pagination: IPagination;
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
    fetchChannels: Effect;
  };
}

const initState = {
  carousels: [],
  guess: [],
  channels: [],
  pagination: {current: 1, total: 0, hasMore: true},
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
    *fetchChannels({callback, payload}, {call, put, select}) {
      const {channels, pagination} = yield select(
        (state: RootState) => state.home,
      );
      let page = 1;
      if (payload?.loadMore) {
        page = pagination.current + 1;
      }
      const {data} = yield call(axios.get, CHANNEL_URL, {
        params: {page},
      });

      let newChannels = data.result;
      if (payload?.loadMore) {
        newChannels = channels.concat(newChannels);
      }
      yield put({
        type: 'setState',
        payload: {
          channels: newChannels,
          pagination: {
            current: page,
            total: data.pagination.total,
            hasMore: newChannels.length < data.pagination.total,
          },
        },
      });
      if (typeof callback === 'function') {
        callback();
      }
    },
  },
};

export default homeModel;
