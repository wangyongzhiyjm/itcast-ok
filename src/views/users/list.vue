<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索框 -->
    <el-row class="searchArea">
      <el-col :span="24">
        <el-input class="searchInput" clearable placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="list" border style="width: 100%" stripe v-loading="loading">
      <!-- 序号 -->

      <el-table-column type="index" width="50">
      </el-table-column>

      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>

      <el-table-column prop="email" label="邮箱" width="180">
      </el-table-column>
      <el-table-column prop="mobile" label="电话" width="300">
      </el-table-column>

      <el-table-column prop="mg_state" label="用户状态" width="300">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
          <el-button type="success" icon="el-icon-check" circle></el-button>

        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- 页码改变的时候 -->
    <!-- @size-change="handleSizeChange"
    数据改变
      @current-change="handleCurrentChange"
    当前页码
      :current-page="currentPage4"
    分页选择器
      :page-sizes="[100, 200, 300, 400]"
    默认当前页 条数
      :page-size="100"
    功能
      layout="total, sizes, prev, pager, next, jumper"
    总条数
      :total="400" -->
    <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pagenum"
    :page-sizes="[1,2,3,4]"
    :page-size="pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
    </el-pagination>
    <!-- 总条数total,
    sizes,
    prev,
    pager,
    next,
    jumper -->
  </el-card>

</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: true,
      // 分页
      pagenum: 2,
      // 总条数
      pagesize: 2,
      // 默认数据
      total: 0
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      // 获取token
      const token = sessionStorage.getItem('token');
      // 设置请求头
      this.$axios.defaults.headers.common['Authorization'] = token;

      // 发送异步请求
      // 获取结果
      const res = await this.$axios.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      console.log(res);

      // 请求结束
      this.loading = false;
      const data = res.data;

      // 解构 数据
      const { meta: { msg, status } } = data;
      // 判断状态
      if (status === 200) {
        const { data: { users } } = data;
        this.list = users;
        this.total = res.data.data.total;
      } else {
        this.$message.error(msg);
      }
    },
    // 分页方法
    // 当前页总跳数
    handleSizeChange(val) {
      this.pagesize = val;
      // 发送请求 获取数据
      this.loadData();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      // 发送请求  获取数据
      this.loadData();
    }
  }
};

</script>

<style>
  .box-card {
    height: 100%;
  }

  .searchArea {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .searchArea .searchInput {
    width: 350px;
  }

</style>
