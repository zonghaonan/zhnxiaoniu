<template>
  <div id="register">
    <h3> 用户注册</h3>
    <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
    <mt-field label="昵称" placeholder="请输入昵称" v-model="nickname"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
    <mt-field label="请再次确认密码" placeholder="请输入密码" type="password" v-model="repassword"></mt-field>
    <mt-field label="手机号" placeholder="请输入手机号" v-model="mobile"></mt-field>
    <mt-button type="primary" :disabled="disabled" @click="sendSmsCode"> 点击发送验证码</mt-button>
    <mt-field label="短信验证码" placeholder="请输入验证码" v-model="smsCode"></mt-field>
    <mt-button type="primary" @click="submit">注册</mt-button>
  </div>

</template>

<script>
import {Toast} from 'mint-ui';

export default {
  name: 'register',
  data() {
    return {
      username: '',
      password: '',
      repassword:"",
      mobile: "",
      smsCode: "",
      nickname: "",
      disabled: false
    }
  },
  methods: {
    sendSmsCode() {
      // parameters
      var params = new URLSearchParams();
      params.append('mobile', this.mobile);
      this.$http.get("/api2/auth/getSmsCode?mobile=" + this.mobile).then((res) => {
        if (res.data.success){
          Toast("验证码已发送");
          this.disabled = true
        }else {
          Toast(res.data.message)
        }
      }).catch(err => {
        console.log(err);
        Toast('请检查您的网络')
      });
    },
    submit: function () {
      // parameters
      let data = {
        'username': this.username, 'password': this.password,
        'mobile': this.mobile, 'smsCode': this.smsCode, "nickname": this.nickname
      }
      //axios
      this.$http.post("/api2/auth/register", data).then(resp => {
        console.log(resp.data)
        if (resp.data.success) {
          Toast("注册成功请登录")
          this.$router.push({path: "Login"})
        } else {
          Toast(resp.data.message)
        }
      }).catch(err => {
        console.log(err);
        Toast("请检查网络")
      });
    },
  }
}
</script>
