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
          工单交流
        </div>
      </div>
      <div class="chat-top">
        <div class="chat-user">
          <div class="user-item">
            <div class="portrait">
              <img :src="qaData.taskAvatar" alt />
            </div>
            <div class="user-info">
              <div class="name">
                <p>{{qaData.taskNickname}}</p>
                <div class="icons">
                  <img src="../assets/img/profile/renzheng.png" alt />
                  <img src="../assets/img/search/heart.png" alt />
                </div>
              </div>
              <div class="code">用户号:<span>{{qaData.taskUsername}}</span></div>
            </div>
          </div>
          <div class="user-item answer-user-item">
            <div class="portrait">
              <img :src="qaData.operatorAvatar" alt />
            </div>
            <div class="user-info">
              <div class="name">
                <p>{{qaData.operatorNickname}}</p>
                <div class="icons">
                  <img src="../assets/img/profile/renzheng.png" alt />
                  <img src="../assets/img/search/heart.png" alt />
                </div>
              </div>
              <div class="code">用户号:<span>{{qaData.operatorUsername}}</span></div>
            </div>
          </div>
        </div>
        <div class="chat-problem">
          <div>
            <img src="../assets/img/search/q.png" alt />
            <span>{{wkTitle}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-middle">
      <div v-for="(item,index) in qaData.data" :key="index">
        <div v-if="item.senderId!=userId" class="words">
          <div class="w-img">
            <img :src="qaData.operatorAvatar" alt />
          </div>
          <div v-if="item.content===''"><img style="margin-left:10px;max-width: 200px;" :src="item.img" alt /></div>
          <div v-else class="w-txt">{{item.content}}</div>
        </div>
        <div v-else class="words flex-end vip-flex-end">
          <div class="w-img">
            <img :src="qaData.taskAvatar" alt />
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
    <OrderChartBottom :disabled="disabled" v-bind:wkId='wkId' ref="chatBottom" @add-comment="getMsgList"></OrderChartBottom>
  </div>
</template>

<script>
  import {
    Toast
  } from 'mint-ui';
  import OrderChartBottom from "../components/OrderChartBottom.vue";
  export default {
    name: "OrderChat",
    components: {
      OrderChartBottom,
    },
    data() {
      return {
        height: {
          height: "",
        },
        qaData: [],
        ajax_ok: false,
        unfinished: true,
        userId: '',
        disabled: false,
        wkId: '',
        wkTitle: '',
        content: '',
        bEndable: false,
        // cur : -1,
        flag: false, //鼠标点击后变成true，鼠标进入进出事件就不会改变背景图
        popupVisible: true,
        logUserInfo: '',
        page: 0,
        size: 20,
        timer: null,
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
        this.$http.get('/api1/qa/queryWkMsg', {
            params: {
              wkId: this.wkId
            }
          })
          .then(resp => {
            console.log(resp.data)
            this.qaData = resp.data.wkMsgResult
            this.ajax_ok = true
            console.log(this.ajax_ok)
            // // 查看一下状态
            // if (resp.data.data.status == 3) {
            //   this.bEndable = true;
            // }
            this.updated();
          }).catch(err => {
            this.showtoast('网络异常')
            console.log(err);
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
        // this.setstatus(this.sessionId, 4); // 4最终完结
      },
      showtoast: function (msg) {
        Toast(msg);
      },
    },
    mounted() {
      this.hh();
      this.logUserInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      this.userId = this.logUserInfo.userId;
      this.wkId = this.$route.params.wkId
      this.wkTitle = this.$route.params.wkTitle
      if (this.$route.params.status === 3) {
        this.disabled = true
      }
      console.log(this.wkId);
      this.getMsgList();
      this.timer = setInterval(this.getMsgList, 10000)
    },
    beforeDestroy() {
      console.log('destroy');
      clearInterval(this.timer);
      this.timer = null;
    }
  };
</script>
<style>
</style>