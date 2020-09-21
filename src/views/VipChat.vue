<template>
  <!-- <div v-if="ajax_ok" class="chat vip-chat" :style="height" id="chatWindow"> -->
  <!-- 上面是原始的  下面是固定的-->
  <div v-if="ajax_ok" class="chat chat-page" :style="height" id="chatWindow">
    <!-- header -->
    <div class="chatHeaderFixed">
      <div class="comm-chat-header">
        <div class="title">
          <i class="arr-left" @click="$router.back(-1)">
            <img src="../assets/img/chat/btn-back.png" alt />
          </i>
          VIP具体交流
        </div>
      </div>
      <div class="chat-top">
        <div class="vip-item">
          <header class="vip-tit">
            <div class="tit">VIP服务订单信息</div>
            <!-- <div class="num">NO：123456</div> -->
            <div class="num">NO：{{sessionId}}</div>
          </header>
          <div class="v-info">咨询问题：{{qaData.data.title}}</div>
          <footer class="v-ft">
            <div class="price">
              ￥
              <span>{{qaData.data.price}}</span>
            </div>
          </footer>
        </div>

        <!-- <div class="chat-contact-info">
            <header class="c-title">联系方式</header>
            <div class="c-box">
              <div class="citem">手机号码：18311111111</div>
              <div class="citem">微信号：12346789</div>
            </div>
          </div> -->
      </div>
    </div>
    <div class="chat-middle">
      <div v-for="(item,index) in qaData.data.qaMessageList" :key="index">
        <div v-if="item.senderId!=userId" class="words">
          <div class="w-img">
            <img :src="otherAvatar" alt />
          </div>
          <div class="w-txt" v-if="item.content===''"><img style="margin-left:10px;max-width: 200px;" :src="item.img" alt /></div>
          <div v-else class="w-txt">{{item.content}}</div>
        </div>
        <div v-else class="words flex-end vip-flex-end">
          <div class="w-img">
            <img :src="myAvatar" alt />
          </div>
          <div v-if="item.content===''"><img style="margin-right:10px;max-width: 200px;" :src="item.img" alt /></div>
          <div v-else class="w-txt">{{item.content}}</div>
          <!-- <div class="w-txt">{{item.content}}</div> -->
        </div>
      </div>
      <!-- <div class="words">
        <div class="w-img">
          <img src="../assets/img/search/touxiang.png" alt />
        </div>
        <div class="w-txt">消息消息消息消息消息消息消息消息</div>
      </div>
      <div class="words flex-end vip-flex-end">
        <div class="w-img">
          <img src="../assets/img/search/touxiang2.png" alt />
        </div>
        <div class="w-txt">消息消息消息消息消息消息消息消息</div>
      </div>
      <div class="words-time">08:26</div>
      <div class="words">
        <div class="w-img">
          <img src="../assets/img/search/touxiang.png" alt />
        </div>
        <div class="w-txt">消息消息消息消息消，息消息消消息。消息消息消息消息消息消消息消息，消息消息消息消息消消！息消息消息消息，消息消息消消息。</div>
      </div>
      <div class="words">
        <div class="w-img">
          <img src="../assets/img/search/touxiang.png" alt />
        </div>
        <div class="w-zip">
          <div class="zip-info">
            <div class="z-name">文件名.ZIP</div>
            <div class="size">1.2M</div>
          </div>
          <div class="zip-icon">
            <img src="../assets/img/chat/wenjian2.png" alt />
          </div>
        </div>
      </div>
      <div class="words flex-end vip-flex-end">
        <div class="w-img">
          <img src="../assets/img/search/touxiang2.png" alt />
        </div>
        <div class="w-pic">
          <img src="../assets/img/chat/10.png" alt />
        </div>
      </div> -->
    </div>
    <VipChatBottom v-bind:sessionId='sessionId' ref="chatBottom" @add-comment="getMsgList"></VipChatBottom>
  </div>
</template>

<script>
  import {
    Toast
  } from 'mint-ui';
  import VipChatBottom from "../components/VipChatBottom.vue";
  export default {
    name: "vipChat",
    components: {
      VipChatBottom,
    },
    data() {
      return {
        height: {
          height: "",
        },
        qaData: [],
        ajax_ok: false,
        unfinished: true,
        sessionId: -1,
        userId: '',
        content: '',
        bEndable: false,
        // cur : -1,
        flag: false, //鼠标点击后变成true，鼠标进入进出事件就不会改变背景图
        popupVisible: true,
        logUserInfo: '',
        page: 0,
        size: 20,
        replyId: '',
        timer: null,
        myAvatar: '',
        otherAvatar: '',
      };
    },
    methods: {
      // 动态获取主体内容高度
      hh() {
        this.$nextTick(() => {
          if (this.$refs.chatBottom) {
            let height = this.$refs.chatBottom.$el.offsetHeight;
            this.height.height = window.innerHeight - height + "px";
          }

        });
      },
      updated: function () {
        this.$nextTick(function () {
          var div = document.getElementById('chatWindow');
          if (div != null) {
            div.scrollTop = div.scrollHeight;
          }

        })
      },
      toJson: function (str) {
        var _str = JSON.parse(str);
        //console.log(_str.src);
        return _str;
      },
      getMsgList: function () {
        this.sessionId = this.$route.params.id;
        console.log(this.sessionId);
        this.$http.get('/api7/sessionmsg/getSessionQaDetail?serviceSessionId=' + this.sessionId)
          .then(resp => {
            console.log("sessionId= " + this.sessionId)
            console.log('success getVipSessionMsg')
            console.log(resp.data)
            if (this.userId === resp.data.data.questionerId) {
              this.myAvatar = resp.data.data.questionerAvatar;
              this.otherAvatar = resp.data.data.replyAvatar;
            } else {
              this.myAvatar = resp.data.data.replyAvatar;
              this.otherAvatar = resp.data.data.questionerAvatar;
            }

            this.qaData = resp.data;
            this.ajax_ok = true;
            console.log(this.ajax_ok)
            // 查看一下状态
            if (resp.data.data.status == 3) {
              this.bEndable = true;
            }
            this.updated();
          }).catch(err => {
            this.showtoast('网络异常')
            console.log(err);
            console.log('failed getVipSessionMsg')
            this.ajax_ok = false;
          });
      },
      showPopup: function () {
        if (this.logUserInfo.userId === this.qaData.data.questionerId && this.qaData.data.status === 4) {
          return true;
        } else {
          return false;
        }
      },
      terminatSession: function () {
        Toast("完结此问题");
        //return;
        this.setstatus(this.sessionId, 4); // 4最终完结
      },
      showtoast: function (msg) {
        Toast(msg);
      },
    },
    mounted() {
      this.hh();
      this.logUserInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      this.userId = this.logUserInfo.userId;
      // this.getVipSessionData();
      this.getMsgList();
      this.timer = setInterval(this.getMsgList, 10000)
    },
    beforeDestroy() {
      clearInterval(this.timer);
      this.timer = null;
    }
  };
</script>
<style lang="scss">
  .comm-chat-header {
    display: flex;
    justify-content: space-between;
    height: 1.173333rem;
    align-items: center;
    background: linear-gradient(90deg,
        rgba(199, 53, 49, 1) 0%,
        rgba(186, 44, 40, 1) 100%);
    padding: 0 0.4rem;
    color: #fff;
    background-size: 100% 100%;
    font-size: 0.48rem;

    .title {
      display: flex;
      width: 5.2rem;

      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;


      .arr-left {
        padding-right: 0.266667rem;

        img {
          width: 0.186667rem;
        }
      }
    }
  }

  .comm-chat-header .title {
    align-items: center;
  }

  .vip-chat {
    padding-bottom: 1.333333rem;
  }

  .chat-contact-info {
    margin-top: 0.266667rem;

    .c-title {
      font-size: 0.293333rem;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }

    .c-box {
      display: flex;
      justify-content: space-between;
      font-size: 0.346667rem;
      font-weight: 400;
      color: rgba(40, 40, 40, 1);
      margin-top: 0.266667rem;
    }
  }

  .vip-flex-end {
    .w-txt {
      background-color: #e0002e !important;
      color: #fff !important;
    }
  }

  .chat-page {
    padding-top: 5.066667rem;
  }

  .chatHeaderFixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 0;
    background-color: #fff;
  }
</style>