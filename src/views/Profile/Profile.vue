<template>
  <div class="profile">
    <!-- header -->
    <div class="comm-header">
      <div class="title">个人中心</div>
    </div>

    <!-- info -->
    <div v-if="ajax_ok">
      <div class="profile-info">
        <header class="hd">
          <div class="portrait">
            <img :src="userInfo.avatar" alt>
          </div>
          <div class="user-info">
            <div class="name">
              {{userInfo.nickname}}
              <span v-if="userInfo.verifyInfo!=''">
                <img src="../../assets/img/profile/renzheng.png" alt>
              </span>
            </div>
            <div class="code">用户号:{{userInfo.username}}</div>
            <div class="marks">
              <span v-if="userInfo.gender==='男'">
                <div class="tip age-tip">
                  <img src="../../assets/img/profile/male.png" alt>
                  {{userInfo.age}}岁
                </div>
              </span>
              <span v-else>
                <div class="tip age-tip">
                  <img src="../../assets/img/profile/female.png" alt>
                  {{userInfo.age}}岁
                </div>
              </span>
              <div class="tip">{{userInfo.city}}</div>
              <div class="tip">{{userInfo.university}}-{{userInfo.department}}</div>
            </div>
          </div>
        </header>
        <!-- btn -->
        <router-link :to="{name: 'Editinfo', params:{userid:userInfo.userId}}">
          <div class="edit-btn">
            <img src="../../assets/img/profile/edit.png" alt>
            <span>编辑</span>
          </div>
        </router-link>

        <p>
          <br>
          <span style="color:#ff6600">{{userInfo.verifyInfo}}</span>
        </p>
        <section class="sec-info">{{userInfo.introduce}}</section>
        <footer class="ft-info">
          <div class="item">
            <div class="tip">平均响应时间:</div>
            <div class="text">{{userInfo.responseTime}}分钟</div>
          </div>

          <div class="item">
            <div class="tip">好评</div>
            <Stars :thescore="userInfo.positiveRatio"></Stars>
          </div>
        </footer>
        <footer class="ft-info2">
          <div class="item">
            <div class="notice">{{userInfo.thumbUpCnt}}</div>
            <div class="text">获赞</div>
          </div>
          <div class="item">
            <div class="notice">{{userInfo.fansCnt}}</div>
            <div class="text">粉丝</div>
          </div>
          <div class="item">
            <div class="notice">{{userInfo.followCnt}}</div>
            <div class="text">关注</div>
          </div>
        </footer>
      </div>
    </div>

    <!-- list -->
    <ul class="user-list">
      <router-link :to="{name: 'ConfigQAinfo'}">
        <li>
          <div class="title">
            <img src="../../assets/img/profile/vip.png" alt>
            问答服务管理
          </div>

          <div class="arrow">
            <img src="../../assets/img/profile/btn-back.png" alt>
          </div>
        </li>
      </router-link>
      <router-link :to="{name: 'VipAddGoods'}">
        <li>
          <div class="title">
            <img src="../../assets/img/profile/vip.png" alt>
            VIP服务管理
          </div>
          <div class="arrow">
            <img src="../../assets/img/profile/btn-back.png" alt>
          </div>
        </li>
      </router-link>
      <router-link :to="{name: 'OrderMan'}">
        <li>
          <div class="title">
            <img src="../../assets/img/profile/record.png" alt>
            订单查询
          </div>
          <div class="arrow">
            <img src="../../assets/img/profile/btn-back.png" alt>
          </div>
        </li>
      </router-link>
      <router-link :to="{name: 'Wallet'}">
        <li>
          <div class="title">
            <img src="../../assets/img/profile/wallet.png" alt>
            我的钱包
          </div>
          <div class="arrow">
            <img src="../../assets/img/profile/btn-back.png" alt>
          </div>
        </li>
      </router-link>
      <router-link :to="{name:'WorkOrder'}">
        <li>
          <div class="title">
            <img src="../../assets/img/profile/tuiguang.png" alt>
            我的工单
          </div>
          <div class="arrow">
            <img src="../../assets/img/profile/btn-back.png" alt>
          </div>
        </li>
      </router-link>
      <router-link :to="{name:'Recommend'}">
        <li>
          <div class="title">
            <img src="../../assets/img/profile/tuiguang.png" alt>
            加入推广
          </div>
          <div class="arrow">
            <img src="../../assets/img/profile/btn-back.png" alt>
          </div>
        </li>
      </router-link>
      <li>
        <div class="title">
          <img src="../../assets/img/profile/message.png" alt>
          投诉建议
        </div>
        <div class="arrow">
          <img src="../../assets/img/profile/btn-back.png" alt>
        </div>
      </li>
      <li>
        <div class="title">
          <img src="../../assets/img/profile/shiyongjiaocheng.png" alt>
          创做者教程
        </div>
        <div class="arrow">
          <img src="../../assets/img/profile/btn-back.png" alt>
        </div>
      </li>
      <li>
        <div class="title">
          <img src="../../assets/img/profile/vip.png" alt>
          关于小牛
        </div>
        <div class="arrow">
          <img src="../../assets/img/profile/btn-back.png" alt>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import Stars from "../../components/Stars.vue"; //星级
  export default {
    name: "profile",
    components: {
      Stars
    },
    data() {
      return {
        selected: "1",
        value: "",
        searchValue: "",
        hotlist: [],
        userInfo: "",
        user: "",
        ajax_ok: false,
        uid: 0,
      }
    },
    created: function () {
      this.uid = JSON.parse(sessionStorage.getItem('userInfo')).userId;
      this.$http.get("/api4/ucenter/getUserInfoDetail", {
        params: {
          userId: this.uid
        }
      }).then(resp => {
        console.log(resp.data)
        this.ajax_ok = true;
        this.userInfo = resp.data.data
      }).catch(err => {
        console.log(err);
      });


    }
  };
</script>
<style lang="scss">
  .comm-header {
    display: flex;
    justify-content: space-between;
    height: 3.333333rem;
    background: url(../../assets/img/profile/bg.png);
    padding: 0.4rem;
    color: #fff;
    background-size: 100% 100%;
    font-size: 0.48rem;

    .title {
      display: flex;
      height: 0.453333rem;

      .arr-left {
        padding-right: 0.266667rem;

        img {
          width: 0.186667rem;
        }
      }
    }
  }

  .profile-info {
    width: 9.2rem;
    min-height: 3.066667rem;
    margin: 0 auto;
    margin-top: -2rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.213333rem;
    padding: 0.4rem 0.266667rem;
    position: relative;

    .hd {
      display: flex;
      align-items: flex-start;

      .portrait {
        margin-right: 0.266667rem;

        img {
          width: 1.333333rem;
          height: 1.333333rem;
          border-radius: 50%;
          border: 1px solid #e0002e;
        }
      }

      .user-info {
        .name {
          font-size: 0.4rem;
          font-weight: bold;
          color: rgba(40, 40, 40, 1);
          display: flex;
          flex-wrap: wrap;
          align-items: center;

          img {
            width: 0.32rem;
            margin-left: 0.266667rem;
          }
        }

        .code {
          font-size: 0.293333rem;
          font-weight: 500;
          color: rgba(102, 102, 102, 1);
          margin-top: 0.133333rem;
        }

        .marks {
          display: flex;
          flex-wrap: wrap;
          margin-top: 0.133333rem;

          .tip {
            padding: 0.093333rem 0.133333rem 0.066667rem 0.133333rem;
            background: rgba(85, 156, 244, 0.1);
            font-size: 0.266667rem;
            border-radius: 0.053333rem;
            margin-right: 0.133333rem;
            display: flex;
            align-items: center;
            color: #559cf4;

            img {
              width: 0.266667rem;
              height: 0.266667rem;
              margin-right: 0.08rem;
            }

            &:last-child {
              margin-right: 0;
            }

            &.age-tip {
              background: rgba(224, 0, 46, 0.1);
              color: #e0002e;
            }
          }
        }
      }
    }

    .sec-info {
      margin-top: 0.4rem;

      font-size: 0.293333rem;
      font-weight: 400;
      color: rgba(40, 40, 40, 1);

      p {
        font-size: 0.293333rem;
        margin-bottom: 0.266667rem;
      }
    }

    .ft-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #999999;

      .item {
        display: flex;
        align-items: center;
        font-size: 0.293333rem;

        .text {
          color: #282828;
        }

        .stars {
          display: flex;
          align-items: center;

          img {
            width: 0.293333rem;
            margin-left: 0.106667rem;

            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }

    .ft-info2 {
      display: flex;

      align-items: center;
      color: #999999;
      font-size: 0.346667rem;
      margin-top: 0.4rem;

      .item {
        display: flex;
        align-items: flex-end;
        margin-right: 0.666667rem;

        &:last-child {
          margin-right: 0;
        }

        .notice {
          font-size: 0.4rem;
          font-weight: bold;
          color: #e0002e;
          padding-right: 0.133333rem;
        }
      }
    }
  }

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