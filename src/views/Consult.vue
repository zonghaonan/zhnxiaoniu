<template>
  <div class="profile answerInfo" :style="height">
    <!-- header -->
    <div class="comm-header">
      <div class="title">
        <i class="arr-left" @click="$router.back(-1)">
          <img src="../assets/img/chat/btn-back.png" alt />
        </i>
        回答人信息
      </div>
    </div>
    <!-- info -->
    <div class="profile-info">
      <header class="hd">
        <div class="portrait">
          <img src="../assets/img/home/portrait.png" alt />
        </div>
        <div class="user-info">
          <div class="name">
            就爱答点题
            <img src="../assets/img/profile/renzheng.png" alt />
          </div>
          <div class="code">用户号:123456789</div>
          <div class="marks">
            <div class="tip age-tip">
              <img src="../assets/img/profile/female.png" alt /> 30岁
            </div>
            <div class="tip">南京</div>
            <div class="tip">南京邮电大学-电子信息</div>
          </div>
        </div>
      </header>
      <!-- btn -->
      <Follow></Follow>
      <footer class="ft-info2">
        <div class="item">
          <div class="notice">10.1万</div>
          <div class="text">获赞</div>
        </div>
        <div class="item">
          <div class="notice">2.3万</div>
          <div class="text">粉丝</div>
        </div>
        <div class="item">
          <div class="notice">300</div>
          <div class="text">关注</div>
        </div>
      </footer>

      <footer class="ft-info mt-30">
        <div class="item">
          <div class="tip">平均响应时间:</div>
          <div class="text">1小时</div>
        </div>
        <div class="item">
          <div class="tip">答题数:</div>
          <div class="text">112</div>
        </div>
        <div class="item">
          <div class="tip">好评</div>
          <div class="stars">
            <img src="../assets/img/profile/wujiaoxingxingxing.png" alt />
            <img src="../assets/img/profile/wujiaoxingxingxing.png" alt />
            <img src="../assets/img/profile/wujiaoxingxingxing.png" alt />
            <img src="../assets/img/profile/wujiaoxingxingxing.png" alt />
            <img src="../assets/img/profile/wujiaoxingxingxing.png" alt />
          </div>
        </div>
      </footer>
    </div>
    <!-- consult  -->
    <div class="consult-wrap">
      <div class="consult-item">
        <header class="consult-title">
          <span>联系方式</span>
        </header>

        <ul class="contact-list">
          <li>
            <label for>
              手机号码：
              <span class="area-code">+86</span>
            </label>
            <input type="text" placeholder="请输入您的手机号码" class="contact-input" />
          </li>
          <li>
            <label for>微信号码：</label>
            <input type="text" placeholder="请输入您的微信号码" class="contact-input" />
            <mt-button type="danger" size="small" class="sameTelNum">同号手机</mt-button>
          </li>
          <li>
            <div class="contact-tip">*为保护隐私，专业咨询不会对任何第三方公开，请放心咨询</div>
          </li>
        </ul>
      </div>
      <div class="consult-item">
        <header class="consult-title">
          <span>详情</span>
          <span class="title-tip">（共有3轮交流机会）</span>
        </header>

        <ul class="contact-list">
          <li>
            <textarea class="contact-area" placeholder="请具体描述您的问题！"></textarea>
          </li>
        </ul>
      </div>
    </div>
    <ChatBottom ref="chatBottom"></ChatBottom>
  </div>
</template>

<script>
import ChatBottom from "../components/ChatBottom.vue";
import Follow from "../components/Follow.vue";
export default {
  name: "Consult",
  components: { ChatBottom, Follow },
  data() {
    return {
      // 滚动height
      height: {
        height: "",
      },
    };
  },
  methods: {
    // 隐私问题点击
    setProClick(index) {
      console.log(index);
      this.tabIndex = index;
    },
    // 动态获取主体内容高度
    hh() {
      this.$nextTick(() => {
        let height = this.$refs.chatBottom.$el.offsetHeight;
        this.height.height = window.innerHeight - height + "px";
      });
    },
  },
  mounted() {
    this.hh();
  },
};
</script>
<style lang="scss">
.comm-header {
  display: flex;
  justify-content: space-between;
  height: 3.333333rem;
  background: url(../assets/img/profile/bg.png);
  padding: 0.4rem;
  color: #fff;
  background-size: 100% 100%;
  font-size: 0.48rem;
}

.edit-btn {
  position: absolute;
  top: 0.4rem;
  right: 0;
  background: rgba(224, 0, 46, 0.1);
  border-radius: 24px 0px 0px 24px;
  padding: 0.133333rem 0.4rem;
  color: #e0002e;
  font-size: 0.293333rem;
  display: flex;
  align-items: center;
  justify-content: center;
  &.active {
    background-color: rgba(0, 0, 0, 0.1);
  }

  img {
    width: 0.373333rem;
    margin-right: 0.133333rem;
  }
  span {
    font-weight: 500;
  }
}

.consult-wrap {
  padding: 0.4rem;

  .consult-item {
    .consult-title {
      font-size: 0.373333rem;
      font-weight: bold;
      color: rgba(40, 40, 40, 1);

      .title-tip {
        color: #e0002e;
      }
    }
    .contact-list {
      margin-top: 0.266667rem;
      background: #fff;
      border-radius: 0.213333rem;

      padding: 0 0.266667rem;

      li {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eeeeee;
        padding: 0.4rem 0;
        position: relative;
        margin-bottom: 0.4rem;

        &:last-child {
          border: none;
        }
        .area-code {
          color: #666666;
        }

        label {
          font-size: 0.346667rem;
          font-weight: 400;
          color: rgba(40, 40, 40, 1);
          display: flex;
          align-items: center;
          white-space: nowrap;
        }
        .contact-input {
          border: none;
          outline: none;
          width: 100%;
          padding: 0 0.533333rem;
        }
        .contact-area {
          border: none;
          outline: none;
          resize: none;
          height: 7.466667rem;
        }
      }
      .sameTelNum {
        position: absolute;
        bottom: 0.24rem;
        right: 0;
        width: 2.133333rem;
        height: auto;
        padding: 0.173333rem 0 0.16rem 0;
        background: linear-gradient(
          90deg,
          rgba(186, 44, 40, 1),
          rgba(214, 53, 49, 1)
        );
        border-radius: 24px;
        color: #fff;
        font-size: 0.32rem;
        text-align: center;

        font-weight: 500;
        .mint-button-text {
          color: #fff;
          font-size: 0.32rem;
          padding: 0;
          justify-content: center;
          text-align: center;
        }
      }
      .contact-tip {
        font-size: 0.293333rem;
        font-weight: 400;
        color: #e0002e;
      }
    }
  }
}

input::-webkit-input-placeholder {
  color: #dddddd;
}

textarea::-webkit-input-placeholder {
  color: #dddddd;
}
</style>
