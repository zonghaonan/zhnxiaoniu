<template>
  <div v-if="ajax_ok" class="chat vip-chat">
    <!-- header -->
    <div class="comm-chat-header">
       <div class="title" @click="$router.back(-1)">
         <i class="arr-left">
           <img src="../assets/img/chat/btn-back.png" alt />
         </i>
         返回
       </div>
    </div>

    <div class="chat-top">
      <div class="chat-user">
        <div class="user-item">
          <div class="portrait">
            <img :src='qaData.data.questionerAvatar' alt />
          </div>
          <div class="user-info">
            <div class="name">
              <p>{{qaData.data.questionerNickName}}</p>
              <div class="icons">
                <img src="../assets/img/profile/renzheng.png" alt />
                <img src="../assets/img/search/heart.png" alt />
              </div>
            </div>
            <div class="code">用户号:<span>{{qaData.data.questionerId}}</span></div>
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
            <div class="code">用户号:<span>{{qaData.data.replyId}}</span></div>
          </div>
        </div>
      </div>
      <div class="chat-problem">
        <div>
          <img src="../assets/img/search/wen.png" alt />
          <span>{{qaData.data.title}}</span>
        </div>
        <div>
          <img src="../assets/img/home/icon_eye.png" alt />
        </div>
      </div>
    </div>
    <div class="chat-middle">
       <div v-for="(item,index) in qaData.data.qaMessageList" :key="index">
           <div v-if="item.senderId===qaData.data.questionerId" class="words">
                <div class="w-img">
                  <img :src='qaData.data.questionerAvatar' alt />
                </div>
                <div class="w-txt">{{item.content}}</div>
           </div>
           <div v-else-if="item.senderId===qaData.data.replyId" class="words flex-end vip-flex-end">
                <div class="w-img">
                  <img :src="qaData.data.replyAvatar" alt />
                </div>
                <div class="w-txt">{{item.content}}</div>
           </div>
       </div>
<!--      <div class="words">
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
    <footer class="qaBottom">
      <div class="btn-wrap">
        <div class="in-item">
          <img src="../assets/img/home/icon_eye.png" alt />
          <span>{{qaData.data.browseCnt}}</span>
        </div>
        <div class="in-item">
            <div v-if="bThumbs_down">
              <img @click="thumbsUp" src="../assets/img/home/icon_zan.png"/>
              </div>
              <div v-else>
              <img @click="thumbsDown" src="../assets/img/home/icon_zan_done.png"/>
            </div>
          <!-- <img src="../assets/img/home/icon_zan.png" alt /> -->
          <span>{{thumbsUpNo}}</span>
        </div>
        <div class="in-item">
          <img src="../assets/img/qa/zhuanfa.png" alt />
          <span>{{qaData.data.browseCnt}}</span>
        </div>
      </div>
      <router-link :to="{name: 'Questions', params:{id:qaData.data.sessionId}}">
           <mt-button class="ask-btn" type="default">向答题者提问</mt-button>
      </router-link>
      
    </footer>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  name: "QaDisplay",
  components: {},
  data() {
    return {
        qaData: [],
        ajax_ok:false,
        qs_append:'',
        unfinished:true,
        sessionId:'',
        content:'',
        thumbsUpNo:0,
        bThumbs_down: true
    };
  },
  methods: {
      showInNewWindow:function(url){
        window.open(url)
      },
      toJson:function(str){
                var _str =JSON.parse(str);
                //console.log(_str.src);
                return _str;
      },
      showtoast:function(msg){
        Toast(msg);
      },
      getMsgList:function(){
          this.sessionId = this.$route.params.id;
          this.$http.get('/api1/qa/getQaDetail', {
             params: { 
              sessionId: this.$route.params.id
          }
          }).then(resp=>{
              console.log('success')
              console.log(resp.data)
              this.qaData = resp.data;
              this.ajax_ok=true;
              this.thumbsUpNo = resp.data.data.thumbUpCnt;
              
              // this.cur = resp.data.data.evalScore;
              // 查看一下状态
              if(resp.data.data.status == 3)
              {
                this.bEndable = true;
              }
      
          }).catch(err=>{
              this.showtoast('网络异常')
              console.log(err);  
              console.log('failed')
              this.ajax_ok=false;
          });
      },
      thumbsUp:function(){
          this.thumbsUpNo++;
          this.bThumbs_down = false;
          // 请求AJAX
          var res = JSON.parse(sessionStorage.getItem('userInfo'));
          console.log("resId="+res.userId)
          console.log("sessionId="+this.sessionId)
          let data = new FormData();
          data.append("userId",res.userId);
          data.append("sessionId",this.sessionId);
          data.append("thumbUp",true);
          this.$http.post("/api1/qa/thumbUp", data).then(resp=>{
              console.log(resp.data)
              Toast(resp.data.message)
            }).catch(err=>{
                console.log(err);
            });
      
        },
        thumbsDown:function(){
          this.thumbsUpNo--;
          this.bThumbs_down = true;
          var res = JSON.parse(sessionStorage.getItem('userInfo'));
          console.log("resId="+res.userId);
          console.log("sessionId="+this.sessionId);
          let data = new FormData();
          data.append("userId",res.userId);
          data.append("sessionId",this.sessionId);
          data.append("thumbUp",false);
          this.$http.post("/api1/qa/thumbUp", data).then(resp=>{
              console.log(resp.data)
              Toast(resp.data.message)
            }).catch(err=>{
                console.log(err);
            });
        }
      
      
  },
  created() {
      this.logUserInfo=JSON.parse(sessionStorage.getItem('userInfo'));
      this.getMsgList();
      // 判断自己有没有赞过
      var res = JSON.parse(sessionStorage.getItem('userInfo'));
      this.$http.get("/api1/qa/isThumbUp",{params:{sessionId:this.sessionId, userId:res.userId}}).then(resp=>{
        console.log(resp.data)
        if(resp.data.data===true)
        {
          console.log("true")
          this.bThumbs_down = false;
        }
      }).catch(err=>{
          console.log(err);
      });
  },
};
</script>
<style lang="scss">
.qaBottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 1.306667rem;
  position: fixed;
  bottom: 0;
  z-index: 10;
  left: 0;
  right: 0;
  max-width: 768px;
  margin: 0 auto;
  background: #fff;
  padding: 0 0.4rem;

  .btn-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 3.6rem;
    .in-item {
      display: flex;
      align-items: center;
      font-size: 0.373333rem;
      justify-content: center;
      color: #999999;
      flex: 1;
      flex-direction: column;
      text-align: center;

      img {
        width: 0.48rem;
        max-height: 0.48rem;
        margin: 0 auto;
        margin-bottom: 0.133333rem;
      }
    }
  }
  .ask-btn {
    width: 5.2rem;
    height: 1.04rem;
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
</style>