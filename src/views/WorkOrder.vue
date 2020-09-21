<template>
  <div>
    <div class="comm-chat-header">
      <div class="title">
        <i class="arr-left" @click="$router.back(-1)">
          <img src="../assets/img/chat/btn-back.png" alt />
        </i>
        我的工单
      </div>
      <div class="add-refresh">
        <!-- <img @click="refresh">刷新</img> -->
        <img src="../assets/img/profile/refresh.png" @click="refresh" alt="">
        <span class="add-order" @click="addOrder">+</span>
      </div>
    </div>
    <mt-navbar v-model="selected">
      <mt-tab-item id="unhandle">未处理工单</mt-tab-item>
      <mt-tab-item id="handling">正在处理工单</mt-tab-item>
      <mt-tab-item id="handled">过期工单</mt-tab-item>
    </mt-navbar>
    <mt-tab-container id="content" style="overflow: scroll;" :style="height" ref='content' v-model="selected" swipeable>
      <mt-tab-container-item id="unhandle">
        <div v-for="(item,index) in workOrders[0].list" @click="showToast" :key="index" class="order-msg">
          <h3>
            工单标题：{{item.taskTitle}}
          </h3>
          <p>
            工单描述：{{item.taskDescription}}
          </p>
          <div>
            <span class="person">发布人：{{item.taskNickname}}</span>
            <span>时间：{{item.createTime}}</span>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="handling">
        <div v-for="(item,index) in workOrders[1].list" @click="showChat(item)" :key="index" class="order-msg">
          <h3>
            工单标题：{{item.taskTitle}}
          </h3>
          <p>
            工单描述：{{item.taskDescription}}
          </p>
          <div>
            <span class="person">发布人：{{item.taskNickname}}</span>
            <span>时间：{{item.createTime}}</span>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="handled">
        <div v-for="(item,index) in workOrders[2].list" @click="showChat(item)" :key="index" class="order-msg">
          <h3>
            工单标题：{{item.taskTitle}}
          </h3>
          <p>
            工单描述：{{item.taskDescription}}
          </p>
          <div>
            <span class="person">发布人：{{item.taskNickname}}</span>
            <span>时间：{{item.createTime}}</span>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
  import {
    Toast
  } from 'mint-ui';
  export default {
    name: 'WorkOrder',
    data() {
      return {
        height: {
          height: "",
        },
        userId: '',
        workOrders: [{
          list: []
        }, {
          list: []
        }, {
          list: []
        }],
        selected: 'unhandle',
        timer: ''
      }
    },
    created() {
      console.log('work created');
      this.userId = JSON.parse(sessionStorage.getItem('userInfo')).userId;
      console.log(this.userId);
      this.getAllWorkOrders()
    },
    mounted() {
      let div = document.getElementById('content');
      console.log(div.offsetTop);
      this.height.height = window.innerHeight - div.offsetTop - 54.1 + 'px'
    },
    methods: {
      getWorkOrders(status) {
        console.log('getWorkOrders');
        return this.$http
          .get("/api1/qa/queryWkTasks", {
            params: {
              taskUserid: this.userId,
              status: status,
            }
          })
      },
      getAllWorkOrders() {
        this.$http.all([this.getWorkOrders(1),
            this.getWorkOrders(2), this.getWorkOrders(3)
          ])
          .then(this.$http.spread((...reslist) => {
            // console.log(reslist);
            if (this.isRefresh) {
              this.$refs.content.$el.scrollTop = 0
              Toast('刷新成功')
              this.isRefresh = false
            }
            for (let i = 0; i < reslist.length; i++) {
              this.workOrders[i].list = reslist[i].data.data
            }
            console.log(this.workOrders[0]);
          })).catch(err => {
            Toast('网络异常')
            console.log(err);
          })
      },
      addOrder() {
        this.$router.push({
          name: 'AddWorkOrder'
        })
      },
      refresh() {
        Toast('正在刷新')
        this.isRefresh = true
        this.getAllWorkOrders()
      },
      showChat(item) {
        console.log(item);
        this.$router.push({
          name: 'OrderChat',
          params: {
            wkId: item.wkId,
            status: item.status,
            wkTitle: item.taskTitle
          }
        })
      },
      showToast() {
        Toast('工单待处理')
      }
    },
    watch: {
      selected() {
        this.$refs.content.$el.scrollTop = 0
      }
    },
  }
</script>
<style>
  .person {
    margin-right: 20px;
  }

  .add-order {
    margin-left: 10px;
    font-size: 35px;
  }

  .add-refresh img {
    width: 30px;
    height: 30px;
    padding-top: 5px;
  }

  #content {
    margin-top: 10px;
  }

  #content::-webkit-scrollbar {
    width: 0;
  }

  .order-msg {
    margin: 10px;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15)
  }

  .order-msg h3,
  p {
    margin-bottom: 7px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>