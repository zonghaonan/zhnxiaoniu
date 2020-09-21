<template>
  <div id="tabbar">
    <mt-tabbar v-model="message" fixed>
      <mt-tab-item id="home">
        <img slot="icon" src="../assets/img/tabbar/icon_home.png" class="default" />
        <img slot="icon" src="../assets/img/tabbar/icon_home_active.png" class="active" />
        首页
      </mt-tab-item>
      <mt-tab-item id="qa">
        <img slot="icon" src="../assets/img/tabbar/icon_qa.png" class="default" />
        <img slot="icon" src="../assets/img/tabbar/icon_qa_active.png" class="active" />
        问答
      </mt-tab-item>
      <mt-tab-item id="questions">
        <img slot="icon" src="../assets/img/tabbar/icon_q.png" class="default" />
        <img slot="icon" src="../assets/img/tabbar/icon_q_active.png" class="active" />
        提问
      </mt-tab-item>
      <mt-tab-item id="member">
        <img slot="icon" src="../assets/img/tabbar/icon_member.png" class="default" />
        <img slot="icon" src="../assets/img/tabbar/icon_member_active.png" class="active" />
        会员
      </mt-tab-item>
      <mt-tab-item id="profile">
        <img slot="icon" src="../assets/img/tabbar/icon_profile.png" class="default" />
        <img slot="icon" src="../assets/img/tabbar/icon_profile_active.png" class="active" />
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: "Tabbar",
  components: {},
  props: {
    page: String,
    selected: String,
  },
  data() {
    return {
      message: this.selected,
    };
  },
  created: function () {
    let localData = window.localStorage.getItem("navTabIndex");
    this.message = localData;
  },
  watch: {
    message: function (val) {
      window.localStorage.setItem("navTabIndex", val);
      // 这里就可以通过 val 的值变更来确定去向
      switch (val) {
        case "home":
          this.$router.push("/");
          break;
        case "qa":
          this.$router.push("/qa");
          break;
        case "questions":
          this.$router.push("/questions");
          break;
        case "member":
          this.$router.push("/member");
          break;
        case "profile":
          this.$router.push("/profile");
          break;
      }
    },
  },
};
</script>
<style lang="scss">
.mint-tabbar {
  height: 1.306667rem;
  max-width: 768px;
  margin: 0 auto;
  align-items: center;
  background-color: #fff;
  background-image: none;
  overflow: hidden;
  .mint-tab-item {
    padding: 0.2rem 0;
    &.mint-tab-item.is-selected {
      background-color: transparent;
      color: #316af8;
      .mint-tab-item-icon {
        .active {
          display: block;
        }
        .default {
          display: none;
        }
      }
    }
  }

  .mint-tab-item-label {
    font-size: 0.266667rem;
    padding-top: 0.053333rem;
  }
  .mint-tab-item-icon {
    width: 0.586667rem;
    height: 0.586667rem;
    position: relative;
    position: relative;
    margin: 0 auto 0.053333rem;

    img {
      position: absolute;
      top: 0;
      left: 0;
      max-height: 100%;
      max-width: 100%;
    }
    .active {
      display: none;
    }
  }
}
</style>
