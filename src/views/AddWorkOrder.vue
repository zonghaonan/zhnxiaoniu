<template>
  <div>
    <div class="comm-chat-header">
      <div class="title">
        <i class="arr-left" @click="$router.back(-1)">
          <img src="../assets/img/chat/btn-back.png" alt />
        </i>
        添加工单
      </div>
    </div>
    <div class="formContent">
      <mt-field label="问题" placeholder="请输入问题" maxLength="8" type="text" v-model="addForm.taskTitle"></mt-field>
      <mt-field label="问题描述" rows="5" placeholder="请输入问题描述" type="textarea" v-model="addForm.taskDescription">
      </mt-field>
      <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="addForm.taskPhone"></mt-field>
      <mt-button class="submit" type="primary" @click.native="addOrder">提交工单</mt-button>
    </div>
  </div>
</template>
<script>
  import {
    Toast
  } from 'mint-ui';
  export default {
    data() {
      return {
        addForm: {},
        userInfo: "",
        userinfo: ''
      }
    },
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      console.log(this.userInfo);
      this.addForm.taskUsername = this.userInfo.username
      this.addForm.taskNickname = this.userInfo.nickname
      this.addForm.taskUserid = this.userInfo.userId
    },
    methods: {
      addOrder() {
        // Toast('...')
        console.log(this.addForm);
        if (!this.addForm.taskTitle || this.addForm.taskTitle.length === 0) {
          Toast('问题不能为空')
        } else if (!this.addForm.taskDescription || this.addForm.taskDescription.length === 0) {
          Toast('问题描述不能为空')
        } else if (!this.addForm.taskPhone || this.addForm.taskPhone.length === 0) {
          Toast('手机号不能为空')
        } else if (this.addForm.taskTitle.length > 16) {
          Toast('问题不超过16个字符')
        } else if (this.addForm.taskDescription.length > 255) {
          Toast('问题描述不超过255个字符')
        } else if (!(/^1[34578]\d{9}$/.test(this.addForm.taskPhone))) {
          Toast('请输入正确的手机号')
        } else {
          this.$http.post("/api1/qa/createWkTask", this.addForm)
            .then(resp => {
              console.log(resp.data)
              Toast(resp.data.message)
            }).catch(err => {
              console.log(err);
            });
          this.$router.go(-1)
        }
      }
    }
  }
</script>
<style scoped>
  .formContent {
    margin-top: 10px;
  }

  .submit {
    width: 80%;
    margin-left: 10%;
    margin-top: 10px;
  }
</style>