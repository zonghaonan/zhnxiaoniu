<template>
  <div>
    <!-- header -->
    <div class="comm-chat-header">
      <div class="title">
        <i class="arr-left" @click="$router.back(-1)">
          <img src="../assets/img/chat/btn-back.png" alt />
        </i>
        返回
      </div>
    </div>

    <div v-if="ajax_ok">
      <div align="center" @click="showSelect">
        <img style="margin:10px" :src="userInfo.avatar" width="120px" height="120px" />
        <input type="file" @change="handleFileChange" accept="image/*"/>
      </div>

      <ul class="user-list">
        <li @click="editNickName()">
          <div class="title">
            <img src="../assets/img/profile/vip.png" alt />
            昵称
          </div>
          <div class="arrow">
            {{userInfo.nickname}}
            <img src="../assets/img/profile/btn-back.png" alt />
          </div>
        </li>
        <li @click="editUserName()">
          <div class="title">
            <img src="../assets/img/profile/vip.png" alt />
            账号
          </div>
          <div class="arrow">
            {{userInfo.username}}
            <img src="../assets/img/profile/btn-back.png" alt />
          </div>
        </li>
        <li>
          <div class="title">
            <img src="../assets/img/profile/vip.png" alt />
            简介
          </div>
          <div class="arrow">
            {{userInfo.introduce.substring(0,15)}}
            <img src="../assets/img/profile/btn-back.png" alt />
          </div>
        </li>
        <li @click="showSexList()">
          <div class="title">
            <img src="../assets/img/profile/vip.png" alt />
            性别
          </div>
          <div class="arrow">
            {{userInfo.gender}}
            <img src="../assets/img/profile/btn-back.png" alt />
          </div>
        </li>
        <li @click="openPicker()">
          <div class="title">
            <img src="../assets/img/profile/vip.png" alt />
            出生年月
          </div>
          <div class="arrow">
            {{userInfo.birthday}}
            <img src="../assets/img/profile/btn-back.png" alt />
          </div>
        </li>
        <li>
          <div class="title">
            <img src="../assets/img/profile/vip.png" alt />
            学校
          </div>
          <div class="arrow">
            {{userInfo.university}}
            <img src="../assets/img/profile/btn-back.png" alt />
          </div>
        </li>
        <li>
          <div class="title">
            <img src="../assets/img/profile/vip.png" alt />
            专业
          </div>
          <div class="arrow">
            {{userInfo.department}}
            <img src="../assets/img/profile/btn-back.png" alt />
          </div>
        </li>
        <li>
          <div class="title">
            <img src="../assets/img/profile/vip.png" alt />
            学段
          </div>
          <div class="arrow">
            {{userInfo.phase}}
            <img src="../assets/img/profile/btn-back.png" alt />
          </div>
        </li>
        <li>
          <div class="title">
            <img src="../assets/img/profile/vip.png" alt />
            城市
          </div>
          <div class="arrow">
            {{userInfo.city}}
            <img src="../assets/img/profile/btn-back.png" alt />
          </div>
        </li>
      </ul>

      <mt-actionsheet :actions="actions" v-model="sheetVisible">
      </mt-actionsheet>
      <mt-actionsheet :actions="actions1" v-model="sheetVisible1">
      </mt-actionsheet>
      <mt-datetime-picker ref="picker" type="date" year-format="{value} 年" month-format="{value} 月"
        date-format="{value} 日" :startDate="startDate" @confirm="handleConfirm">
      </mt-datetime-picker>

    </div>
    <div v-else>
      网络异常
    </div>
  </div>
</template>

<script>
  import {
    Toast
  } from 'mint-ui'
  export default {
    name: 'editinfo',
    data() {
      return {
        userInfo: null,
        uid: 0,
        ajax_ok: false,
        startDate: new Date('1960/1/1'),
        actions: [{
            name: "男",
            method: this.isMale
          },
          {
            name: "女",
            method: this.isFeMale
          }
        ],
        sheetVisible: false,
        actions1: [
          {
            name: "相册",
            method: this.getPhoto
          }
        ],
        sheetVisible1: false,
        pickerVisible: true,
      }
    },
    created: function () {
      var uid = this.$route.params.userid;
      this.uid = uid;
      console.log(uid);

      this.$http.get("/api4/ucenter/getSelfUserInfoDetail", {
        params: {
          userId: uid
        }
      }).then(resp => {
        // console.log(resp.data)
        this.userInfo = resp.data.data
        console.log(this.userInfo);
        this.ajax_ok = true;
      }).catch(err => {
        console.log(err);
      });

    },
    methods: {
      showSelect() {
        this.sheetVisible1 = !this.sheetVisible1;
      },
      isMale: function () {
        this.userInfo.gender = '男';
      },
      isFeMale: function () {
        this.userInfo.gender = '女';
      },
      showSexList: function () {
        this.sheetVisible = !this.sheetVisible;
      },
      handleConfirm: function (value) {

        var year = value.getFullYear();
        var month = value.getMonth() + 1;
        var day = value.getDay();

        this.userInfo.birthday = year + '-' + month + '-' + day;
      },
      openPicker: function () {
        this.$refs.picker.open();
      },
      editNickName() {
        this.$messagebox.prompt('请输入昵称').then(({
          value,
          action
        }) => {
          if (value) {
            this.userInfo.nickname = value
            console.log(action);
            this.$http.put('/api4/ucenter/updateUserInfo', this.userInfo).then(res => {
              Toast(res.data.message)
            }).catch(err => {
              console.log(err);
            });
          } else {
            Toast('请输入昵称')
          }
        })
      },
      editUserName() {
        this.$messagebox.prompt('请输入姓名').then(({
          value,
          action
        }) => {
          this.userInfo.username = value
          console.log(action);

        })
      },
      getPhoto(){

      }
    },

  }
</script>


<style lang="scss">
  .user-list {
    width: 9.2rem;
    margin: 0 auto;
    margin-top: 0.4rem;
    border-radius: 0.213333rem;

    li {
      height: 1.173333rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
      padding: 0 0.266667rem;
      color: #282828;

      &:active {
        background-color: rgba(0, 0, 0, 0.1);
      }

      .title {
        img {
          width: 0.426667rem;
          margin-right: 0.133333rem;
        }
      }

      .arrow {
        color: #999999;

        img {
          width: 0.16rem;
          margin-left: 0.266667rem;
        }
      }
    }
  }
</style>