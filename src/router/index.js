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

// 引用权限列表 路由
import rigester from '../views/rigster/rigester.vue';

// 引用角色管理 路由
import roles from '../views/rigster/roles.vue';

// 引用商品列表 路由
import goods from '../views/shpin/list.vue';

// 引用商参数 路由
import params from '../views/shpin/canshu.vue';

// 引用商品列表 路由
import categories from '../views/shpin/fenlei.vue';

// 引用订单管理 路由
import orders from '../views/orders/orders.vue';

// 引用数据统计 路由
import reports from '../views/reports/reports.vue';

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
      children: [{
        name: 'users',
        path: '/users',
        component: users
      },
      // 权限列表
      {
        name: 'regster',
        path: '/rights',
        component: rigester
      },
      // 角色列表
      {
        name: 'roles',
        path: '/roles',
        component: roles
      },
      // 商品列表
      {
        name: 'goods',
        path: '/goods',
        component: goods
      },
      // 商品参数
      {
        name: 'params',
        path: '/params',
        component: params
      },
        // 商品分类
      {
        name: 'categories',
        path: '/categories',
        component: categories
      },
      // 订单管理
      {
        name: 'orders',
        path: '/orders',
        component: orders
      },
      // 数据统计
      {
        name: 'reports',
        path: '/reports',
        component: reports
      }]
    }

  ]
});
