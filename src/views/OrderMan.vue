<template>
  <div class="profile userDetails">
    <!-- header -->
    <div class="comm-header">
      <div class="title">
        <i class="arr-left" @click="$router.back(-1)">
          <img src="../assets/img/chat/btn-back.png" alt />
        </i>
        订单管理
      </div>
    </div>
    <!-- info -->
    <div class="profile-info">
      <div class="pay-project">
        <header class="p-tit">您的历史订单总数：</header>
        <div class="pay-price">{{orderNum}}条</div>
          <div class="pay-to">
         
        </div>
      <!--
      <mt-button @click="openPicker" size="small" type="danger">筛选</mt-button>
      <br><br>
      <span>订单检索范围:</span>
            <span class="name">  {{searchrange}}</span>
      -->
      </div>
    </div>
    <!-- pay  -->

    <ul class="user-list">
     
       <div  v-for='item in orderlist.data' :key="item.orderId">
        <li>
         
          <div class="title"> <span style="color:red">¥{{item.price}}</span>--{{item.description|ellipsis}}</div>
          <div class="arrow">
         {{item.createTime.substring(0,16)}}
          </div>
        </li>
       </div>
    </ul>
    <br>
    <br>
    <br>

<!--
    <mt-datetime-picker
      v-model="pickerVisible"
      ref="picker"
      type="date"
      :startDate="startDate"    
      :endDate="endDate"
      year-format="{value} 年"
      month-format="{value} 月"
      @confirm="handleConfirm"  
      >
    </mt-datetime-picker>
-->
      </div>
</template>

<script>

export default {
  name: "Wallet",
  components: {},
  data() {
    return {
      recordCnt:0,
      list:[1,2,3],
      pickerVisible:false,
      startDate:new Date('2020/6/1'),
      endDate:new Date(),
      searchYear:new Date().getFullYear(),
      searchMonth:new Date().getMonth(),
      orderlist:'',
      bAjax:false,

    };
  },

  filters: {
    ellipsis (value) {
      if (!value) return ''
      if (value.length >10) {
        return value.slice(0,10) + '...'
      }
      return value
    }
  },
  computed:{
    searchrange:function(){
      return this.searchYear+"年"+(this.searchMonth+1)+"月";
    },
     orderNum:function(){
        if(this.bAjax)
          return this.orderlist.data.length
        else
          return 0

       ;
    }
  },
  methods: {
    openPicker() {
       this.$refs.picker.$el.getElementsByClassName('picker-slot')[2].style.display = 'none'
      this.$refs.picker.open();

    },
    handleConfirm:function(value){
          
          this.searchYear = value.getFullYear();
          this.searchMonth = value.getMonth();

      },
  },
  created:function(){
     // 推荐
    this.$http.get("/api5/payinfo/orderList").then(resp=>{
        console.log(resp.data)
        this.orderlist = resp.data
        this.bAjax = true;
      }).catch(err=>{
          console.log(err);
      });
  },
};
</script>
<style lang="scss">
.pay-project {
  .p-tit {
    font-size: 0.373333rem;
    font-weight: 500;
    color: rgba(40, 40, 40, 1);
  }
  .pay-price {
    font-size: 0.666667rem;
    font-weight: bold;
    color: rgba(224, 0, 46, 1);
    margin-top: 0.666667rem;
  }
  .pay-to {
    font-size: 0.293333rem;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    margin-top: 0.56rem;

    .name {
      color: #282828;
      padding-left: 0.266667rem;
    }
  }
}

.userDetails {
  .comm-btn {
    height: 1.04rem;
    width: 9.2rem;
    margin: 0 auto;
    margin-top: 1.333333rem;
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
</style>
