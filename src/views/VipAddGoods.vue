<template>
  <div class="profile answerInfo" :style="height">
    <!-- header -->
    <div class="comm-header">
      <div class="title">
        <i class="arr-left" @click="$router.back(-1)">
          <img src="../assets/img/chat/btn-back.png" alt>
        </i>
        VIP服务管理
      </div>
    </div>
    <!-- info -->
    <div class="profile-info"></div>
    <!-- 他的提问 -->
    <div class="user-det-list">
      <mt-navbar v-model="selected">
        <mt-tab-item id="goods-list">服务列表</mt-tab-item>
        <mt-tab-item id="new-goods">添加服务</mt-tab-item>
        <mt-tab-item id="his-report">销售报表</mt-tab-item>
      </mt-navbar>
      <!-- 列表 container-->

      <mt-tab-container v-model="selected" swipeable>
        <mt-tab-container-item id="goods-list">
          <div class="launch-details active">
            <ul class="launch-list">
              <li
                v-for="item in vipservicelist"
                :key="item.serviceId"
                @click="showPopList(item.serviceId)"
              >
                <div class="icon">
                  <img :src="item.img" alt>
                </div>
                <div class="con">
                  <h2>{{item.title}}</h2>
                  <p>{{item.description|ellipsis}}</p>
                </div>
                <div class="price">
                  <span>￥{{item.price}}</span>
                </div>
              </li>
            </ul>
          </div>
        </mt-tab-container-item>

        <mt-tab-container-item id="edit-goods">
          <!-- consult  -->
          <div class="consult-wrap">
            <div class="consult-item">
              <header class="consult-title">
                <span class="title-tip">
                  服务名称
                  <br>
                </span>
              </header>
              <ul class="contact-list">
                <li>
                  <input
                    type="text"
                    v-model="edit_title"
                    placeholder="如xx科目资料，视频指导，校园导游，论文润色，简历修改等等"
                    class="contact-input pd-0"
                  >
                </li>
              </ul>
              <header class="consult-title">
                <span class="title-tip">
                  服务价格
                  <br>
                </span>
              </header>
              <ul class="contact-list">
                <li>
                  <input
                    type="text"
                    v-model="edit_price"
                    placeholder="59"
                    class="contact-input pd-0"
                  >
                </li>
              </ul>
              <header class="consult-title">
                <span class="title-tip">
                  库存数量
                  <br>
                </span>
              </header>
              <ul class="contact-list">
                <li>
                  <input
                    type="text"
                    width="40px"
                    v-model="edit_stock"
                    placeholder="100"
                    class="contact-input pd-0"
                  >
                </li>
              </ul>

              <div class="consult-item">
                <header class="consult-title">
                  <br>
                  <span class="title-tip">
                    详情介绍
                    <br>
                  </span>
                  <span></span>
                </header>

                <ul class="contact-list">
                  <li>
                    <textarea
                      class="contact-area2"
                      v-model="edit_desc"
                      placeholder="如：服务的具体情况，达成交易的方式等"
                    ></textarea>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <footer class="qaBottom">
            <div style="width:100%" align="center">
              <mt-button class="ask-btn" type="default" @click="updateGoods">更新</mt-button>
            </div>
          </footer>
        </mt-tab-container-item>

        <mt-tab-container-item id="new-goods">
          <!-- consult  -->
          <div class="consult-wrap">
            <div class="consult-item">
              <header class="consult-title">
                <span class="title-tip">
                  服务名称
                  <br>
                </span>
              </header>
              <ul class="contact-list">
                <li>
                  <input
                    type="text"
                    v-model="mytitle"
                    placeholder="如xx科目资料，视频指导，校园导游，论文润色，简历修改等等"
                    class="contact-input pd-0"
                  >
                </li>
              </ul>
              <header class="consult-title">
                <span class="title-tip">
                  服务价格
                  <br>
                </span>
              </header>
              <ul class="contact-list">
                <li>
                  <input type="text" v-model="myprice" placeholder="59" class="contact-input pd-0">
                </li>
              </ul>
              <header class="consult-title">
                <span class="title-tip">
                  库存数量
                  <br>
                </span>
              </header>
              <ul class="contact-list">
                <li>
                  <input
                    type="text"
                    width="40px"
                    v-model="mystock"
                    placeholder="100"
                    class="contact-input pd-0"
                  >
                </li>
              </ul>

              <div class="consult-item">
                <header class="consult-title">
                  <br>
                  <span class="title-tip">
                    详情介绍
                    <br>
                  </span>
                  <span></span>
                </header>

                <ul class="contact-list">
                  <li>
                    <textarea
                      class="contact-area2"
                      v-model="mydescription"
                      placeholder="如：服务的具体情况，达成交易的方式等"
                    ></textarea>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <footer class="qaBottom">
            <div style="width:100%" align="center">
              <mt-button class="ask-btn" type="default" @click="addGoods">添加</mt-button>
            </div>
          </footer>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

    <mt-actionsheet :actions="actions" v-model="showPopListVisable"></mt-actionsheet>
  </div>
</template>

<script>
//import ChatBottom from "../components/ChatBottom.vue";
// import Follow from "../components/Follow.vue";
// import Stars from "../components/Stars.vue"; //星级

//import vueQr from 'vue-qr'
import { Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
export default {
  name: "Questions",
  // components: { /*ChatBottom,*/ Follow, Stars, vueQr },
  data() {
    return {
      // 滚动height
      height: {
        height: ""
      },

      mytitle: "",
      firstquestion: "",
      myprice: 99,
      mystock: 100,
      mydescription: "",

      edit_title: "",
      edit_price: "",
      edit_stock: "",
      edit_desc: "",
      edit_serviceId: "",

      selected: "goods-list",
      showPopListVisable: false,
      nClicked: 0,

      vipservicelist: "",
      uid: "",

      actions: [
        {
          name: "详情/编辑",
          method: this.idEdit
        },
        {
          name: "删除",
          method: this.isDelete
        }
      ]
    };
  },
  filters: {
    ellipsis (value) {
      if (!value) return ''
      if (value.length >36) {
        return value.slice(0,36) + '...'
      }
      return value
    }
  },
  methods: {
    showPopList: function(val) {
      this.showPopListVisable = true;
      this.nClicked = val;
    },
    loadList: function() {
      this.uid = JSON.parse(sessionStorage.getItem("userInfo")).userId;
      this.$http
        .get("/api7/goods/serviceList/" + this.uid)
        .then(resp => {
          console.log(resp.data);
          this.vipservicelist = resp.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateGoods: function() {
      var uid = JSON.parse(sessionStorage.getItem("userInfo")).userId;
      var qs_obj = {
        title: this.edit_title,
        price: this.edit_price,
        stock: this.edit_stock,
        description: this.edit_desc,
        img: "/img/xuexiao.png",
        userId: uid,
        serviceId: this.edit_serviceId,
      };
        console.log(qs_obj);
      this.$http
        .put("/api7/goods/updateService", qs_obj)
        .then(resp => {
          console.log(resp.data);
          if (resp.data.success == true) {
            Toast(resp.data.message);
            this.vipservicelist = "";
            this.loadList();
            this.selected = "goods-list";
          } else {
            Toast(resp.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    addGoods: function() {
      // 获得userId
      var uid = JSON.parse(sessionStorage.getItem("userInfo")).userId;
      var qs_obj = {
        title: this.mytitle,
        price: this.myprice,
        stock: this.mystock,
        description: this.mydescription,
        img: "/img/xuexiao.png",
        userId: uid
      };
      this.$http
        .post("/api7/goods/addService", qs_obj)
        .then(resp => {
          console.log(resp.data);
          if (resp.data.success == true) {
            Toast(resp.data.message);

            this.vipservicelist = "";
            this.loadList();

            this.selected = "goods-list";
          } else {
            Toast(resp.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    idEdit: function() {
      // alert("edit" + this.nClicked);

      this.vipservicelist.filter(p => {
        if (p.serviceId === this.nClicked) {
          console.log(p);
          this.edit_title = p.title;
          this.edit_price = p.price;
          this.edit_desc = p.description;
          this.edit_stock = p.stock;
          this.edit_serviceId = p.serviceId;
          this.edit_img = p.img;

          this.selected = "edit-goods";
        }
      });
    },
    isDelete: function() {
      MessageBox.confirm(
        "删除后该服务的成交量和评价也会删除，您确定删除吗?"
      ).then(
        action => {
          // 确认的回调
          console.log(action);
          // 删掉他

          this.$http
            .delete("/api7/goods/serviceDel/" + this.nClicked)
            .then(resp => {
              console.log(resp.data);

              if (resp.data.success) {
                Toast("已删除");
                this.vipservicelist = "";
                this.loadList();
              } else {
                Toast("删除失败");
              }
            })
            .catch(err => {
              console.log(err);
            });
        },
        action => {
          // 取消的回调
          console.log(action);
          //console.log("没闪");
        }
      );
    }
  },
  created: function() {
    // 获取他的vip服务列表
    this.loadList();
  }
};
</script>
<style lang="scss">
.pd-0 {
  padding: 0 !important;
}
.contact-area2 {
  border: none;
  outline: none;
  resize: none;
  height: 3.466667rem;
  width: 100%;
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