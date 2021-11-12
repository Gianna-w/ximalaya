import storage, {load} from '@/config/storage';
import Axios from 'axios';
import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import {RootState} from '.';

const CATEGORY_URL = '/mock/11/xmly/category';

export interface ICategory {
  id: string;
  name: string;
  classify?: string;
}
interface CategoryModelState {
  myCategorys: ICategory[];
  categorys: ICategory[];
  isEdit: boolean;
}

interface ICategoryModel extends Model {
  namespace: 'category';
  state: CategoryModelState;
  effects: {
    loadData: Effect;
    toggle: Effect;
  };
  reducers: {
    setState: Reducer<CategoryModelState>;
  };
}

const initState = {
  myCategorys: [
    {id: 'home', name: '推荐'},
    {id: 'vip', name: 'Vip'},
  ],
  categorys: [],
  isEdit: false,
};

const categoryModel: ICategoryModel = {
  namespace: 'category',
  state: initState,
  reducers: {
    setState: (state, {payload}) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *loadData(_, {call, put}) {
      // 从storage获取数据
      const myCategorys = yield call(load, {key: 'myCategorys'});
      const categorys = yield call(load, {key: 'categorys'});
      // 触发action
      if (myCategorys) {
        yield put({
          type: 'setState',
          payload: {myCategorys, categorys},
        });
      } else {
        yield put({
          type: 'setState',
          payload: {categorys},
        });
      }
    },
    *toggle({payload}, {put, select}) {
      const category = yield select((state: RootState) => state.category);
      yield put({
        type: 'setState',
        payload: {isEdit: !category.isEdit, myCategorys: payload.myCategorys},
      });
      // 存储在storage里
      if (category.isEdit) {
        storage.save({key: 'myCategorys', data: payload.myCategorys});
      }
    },
  },
  subscriptions: {
    // dva把数据加载完之后，就会执行
    setup({dispatch}) {
      dispatch({type: 'loadData'});
    },
    asyncStorage() {
      storage.sync.categorys = async () => {
        const {data} = await Axios.get(CATEGORY_URL);
        return data;
      };
      storage.sync.myCategorys = async () => {
        return null;
      };
    },
  },
};

export default categoryModel;
