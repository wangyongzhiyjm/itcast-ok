
// 引用vue
import Vue from 'vue';

// 引用路由
import Router from 'vue-router';

// 引用 登陆 组件
import login from '../views/login.vue';

// 引用 home 组件
import home from '../views/home.vue';

// 引入users 子路由
import users from '../views/users/list.vue';

// 使用路由
Vue.use(Router);

export default new Router({

  // 路由设置
  routes: [
    // 默认 登陆路由
    {
      name: 'login',
      path: '/',
      redirect: '/login'
    },
    // 登陆路由
    {
      name: 'login',
      path: '/login',
      component: login
    },
    // home 路由
    {
      name: 'home',
      path: '/home',
      component: home,
      children: [
        {
          name: 'users',
          path: '/users',
          component: users
        }
      ]
    }

  ]
});
