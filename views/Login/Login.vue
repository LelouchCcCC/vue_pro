<!--<template>-->
<!--  <el-form-->
<!--      :model="form"-->
<!--      status-icon-->
<!--      :rules="rules"-->
<!--      :ref="form"-->
<!--      label-width="100px"-->
<!--      class="login-container"-->
<!--  >-->
<!--    <h3 class="login_title">系统登陆</h3>-->
<!--    <el-form-item-->
<!--        label="用户名"-->
<!--        label-width="80px"-->
<!--        prop="username"-->
<!--        class="username"-->
<!--    >-->
<!--      <el-input-->
<!--          type="input"-->
<!--          v-model="form.username"-->
<!--          autocomplete="off"-->
<!--          aria-placeholder="请输入账号"-->
<!--      >-->
<!--      </el-input>-->
<!--    </el-form-item>-->
<!--    <el-form-item-->
<!--        label="密码"-->
<!--        label-width="80px"-->
<!--        prop="password"-->
<!--        class="password"-->
<!--    >-->
<!--      <el-input-->
<!--          type="password"-->
<!--          v-model="form.password"-->
<!--          autocomplete="off"-->
<!--          aria-placeholder="请输入密码"-->
<!--      >-->
<!--      </el-input>-->
<!--    </el-form-item>-->
<!--    <a style="text-align: left;font-size: 10px;margin-left: 30px;">账号注册</a>-->
<!--    <el-form-item class="login_submit">-->
<!--      <el-button type="primary" @click="login" class="login_submit">登录</el-button>-->
<!--    </el-form-item>-->
<!--  </el-form>-->
<!--</template>-->
<template>
  <div class="loginbody">
    <div class="logindata">
      <div class="logintext">
        <h2>Welcome</h2>
      </div>
      <div class="formdata">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="username">
            <el-input
              v-model="form.username"
              clearable
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              clearable
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="tool">
        <div>
          <el-checkbox v-model="checked" @change="remenber"
            >记住密码</el-checkbox
          >
        </div>
        <div>
          <span class="shou" @click="forgetpas" >忘记密码？</span>
        </div>
      </div>
      <div class="butt">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button class="shou" @click="register">注册</el-button>
      </div>
    </div>
  </div>
</template>


<script>
import {getMenu} from '../../api/data'

export default {
  name: "Login",
  data() {
    return {
      // form: {},
      // rules: {
      //   username: [
      //     {required: true, message: "请输入用户名", trigger: "blur"},
      //     {
      //       min: 3,
      //       message: "用户名长度不能小于3位",
      //       trigger: "blur"
      //     }
      //   ],
      //   password: [
      //     {required: true, message: "请输入密码", trigger: "blur"}
      //   ]
      // },
      form: {
        password: "",
        username: "",
      },
      checked: false,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { max: 10, message: "不能大于10个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { max: 10, message: "不能大于10个字符", trigger: "blur" },
        ],
      },
    }
  },
  methods: {
    login() {
      getMenu(this.form).then(res => {

        console.log("这是res",res)
        if (res.data.code === '20000') {
          this.$store.commit('setToken',res.data.token)
          this.$router.push({name:'Home'})
        } else {
          this.$message({showClose:true, message:res.data.message, type:'warning'})
        }
      })
    },
    remenber(data){
      this.checked=data
      if(this.checked){
          localStorage.setItem("news",JSON.stringify(this.form))
      }else{
        localStorage.removeItem("news")
      }
    },
    forgetpas() {
      this.$message({
        type:"info",
        message:"功能尚未开发额😥",
        showClose:true
      })
    },
    register() {},
  }
}
</script>

<style lang="less" scoped>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

.login_submit {
  margin: 10px auto 0px auto;
  text-align: center;
}

.login_submit {
  ::v-deep.el-form-item__content {
    text-align: center;
    margin-left: 0px !important;
  }

}


.loginbody {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  background-image: url("../../src/pic/pm.jpg");
  background-size: 100% auto;
  //background-position: center center;
  overflow: auto;
  background-repeat: no-repeat;
  position: fixed;
  line-height: 100%;
  padding-top: 150px;
}

.logintext {
  margin-bottom: 20px;
  line-height: 50px;
  text-align: center;
  font-size: 30px;
  font-weight: bolder;
  color: white;
  text-shadow: 2px 2px 4px #000000;
}

.logindata {
  width: 400px;
  height: 300px;
  transform: translate(-50%);
  margin-left: 50%;
}

.tool {
  display: flex;
  justify-content: space-between;
  color: #606266;
}

.butt {
  margin-top: 10px;
  text-align: center;
}

.shou {
  cursor: pointer;
  color: #606266;
}

/*ui*/
/* /deep/ .el-form-item__label {
  font-weight: bolder;
  font-size: 15px;
  text-align: left;
}

/deep/ .el-button {
  width: 100%;
  margin-bottom: 10px;

} */

</style>