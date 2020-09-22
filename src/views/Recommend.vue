<template>
  <div class="profile">
    <div class="comm-chat-header">
      <div class="title">
        <i class="arr-left" @click="$router.back(-1)">
          <img src="../assets/img/chat/btn-back.png" alt />
        </i>
        加入推广
      </div>
      <img src="../assets/img/profile/refresh.png" class="refresh-icon" @click="refresh" alt="">
    </div>
    <!-- <div class="profile-info"></div> -->
    <input id="address" type="text" :value="downloadData">
    <mt-navbar v-model="selected">
      <mt-tab-item id="recommend-list">已推广列表</mt-tab-item>
      <mt-tab-item id="recommend-QR">推广二维码</mt-tab-item>
    </mt-navbar>
    <mt-tab-container id="content" style="overflow: scroll;" :style="height" @scroll.native="scrollEvent" ref='content'
      v-model="selected" swipeable>
      <mt-tab-container-item id="recommend-list">
        <div class="total">总收益：<span class="total-price">￥{{totalPrice}}</span></div>
        <div v-for="(item,index) in recommendList" :key="index" class="order-msg">
          <div class="main-msg">
            <p>
              被推广人：{{item.promotedNickname}}
            </p>
            <p>
              推广人：{{item.promoterNickname}}
            </p>
            <p>
              时间：{{createTime(item.createTime)}}
            </p>
          </div>
          <div class="price">
            <span>￥{{item.amount}}</span>
          </div>
        </div>
        <div class="footer" v-if="loadMore">加载中...</div>
        <div class="footer" v-if="noMore">没有更多了</div>
      </mt-tab-container-item>
      <mt-tab-container-item id="recommend-QR">
        <div v-if="downloadData" align="center" style="margin-top: 100px;">
          <vue-qr :text="downloadData" :margin="0" colorDark="#000" colorLight="#fff" :logoScale="0.3" :size="150">
          </vue-qr>
          <br><br>
          <span class="copy" @click="copyAddress">复制链接</span>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
  import vueQr from "vue-qr"
  import {
    Toast
  } from 'mint-ui';
  export default {
    data() {
      return {
        height: {
          height: "",
        },
        selected: 'recommend-list',
        downloadData: "http://www.baidu.com",
        userId: '',
        page: 0,
        recommendList: [],
        loadMore: false,
        noMore: false,
        canScroll: true,
        totalPrice: 0
      }
    },
    computed: {
      createTime() {
        return val => {
          let times = val.split('.')
          times = times[0].split('T')
          return times[0] + ' ' + times[1]
        }
      }
    },
    created() {
      this.userId = JSON.parse(sessionStorage.getItem('userInfo')).userId;
      console.log(this.userId);
      this.getRecommendList(1)
    },
    components: {
      vueQr
    },
    mounted() {
      console.log(this.$refs.content.$el.offsetTop);
      this.height.height = window.innerHeight - this.$refs.content.$el.offsetTop - 54.1 + 'px'
    },
    methods: {
      refresh() {
        Toast('正在刷新')
        this.isRefresh = true
        this.getRecommendList(1)
      },
      getRecommendList(page) {
        this.$http
          .get("/api4//ucenter/findPromote", {
            params: {
              promoterId: this.userId,
              page: page
            }
          })
          .then(resp => {
            console.log(resp.data);
            if (resp.data.pageResult.data.length > 0) {
              if (page === 1) {
                if (this.isRefresh) {
                  this.$refs.content.$el.scrollTop = 0
                  Toast('刷新成功')
                  this.isRefresh = false
                }
                this.recommendList = resp.data.pageResult.data
                this.totalPrice = resp.data.pageResult.totalProfit.toFixed(2)
                this.page = 0
                this.noMore = false
                this.canScroll = true
              } else {
                let list = []
                resp.data.pageResult.data.forEach(item1 => {
                  if (!this.recommendList.find(item2 => item1.promotedId === item2.promotedId)) {
                    list.push(item1)
                  }
                });
                if (list.length === 0 && page < resp.data.pageResult.pages) {
                  this.page++
                  this.getRecommendList(this.page + 1)
                  return
                } else {
                  this.recommendList.push(...list)
                  this.loadMore = false
                  this.canScroll = true
                }
              }
              this.page++
              if (page === resp.data.pageResult.pages) {
                this.noMore = true
                this.loadMore = false
                this.canScroll = false
              }
            }
          })
          .catch(err => {
            console.log(err);
            this.loadMore = false
            Toast('网络异常')
            if (!this.noMore) {
              setTimeout(() => {
                this.canScroll = true
              }, 500);
            }
          });
      },
      copyAddress() {
        const input = document.getElementById('address')
        input.select()
        if (document.execCommand('copy')) {
          Toast('复制成功')
        }
      },
      ShowDetail(item) {
        this.$router.push({
          name: 'RecommendDetail',
          params: {
            promotedId: item.promotedId
          }
        })
      },
      scrollEvent() {
        if (this.canScroll) {
          let scrollTop = this.$refs.content.$el.scrollTop
          let scrollHeight = this.$refs.content.$el.scrollHeight
          let windowHeight = this.$refs.content.$el.clientHeight
          if ((scrollTop + windowHeight + 1) > scrollHeight) {
            console.log('请求数据');
            this.loadMore = true
            this.canScroll = false
            this.scrollToEnd()
            setTimeout(() => {
              this.getRecommendList(this.page + 1)
            }, 500);
          }
        }
      },
      scrollToEnd() {
        this.$nextTick(() => {
          console.log('scrolltoEnd');
          this.$refs.content.$el.scrollTop = this.$refs.content.$el.scrollHeight
        })
      }
    },
    watch: {
      selected() {
        this.$refs.content.$el.scrollTop = 0
      }
    },
  }
</script>
<style lang="scss" scoped>
  .copy {
    color: blue;
    text-decoration: underline;
  }

  #address {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -10;
  }

  .order-msg {
    display: flex;
  }

  .refresh-icon {
    width: 30px;
    height: 30px;
  }

  .main-msg {
    flex: 1;
    width: 100%;
    overflow: hidden;
  }

  .total {
    margin-left: 10px;
    font-size: 15px;

    .total-price {
      color: red;
    }
  }

  .order-msg .price {
    display: flex;
    align-items: center;
    color: red;

    span {
      border: 1px red solid;
      border-radius: 15px;
      padding: 3px 5px;
    }
  }



  .mint-tab-container::-webkit-scrollbar {
    width: 0;
  }

  .footer {
    padding: 5px 0;
    text-align: center;
  }
</style>