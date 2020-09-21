<template>
  <div class="qa">
    <div class="banner">
      <!-- 搜索 -->
      <!-- <mt-search v-model="value" placeholder="搜索问题和答案"></mt-search> -->
      <!-- 搜索 -->
      <SearchBtn></SearchBtn>
    </div>
    <!-- 列表 tab-->
    <mt-navbar v-model="selected">
      <mt-tab-item id="my-question">我的提问</mt-tab-item>
      <mt-tab-item id="my-answer">我的回答</mt-tab-item>
      <mt-tab-item id="my-onlookers">我的围观</mt-tab-item>
    </mt-navbar>

    <!-- 列表 container-->
    <mt-tab-container v-model="selected" swipeable>
      <mt-tab-container-item id="my-question">
        <div class="wdtw-wrap">
          <div v-if="asklistProcess.length!==0" class="progress-state">
            <span>进行中</span>
          </div>
          <div>
            <div id="questionProgressListbox" v-for="item in asklistProcess" :key="item.sessionId">
              <div v-if="item.status !==4 ">
                <router-link :to="{name: 'Chat', params:{id:item.sessionId}}">
                  <div class="progress-time">{{ changetime(item.createTime) }}</div>

                  <div class="item">
                    <div class="nickname-wrap">
                      <div class="nickname-con">
                        <div class="nickname-item">
                          <img :src="userAvatar" alt />
                          <span class="tw-name">{{ userNickName }}</span>
                        </div>
                        <div class="nickname-item">
                          <img :src="item.replyAvatar" alt />
                          <span class="hd-name">{{ item.replyNickName }}</span>
                        </div>
                      </div>
                      <div class="menu">
                        <img @click.prevent="showPopOption" src="../../assets/img/qa/menu.png" alt />
                      </div>
                    </div>
                    <div class="tw-text">
                      <span>提问标题：</span>
                      <p>{{ item.title }}</p>
                    </div>
                    <div class="hd-text">
                      <span>提问内容：</span>
                      <p>{{ item.content }}</p>
                    </div>
                    <div class="price">
                      <img src="../../assets/img/qa/triangle.png" alt />
                      <span class="p-num">{{item.price}}</span>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          <div v-if="asklistFinish.length !== 0" class="progress-state finished">
            <span>已完结</span>
          </div>
          <div>
            <div id="questionFinishListbox" v-for="item in asklistFinish" :key="item.sessionId">
              <div v-if="item.status === 4 ">
                <router-link :to="{name: 'QaDisplay', params:{id:item.sessionId}}">
                  <div class="progress-time">{{ changetime(item.createTime) }}</div>
                  <div class="item">
                    <div class="nickname-wrap">
                      <div class="nickname-con">
                        <div class="nickname-item">
                          <img :src="userAvatar" alt />
                          <span class="tw-name">{{ item.userNickName }}</span>
                        </div>
                        <div class="nickname-item">
                          <img :src="item.replyAvatar" alt />
                          <span class="hd-name">{{ item.replyNickName }}</span>
                        </div>
                      </div>
                      <div class="menu">
                        <img @click.prevent="showPopOption" src="../../assets/img/qa/menu.png" alt />
                      </div>
                    </div>
                    <div class="tw-text">
                      <span>提问标题：</span>
                      <p>{{ item.title }}</p>
                    </div>
                    <div class="hd-text">
                      <span>提问内容：</span>
                      <p>{{ item.content }}</p>
                    </div>

                    <footer class="sub-info">
                      <div class="in-item">
                        <img src="../../assets/img/home/icon_eye.png" alt />
                        <span>800</span>
                      </div>
                      <div class="in-item">
                        <img src="../../assets/img/home/icon_zan.png" alt />
                        <span>600</span>
                      </div>
                      <div class="in-item">
                        <img src="../../assets/img/qa/zhuanfa.png" alt />
                        <span>100</span>
                      </div>
                    </footer>
                    <div class="price">
                      <img src="../../assets/img/qa/triangle.png" alt />
                      <span class="p-num">{{item.price}}</span>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>

          <!--                    <div class="progress-time">2020年06月01日</div>-->
          <!--                    <div class="item">-->
          <!--                        <div class="nickname-wrap">-->
          <!--                            <div class="nickname-item">-->
          <!--                                <img src="../../assets/img/home/portrait.png" alt/>-->
          <!--                                <span class="tw-name">提问人昵称</span>-->
          <!--                            </div>-->
          <!--                            <div class="nickname-item">-->
          <!--                                <img src="../../assets/img/qa/p2.png" alt/>-->
          <!--                                <span class="hd-name">回答人昵称</span>-->
          <!--                            </div>-->
          <!--                        </div>-->
          <!--                        <div class="tw-text">-->
          <!--                            <span>提问：</span>-->
          <!--                            <p>请问专硕和学硕专硕和有什么区别，请问专硕和学硕专硕和有什么区别？</p>-->
          <!--                        </div>-->
          <!--                        <div class="hd-text">-->
          <!--                            <span>回答：</span>-->
          <!--                            <p>王老师知道请问专硕和王老师学，硕专硕和有王老师知道请问专硕和，王老师学硕专硕和有王老师知道请问专硕和王老师学硕专硕和有王老师知道请问...</p>-->
          <!--                        </div>-->

          <!--                        <footer class="sub-info">-->
          <!--                            <div class="in-item">-->
          <!--                                <img src="../../assets/img/qa/eye_bi.png" alt/>-->
          <!--                                <span>私密问题</span>-->
          <!--                            </div>-->
          <!--                        </footer>-->
          <!--                    </div>-->
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="my-answer">
        <div class="wdtw-wrap">
          <div v-if="replylistProcess.length !==0 " class="progress-state">
            <span>进行中</span>
          </div>
          <div>
            <div id="answerProgressListbox" v-for="item in replylistProcess" :key="item.sessionId">

              <div class="progress-time">{{ changetime(item.createTime) }}</div>
              <router-link :to="{name: 'Chat', params:{id:item.sessionId}}">

                <div class="item">
                  <div class="nickname-wrap">
                    <div class="nickname-con">
                      <div class="nickname-item">
                        <img :src="item.questionerAvatar" alt />
                        <span class="tw-name">{{ item.questionerNickName }}</span>
                      </div>
                      <div class="nickname-item">
                        <img :src="userAvatar" alt />
                        <span class="hd-name">{{ userNickName }}</span>
                      </div>
                    </div>
                    <div class="menu">
                      <img @click.prevent="GetMenu(item.sessionId, item.status)" src="../../assets/img/qa/menu.png"
                        alt />
                    </div>
                  </div>
                  <div class="tw-text">
                    <span>提问标题：</span>
                    <p>{{ item.title }}</p>
                  </div>
                  <div class="hd-text">
                    <span>提问内容：</span>
                    <p>{{ item.content }}</p>
                  </div>
                  <div class="price">
                    <img src="../../assets/img/qa/triangle.png" alt />
                    <span class="p-num">{{item.price}}</span>
                  </div>

                </div>
              </router-link>
            </div>
          </div>
          <div v-if="replyListFinish.length!==0" class="progress-state finished">
            <span>已完结</span>
          </div>
          <div>
            <div id="answerFinishListbox" v-for="item in replyListFinish" :key="item.sessionId">
              <router-link :to="{name: 'QaDisplay', params:{id:item.sessionId}}">
                <div class="progress-time">{{ changetime(item.createTime) }}</div>
                <div class="item">
                  <div class="nickname-wrap">
                    <div class="nickname-con">
                      <div class="nickname-item">
                        <img :src="item.questionerAvatar" alt />
                        <span class="tw-name">{{ item.questionerNickName }}</span>
                      </div>
                      <div class="nickname-item">
                        <img :src="userAvatar" alt />
                        <span class="hd-name">{{ item.userNickName }}</span>
                      </div>
                    </div>
                    <div class="menu">
                      <img @click.prevent="GetMenu(item.sessionId, item.status)" src="../../assets/img/qa/menu.png"
                        alt />
                    </div>
                  </div>
                  <div class="tw-text">
                    <span>提问标题：</span>
                    <p>{{ item.title }}</p>
                  </div>
                  <div class="hd-text">
                    <span>提问内容：</span>
                    <p>{{ item.content }}</p>
                  </div>

                  <footer class="sub-info">
                    <div class="in-item">
                      <img src="../../assets/img/home/icon_eye.png" alt />
                      <span>800</span>
                    </div>
                    <div class="in-item">
                      <img src="../../assets/img/home/icon_zan.png" alt />
                      <span>600</span>
                    </div>
                    <div class="in-item">
                      <img src="../../assets/img/qa/zhuanfa.png" alt />
                      <span>100</span>
                    </div>
                  </footer>
                  <div class="price">
                    <img src="../../assets/img/qa/triangle.png" alt />
                    <span class="p-num">{{item.price}}</span>
                  </div>
                </div>
              </router-link>
            </div>
          </div>

          <!--                    <div class="progress-time">2020年06月01日</div>-->
          <!--                    <div class="item">-->
          <!--                        <div class="nickname-wrap">-->
          <!--                            <div class="nickname-item">-->
          <!--                                <img src="../../assets/img/home/portrait.png" alt/>-->
          <!--                                <span class="tw-name">提问人昵称</span>-->
          <!--                            </div>-->
          <!--                            <div class="nickname-item">-->
          <!--                                <img src="../../assets/img/qa/p2.png" alt/>-->
          <!--                                <span class="hd-name">回答人昵称</span>-->
          <!--                            </div>-->
          <!--                        </div>-->
          <!--                        <div class="tw-text">-->
          <!--                            <span>提问：</span>-->
          <!--                            <p>请问专硕和学硕专硕和有什么区别，请问专硕和学硕专硕和有什么区别？</p>-->
          <!--                        </div>-->
          <!--                        <div class="hd-text">-->
          <!--                            <span>回答：</span>-->
          <!--                            <p>王老师知道请问专硕和王老师学，硕专硕和有王老师知道请问专硕和，王老师学硕专硕和有王老师知道请问专硕和王老师学硕专硕和有王老师知道请问...</p>-->
          <!--                        </div>-->

          <!--                        <footer class="sub-info">-->
          <!--                            <div class="in-item">-->
          <!--                                <img src="../../assets/img/qa/eye_bi.png" alt/>-->
          <!--                                <span>私密问题</span>-->
          <!--                            </div>-->
          <!--                        </footer>-->
          <!--                    </div>-->
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="my-onlookers"></mt-tab-container-item>
    </mt-tab-container>

    <mt-actionsheet :actions="actions" v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>

<script>
  //import { Toast } from 'mint-ui';
  import common from "../../common/common";
  import SearchBtn from "../../components/SearchBtn.vue";
  export default {
    components: {
      SearchBtn,
    },
    name: "Qa",
    data() {
      return {
        // search
        value: "",
        // list
        selected: "my-question",
        active: "my-question",
        swipeable: true,
        asklist: [],
        asklistProcess: [],
        asklistFinish: [],
        replylist: [],
        replylistProcess: [],
        replyListFinish: [],
        userAvatar: "",
        userNickName: "",
        sheetVisible: false,
        actions: [],
        activeSessId: '',
      };
    },
    methods: {
      AcceptQuestion: function () {

      },
      DeclineQuestion() {

      },

      GetMenu: function (sessid, status) {

        this.activeSessId = sessid;
        if (status == 1) // 支付过的新订单，答主在这里要决定答还是不答。
        {
          this.actions = [{
              name: "同意回答该问题",
              method: this.AcceptQuestion
            },
            {
              name: "谢绝回答该问题",
              method: this.DeclineQuestion
            }
          ];
        }
        this.showPopOption();
      },

      showPopOption: function () {



        this.sheetVisible = true;

      },
      loadMore() {
        this.loading = true;
        setTimeout(() => {
          let last = this.list[this.list.length - 1];
          for (let i = 1; i <= 10; i++) {
            this.list.push(last + i);
          }
          this.loading = false;
        }, 2500);
      },
      changetime: function (para) {
        return common.wl_changeTime(para);
      },
      setstatus: function (sesssionid, val) {

        let params = new URLSearchParams();
        params.append('sessionId', sesssionid);
        params.append('status', val);
        this.$http.put("/api1/qa/setStatus", params).then(resp => {
          console.log(resp.data)

        }).catch(err => {
          console.log(err);
        });
      },
    },
    created: function () {

      if (sessionStorage.getItem("subpageMyQa") != null) {
        //自定义代码
        this.selected = sessionStorage.getItem("subpageMyQa");
      }

      let obj_json = JSON.parse(sessionStorage.getItem('userInfo'));

      let uid = obj_json.userId.toString();
      // console.log(Base64.decode(str))
      this.userAvatar = obj_json.avatar;
      this.userNickName = obj_json.nickname;
      // 取到uid之后,获取回答列表
      let getMyReplyUrl = "api1/qa/getMyReply?userId=" + uid
      console.log(getMyReplyUrl)
      this.$http.get(getMyReplyUrl).then(resp => {
        // console.log(resp.data)
        this.replylist = resp.data
        for (let i = 0; i < this.replylist.data.length; i++) {
          let status = this.replylist.data[i].status;
          // if (status !== 0 && status !== 4) {
          if (status !== 4) {
            this.replylistProcess.push(this.replylist.data[i]);
          } else if (status !== 0) {
            this.replyListFinish.push(this.replylist.data[i]);
          }
        }
      }).catch(err => {
        console.log(err);
      });

      // 取道UID之后，获取提问列表
      let getMyAskUrl = "api1/qa/getMyAsk?userId=" + uid
      this.$http.get(getMyAskUrl).then(resp => {
        this.asklist = resp.data
        for (let i = 0; i < this.asklist.data.length; i++) {
          let status = this.asklist.data[i].status;
          // if (status !== 0 && status !== 4) {
          if (status !== 4) {
            this.asklistProcess.push(this.asklist.data[i]);
          } else if (status !== 0) {
            this.asklistFinish.push(this.asklist.data[i]);
          }
        }
      }).catch(err => {
        console.log(err);
      });
    },
  };
</script>

<style lang="scss">
  .qa {
    .banner {
      position: relative;
      height: 1.173333rem;
      padding: 0.2rem 0.4rem;
      background: linear-gradient(90deg,
          rgba(199, 53, 49, 1) 0%,
          rgba(186, 44, 40, 1) 100%);

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
            background: linear-gradient(90deg,
                rgba(186, 44, 40, 1),
                rgba(214, 53, 49, 1));
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

  .wdtw-wrap {
    .item {
      background: #fff;
      border-radius: 0.213333rem;
      padding: 0.266667rem;
      margin-top: 0.24rem;
      margin-bottom: 0.4rem;
      position: relative;

      &:active {
        background-color: rgba(0, 0, 0, 0.1);
      }

      .nickname-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .nickname-con {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 7.6rem;
        }

        .nickname-item {
          display: flex;
          align-items: center;
          font-size: 0.346667rem;

          &:nth-child(2) {
            flex-direction: row-reverse;

            img {
              margin-right: 0;
              margin-left: 0.133333rem;
            }
          }

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

        .menu {
          width: 0.4rem;

          img {
            width: 100%;
          }
        }
      }

      .tw-text {
        line-height: 0.533333rem;
        margin-top: 0.266667rem;
        font-weight: 500;

        p {
          display: inline;
          color: #282828;
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

        p {
          display: inline;
          color: #666666;
        }

        span {
          color: #316af8;
        }
      }

      .sub-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: .16rem;
        width: 5.6rem;

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

      .price {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 1rem;
        height: 1rem;
        color: #fff;

        img {
          width: 100%;
          height: 100%;
        }

        .p-num {
          font-size: 0.293333rem;
          font-weight: 500;
          position: absolute;
          z-index: 2;
          bottom: 0.16rem;
          right: 0;
          transform: rotate(-45deg);
        }
      }
    }
  }
</style>