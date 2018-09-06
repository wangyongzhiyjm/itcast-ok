<template>
  <el-container class="container">
    <!-- 头部内容 -->
    <el-header class="header">
      <!-- 栅格系统 -->
      <el-row>
        <el-col :span="4" class="">
          <div class="grid-content bg-purple">
            <img src="@/assets/logo.png" alt="">
          </div>
        </el-col>
        <el-col class="middle" :span="19">
          <h2>电商后台管理系统</h2>
        </el-col>
        <el-col :span="1">
          <!-- @click.prevent="handleLogout" -->
          <a class="logout" href="#" @click="handleLogout">退出</a>
        </el-col>
      </el-row>
    </el-header>

    <!-- 内容 区域 -->
    <el-container>
      <el-aside class="aside" width="200px">
        <!-- 侧边栏 -->
        <el-menu :router="true" :unique-opened="true" class="menu">

          <!-- 一级菜单 -->
          <el-submenu v-for="item in menus" :key="item.id" :index="item.id + ''">

            <template slot="title">
              <!-- 一级菜单 -->
              <i class="el-icon-location"></i>
              <span>{{ item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item v-for="item1 in item.children" :key="item1.id" :index="'/' + item1.path">
            <!-- 二级菜单 -->
              <i class="el-icon-menu"></i>
              {{ item1.authName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>

      </el-aside>

      <!-- 主题内容 -->
      <el-main class="main">

        <!-- 给匹配路由的组件站位 -->
        <router-view></router-view>

      </el-main>

    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menus: []
    };
  },
  // 判断是否登录
  beforeCreate() {
    // 从sessionStorage中获取token，判断是否有token
    const token = sessionStorage.getItem('token');
    if (!token) {
      // 如果没有token，返回登录页面
      this.$router.push({ name: 'login' });
      // 提示
      this.$message.warning('请先登录');
    }
  },
  // 创建 成功
  created() {
    // 加载当前用户的权限列表
    this.loadData();
  },
  methods: {

    // 更新页面
    async loadData() {
      // 获取token ， 设置token
      const token = sessionStorage.getItem('token');
      this.$axios.defaults.headers.common['Authorization'] = token;

      // 异步加载获取内容
      const { data: resData } = await this.$axios.get('menus');

      // 打印结果
      console.log(resData);
      console.log(resData.meta.msg);

      // 解构获取数据
      const { data, meta: { status, msg } } = resData;
      if (status === 200) {
        this.menus = data;
      } else {
        this.$message.error(msg);
      }
    },
    // 退出
    handleLogout() {
      // 删除sessionStorage中的token
      sessionStorage.clear();
      // 跳转到登录页
      this.$router.push({ name: 'login' });
      // 提示
      this.$message.success('退出成功');
    }
  }
};
// }
</script>

<style>
  .container {
    height: 100%;
  }

  .header {
    background-color: #b3c0d1;
    padding: 0;
    /* padding-left: ; */
  }

  .header .middle {
    line-height: 60px;
    color: #fff;
    text-align: center;
  }

  .header .logout {
    line-height: 60px;
    text-decoration: none;
    color: orange;
  }

  .aside {
    background-color: #d3dce6;
  }

  .aside .menu {
    height: 100%;
  }

  .main {
    background-color: #e9eef3;
  }

</style>
