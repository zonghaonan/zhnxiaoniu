<template>
  <div class="qa">
    <div class="banner">
      <!-- 搜索 -->
      <SearchBtn @searchAgain="search2" v-bind:searchString='this.$route.params.value'></SearchBtn>
    </div>

    <!-- 列表 tab-->
    <mt-navbar v-model="selected" class="search-mint-navbar">
      <mt-tab-item id="my-answer">用户</mt-tab-item>
      <mt-tab-item id="my-question">问答</mt-tab-item>
    </mt-navbar>
    <!-- 列表 container-->
    <mt-tab-container v-model="selected" swipeable>
      <mt-tab-container-item id="my-question">
        <div class="wdtw-wrap qa-wdtw-wrap">
          <div class="item" v-for="item in searchSessionList" :key="item.sessionId">
            <keep-alive>
              <router-link :to="{name:'QaDisplay',params:{id:item.sessionId}}">
                <div class="nickname-wrap">
                  <div class="nickname-item">
                    <img :src="item.questionerAvatar" alt/>
                    <span class="tw-name">{{ item.questionerNickName }}</span>
                  </div>
                  <div class="nickname-item">
                    <img :src="item.replyAvatar" alt/>
                    <span class="hd-name">{{ item.replyNickName }}</span>
                  </div>
                </div>
                <div class="tw-text">
                  <img src="../../assets/img/search/q.png" alt/>
                  <p>{{ item.title }}</p>
                </div>
                <!--                <div class="hd-text">-->
                <!--                  <img src="../../assets/img/search/a.png" alt/>-->
                <!--                  <p>王老师知道请问专硕和王老师学，硕专硕和有王老师知道请问专硕和，王老师学硕专硕和有王老师知道请问专硕和王老师学硕专硕和有王老师知道请问...</p>-->
                <!--                </div>-->

                <footer class="sub-info">
                  <div class="in-item">
                    <img src="../../assets/img/home/icon_eye.png" alt/>
                    <span>800</span>
                  </div>
                  <div class="in-item">
                    <img src="../../assets/img/home/icon_zan.png" alt/>
                    <span>{{ item.thumbUpCnt }}</span>
                  </div>
                  <div class="in-item">
                    <span>{{ item.createTime }}</span>
                  </div>
                </footer>
              </router-link>
            </keep-alive>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="my-answer">

        <div class="profile-info" v-for="item in searchUserList" :key="item.userId">
          <keep-alive>
            <router-link  :to="{name: 'UserDetails', params:{id:item.userId}}">
              <header class="hd">
                <div class="portrait">
                  <img :src="item.avatar" alt/>
                </div>
                <div class="user-info">
                  <div class="name">
                    {{ item.nickname }}
                    <img src="../../assets/img/profile/renzheng.png" alt/>
                  </div>
                  <div class="code">用户号:{{ item.username }}</div>
                  <div class="marks">
                    <div v-if="item.gender ==='男'" class="tip">
                      <img src="../../assets/img/profile/male.png" alt/> {{ item.age }}
                    </div>
                    <div v-if="item.gender === '女'" class="tip age-tip">
                      <img src="../../assets/img/profile/female.png" alt/> {{ item.age }}
                    </div>
                    <!--                  <div class="tip">南京</div>-->
                    <div class="tip">{{ item.university }} {{ item.department }}</div>
                  </div>
                </div>
              </header>
              <!-- btn -->
              <div class="edit-btn">
                <img src="../../assets/img/search/heart.png" alt/>
                <span>关注</span>
              </div>
              <p>
                <br>
                <span style="color:#ff6600">{{ item.verifyInfo }}</span>
              </p>
              <section class="sec-info">{{ item.introduce }}</section>
              <footer class="ft-info2">
                <div class="item">
                  <div class="notice">{{ item.thumbUpCnt }}</div>
                  <div class="text">获赞</div>
                </div>
                <div class="item">
                  <div class="notice">{{ item.fansCnt }}</div>
                  <div class="text">粉丝</div>
                </div>
                <div class="item">
                  <div class="notice">{{ item.followCnt }}</div>
                  <div class="text">关注</div>
                </div>
              </footer>
              <footer class="ft-info">
                <div class="item">
                  <div class="tip">平均响应时间:</div>
                  <div class="text">1小时</div>
                </div>
                <div class="item">
                  <div class="tip">答题数:</div>
                  <div class="text">112</div>
                </div>
                <div class="item">
                  <div class="tip">好评</div>
                  <div class="stars">
                    <img src="../../assets/img/profile/wujiaoxingxingxing.png" alt/>
                    <img src="../../assets/img/profile/wujiaoxingxingxing.png" alt/>
                    <img src="../../assets/img/profile/wujiaoxingxingxing.png" alt/>
                    <img src="../../assets/img/profile/wujiaoxingxingxing.png" alt/>
                    <img src="../../assets/img/profile/wujiaoxingxingxing.png" alt/>
                  </div>
                </div>
              </footer>
            </router-link>
          </keep-alive>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>

  </div>
</template>

<script>
import SearchBtn from "../../components/SearchBtn.vue";
import common from "@/common/common";

export default {
  name: "Search",
  components: {
    SearchBtn,
  },
  data() {
    return {
      // search
      value: "",
      // list
      selected: "my-answer",
      active: "my-answer",
      swipeable: true,
      ajax_ok: '',
      searchUserList: [],
      searchSessionList: [],
      searchValue: '',
    };
  },
  mounted() {
    this.searchValue = this.$route.params.value;
    // console.log(this.searchValue);
    this.search();
  },
  methods: {
    changetime(time) {
      return common.parseDate(time);
    },
    onTransferSearchValue: function (searchValue) {
      console.log("trigger the transferSearchValue,searchValue =" + searchValue)
      this.searchValue = searchValue;
      this.search();
    },
    search2: function (datavalue) {
      this.searchValue = datavalue;
      this.search();
    },
    search: function () {
      // console.log("搜索+1");
      this.$http.all([
        this.$http.get("/api6/search/queryUser", {
          params: {
            page: 0,
            size: 10,
            keyword: this.searchValue
          }
        }),
        this.$http.get("/api6/search/session", {
          params: {
            page: 0,
            size: 10,
            keyword: this.searchValue
          }
        })]
      ).then(this.$http.spread((userResp, sessionResp) => {
        this.searchSessionList = sessionResp.data.queryResult.list;
        this.searchUserList = userResp.data.queryResult.list;
      })).catch(err => {
        console.log(err);
      });
    },
  }
};
</script>
<style lang="scss">
.qa {
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

.progress-time {
  color: #999999;
  text-align: center;
  font-size: 0.293333rem;
}

.qa-wdtw-wrap {
  .item {
    background: #fff;
    border-radius: 0.213333rem;
    padding: 0.266667rem;
    margin-bottom: 0.186667rem;

    .nickname-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1.2rem;

      .nickname-item {
        display: flex;
        align-items: center;
        font-size: 0.346667rem;

        img {
          width: 0.586667rem;
          height: 0.586667rem;
          border-radius: 50%;
          border: 1px solid #e0002e;
          margin-right: 0.133333rem;
        }

        .tw-name {
          color: #e0002e;
        }

        .hd-name {
          color: #316af8;
        }
      }
    }

    .tw-text {
      line-height: 0.533333rem;
      margin-top: 0.266667rem;
      font-weight: 500;
      display: flex;

      img {
        width: 0.4rem;
        height: 0.4rem;
        margin-right: 0.133333rem;
        display: block;
      }

      p {
        color: #282828;
        width: 8.093333rem;
      }

      span {
        color: #e0002e;
      }
    }

    .hd-text {
      line-height: 0.533333rem;
      margin-top: 0.266667rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      font-weight: 500;
      display: flex;

      img {
        width: 0.4rem;
        height: 0.4rem;
        margin-right: 0.133333rem;
        flex: none;
      }

      p {
        color: #666666;
        width: 8.093333rem;

        span {
          color: #999999;
        }
      }

      span {
        color: #316af8;
      }
    }

    .sub-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.266667rem;

      .in-item {
        display: flex;
        align-items: center;
        font-size: 0.293333rem;
        color: #999999;

        img {
          width: 0.346667rem;

          margin-right: 0.146667rem;
        }
      }
    }
  }
}

.search-mint-navbar {
  padding: 0 2rem;
}

.qa {
  .profile-info {

    width: 9.2rem;
    margin: 0 auto;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.213333rem;
    padding: 0.4rem 0.266667rem;
    position: relative;
    margin-bottom: 0.24rem;

    &:active {
      background-color: rgba(0, 0, 0, 0.1);
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
  }

  .edit-btn {
    position: absolute;
    top: 0.4rem;
    right: 0;
    background: rgba(224, 0, 46, 0.1);
    border-radius: 24px 0px 0px 24px;
    padding: 0.133333rem 0.4rem;
    color: #e0002e;
    font-size: 0.293333rem;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 0.373333rem;
      margin-right: 0.133333rem;
    }

    &.active {
      background-color: rgba(0, 0, 0, 0.1);
    }

    span {
      font-weight: 500;
    }
  }
}
</style>

