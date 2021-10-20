import {create} from 'dva-core-ts';
import createDvaLoading from 'dva-loading-ts';
import models from '@/models/index';

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
