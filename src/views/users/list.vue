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
        <el-button type="success" plain @click="adduserdialogFormVisible = true">添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 添加对话框 -->
    <el-dialog title="添加用户" @close="closeform" :visible.sync="adduserdialogFormVisible">
      <el-form :model="form" label-width="80px" :rules="rules" ref="form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" auto-complete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" auto-complete="off" type="text"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="form.mobile" auto-complete="off" type="text"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adduserdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="adduser">确 定</el-button>
      </div>
    </el-dialog>

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
          <el-switch @change="handlechange(scope.row)" v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 编辑 -->
          <el-button type="primary" icon="el-icon-edit" round></el-button>
          <!-- 删除 -->
          <el-button type="danger" icon="el-icon-delete" @click="deletes(scope.row.id)" round></el-button>
          <!-- 状态 -->
          <el-button type="success" icon="el-icon-check" round></el-button>

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
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[1,2,3,4]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
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
      total: 0,
      // 添加对话框
      adduserdialogFormVisible: false,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 表单验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名！', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码！', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }

    };
  },

  created() {
    this.loadData();
  },
  methods: {

    // 页面加载 获取内容
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
    // 当前页总条数
    handleSizeChange(val) {
      // 记录总条数
      this.pagesize = val;
      // 发送请求 获取数据
      this.loadData();
    },

    // 当前页数
    handleCurrentChange(val) {
      // 记录页数
      this.pagenum = val;
      // 发送请求  获取数据
      this.loadData();
    },

    // 删除
    deletes(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$axios.delete(`users/${id}`);

        // 获取返回数据
        const { meta: { msg, status } } = res.data;
        if (status === 200) {
          this.$message.success(msg);

          // 如果是最后一页 删除数据会有而问题
          // 此时需要解决
          // 判断 不是第一页 &&
          if (this.pagenum > 1 && this.formData.length === 1) {
            this.pagesize--;
          };
          // 刷新页面
          this.loadData();
        } else {
          this.$message.error(msg);
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    // 修改用户状态
    async handlechange(user) {
      // postman 测试接口
      const res = await this.$axios.put(`users/${user.id}/state/${user.mg_state}`);

      const { meta: { status, msg } } = res.data;

      if (status === 200) {
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    },

    // 添加用户
    adduser() {
      // 验证表单
      this.$refs.form.validate(async (valid) => {
        // 失败
        if (!valid) {
          this.$message.warn('验证失败！');
          return;
        }
        const res = await this.$axios.post('users', this.form);

        const { meta: { status, msg } } = res.data;

        if (status === 201) {
          // 弹出提示框
          this.$message.success(msg);
          // 刷新页面
          this.loadData();
          // 弹框消失
          this.adduserdialogFormVisible = false;
        } else {
          this.$message.error(msg);
        }
      });
    },

    // 关闭对话框 ， 清空内容
    closeform() {
      // 清空输入框内容
      // 遍历对象所有属性 ， 将属性值设置为空
      for (let key in this.form) {
        this.form[key] = '';
      }
    }

    // 表单验证

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
