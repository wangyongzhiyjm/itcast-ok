<template>
  <div class="login-wrap">
    <el-form class="login-form" label-position="top" label-width="80px" :model="formData">

      <h2 style="text-align:center">用户登录</h2>

      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>

      <el-form-item label="密码">
        <el-input v-model="formData.password" type="password" @keyup.enter.native="login"></el-input>
      </el-form-item>

      <el-button class="login-button" type="primary" @click="login">登录</el-button>
    </el-form>
  </div>
</template>

<script>

export default {

  data() {
    return {
      formData: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    // 登录事件

    async login() {
      const res = await this.$axios.post('login', this.formData);

      const {meta: {msg, status}} = res.data;
      // 根据结果 判断
      if (status === 200) {
        // 成功成功提示
        this.$message.success(msg);
        // 记录token
        // console.log(res.data.data.token);
        // 设置 token
        sessionStorage.setItem('token', res.data.data.token);
        // 跳转页面
        this.$router.push('home');
      } else {
        // 失败弹出失败信息
        this.$message.error(msg);
      }
    }
  }

};

</script>

<style>
  /* 包裹表单的盒子 */
  .login-wrap {
    background-color: #324152;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* form表单 */
  .login-wrap .login-form {
    background-color: #fff;
    width: 400px;
    padding: 30px;
    text-align: left;
    border-radius: 5px;
  }

  /* 登陆按钮 */
  .login-wrap .login-form .login-button {
    width: 100%;
    margin-top: 40px;
  }

</style>
