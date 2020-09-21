<template>
  <div class="home">
    <div class="banner">
      <!-- 轮播 -->
      <mt-swipe :auto="4000" :speed="600">
        <mt-swipe-item v-for="(item,index) in banners" :key="index">
          <img :src="item.image" alt>
        </mt-swipe-item>
      </mt-swipe>
      <!-- 搜索 -->
      <SearchBtn v-bind:search-value="this.searchValue"></SearchBtn>
    </div>
    <!-- 列表 tab-->
    <mt-navbar v-model="selected">
      <mt-tab-item id="recommend">推荐</mt-tab-item>
      <mt-tab-item id="hotList">热榜</mt-tab-item>
      <mt-tab-item id="hotWords">热词</mt-tab-item>
    </mt-navbar>
    <!-- 列表 container-->
    <mt-tab-container v-model="selected" swipeable>
      <mt-tab-container-item id="recommend">
        <ul class="list">
          <li v-for="(item,index) in recommendlist.data" :key="index">
            <router-link :to="{name: 'QaDisplay', params:{id:item.sessionId}}">
              <div class="corner-num">{{index+1}}</div>
              <header class="list-title">
                <img :src="item.avatar" alt class="portrait">
                <span class="tit">{{item.title}}</span>
                <img src="../../assets/img/home/icon_hot.png" alt class="icon-hot">
              </header>
              <footer class="sub-info">
                <div class="item">
                  <img src="../../assets/img/home/icon_eye.png" alt>
                  <span>{{item.browseCnt}}</span>
                </div>
                <div class="item">
                  <img src="../../assets/img/home/icon_zan.png" alt>
                  <span>{{item.thumbUpCnt}}</span>
                </div>
                <div class="item">
                  <span>{{item.createTime|dateFilter(item.createTime)}}</span>
                </div>
              </footer>
            </router-link>
          </li>
        </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="hotList">
        <ul class="list">
          <li v-for="(item,index) in hotlist.data" :key="index">
            <router-link :to="{name: 'QaDisplay', params:{id:item.sessionId}}">
              <div class="corner-num">{{index+1}}</div>
              <header class="list-title">
                <img :src="item.avatar" alt class="portrait">
                <span class="tit">{{item.title}}</span>
                <img src="../../assets/img/home/icon_hot.png" alt class="icon-hot">
              </header>
              <footer class="sub-info">
                <div class="item">
                  <img src="../../assets/img/home/icon_eye.png" alt>
                  <span>{{item.browseCnt}}</span>
                </div>
                <div class="item">
                  <img src="../../assets/img/home/icon_zan.png" alt>
                  <span>{{item.thumbUpCnt}}</span>
                </div>
                <div class="item">
                  <span>{{item.createTime|dateFilter(item.createTime)}}</span>
                </div>
              </footer>
            </router-link>
          </li>
        </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="hotWords">
        <ul class="list">
          <li v-for="(item,index) in postgraduate.data" :key="index">
            <router-link :to="{name: 'QaDisplay', params:{id:item.sessionId}}">
              <div class="corner-num">{{index+1}}</div>
              <header class="list-title">
                <img :src="item.avatar" alt class="portrait">
                <span class="tit">{{item.title}}</span>
                <img src="../../assets/img/home/icon_hot.png" alt class="icon-hot">
              </header>
              <footer class="sub-info">
                <div class="item">
                  <img src="../../assets/img/home/icon_eye.png" alt>
                  <span>{{item.browseCnt}}</span>
                </div>
                <div class="item">
                  <img src="../../assets/img/home/icon_zan.png" alt>
                  <span>{{item.thumbUpCnt}}</span>
                </div>
                <div class="item">
                  <span>{{item.createTime|dateFilter(item.createTime)}}</span>
                </div>
              </footer>
            </router-link>
          </li>
        </ul>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import SearchBtn from "../../components/SearchBtn.vue";
export default {
  name: "Home",
  data() {
    return {
      // banner
      banners: [
        { image: require("../../assets/img/home/banner.jpg") },
        { image: require("../../assets/img/home/banner.jpg") },
        { image: require("../../assets/img/home/banner.jpg") }
      ],
      // list
      selected: "recommend",
      active: "recommend",
      swipeable: true,
      hotlist: [],
      recommendlist: [],
      postgraduate: [],
      searchValue: ""
    };
  },
  components: {
    SearchBtn
  },
  created:function(){

    // 热榜
    this.$http.get("/api1/qa/getHotList").then(resp=>{
        console.log(resp.data)
        this.hotlist = resp.data
      }).catch(err=>{
          console.log(err);
      });

    // 推荐
    this.$http.get("/api1/qa/getRecommendList").then(resp=>{
        console.log(resp.data)
        this.recommendlist = resp.data
      }).catch(err=>{
          console.log(err);
      });
      // 考研
      this.$http.get("/api1/qa/getExamList").then(resp=>{
          console.log(resp.data)
          this.postgraduate = resp.data
        }).catch(err=>{
            console.log(err);
        });


  },
  methods: {
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        let last = this.list[this.list.length - 1];
        for (let i = 1; i <= 30; i++) {
          this.list.push(last + i);
        }
        this.loading = false;
      }, 2500);
    },
    search: function() {
      this.$router.push({
        name: "searchres",
        params: { searchValue: this.searchValue }
      });
    }
  }
};
</script>
<style lang="scss">
.home {
  .banner {
    position: relative;
    height: 5.466667rem;
    .mint-swipe-item {
      height: 100%;
      img {
        height: 100%;
        width: 100%;
        display: block;
      }
    }
    .mint-swipe-indicators {
      bottom: 0.133333rem;
      .mint-swipe-indicator {
        background-color: rgba(255, 255, 255, 0.36);
        opacity: 1;

        &.is-active {
          background-color: rgba(255, 255, 255, 1);
        }
      }
    }
  }

  .page-search-btn {
    position: absolute;
    top: 0.266667rem;
    left: 0;
    right: 0;
    padding: 0 0.4rem;
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
    padding: 0 0.4rem;
  }
}

.list {
  li {
    background: rgba(255, 255, 255, 1);
    padding: 0.4rem;
    border-radius: 0.213333rem;
    position: relative;
    padding: 0.506667rem 0.266667rem 0.266667rem 0.266667rem;
    margin-bottom: 0.24rem;
    &:active {
      background-color: rgba(0, 0, 0, 0.1);
    }
    .corner-num {
      position: absolute;
      top: 0;
      left: 0;
      color: #fff;
      width: 0.72rem;
      height: 0.72rem;
      font-size: 0.293333rem;
      background: url(../../assets/img/home/icon_corner.png);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      padding: 0.093333rem 0 0 0.16rem;
    }
    .list-title {
      display: flex;
      align-items: center;
      .portrait {
        width: 0.586667rem;
        height: 0.586667rem;
        border-radius: 50%;
        border: 1px solid #e0002e;
        margin-right: 0.133333rem;
      }
      .tit {
        font-size: 0.4rem;
        width: 7.333333rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: bold;
        color: rgba(40, 40, 40, 1);
      }
      .icon-hot {
        width: 0.32rem;
        margin-left: 0.266667rem;
      }
    }
    .sub-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.266667rem;
      .item {
        display: flex;
        align-items: center;
        font-size: 0.293333rem;
        color: rgba(153, 153, 153, 1);
        img {
          margin-right: 0.146667rem;
        }
        &:nth-child(1) {
          img {
            width: 0.346667rem;
          }
        }
        &:nth-child(2) {
          img {
            width: 0.28rem;
          }
        }
      }
    }
    &:first-child {
      .corner-num {
        background: url(../../assets/img/home/icon_corner_red.png);
        background-size: 100%;
        background-repeat: no-repeat;
      }
    }
    &:nth-child(2) {
      .corner-num {
        background: url(../../assets/img/home/icon_corner_red.png);
        background-size: 100%;
        background-repeat: no-repeat;
      }
    }
    &:nth-child(3) {
      .corner-num {
        background: url(../../assets/img/home/icon_corner_red.png);
        background-size: 100%;
        background-repeat: no-repeat;
      }
    }
  }
}
</style>
