<template>
  <div>
    <p></p>
    <el-header>
      <p></p>
      <div>信息反馈</div>
    </el-header>
    <el-row :gutter="20">
      <el-col :offset="4" :span="16">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="">
            <el-input type="textarea" v-model="form.desc" :rows="7" placeholder="请把您对我们的建议和问题告诉我们"
                      @blur="noBlank"></el-input>
          </el-form-item>
          <el-form-item label="您的邮箱">
            <el-input placeholder="请输入您的邮箱" v-model="form.email" @blur="sendEmail">

            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
        <!--        <label>我们会在一个工作日内给您进行回复</label>-->
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>
  </div>
</template>

<script>
import {getFeed} from "../../api/data";

export default {
  name: "UserBack",
  data() {
    return {
      form: {
        desc: '',
        email: ''
      }
    }
  },
  methods: {
    sendEmail() {
      let regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (this.form.email !== '' && !regEmail.test(this.form.email)) {
        this.$message({
          message: '邮箱格式不正确',
          type: 'error'
        })
        this.form.email = ''
      }
    },
    noBlank() {
      if (this.form.desc === '') {
        this.$message({
          message: '内容不能为空',
          type: 'error'
        })
      }
    },
    onSubmit() {
      if (this.form.desc !== '' && this.form.email !== '') {
        getFeed(this.form).then(res => {
          let re = res.data.ok
          if (re === 0) {
            this.$message({
              message: '您的建议已经成功反馈到后台',
              type: 'success'
            })
            this.form.desc = ''
          }
        })
      }else {
        this.$message({
          message: '内容不能为空',
          type: 'error'
        })
      }

    }
  }
}
</script>

<style scoped>

</style>