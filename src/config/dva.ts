import {create, Model} from 'dva-core-ts';
import createDvaLoading from 'dva-loading-ts';
import modelExtend from 'dva-model-extend';
import models from '@/models/index';
import homeModel from '@/models/home';

// 创建dva实例
const app = create();
// 使用loading
app.use(createDvaLoading());
// 加载model对象
models.forEach((model: any) => {
  app.model(model);
});
// 启动dva
app.start();
// 导出dva数据
export default app._store;

interface Cached {
  [key: string]: boolean;
}
const cached: Cached = {
  home: true,
};
function registerModel(model: Model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = true;
  }
}

export function createHomeModel(namespace: string) {
  const model = modelExtend(homeModel, {namespace});
  registerModel(model);
}
