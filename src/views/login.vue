<template>
    <div class="login-wrap">
        <el-form 
            class="login-form"
            label-position="top"
            label-width="80px"
            :model="formData"
        >

            <h2 style="text-align:center">用户登录</h2>

            <el-form-item label="用户名">
                <el-input v-model="formData.username"></el-input>
            </el-form-item>

            <el-form-item label="密码">
                <el-input v-model="formData.password"></el-input>
            </el-form-item>

            <el-button class="login-button" type="primary">登录</el-button>
        
        </el-form>
     </div>
</template>

<script>
export default {
    data(){
        return {
            formData:{
                username:'',
                password:''
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
