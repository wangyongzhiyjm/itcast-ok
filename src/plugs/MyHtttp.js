
// 引用vue
import Vue from 'vue';
// 引用axios
import axios from 'axios';

// 声明变量
const MyHttp = {};

// 变量 install 方法设置
MyHttp.install = function () {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
  Vue.prototype.$axios = axios;
};

// 导出插件
export default MyHttp;
