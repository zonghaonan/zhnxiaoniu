<template>
  <div class="chat-bottom">
    <div class="exchange-input">
      <input :disabled="disabled" :placeholder="disabled?'工单已过期':''" type="text" class="ex-text" ref="exText"
        @input="changeInput()" v-model="content" />
      <div class="add-btn">
        <div class="text" @click="appendQs">{{sendOutCon}}</div>
        <i v-show="sendImgShow" @click="exchange">
          <img src="../assets/img/chat/icon_tainjia.png" alt />
        </i>
      </div>
    </div>
    <ul class="operation-list" v-show="operationList">
      <li>
        <figure class="img">
          <p>
            <file-select v-on:getRate="getRate" v-on:srcChild="srcChild">v-model="file"</file-select>
          </p>
          <!-- <p v-if="file">{{file.name}}</p> -->
        </figure>
        <div class="tip">照片</div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {
    Toast
  } from 'mint-ui';
  import FileSelect from '../components/FileSelect.vue'
  export default {
    name: "OderChatBottom",
    components: {
      FileSelect,
    },
    data() {
      return {
        sendOutCon: "",
        sendImgShow: true,
        operationList: false,
        exchangeNoticeShow: false,
        content: '',
        file: null,
        imgList: [],
        imgSrc: '',
        imgCnt: 0,
      };
    },
    props: {
      wkId: Number,
      disabled: Boolean
    },

    methods: {
      //监听input变化
      changeInput() {
        this.sendOutCon = "发送";
        this.sendImgShow = false;
        if (this.$refs.exText.value == "") {
          this.sendOutCon = "";
          this.sendImgShow = true;
        }
      },
      exchange() {
        if (!this.disabled) {
          this.operationList = !this.operationList;
          // 初始化主体内容高度
          this.$parent.hh();
        }
      },
      appendQs: function () {
        var res = JSON.parse(sessionStorage.getItem('userInfo'));
        console.log(res.userId);
        console.log(res.nickname);
        console.log(this.sessionId);
        console.log(this.imgSrc);
        this.$http.post('/api1//qa/createWkMsg', {
          wkId: this.wkId,
          content: this.content,
          senderId: res.userId,
          img: this.imgSrc
          // img:str_img
        }).then(resp => {
          console.log(resp.data);

          if (resp.data.success == true) {
            // 更新数据
            this.content = '';
            // this.imgList=null;
            this.$emit('add-comment')
            // this.getMsgList();
          } else {
            Toast(resp.data.message);
          }

        }).catch(err => {
          this.showtoast('网络异常')
          console.log(err);
        });
      },
      // 显示子组件值得变化
      srcChild: function (srcChild) {
        // childValue就是子组件传过来的值
        // 获得文件服务器地址
        console.log(srcChild);
        // var dict = +this.GLOBAL.ipaddr;
        var str = this.GLOBAL.imgShowIpaddr + srcChild;
        // dict = {src:str};
        console.log("文件地址" + str);
        this.imgSrc = str;
        if (srcChild != '') {
          this.appendQs();
        }
        Toast("已加载完毕");

      },
      getRate: function (getRate) {
        this.nProgress = getRate;
      },
      showInNewWindow: function (url) {
        window.open(url)
      },
    },
    enter(idx) {
      if (!this.flag) {
        this.cur = idx;
      }
    },
    leave() {
      if (!this.flag) {
        this.cur = -1;
      }
    },
    getRate: function (getRate) {
      this.nProgress = getRate;
    },
    showInNewWindow: function (url) {
      window.open(url)
    },
    popMsg: function () {
      console.log(this.file.name);
    }
  };
</script>
<style>
</style>





<!-- <template>
  <div class="chat-bottom">
    <div class="exchange-input">
      <mt-button type="danger" size="large" class="comm-btn">提交</mt-button>
      <div class="add-btn">
        <div class="text">{{sendOutCon}}</div>
        <i v-show="sendImgShow" @click="exchange">
          <img src="../assets/img/chat/icon_tainjia.png" alt />
        </i>
      </div>
    </div>
    <ul class="operation-list" v-show="operationList">
      <li>
        <figure class="img">
          <img src="../assets/img/chat/10.png" alt />
        </figure>
      </li>
      <li>
        <figure class="img">
          <img src="../assets/img/chat/10.png" alt />
        </figure>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "VipChatBottom",
  components: {},
  data() {
    return {
      sendOutCon: "",
      sendImgShow: true,
      operationList: false,
      exchangeNoticeShow: false,
    };
  },
  methods: {
    exchange() {
      console.log("点击了");
      this.operationList = !this.operationList;
       this.$parent.hh();
    },
    
  },
  
};
</script>
<style lang="scss">
.chat-bottom {
  background: #fff;
  padding: 0.2rem 0.4rem;
  position: fixed;
  bottom: 0;
  z-index: 10;
  left: 0;
  right: 0;

  .exchange-notice {
    padding: 0.173333rem 0 0.346667rem 0;
    font-size: 0.346667rem;
    font-weight: 400;
    color: rgba(224, 0, 46, 1);
    text-align: center;
  }
  .exchange-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.906667rem;

    .ex-text {
      width: 8rem;
      height: 0.906667rem;
      background: rgba(246, 246, 246, 1);
      border-radius: 0.093333rem;
      border: none;
      outline: none;
      font-size: 0.373333rem;
      padding: 0.2rem;
    }
    .add-btn {
      display: flex;
      align-content: center;

      img {
        width: 0.64rem;
        height: 0.64rem;
      }
    }
    .comm-btn {
      height: 1.04rem;
      width: 8rem;
      background: linear-gradient(
        90deg,
        rgba(186, 44, 40, 1),
        rgba(214, 53, 49, 1)
      );
      border-radius: 40px;
      font-size: 0.4rem;

      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style> -->