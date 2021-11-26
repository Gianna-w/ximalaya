import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';

const ALBUM_URL = '/mock/11/xmly/album/list';

export interface IProgram {
  id: string;
  title: string;
  playVolume: number;
  duration: string;
  date: Date;
}

interface IAuthor {
  name: string;
  avatar: string;
}

interface IAlbumModelState {
  id: string;
  title: string;
  summary: string;
  thumbnailUrl: string;
  author: IAuthor;
  introduction: string;
  list: IProgram[];
}

interface IAlbumModel extends Model {
  namespace: 'album';
  state: IAlbumModelState;
  effects: {
    fetchAlbum: Effect;
  };
  reducers: {
    setState: Reducer<IAlbumModelState>;
  };
}

const initState = {
  id: '',
  title: '',
  summary: '',
  thumbnailUrl: '',
  author: {
    name: '',
    avatar: '',
  },
  introduction: '',
  list: [],
};

const albumModel: IAlbumModel = {
  namespace: 'album',
  state: initState,
  effects: {
    *fetchAlbum(_, {call, put}) {
      const {data} = yield call(axios.get, ALBUM_URL);
      yield put({type: 'setState', payload: data});
    },
  },
  reducers: {
    setState(state = initState, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default albumModel;
