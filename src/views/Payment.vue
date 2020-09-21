<template>
  <div class="profile userDetails">
    <!-- header -->
    <div class="comm-header">
      <div class="title">
        <i class="arr-left" @click="$router.back(-1)">
          <img src="../assets/img/chat/btn-back.png" alt />
        </i>
        支付页面
      </div>
    </div>
    <!-- info -->
    <div class="profile-info">
      <div class="pay-project">
        <header class="p-tit">请问专硕和学硕有什么区别？</header>
        <div class="pay-price">￥99.90</div>
        <div class="pay-to">
          <span>付款给</span>
          <span class="name">某某某某</span>
        </div>
      </div>
    </div>
    <!-- pay  -->
    <ul class="user-list">
      <li>
        <div class="title">支付方式</div>
        <div class="arrow">
          微信支付
          <img src="../assets/img/profile/btn-back.png" alt />
        </div>
      </li>
    </ul>

    <mt-button type="danger" size="large" class="comm-btn">立即支付</mt-button>
  </div>
</template>

<script>
export default {
  name: "Payment",
  components: {},
  data() {
    return {};
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
