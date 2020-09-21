<template>
  <div class="profile answerInfo">
    <!-- Service  -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <!-- header -->
        <div class="comm-header">
          <div class="title">
            <i class="arr-left">
              <img src="../assets/img/chat/btn-back.png" alt>
            </i>
            服务详情
          </div>
        </div>
        <!-- info -->
        <div class="profile-info">
          <header class="hd">
            <div class="portrait">
              <img src="../assets/img/search/touxiang2.png" alt>
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
          <!-- btn -->
          <Follow></Follow>
          <section class="sec-info">
            <p>{{userInfo.introduce}}</p>
          </section>

          <footer class="ft-info mt-30">
            <div class="item">
              <div class="tip">平均响应时间:</div>
              <div class="text">{{userInfo.responseTime}}分钟</div>
            </div>
            <div class="item">
              <div class="tip">答题数:</div>
              <div class="text">{{userInfo.totalReply}}</div>
            </div>
            <div class="item">
              <div class="tip">{{userInfo.positiveRatio}}</div>
              <Stars></Stars>
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
        <div class="answer-service-wrap">
          <div class="service-box">
            <div class="service-item">
              <header class="ser-tit">
                <div class="ser-price">{{serviceinfo.title}}</div>
              </header>
              <div class="ser-con"></div>
            </div>
            <div class="service-item">
              <header class="ser-tit">
                <div>服务咨询费用</div>
                <div class="ser-price">{{serviceinfo.price}}元</div>
              </header>
              <div class="ser-con"></div>
            </div>
            <div class="service-item">
              <header class="ser-tit">
                <div>销量</div>
                <div class="ser-price">{{serviceinfo.sales}}次</div>
              </header>
              <div class="ser-con"></div>
            </div>
            <div class="service-item">
              <header class="ser-tit">
                <div>库存</div>
                <div class="ser-price">{{serviceinfo.stock}}次</div>
              </header>
              <div class="ser-con"></div>
            </div>
            <div class="service-item">
              <div class="ser-con">
                <ul id="lc-list" :class="{active:!brandFold}">
                  <li>
                    <header class="lc-tit">服务咨询说明</header>
                    <section class="lc-sec">{{serviceinfo.description}}</section>
                  </li>
                </ul>
              </div>
            </div>
            <div class="service-item">
              <header class="ser-tit">
                <div>咨询流程</div>
                <div class="ser-price"></div>
              </header>
              <div class="ser-con">
                <ul class="step-list">
                  <li>
                    <div class="s-num">1</div>
                    <div class="s-name">查看简介</div>
                  </li>
                  <li>
                    <div class="s-num">2</div>
                    <div class="s-name">下单支付</div>
                  </li>
                  <li>
                    <div class="s-num">3</div>
                    <div class="s-name">双方交流</div>
                  </li>
                  <li>
                    <div class="s-num">4</div>
                    <div class="s-name">卖方结题</div>
                  </li>
                  <li>
                    <div class="s-num">5</div>
                    <div class="s-name">买方确认</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="comments-box">
            <header class="comments-title">他的评价</header>
            <ul class="comments-list">
              <li v-for="(item,index) in 5" :key="index">
                <div class="comm-img">
                  <img src="../assets/img/qa/person.png" alt>
                </div>
                <div class="comm-info">
                  <header class="person-tit">
                    <span>匿名评价abc</span>
                    <span>2020-07-21</span>
                  </header>
                  <article class="comm-txt">王老师知道请问专硕和王老师学，硕专硕和有王老师知道请问专硕和。</article>
                </div>
              </li>
            </ul>
            <mt-button type="default" class="more-comments">更多评价</mt-button>
          </div>

          <footer class="qaBottom">
            <div style="width:100%" align="center">
              <mt-button class="ask-btn" type="default" @click="makeOrder">下单并支付</mt-button>
            </div>
          </footer>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="comm-header">
          <div class="title">
            <i class="arr-left">
              <img src="../assets/img/chat/btn-back.png" alt>
            </i>
            支付页面
          </div>
        </div>

        <div class="profile-info">
          <div class="pay-project">
            <header class="p-tit">{{serviceinfo.title}}</header>
            <div class="pay-price">{{serviceinfo.price}}元</div>
            <div class="pay-to">
              <span>付款给</span>
              <span class="name">{{userInfo.nickname}}</span>
            </div>
            <div class="pay-to">
              <span>订单号</span>
              <span class="name">{{orderId}}</span>
            </div>
          </div>
        </div>

        <ul class="user-list">
          <li>
            <div class="title">支付方式</div>
            <div class="arrow">
              微信支付
              <img src="../assets/img/profile/btn-back.png" alt>
            </div>
          </li>
        </ul>
        <br>
        <div align="center">
          <div v-if="paid==false">
            <vue-qr
              :text="downloadData"
              :margin="0"
              colorDark="#000"
              colorLight="#fff"
              :logoScale="0.3"
              :size="150"
            ></vue-qr>
            <br>
          </div>
          <div v-else>
            <img src="../assets/img/paysuccess.png">
          </div>
          <br>
          {{messageNotify}}
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import Follow from "../components/Follow.vue";
import Stars from "../components/Stars.vue";
import vueQr from "vue-qr";
import { Toast } from "mint-ui";
import common from "@/common/common";
export default {
  name: "AnswerInfo",
  components: { Follow, Stars, vueQr },
  data() {
    return {
      brandFold: true,
      userInfo: "",
      serviceinfo: "",
      uid: "",
      serviceid: "",
      selected: "1",
      orderId: "",
      orderAmount: "",
      downloadData: "",
      bQueryOrderStatus: false,
      paid: false,
      messageNotify: "请使用微信支付"
    };
  },
  methods: {
    changeTime(time){
      return common.wl_changeTime(time)
    },
    // 展开收缩
    changeFoldState() {
      this.brandFold = !this.brandFold;
    },
    // 跳转到 我要咨询 页面
    toConsult() {
      this.$router.push("/consult");
    },
    makeOrder() {
      var thisuser = JSON.parse(sessionStorage.getItem("userInfo")).userId;

      var qs_obj = {
        questionerId: thisuser,
        replyId: this.uid,
        serviceId: this.serviceid
      };
      console.log(qs_obj);
      this.$http
        .post("/api7/session/openSession", qs_obj)
        .then(resp => {
          console.log(resp.data);
          if (resp.data.success == true) {
            alert(resp.data);
          } else {
            Toast(resp.data.message);
          }

          // 已经获得sessionid，此时只需要配合userid请求支付二维码
          var newSessionId = resp.data.data;
          var qsOrder_obj = new URLSearchParams();
          qsOrder_obj.append("sessionId", newSessionId);
          qsOrder_obj.append("userId", thisuser);

          this.$http
            .post("/api5/pay/createOrderNative", qsOrder_obj)
            .then(resp2 => {
              console.log(resp2.data);
              if (resp2.data.success == true) {
                this.orderId = resp2.data.data.orderId;
                this.orderAmount = resp2.data.data.orderAmount;
                this.downloadData = resp2.data.data.codeUrl;
                this.bQueryOrderStatus = true;
              } else {
                Toast(resp2.data.message);
              }
            })
            .catch(err => {
              console.log(err);
            });

          this.selected = "2"; // 进入支付页面
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  created: function() {
    var uid = this.$route.params.answerid;
    var serviceid = this.$route.params.serviceid;
    this.uid = uid;
    this.serviceid = serviceid;

    console.log(uid);

    this.$http
      .get("/api4/ucenter/getUserInfoDetail", { params: { userId: uid } })
      .then(resp => {
        console.log(resp.data);
        this.userInfo = resp.data.data;
      })
      .catch(err => {
        console.log(err);
      });

    this.$http
      .get("/api7/goods/serviceDetail/" + serviceid)
      .then(resp => {
        console.log(resp.data);
        this.serviceinfo = resp.data.data;
      })
      .catch(err => {
        console.log(err);
      });

    this.timer = setInterval(() => {
      if (this.bQueryOrderStatus) {
        this.$http
          .get("/api5/pay/queryOrderStatus?orderId=" + this.orderId)
          .then(resp2 => {
            console.log(resp2.data);
            if (resp2.data.success == true) {
              Toast(resp2.data.data);
              clearInterval(this.timer);
              this.paid = true;
              this.messageNotify =
                "支付成功，点击下方导航’会员‘按钮开启与答主详谈";
            } else {
              console.log(resp2.data.message);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }, 1000);
  }
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

.answer-service-wrap {
  padding: 0 0.4rem;
  margin-top: 0.266667rem;

  .service-box {
    background: #fff;
    padding: 0.4rem 0.266667rem;

    .service-item {
      margin-bottom: 0.3rem;

      .ser-tit {
        display: flex;
        justify-content: space-between;

        font-size: 0.373333rem;

        .ser-price {
          font-weight: bold;
          color: rgba(224, 0, 46, 1);
        }

        .upDown-btn {
          display: flex;
          align-items: center;
          font-size: 0.293333rem;

          &.active {
            .icon-arr {
              transform: rotate(180deg);
            }
          }

          .icon-arr {
            margin-left: 0.12rem;
            display: flex;
            align-items: center;
          }

          img {
            width: 0.24rem;
          }
        }
      }
    }
  }
}

#lc-list {
  background: rgba(255, 233, 215, 1);
  border-radius: 0.106667rem;
  padding: 0.4rem 0.266667rem;
  margin-top: 0.3rem;

  &.active {
    display: none;
  }

  li {
    margin-bottom: 0.426667rem;

    &:last-child {
      margin-bottom: 0;
    }

    .lc-tit {
      font-size: 0.373333rem;
      position: relative;
      font-weight: bold;
      color: rgba(224, 0, 46, 1);
      padding-left: 0.226667rem;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -0.186667rem;
        width: 0.08rem;
        height: 0.373333rem;
        background: linear-gradient(
                0deg,
                rgba(186, 44, 40, 1),
                rgba(214, 53, 49, 1)
        );
        border-radius: 3px;
      }
    }

    .lc-sec {
      font-size: 0.346667rem;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 0.533333rem;
      margin-top: 0.24rem;
    }
  }
}

.step-list {
  display: flex;
  margin-top: 0.253333rem;

  li {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;

    &:last-child {
      &::after {
        display: none;
      }
    }

    &::after {
      content: "";
      position: absolute;
      top: 0.213333rem;
      right: -0.133333rem;
      width: 0.266667rem;
      height: 0.213333rem;

      background: url(../assets/img/qa/arr.png) no-repeat;
      background-size: 100%;
    }

    .s-num {
      width: 0.64rem;
      height: 0.64rem;
      background: linear-gradient(
              0deg,
              rgba(186, 44, 40, 1),
              rgba(214, 53, 49, 1)
      );
      border-radius: 50%;
      color: #fff;
      font-size: 0.346667rem;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .s-name {
      font-size: 0.293333rem;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      margin-top: 0.16rem;
    }
  }
}

.comments-box {
  margin-top: 0.4rem;

  .comments-title {
    font-size: 0.373333rem;
    font-weight: bold;
    color: rgba(224, 0, 46, 1);
  }

  .comments-list {
    background: rgba(255, 255, 255, 1);
    border-radius: 0.213333rem;
    margin-top: 0.266667rem;

    li {
      padding: 0.266667rem;
      display: flex;
      justify-content: space-between;

      .comm-img {
        img {
          width: 0.8rem;
          height: 0.8rem;
        }
      }

      .comm-info {
        width: 7.706667rem;

        .person-tit {
          font-size: 0.293333rem;

          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          display: flex;
          justify-content: space-between;
        }

        .comm-txt {
          font-size: 0.346667rem;

          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 0.533333rem;
          margin-top: 0.133333rem;
        }
      }
    }
  }

  .more-comments {
    padding: 4px 15px;
    color: #999999;
    border-radius: 0.4rem;
    background-color: transparent;
    font-size: 0.36rem;
    height: auto;
    margin: 0.4rem auto;
    display: block;
    border: 1px solid #f5f5f5;
  }
}

.answerInfo {
  overflow-y: auto;
  padding-bottom: 0.666667rem;

  .comm-btn {
    margin-top: 0.666667rem;
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

.mt-30 {
  margin-top: 0.4rem;
}
</style>
