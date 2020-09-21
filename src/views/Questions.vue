<template>
  <div class="profile answerInfo" :style="height">

    <!-- consult  -->
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
          <!--空下来指引图-->
          无目标提问
          <!-- {{toPerson}}-->
        </div>
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
                  <div class="item" :class="{active:tabIndex == index}" v-for="(item,index) in setProData" :key="index"
                    @click="setProClick(index)">
                    <div class="set-tit">{{item.tit}}</div>
                    <div class="set-txt">{{item.txt}}</div>
                  </div>
                </div>
              </li>
            </ul>
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
          <mt-button type="danger" size="large" class="comm-btn" @click="startSearch">下一步(推荐答主）</mt-button>
        </div>
      </mt-tab-container-item>

      <mt-tab-container-item id="2">
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
          <!--空下来指引图-->
          下面是系统推荐人员
          <!-- {{toPerson}}-->
        </div>
        <br>
        <div class="profile-list" v-for="userInfo in recommendList.list" :key="userInfo.userId"
          :class="{'active':listIndex === userInfo.userId}"
          @click="selAnswer(userInfo.userId, userInfo.price, userInfo.enableFree, userInfo.nickname)">
          <header class="hd">
            <div class="portrait">
              <img :src="userInfo.avatar" alt>
            </div>
            <div class="user-info">
              <div class="name">
                {{userInfo.nickname}}
                <span v-if="userInfo.verifyInfo!=''">
                  <img src="../assets/img/profile/renzheng.png" alt>
                </span>
              </div>
              <div class="code">用户号:{{userInfo.username}}</div>
              <div class="marks">
                <span v-if="userInfo.gender==='男'">
                  <div class="tip age-tip">
                    <img src="../assets/img/profile/male.png" alt>
                    {{userInfo.age}}岁
                  </div>
                </span>
                <span v-else>
                  <div class="tip age-tip">
                    <img src="../assets/img/profile/female.png" alt>
                    {{userInfo.age}}岁
                  </div>
                </span>
                <div class="tip">{{userInfo.city}}</div>
                <div class="tip">{{userInfo.university}}-{{userInfo.department}}</div>
              </div>
            </div>
          </header>
          <div class="edit-btn" style="width:80px;font-size:12px">
            <!--  <img src="../assets/img/search/heart.png" alt /> -->
            <span @click="hello"> ¥ {{userInfo.price}}</span>
          </div>

          <div v-if="userInfo.enableFree==true && userInfo.freeStock>1">
            <div class="edit-btn2" :class="{active:1}" style="width:80px;font-size:12px">
              <span @click="hello">零元义答</span>
            </div>
          </div>

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
              <div class="tip">答题数:</div>
              <div class="text">{{userInfo.totalReply}}</div>
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
        <div align="right" class="btn_pos">
          <mt-button size="small" type="danger" @click="GotoPage('1')">上一步</mt-button>
          <mt-button size="small" type="danger" @click="GotoPage('3')">下一步</mt-button>
        </div>


      </mt-tab-container-item>
      <mt-tab-container-item id="3">

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
            <div class="pay-price">¥ {{activeUserPrice}}元</div>
            <div class="pay-to">
              <span>付款给</span>
              <span class="name">{{answerName}}</span>
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
            <vue-qr :text="downloadData" :margin="0" colorDark="#000" colorLight="#fff" :logoScale="0.3" :size="150">
            </vue-qr><br>
          </div>
          <div v-else>
            <img src="../assets/img/paysuccess.png" />
          </div><br>
          {{messageNotify}}
        </div>

        <div align="right" class="btn_pos">
          <mt-button size="small" type="danger" @click="startSearch">上一步</mt-button>
        </div>

      </mt-tab-container-item>

    </mt-tab-container>
    <mt-actionsheet :actions="actions" v-model="sheetVisible">
    </mt-actionsheet>


  </div>
</template>

<script>
  import Stars from "../components/Stars.vue"; //星级
  import vueQr from 'vue-qr'
  import {
    Toast
  } from 'mint-ui';

  export default {
    name: "Questions",
    components: {
      vueQr,
      Stars
    },
    data() {
      return {
        // 问题切换
        tabIndex: 0,
        listIndex: 0, // 答主id
        activeUserPrice: 0, // 答主价格
        selectedAnswer: '',
        isClickedUserFree: false, // 是否支持免费问答？
        questionPrice: 0,
        setProData: [{
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

        mytitle: '南京',
        firstquestion: '问题详情问题详情问题详情问题详情问题详情问题详情问题详情',
        questionFrom: '',
        questionTo: '',
        answerName: '',
        price: "9.9",
        ajax_ok: false,
        privacy: false,
        token: '',
        options: [],
        toPerson: null,
        selected: "1",
        downloadData: 'http://www.baidu.com',
        orderId: '',
        timer: null,
        bQueryOrderStatus: false,
        paid: false,
        bPrivacy: false,
        orderAmount: "0",
        messageNotify: "请使用微信支付",

        recommendList: '',
        actions: [],
        sheetVisible: false,
      };
    },

    methods: {
      GotoPage: function (page_no) {
        if (this.selected == 1 && page_no == 2) {
          // 验空
          if (this.mytitle.split(" ").join("").length < 2) {
            Toast("标题不能少于10个字");
            return;
          } else {
            if (this.firstquestion.split(" ").join("").length < 10) {
              Toast("详细内容不能少于20个字");
              return;
            } else {
              this.selected = page_no;
            }
          }

        } else if (this.selected == 2 && page_no == 1) {
          this.selected = page_no;
        } else if (this.selected == 2 && page_no == 3) {
          if (this.listIndex == 0) {
            Toast("请选择一位答主");
            return;
          }

          this.paid = false;
          this.actions = [{
              name: this.activeUserPrice + '元（3个问答来回）',
              method: this.selectOrdinaryPrice
            },
            {
              name: "零元义答（1个问答来回）",
              method: this.selectZeroPrice
            }
          ];
          if (this.isClickedUserFree == true) {
            this.sheetVisible = true;
          } else {
            this.questionPrice = this.activeUserPrice;
            // 此时进入支付页面
            this.selected = page_no;
            this.submit();
          }

          // 然后将订单生成等待支付。





        } else if (this.selected == 3 && page_no == 2) {
          // 增加一个筛选条件
          this.selected = page_no;
        }
      },
      selectZeroPrice: function () {
        this.questionPrice = 0;
        this.submit();
      },
      selectOrdinaryPrice: function () {
        this.questionPrice = this.activeUserPrice;
        this.submit();
      },
      hello: function () {
        //    alert("haha");
      },
      startSearch: function () {
        this.GotoPage('2');
        // 发个请求获得列表
        // let params = new URLSearchParams();
        //           params.append('page', 1);
        //           params.append('size', 10);
        //           params.append('keyword', this.mytitle+' '+this.firstquestion);

        var page = 1;
        var size = 10;
        var keyword = this.mytitle;

        var url = "/api6/search/recommendUser?page=" + page + "&size=" + size + "&keyword=" + keyword;
        console.log(url);
        this.$http.get(url)
          .then(resp => {
            console.log(resp.data);
            this.recommendList = resp.data.queryResult;
          })
          .catch(err => {
            console.log(err);
          });



      },
      submit: function () {

        this.questionFrom = JSON.parse(sessionStorage.getItem("userInfo")).userId;

        var qs_obj = {
          questionerId: this.questionFrom,
          replyId: this.listIndex,
          price: this.activeUserPrice,
          privacy: this.bPrivacy,
          title: this.mytitle,
          content: this.firstquestion
        }

        console.log(qs_obj);

        // 增加，发起用户ID，目标用户ID。回头平台要向其推送信息
        console.log("1");
        //axios 提交该问题
        this.$http.post("/api1/qa/openSession", qs_obj).then(resp => {
          console.log(resp.data)
          if (resp.data.success == true) {
            console.log("2");
            Toast(resp.data.message);
            var newSessionId = resp.data.data;

            // 已获得会话的sessionId,下面获取会话的订单ID。
            var logUserInfo = JSON.parse(sessionStorage.getItem('userInfo'));

            var qsOrder_obj = new URLSearchParams();
            qsOrder_obj.append('sessionId', newSessionId);
            qsOrder_obj.append('userId', logUserInfo.userId);

            console.log(qsOrder_obj);

            this.$http.post("/api5/pay/createOrderNative", qsOrder_obj).then(resp2 => {
              console.log(resp2.data)
              if (resp2.data.success == true) {
                console.log("3");
                this.orderId = resp2.data.data.orderId;
                this.orderAmount = resp2.data.data.orderAmount;
                this.downloadData = resp2.data.data.codeUrl;
                this.bQueryOrderStatus = true;
              } else {
                console.log("4");
                Toast(resp2.data.message)
              }
            }).catch(err => {
              console.log(err);
            });
            this.selected = "3";
          } else {
            Toast(resp.data.message)
          }

        }).catch(err => {
          console.log(err);
        });

      },
      setProClick(index) {
        console.log(index);

        if (index == 0) {
          this.bPrivacy = false;
        } else {
          this.bPrivacy - true;
        }
        this.tabIndex = index;
      },
      selAnswer(index, price, isfree, name) {
        this.listIndex = index;
        this.activeUserPrice = price;
        this.isClickedUserFree = isfree;
        this.answerName = name;

      },
      // 动态获取主体内容高度
      // hh() {
      //   this.$nextTick(() => {
      //     let height = this.$refs.chatBottom.$el.offsetHeight;
      //     this.height.height = window.innerHeight - height + "px";
      //   });
      // },
    },

    // mounted() {
    //   this.hh();
    // },
    created: function () {
      this.timer = setInterval(() => {
        if (this.bQueryOrderStatus) {
          this.$http.get("/api5/pay/queryOrderStatus?orderId=" + this.orderId).then(resp2 => {
            console.log(resp2.data)
            if (resp2.data.success == true) {
              Toast(resp2.data.data);
              clearInterval(this.timer);
              this.paid = true;
              this.messageNotify = "支付成功，点击下方‘问答’返回";
            } else {
              console.log(resp2.data.message);
            }
          }).catch(err => {
            console.log(err);
          });
        }

      }, 1000);
    }

  };
</script>
<style lang="scss">
  .pd-0 {
    padding: 0 !important;
  }

  .profile-list {
    width: 9.2rem;
    margin-top: 0.2rem;
    margin: 0 auto;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.213333rem;
    padding: 0.4rem 0.266667rem;
    position: relative;
    margin-bottom: 0.24rem;

    &.active {
      background-color: rgba(0, 0, 0, 0.1);
      border: 2px solid rgba(224, 0, 46, 1);
    }

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
            margin-left: 0.133333rem;
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
            padding: 0.066667rem 0.133333rem;
            background: rgba(85, 156, 244, 0.1);
            font-size: 0.266667rem;
            border-radius: 0.053333rem;
            margin-right: 0.133333rem;
            display: flex;
            align-items: center;

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
    margin-top: 0.4rem;

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

  .edit-btn2 {
    position: absolute;
    top: 1.2rem;
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
      background-color: rgba(0, 255, 0, 0.1);

    }

    img {
      width: 0.373333rem;
      margin-right: 0.133333rem;
    }

    span {
      font-weight: 500;
    }
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

  .btn_pos {
    margin: 0.4rem;
  }
</style>