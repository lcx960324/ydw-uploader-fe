<template>
  <div class="upl-login">
    <div class="upl-login-title">
      <span class="upl-login-title-text"><Icon type="paper-airplane"></Icon> 原点网 &middot; 上传中心</span>
    </div>
    <div class="upl-login-form">
      <Form>
        <Form-item label="用户名">
          <Input v-model="username" type="text"></Input>
        </Form-item>
        <Form-item label="密码">
          <Input v-model="password" type="password"></Input>
        </Form-item>
      </Form>
      <Button @click="login" class="upl-login-form-button" type="success" long>登录</Button>
    </div>
  </div>
</template>

<script>
import { login } from '@/APIs/user'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      login(this.username, this.password).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less">
@bg: #FFF;
@border: #dddee1;
.upl-login {
  width: 400px;
  height: 300px;
  background: @bg;
  border-radius: 6px;
  margin: 100px auto 0 auto;
  &-title {
    text-align: center;
    padding: 15px 0;
    border-bottom: 1px solid @border;
    &-text {
      height: 30px;
      line-height: 30px;
      font-size: 24px;
    }
  }
  &-form {
    margin: 10px 20px;
    .ivu-form-item {
      margin-bottom: 18px;
    }
    &-button {
      margin-top: 10px;
    }
  }
}
</style>
