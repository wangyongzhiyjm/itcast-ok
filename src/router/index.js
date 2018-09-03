
// 引用vue
import Vue from 'vue';

// 引用路由
import Router from 'vue-router';

// 引用 登陆 组件
import login from '../views/login.vue';

// 使用路由
Vue.use(Router)

export default new Router({

  // 路由设置
  routes: [
    // 默认 登陆路由
    {
      path: '/',
      name: 'login',
      redirect: '/login'
    },
    // 登陆路由
    {
      path:'/login',
      name: 'login',
      component: login
    }

  ]
})
