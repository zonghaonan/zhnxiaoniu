<template>
  <div class="member">
    <div class="banner">
      <!-- 搜索 -->
      <SearchBtn></SearchBtn>
    </div>
    <!-- 列表 tab-->
    <mt-navbar v-model="selected">
      <mt-tab-item id="my-question">我购买的VIP服务</mt-tab-item>
      <mt-tab-item id="my-answer">我提供的VIP服务</mt-tab-item>
    </mt-navbar>
    <!-- 列表 container-->
    <mt-tab-container v-model="selected" swipeable>
      <mt-tab-container-item id="my-question">
        <div class="wdtw-wrap">
          <div v-if="buyServiceListProcess.length!==0" class="progress-state">
            <span>进行中</span>
          </div>
          <div>
            <div id="progressBuyServiceList" v-for="item in buyServiceListProcess" :key="'buyProcess'+item.serviceSessionId">
              <router-link :to="{name: 'VipChat', params:{id:item.serviceSessionId}}">
                <div class="progress-time">{{ changetime(item.createTime) }}</div>
                <div class="vip-item">
                  <header class="vip-tit">
                    <div class="tit">{{ item.title }}</div>
                    <div class="num">NO：{{ item.serviceId }}</div>
                  </header>
                  <div class="v-info">{{ item.description }}</div>
                  <footer class="v-ft">
                    <div class="price">
                      ￥
                      <span>{{ item.price }}</span>
                    </div>
                    <div class="state-tip">等待对方确认</div>
                  </footer>
                </div>
              </router-link>
            </div>
          </div>
          <div v-if="buyServiceListFinish.length !==0" class="progress-state finished">
            <span>已完结</span>
          </div>
          <div>
            <div id="finishBuyServiceList" v-for="item in buyServiceListFinish" :key="'buyFinish' +item.serviceSessionId">
              <router-link :to="{name: 'VipChat', params:{id:item.serviceSessionId}}">
                <div class="progress-time">{{ changetime(item.createTime) }}</div>
                <div class="vip-item">
                  <header class="vip-tit">
                    <div class="tit">{{ item.title }}</div>
                    <div class="num">NO：{{ item.serviceId }}</div>
                  </header>
                  <div class="v-info">{{ item.description }}</div>
                  <footer class="v-ft">
                    <div class="price">
                      ￥
                      <span>{{ item.price }}</span>
                    </div>
                    <div class="state-tip">等待对方确认</div>
                  </footer>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="my-answer">
        <div class="wdtw-wrap">
          <div v-if="provideServiceListProcess.length!==0" class="progress-state">
            <span>进行中</span>
          </div>
          <div>
            <div id="progressProvideServiceList" v-for="item in provideServiceListProcess" :key="'provideProcess' +item.serviceSessionId">
              <router-link :to="{name: 'VipChat', params:{id:item.serviceSessionId}}">
                <div class="progress-time">{{ changetime(item.createTime) }}</div>
                <div class="vip-item">
                  <header class="vip-tit">
                    <div class="tit">{{ item.title }}</div>
                    <div class="num">NO：{{ item.serviceId }}</div>
                  </header>
                  <div class="v-info">{{ item.description }}</div>
                  <footer class="v-ft">
                    <div class="price">
                      ￥
                      <span>{{ item.price }}</span>
                    </div>
                    <div class="state-tip">等待对方确认</div>
                  </footer>
                </div>
              </router-link>
            </div>
          </div>
          <div v-if="provideServiceListFinish.length !==0" class="progress-state finished">
            <span>已完结</span>
          </div>
          <div>
            <div id="finishProvideServiceList" v-for="item in provideServiceListFinish" :key="'provideFinish' + item.serviceSessionId">
              <router-link :to="{name: 'VipServiceDetail', params:{id:item.serviceSessionId}}">
                <div class="progress-time">{{ changetime(item.createTime) }}</div>
                <div class="vip-item">
                  <header class="vip-tit">
                    <div class="tit">{{ item.title }}</div>
                    <div class="num">NO：{{ item.serviceId }}</div>
                  </header>
                  <div class="v-info">{{ item.description }}</div>
                  <footer class="v-ft">
                    <div class="price">
                      ￥
                      <span>{{ item.price }}</span>
                    </div>
                    <div class="state-tip">等待对方确认</div>
                  </footer>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import SearchBtn from "../../components/SearchBtn.vue";
import common from "@/common/common";
import {Toast} from 'mint-ui';
export default {
  name: "Member",
  components: {
    SearchBtn,
  },
  data() {
    return {
      // list
      selected: "my-question",
      active: "my-question",
      swipeable: true,
      buyServiceListProcess: [],
      buyServiceListFinish: [],
      provideServiceListProcess: [],
      provideServiceListFinish: [],
    };
  },
  methods: {
    changetime(time) {
      return common.wl_changeTime(time);
    }
  },
  mounted() {
    let obj_json = JSON.parse(sessionStorage.getItem('userInfo'));
    let uid = obj_json.userId.toString();
    this.$http.all([
      this.$http.get("/api7/goods/provideServiceList/" + uid),
      this.$http.get("/api7/goods/buyServiceList/" + uid)
    ]).then(this.$http.spread((provideServiceResp, buyServiceResp) => {
      if (buyServiceResp.data.success){
        let buyServiceList = buyServiceResp.data.data;
        for (let i = 0; i < buyServiceList.length; i++) {
          let status = buyServiceList[i].status;
          // if (status !== 0 && status !== 4) {
          if ( status !== 4) {
            this.buyServiceListProcess.push(buyServiceList[i]);
          } else if (status!==0){
            this.buyServiceListFinish.push(buyServiceList[i]);
          }
        }
      }else {
        Toast(buyServiceResp.data.message)
      }
      if (provideServiceResp.data.success){
        let provideServiceList =provideServiceResp.data.data;
        for (let i = 0; i < provideServiceList.length; i++) {
          let status = provideServiceList[i].status;
          // if (status !== 0 && status !== 4) {
          if ( status !== 4) {
            this.provideServiceListProcess.push(provideServiceList[i]);
          } else if (status!==0){
            this.provideServiceListFinish.push(provideServiceList[i]);
          }
        }
      }else {
        Toast(provideServiceResp.data.message)
      }
    })).catch(err => {
      console.log(err);
    });
  }
};
</script>
<style lang="scss">
.member {
  .banner {
    position: relative;
    height: 1.173333rem;
    padding: 0.2rem 0.4rem;
    background: linear-gradient(
            90deg,
            rgba(199, 53, 49, 1) 0%,
            rgba(186, 44, 40, 1) 100%
    );

    .mint-search {
      height: 0.773333rem;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 0.386667rem;
      overflow: hidden;

      .mint-searchbar {
        padding: 0;
        height: 100%;
        background-color: transparent;

        .mintui-search {
          font-size: 0.4rem;
          color: #fff;
          margin-right: 0.133333rem;
        }

        .mint-searchbar-inner {
          background-color: transparent;
          padding: 0.2rem 0.4rem;
          height: auto;

          .mint-searchbar-core {
            background-color: transparent;
            height: 0.333333rem;
            color: #fff;
          }
        }
      }

      .mint-searchbar-cancel {
        display: none;
      }
    }
  }

  .mint-navbar {
    background-color: transparent;
    padding: 0 1.066667rem;

    .mint-tab-item {
      font-size: 0.346667rem;
      position: relative;
      padding: 0;
      height: 1.293333rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #666;

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
    padding: 0 0.24rem;
  }
}

input::-webkit-input-placeholder {
  color: rgba(255, 255, 255, 1);
}

input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;

  position: relative;
  height: 20px;
  width: 20px;
  border-radius: 50%;
}

input[type="search"]::-webkit-search-cancel-button:after {
  position: absolute;
  content: ‘x‘;
  left: 25%;
  top: -12%;
  font-size: 20px;
  color: #fff;
}

.progress-state {
  text-align: center;
  font-size: 0.32rem;
  font-weight: 500;
  color: rgba(224, 0, 46, 1);
  background: url(../../assets/img/qa/line_bg_red.png) no-repeat;
  background-position: center;
  background-size: 3.893333rem;
  margin: 0.4rem 0 0.266667rem 0;

  &.finished {
    color: #666;
    background: url(../../assets/img/qa/line_bg.png) no-repeat;
    background-position: center;
    background-size: 3.893333rem;
  }
}

.progress-time {
  color: #999999;
  text-align: center;
  font-size: 0.293333rem;
}

.vip-item {
  background: url(../../assets/img/member/vip_bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 0.56rem 0.426667rem 0.373333rem 0.426667rem;

  .vip-tit {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .tit {
      font-size: 0.4rem;
      font-weight: bold;
      color: rgba(143, 106, 50, 1);
    }

    .num {
      font-size: 0.293333rem;

      font-weight: 400;
      color: rgba(143, 106, 50, 1);
    }
  }

  .v-info {
    margin-top: 0.266667rem;
    font-size: 0.346667rem;
    font-weight: 400;
    color: rgba(143, 106, 50, 1);
  }

  .v-ft {
    display: flex;
    justify-content: space-between;
    margin-top: 0.386667rem;

    .price {
      font-size: 0.293333rem;
      font-weight: bold;
      color: rgba(224, 0, 46, 1);

      span {
        font-size: 0.48rem;
      }
    }

    .state-tip {
      font-size: 0.373333rem;
      font-weight: 500;
      text-decoration: underline;
      color: rgba(143, 106, 50, 1);
    }
  }
}
</style>

