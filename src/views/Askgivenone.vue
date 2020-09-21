<template>
  <div class="profile answerInfo" :style="height">

    <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
        <!-- header -->
        <div class="comm-header">
          <div class="title">
            <i class="arr-left" @click="$router.back(-1)">
              <img src="../assets/img/chat/btn-back.png" alt />
            </i>
            我要咨询
          </div>
        </div>

        <!-- info -->
        <div class="profile-info">
          <header class="hd">
            <div class="portrait">
              <img :src="toPerson.avatar" alt />
            </div>
            <div class="user-info">
              <div class="name">
                {{toPerson.nickname}}
                <span v-if="toPerson.verifyInfo!=''">
                <img src="../assets/img/profile/renzheng.png" alt />
                </span>
              </div>
              <div class="code">用户号:{{toPerson.username}}</div>
              <div class="marks">
                <span v-if="toPerson.gender==='男'">
                  <div class="tip age-tip">
                    <img src="../assets/img/profile/male.png" alt /> {{toPerson.age}}岁
                  </div>
                </span>
                <span v-else>
                  <div class="tip age-tip">
                    <img src="../assets/img/profile/female.png" alt /> {{toPerson.age}}岁
                  </div>
                </span>
                <div class="tip">{{toPerson.city}}</div>
                <div class="tip">{{toPerson.university}}-{{toPerson.department}}</div>
              </div>
            </div>
          </header>
        
        <!-- btn -->
        <Follow></Follow>
        <footer class="ft-info mt-30">
          <div class="item">
            <div class="tip">平均响应时间:</div>
            <div class="text">{{toPerson.responseTime}}分钟</div>
          </div>
          <div class="item">
            <div class="tip">答题数:</div>
            <div class="text">{{toPerson.totalReply}}</div>
          </div>
          <div class="item">
            <div class="tip">好评</div>
            <Stars :thescore="toPerson.positiveRatio">></Stars>
          </div>
        </footer>
      </div>
    <!-- consult  -->
    <div class="consult-wrap">
      <div class="consult-item">
        <header class="consult-title">
          <span>您的问题</span>
        </header>
        <ul class="contact-list">
          <li>
            <input type="text" v-model="mytitle" placeholder="请输入您的问题" class="contact-input pd-0" />
          </li>
        </ul>
        <ul class="contact-list pd-0">
          <li class="pd-0">
            <div class="set-pro">
              <div
                class="item"
                :class="{active:tabIndex == index}"
                v-for="(item,index) in setProData"
                :key="index"
                @click="setProClick(index)"
              >
                <div class="set-tit">{{item.tit}}</div>
                <div class="set-txt">{{item.txt}}</div>
              </div>
            </div>
          </li>
        </ul>
      
        <header class="consult-title">
          <span>咨询价格</span>
        </header>
         <mt-radio align="left"   v-model="price"
        :options="options">
        </mt-radio>
      </div>

      <div class="consult-item">
        <header class="consult-title">
          <br>
          <span>详情</span>
          <span class="title-tip">（共有3轮交流机会）</span>
        </header>

        <ul class="contact-list">
          <li>
            <textarea class="contact-area2" v-model="firstquestion" placeholder="请具体描述您的问题！"></textarea>
          </li>
        </ul>
      </div>


    </div>

   <mt-button type="danger" size="large" class="comm-btn" @click="submit">提交</mt-button>
    <!--
    <ChatBottom ref="chatBottom"></ChatBottom>
    -->
 
  </mt-tab-container-item>
   


    <mt-tab-container-item id="2">
    <div class="comm-header">
      <div class="title">
        <i class="arr-left">
          <img src="../assets/img/chat/btn-back.png" alt />
        </i>
        支付页面
      </div>
    </div>
    <!-- info -->
    <div class="profile-info">
      <div class="pay-project">
        <header class="p-tit">{{mytitle}}</header>
        <div class="pay-price">￥{{price}}</div>
        <div class="pay-to">
          <span>付款给</span>
          <span class="name">{{toPerson.nickname}}</span>
        </div>
        <div class="pay-to">
          <span>订单号</span>
          <span class="name">{{orderId}}</span>
        </div>
      </div>
    </div>
    <!-- pay  -->
    <ul class="user-list">
      <li>
        <div class="title">支付方式</div>
        <div class="arrow">
          微信支付
          <img src="../assets/img/profile/btn-back.png" alt />
        </div>
      </li>
    </ul>
    <br>
    <div align="center">
      <div v-if="paid==false">
      <vue-qr :text="downloadData" :margin="0" colorDark="#000" colorLight="#fff" :logoScale="0.3" :size="150"></vue-qr><br>
      </div>
      <div v-else>
      <img src="../assets/img/paysuccess.png"/>
      </div><br>
       {{messageNotify}}
    </div>
  </mt-tab-container-item>
 </mt-tab-container>

  </div>
</template>

<script>
//import ChatBottom from "../components/ChatBottom.vue";
import Follow from "../components/Follow.vue";
import Stars from "../components/Stars.vue"; //星级

import vueQr from 'vue-qr'
import { Toast } from 'mint-ui';

export default {
  name: "Questions",
  components: { /*ChatBottom,*/ Follow, Stars, vueQr },
  data() {
    return {
      // 问题切换
      tabIndex: 0,
      setProData: [
        {
          tit: "公开问题",
          txt: "围观收益双方分享",
        },
        {
          tit: "隐私问题",
          txt: "问答内容对外不可见",
        },
      ],
      
      // 滚动height
      height: {
        height: "",
      },

      mytitle:'我的问题我的问题我的问题我的问题',
      firstquestion:'问题详情问题详情问题详情问题详情问题详情问题详情问题详情',
      questionFrom:'',
      questionTo:'',
      price:"9.9",
      ajax_ok:false,
      privacy:false,
      token:'',
      options:[], 
      toPerson:null,
      selected:"1",
      downloadData: '',
      orderId:'',
      timer:null,
      bQueryOrderStatus:false,
      paid:false,
      bPrivacy:false,
      orderAmount:"0",
      messageNotify:"请使用微信支付",
    };
  },

  methods:{
      submit: function() {
          
          var qs_obj = { 
              questionerId :  this.questionFrom,
              replyId: this.questionTo,
              price:   this.price,
              privacy: this.bPrivacy,
              title:this.mytitle,
              content:this.firstquestion
          }

          console.log(qs_obj);

          // 增加，发起用户ID，目标用户ID。回头平台要向其推送信息
          //console.log(qs_obj)
          //axios 提交该问题
          this.$http.post("/api1/qa/openSession",  qs_obj).then(resp=>{
              console.log(resp.data)
              if(resp.data.success == true)
              {
                  Toast(resp.data.message);
                  var newSessionId = resp.data.data;

                  // 已获得会话的sessionId,下面获取会话的订单ID。
                  var logUserInfo=JSON.parse(sessionStorage.getItem('userInfo'));

                    var qsOrder_obj = new URLSearchParams();
                      qsOrder_obj.append('sessionId',newSessionId);
                      qsOrder_obj.append('userId', logUserInfo.userId);

                  //console.log(qsOrder_obj);

                  this.$http.post("/api5/pay/createOrderNative",  qsOrder_obj).then(resp2=>{
                      console.log(resp2.data)
                      if(resp2.data.success == true)
                      {
                          this.orderId=resp2.data.data.orderId;
                          this.orderAmount=resp2.data.data.orderAmount;
                          this.downloadData= resp2.data.data.codeUrl;
                          this.bQueryOrderStatus = true;
                      }
                      else
                      {
                          Toast(resp2.data.message)
                      } 
                  }).catch(err=>{
                      console.log(err);  
                  });
                  this.selected = "2";
              }
              else
              {
                  Toast(resp.data.message)
              }
              
          }).catch(err=>{
              console.log(err);  
          });
      },
      setProClick(index) {
        console.log(index);

        if(index==0)
        {
          this.bPrivacy=false;
        }
        else{
          this.bPrivacy-true;
        }
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
  created:function(){

      // 获得提问目标的ID
        this.questionTo = this.$route.params.toid;       // 临时自己发给自己
        // alert(this.questionTo)
    
        var obj_json = JSON.parse(sessionStorage.getItem('userInfo'));
        this.questionFrom = obj_json.userId.toString();
       
        // 获取给定信息的基本信息，如名称，资料信息，问答金额等。
        this.$http.get("/api4/ucenter/getUserInfoDetail",{params:{userId:this.questionTo}}).then(resp=>{
            console.log(resp.data)
            this.toPerson=resp.data.data;
            this.ajax_ok=true;
            this.options = [
            {
                label: '零元义答',
                value:"0",
                enable: this.toPerson.priceType
            },
            {
                label: this.toPerson.price+'元',
                value: this.toPerson.price.toString()
            }];
            this.price=this.toPerson.price.toString();
        }).catch(err=>{
            console.log(err);
        });


        this.timer = setInterval(() => {

            if(this.bQueryOrderStatus)
            {
               
                this.$http.get("/api5/pay/queryOrderStatus?orderId="+this.orderId).then(resp2=>{
                    console.log(resp2.data)
                    if(resp2.data.success == true)
                    {
                        Toast(resp2.data.data);
                        clearInterval(this.timer);
                        this.paid=true;
                        this.messageNotify = "支付成功，点击按钮返回";
                    }
                    else
                    {
                       console.log(resp2.data.message);
                    } 
                }).catch(err=>{
                    console.log(err);  
                });
            }
            
        },1000);

  },


};
</script>
<style lang="scss">
.pd-0 {
  padding: 0 !important;
}
.set-pro {
  display: flex;
  width: 100%;

  .item {
    flex: 1;
    text-align: center;
    height: 1.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 0.213333rem;
    border: 1px solid #fff;

    &.active {
      border: 1px solid rgba(224, 0, 46, 1);

      .set-tit,
      .set-txt {
        color: #e0002e;
      }
    }

    .set-tit {
      font-size: 0.373333rem;
      font-weight: bold;
      color: #666666;
    }
    .set-txt {
      font-size: 0.293333rem;
      font-weight: 500;
      color: #999999;
      margin-top: 0.16rem;
    }
  }
}
</style>