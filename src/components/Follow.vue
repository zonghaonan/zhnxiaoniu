<template>
  <div class="edit-btn" @click="favor">
    <img :src="likedImg" alt />
    <span>{{likedCon}}</span>
  </div>
</template>

<script>
export default {
  name: "Follow",
  components: {},
  data() {
    return {
      liked: false,
      likedCon: "关注",
      likedImg: require("../assets/img/search/heart.png"),
      toastObj: null,
    };
  },
  methods: {
    // 关注  取消关注
    favor() {
      this.liked = !this.liked;
      if (this.liked) {
        this.likedCon = "已关注";
        this.likedImg = require("../assets/img/search/heart_on.png");
      } else {
        this.$messagebox({
          title: "温馨提示",
          message: "确认取消关注？",
          showCancelButton: true,
        }).then((action) => {
          if (action == "confirm") {
            this.likedCon = "关注";
            this.likedImg = require("../assets/img/search/heart.png");
          } else {
            console.log("未关注");
          }
        });
      }
    },
  },
};
</script>
<style lang="scss">
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

  &.active {
    background-color: rgba(0, 0, 0, 0.1);
  }

  img {
    width: 0.373333rem;
    margin-right: 0.133333rem;
  }
  span {
    font-weight: 500;
  }
}
</style>