import AsyncStorage from '@react-native-community/async-storage';
import Storage, {LoadParams} from 'react-native-storage';

const storage = new Storage({
  enableCache: true,
  defaultExpires: 1000 * 3600 * 24 * 7,
  size: 1000,
  storageBackend: AsyncStorage, // 缓存引擎
  sync: {}, // 同步远程数据，在storage load拿不到数据时执行与数据相同名称的函数
});

const load = (params: LoadParams) => {
  return storage.load(params);
};

export {load};
export default storage;
