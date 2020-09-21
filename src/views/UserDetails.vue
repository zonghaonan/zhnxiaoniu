<template>
  <div class="profile userDetails">
    <!-- header -->
    <div class="comm-header">
      <div class="title">
        <i class="arr-left" @click="$router.back(-1)">
          <img src="../assets/img/chat/btn-back.png" alt />
        </i>
        用户详情
      </div>
    </div>
    <!-- info -->
    <div class="profile-info">
      <header class="hd">
        <div class="portrait">
          <img src="../assets/img/search/touxiang2.png" alt />
        </div>
        <div class="user-info">
          <div class="name">
           {{userInfo.nickname}}
             <span v-if="userInfo.verifyInfo!=''">
                <img src="../assets/img/profile/renzheng.png" alt />
                </span>
          </div>
          <div class="code">用户号:{{userInfo.username}}</div>
          <div class="marks">
            <span v-if="userInfo.gender==='男'">
            <div class="tip age-tip">
                <img src="../assets/img/profile/male.png" alt /> {{userInfo.age}}岁
              </div>
            </span>
            <span v-else>
              <div class="tip age-tip">
                <img src="../assets/img/profile/female.png" alt /> {{userInfo.age}}岁
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

    <!-- userDetails  -->
    <div class="userDetails-wrap">
      <!-- VIP服务 -->
      <div class="user-vip-service">
        <header class="vip-fw-tit">VIP服务</header>
        <div class="fold-details">
          <ul :class="!isShow? 'uv-list active' : 'uv-list'">
           
            <li v-for="item in vipservicelist" :key="item.serviceId">
             <router-link :to="{name:'VipServiceDetail', params:{serviceid:item.serviceId, answerid:uid}}">
              <div class="icon">
                <img :src="item.img" alt />
              </div>
              <div class="tit">{{item.title}}</div>
              </router-link>
            </li>
           
            <li @click="showAll">
              <div class="icon">
                <img src="../assets/img/home/all.png" alt />
              </div>
              <div class="tit">全部</div>
            </li>
          </ul>
        </div>
        <!-- 展开详情 -->
        <div :class="isShow? 'launch-details' : 'launch-details active'">
          <ul class="launch-list">
           <li v-for="item in vipservicelist" :key="item.serviceId">
              <div class="icon">
                <img :src="item.img" alt />
              </div>
              <div class="con">
                <h2>{{item.title}}</h2>
                <p>{{item.description}}</p>
              </div>
              <div class="price">
                <span>￥{{item.price}}</span>
              </div>
            </li>
          </ul>
          <div class="sq-btn" @click="foldAll">收起</div>
        </div>
      </div>
      <!-- 他的提问 -->
      <div class="user-det-list">
        <mt-navbar v-model="selected">
          <mt-tab-item id="his-question">他的提问</mt-tab-item>
          <mt-tab-item id="his-answer">他的回答</mt-tab-item>
        </mt-navbar>
        <!-- 列表 container-->
        <mt-tab-container v-model="selected" swipeable>
          <mt-tab-container-item id="his-question">
            <div class="wdtw-wrap">
              <div class="item" v-for="n in 2" :key="n">
                <div class="nickname-wrap">
                  <div class="nickname-item">
                    <img src="../assets/img/home/portrait.png" alt />
                    <span class="tw-name">提问人昵称</span>
                  </div>
                  <div class="nickname-item">
                    <img src="../assets/img/qa/p2.png" alt />
                    <span class="hd-name">回答人昵称</span>
                  </div>
                </div>
                <div class="tw-text">
                  <span>提问：</span>
                  <p>请问专硕和学硕专硕和有什么区别，请问专硕和学硕专硕和有什么区别？</p>
                </div>
                <div class="hd-text">
                  <span>回答：</span>
                  <p>王老师知道请问专硕和王老师学，硕专硕和有王老师知道请问专硕和，王老师学硕专硕和有王老师知道请问专硕和王老师学硕专硕和有王老师知道请问...</p>
                </div>
                <footer class="sub-info">
                  <div class="in-item">
                    <img src="../assets/img/home/icon_eye.png" alt />
                    <span>800</span>
                  </div>
                  <div class="in-item">
                    <img src="../assets/img/home/icon_zan.png" alt />
                    <span>600</span>
                  </div>
                  <div class="in-item">
                    <span>1小时前</span>
                  </div>
                </footer>
              </div>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="his-answer">
            <div class="wdtw-wrap">
              <div class="item" v-for="n in 2" :key="n">
                <div class="nickname-wrap">
                  <div class="nickname-item">
                    <img src="../assets/img/home/portrait.png" alt />
                    <span class="tw-name">提问人昵称</span>
                  </div>
                  <div class="nickname-item">
                    <img src="../assets/img/qa/p2.png" alt />
                    <span class="hd-name">回答人昵称</span>
                  </div>
                </div>
                <div class="tw-text">
                  <span>提问：</span>
                  <p>请问专硕和学硕专硕和有什么区别，请问专硕和学硕专硕和有什么区别？</p>
                </div>
                <div class="hd-text">
                  <span>回答：</span>
                  <p>王老师知道请问专硕和王老师学，硕专硕和有王老师知道请问专硕和，王老师学硕专硕和有王老师知道请问专硕和王老师学硕专硕和有王老师知道请问...</p>
                </div>
                <footer class="sub-info">
                  <div class="in-item">
                    <img src="../assets/img/home/icon_eye.png" alt />
                    <span>800</span>
                  </div>
                  <div class="in-item">
                    <img src="../assets/img/home/icon_zan.png" alt />
                    <span>600</span>
                  </div>
                  <div class="in-item">
                    <span>1小时前</span>
                  </div>
                </footer>
              </div>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
  </div>
</template>

<script>
import Follow from "../components/Follow.vue"; //关注
import Stars from "../components/Stars.vue"; //星级
export default {
  name: "UserDetails",
  components: { Follow, Stars },
  data() {
    return {
      // list
      //selected: "his-question",
      active: "his-question",
      swipeable: true,
      isShow: true,
       selected:"1",
      value:"",
      userInfo:'',
      hotlist:'',
      asklist:'',
      vipservicelist:'',
      answerlist:'',
      uid:'',
    };
  },
  methods: {
    //  显示全部
    showAll() {
      this.isShow = false;
    },
    foldAll() {
      this.isShow = true;
    },
  },
  created:function(){

        var uid = this.$route.params.id;
        this.uid = uid;
        console.log(uid);

        this.$http.get("/api4/ucenter/getUserInfoDetail",{params:{userId:uid}}).then(resp=>{
            console.log(resp.data)
            this.userInfo=resp.data.data
        }).catch(err=>{
            console.log(err);
        });
        
        // 获取他的vip服务列表
        this.$http.get("/api7/goods/serviceList/"+uid).then(resp=>{
            console.log(resp.data)
            this.vipservicelist=resp.data.data
        }).catch(err=>{
            console.log(err);
        });

        this.$http.get("/api1/qa/getOpenAsk",{params:{userId:uid}}).then(resp=>{
            console.log(resp.data)
            this.asklist=resp.data;
        }).catch(err=>{
            console.log(err);
        });

        this.$http.get("/api1/qa/getOpenReply",{params:{userId:uid}}).then(resp=>{
            console.log(resp.data)
            this.answerlist=resp.data;
        }).catch(err=>{
            console.log(err);
        });
  }
};
</script>
<style lang="scss">
.userDetails {
  position: fixed;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fdf5f6;
  overflow-y: auto;
}

.userDetails-wrap {
  padding: 0.4rem;

  .user-vip-service {
    .vip-fw-tit {
      font-size: 0.373333rem;
      font-weight: bold;
      color: rgba(40, 40, 40, 1);
    }
  }

  .mint-navbar {
    background-color: transparent;
    .mint-tab-item {
      font-size: 0.346667rem;
      position: relative;
      padding: 0;
      height: 1.293333rem;
      display: flex;
      align-items: center;
      color: #666;
      flex: inherit;
      margin-right: 0.8rem;
      &.is-selected {
        color: #ba2c28;
        border-bottom: none;
        &::after {
          content: "";
          position: absolute;
          bottom: 0.266667rem;
          left: 50%;
          margin-left: -0.2rem;
          width: 0.4rem;
          height: 0.08rem;
          background: linear-gradient(
            90deg,
            rgba(186, 44, 40, 1),
            rgba(214, 53, 49, 1)
          );
          border-radius: 3px;
        }
        .mint-tab-item-label {
          font-size: 0.426667rem;
          font-weight: bold;
        }
      }
    }
  }
  .mint-tab-container-item {
    background: transparent;
  }
}

.uv-list {
  margin-top: 0.266667rem;
  display: flex;
  flex-wrap:wrap;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.213333rem;
  padding: 0.466667rem 0;
  &.active {
    display: none;
  }
  li {
    //flex: 1;
    width:25%;
    margin-bottom: 0.2rem;
    text-align: center;
    .icon {
      width: 0.666667rem;
      height: 0.666667rem;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        max-height: 100%;
        max-width: 100%;
      }
    }
    .tit {
      font-size: 0.32rem;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      margin-top: 0.213333rem;
    }
  }
}
.user-det-list {
  margin-top: 0.266667rem;
}

.launch-details {
  background: #fff;
  border-radius: 0.213333rem;
  display: none;

  &.active {
    display: block;
  }
  .launch-list {
    margin-top: 0.2rem;
    padding: 0 0.4rem;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.4rem 0;
      border-bottom: 1px solid #eeeeee;

      &:last-child {
        border: none;
      }

      .icon {
        width: 0.666667rem;
        height: 0.666667rem;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
      .con {
        width: 5.546667rem;
        h2 {
          font-size: 0.346667rem;
          font-weight: 500;
          color: rgba(40, 40, 40, 1);
        }
        p {
          font-size: 0.293333rem;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 0.4rem;
          margin-top: 0.226667rem;
        }
      }
      .price {
        background: rgba(253, 80, 100, 0);
        border: 1px solid rgba(224, 0, 46, 1);
        border-radius: 20px;
        padding: 0.106667rem 0.213333rem;
        font-size: 0.32rem;

        font-weight: bold;
        color: rgba(224, 0, 46, 1);
      }
    }
  }
}

.sq-btn {
  width: 2.4rem;
  padding: 0.133333rem;
  margin: 0 auto;
  text-align: center;
  background: rgba(221, 221, 221, 1);
  border-radius: 0.266667rem 0.266667rem 0px 0px;
  font-size: 0.293333rem;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
</style>
