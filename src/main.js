
// 引用vue 
import Vue from 'vue'

// 引用网站 主页面
import App from './App'

// 引用 路由处理文件
import router from './router'

// 引用element-ui 插件
import elmem from 'element-ui';

// 引用element-ui 的 样式
import  'element-ui/lib/theme-chalk/index.css';

// 引用自己的css样式
import './assets/css/index.css';

// 测试时 控制台提示信息 是否提示
Vue.config.productionTip = false;

// 使用element插件
Vue.use(elmem);

// 实例化 vue
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
