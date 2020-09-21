<template>
  <div class="profile userDetails">
    <!-- header -->
    <div class="comm-header">
      <div class="title">
        <i class="arr-left" @click="$router.back(-1)">
          <img src="../assets/img/chat/btn-back.png" alt />
        </i>
        我的钱包
      </div>
    </div>
    <!-- info -->
    <div class="profile-info">
      <div class="pay-project">
        <header class="p-tit">您的账户余额：</header>
        <div class="pay-price">￥99.90</div>
        <br>
      <mt-button size="small" type="primary">充值</mt-button> <mt-button type="danger" size="small">提现</mt-button>
      </div>
    </div>
    <!-- pay  -->
    <ul class="user-list">
      <li>
        <div class="title">交易明细</div>
        <div class="arrow">
          {{recordCnt}}条
        </div>
      </li>
       <div  v-for='item in list' :key="item">
        <li>
          <div class="title">收入</div>
          <div class="arrow">
          {{item}}
          </div>
        </li>
       </div>
    </ul>

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

    };
  },
  methods: {},
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
