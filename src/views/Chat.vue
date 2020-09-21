<template>
  <div v-if="ajax_ok" class="chat chat-page" :style="height" id="chatWindow">
    <div class="chatHeaderFixed">
      <div class="comm-chat-header">
        <div class="title">
          <i class="arr-left" @click="$router.back(-1)">
            <img src="../assets/img/chat/btn-back.png" alt />
          </i>
          返回
        </div>
        <div class="menu2">
          <img @click="GetMenu(qaData.data.sessionId, qaData.data.status)" src="../assets/img/qa/menu.png" alt />
        </div>
      </div>
      <div class="chat-top">
        <div class="chat-user">
          <div class="user-item">
            <div class="portrait">
              <img :src="qaData.data.questionerAvatar" alt />
            </div>
            <div class="user-info">
              <div class="name">
                <p>{{qaData.data.questionerNickName}}</p>
                <div class="icons">
                  <img src="../assets/img/profile/renzheng.png" alt />
                  <img src="../assets/img/search/heart.png" alt />
                </div>
              </div>
              <div class="code">用户号:<span>{{qaData.data.questionerUsername}}</span></div>
            </div>
          </div>
          <div class="user-item answer-user-item">
            <div class="portrait">
              <img :src="qaData.data.replyAvatar" alt />
            </div>
            <div class="user-info">
              <div class="name">
                <p>{{qaData.data.replyNickName}}</p>
                <div class="icons">
                  <img src="../assets/img/profile/renzheng.png" alt />
                  <img src="../assets/img/search/heart.png" alt />
                </div>
              </div>
              <div class="code">用户号:<span>{{qaData.data.replyUsername}}</span></div>
            </div>
          </div>
        </div>
        <div class="chat-problem">
          <div>
            <img src="../assets/img/search/q.png" alt />
            <span>{{qaData.data.title}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- header -->
    <div class="chat-middle">
      <div v-for="(item,index) in qaData.data.qaMessageList" :key="index">
        <div v-if="item.senderId!=userId" class="words">
          <div class="w-img">
            <img :src="otherAvatar" alt />
          </div>
          <div class="w-txt" v-if="item.content===''"><img :src="item.img" style="margin-left:10px;max-width: 200px;"
              alt /></div>
          <div v-else class="w-txt">{{item.content}}</div>
        </div>
        <div v-else class="words flex-end vip-flex-end">
          <div class="w-img">
            <img :src="myAvatar" alt />
          </div>
          <div v-if="item.content===''"><img :src="item.img" style="margin-right:10px;max-width: 200px;" alt /></div>
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
      </div> -->
    </div>
    <ChatBottom v-bind:sessionId='sessionId' ref="chatBottom" @add-comment="getMsgList"></ChatBottom>

    <mt-actionsheet :actions="actions" v-model="sheetVisible">
    </mt-actionsheet>
  </div>

</template>

<script>
  import {
    Toast
  } from 'mint-ui';
  import ChatBottom from "../components/ChatBottom.vue";
  export default {
    name: "Chat",
    components: {
      ChatBottom,
    },
    data() {
      return {
        height: {
          height: "",
        },
        qaData: [],
        ajax_ok: false,
        qs_append: '',
        unfinished: true,
        sessionId: '',
        userId: '',
        content: '',
        bEndable: false,
        cur: -1,
        flag: false, //鼠标点击后变成true，鼠标进入进出事件就不会改变背景图
        popupVisible: true,
        logUserInfo: '',
        nProgress: 0,
        imgCnt: 0,
        timer: null,
        myAvatar: '',
        otherAvatar: '',
        sheetVisible: false,
        actions: [],
        activeSessId: '',
        msgSize: 0,
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
      GetMenu: function (sessid, status) {

        this.activeSessId = sessid;
        if (status == 1) // 支付过的新订单，答主在这里要决定答还是不答。
        {
          this.actions = [{
              name: "同意回答该问题",
              method: this.AcceptQuestion
            },
            {
              name: "谢绝回答该问题",
              method: this.DeclineQuestion
            }
          ];
          this.sheetVisible = true;
        } else {
          Toast("无操作任务");
        }

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
        this.$http.get('/api1/qa/getQaDetail', {
          params: {
            sessionId: this.$route.params.id
          }
        }).then(resp => {
          console.log('success getMsgList')
          console.log(resp.data)
          // console.log(resp.data.data.questionerAvatar)
          // console.log(resp.data.data.replyAvatar)
          if (this.userId === resp.data.data.questionerId) {
            this.myAvatar = resp.data.data.questionerAvatar;
            this.otherAvatar = resp.data.data.replyAvatar;
          } else {
            this.myAvatar = resp.data.data.replyAvatar;
            this.otherAvatar = resp.data.data.questionerAvatar;
          }
          this.qaData = resp.data;
          this.ajax_ok = true;
          // console.log(this.ajax_ok)
          // this.thumbsUpNo = resp.data.data.thumbUpCnt;
          // this.cur = resp.data.data.evalScore;
          // 查看一下状态
          if (resp.data.data.status == 3) {
            this.bEndable = true;
          }
          console.log('消息长度:' + Object.keys(resp.data.data.qaMessageList).length);
          if (Object.keys(resp.data.data.qaMessageList).length > this.msgSize) {
            this.msgSize = Object.keys(resp.data.data.qaMessageList).length;
            this.updated();
          }


        }).catch(err => {
          this.showtoast('网络异常')
          console.log(err);
          console.log('failed')
          this.ajax_ok = false;
        });
      },
      showOption: function () {
        this.actions = [{
            name: this.activeUserPrice + '元（3个问答来回）',
            //method:this.selectOrdinaryPrice
          },
          {
            name: "零元义答（1个问答来回）",
            //method:this.selectZeroPrice
          }
        ];
        this.sheetVisible = true;

      },
      showPopup: function () {

        // var obj = JSON.parse(sessionStorage.getItem('userInfo'));
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
      this.getMsgList();
      this.timer = setInterval(this.getMsgList, 15000)
      // 某些定时器操作
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
          margin: 0.2rem;
        }
      }
    }
  }

  .chat {
    height: 100%;
    overflow-y: auto;

    .mint-header {
      height: 1.173333rem;
      background: linear-gradient(90deg,
          rgba(199, 53, 49, 1) 0%,
          rgba(186, 44, 40, 1) 100%);

      .mint-header-button.is-left {
        flex: 0.08;
        height: 100%;
      }

      .mint-button {
        height: 100%;
      }

      .mint-header-title {
        text-align: left;
        font-size: 0.48rem;
        font-weight: 500;
      }
    }
  }

  .menu2 {
    width: 0.4rem;

    img {
      width: 100%;
    }
  }

  .chat-top {
    background: #fff;
    padding: 0.266667rem 0.4rem 0.373333rem 0.4rem;

    .chat-user {
      display: flex;
      justify-content: space-between;

      .user-item {
        width: 4.453333rem;
        display: flex;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(238, 238, 238, 1);
        border-radius: 0.213333rem;
        padding: 0.266667rem;

        .portrait {
          margin-right: 0.133333rem;

          img {
            width: 1.066667rem;
            height: 1.066667rem;
            border-radius: 50%;
            border: 1px solid #e0002e;
          }
        }

        .user-info {
          .name {
            display: flex;
            flex-wrap: wrap;
            align-content: center;
            font-weight: 500;
            font-size: 0.3rem;

            .icons {
              height: 0.346667rem;
            }

            img {
              height: 100%;
              margin-left: 0.133333rem;
            }
          }

          .code {
            font-size: 0.293333rem;
            font-weight: 500;
            color: rgba(102, 102, 102, 1);
            margin-top: 0.186667rem;
          }
        }
      }

      .answer-user-item {
        .portrait img {
          border: 1px solid rgba(28, 94, 240, 1);
        }
      }
    }

    .chat-problem {
      display: flex;
      margin-top: 0.4rem;
      font-size: 0.426667rem;
      font-family: PingFang;
      font-weight: bold;
      color: rgba(224, 0, 46, 1);
      justify-content: space-between;
      align-items: center;

      img {
        width: 0.48rem;
        margin-right: 0.133333rem;
      }
    }
  }

  .chat-middle {
    padding: 0.4rem;

    .words {
      display: flex;
      align-items: flex-start;
      padding: 0.32rem 0;

      .w-img {
        img {
          width: 1.04rem;
          height: 1.04rem;
          border-radius: 50%;
        }
      }

      .w-txt {
        width: 6.56rem;
        background: rgba(238, 238, 238, 1);
        border-radius: 0.213333rem;
        padding: 0.32rem 0.266667rem;
        font-size: 0.373333rem;
        font-weight: 400;
        color: rgba(40, 40, 40, 1);
        margin: 0 0.266667rem;
      }

      .w-zip {
        width: 4.8rem;
        background: rgba(238, 238, 238, 1);
        border-radius: 0.213333rem;
        padding: 0.32rem 0.266667rem;
        font-size: 0.373333rem;
        font-weight: 400;
        color: rgba(40, 40, 40, 1);
        margin: 0 0.266667rem;
        display: flex;
        justify-content: space-between;

        .zip-info {
          width: 3.2rem;

          .size {
            font-size: 0.293333rem;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            margin-top: 0.24rem;
          }
        }

        .zip-icon {
          width: 0.68rem;

          img {
            width: 100%;
          }
        }
      }
    }

    .flex-end {
      flex-direction: row-reverse;
    }

    .words-time {
      text-align: center;
      font-size: 0.293333rem;

      font-weight: 400;
      color: rgba(153, 153, 153, 1);
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