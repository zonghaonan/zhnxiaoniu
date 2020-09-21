<template>
  <div class="stars">
    <div
      v-for="(itemClass,index) in itemClasses"
      :class="itemClass"
      class="star-item"
     
      :key="index"
    ></div>
  </div>
</template>

<script>
export default {
  name: "Stars",
  props: ['thescore'],
  data() {
    return {
      // 星级评分
      score: 3.5,
    };
  },
  methods: {
    // 星星
    // stars: function (index) {
    //   this.score = index + 1;
    // },
  },
  computed: {
    itemClasses() {
      let result = []; // 返回的是一个数组,用来遍历输出星星
      let score = Math.floor(this.thescore * 2) / 2; // 计算所有星星的数量
      let hasDecimal = score % 1 !== 0; // 非整数星星判断
      let integer = Math.floor(score); // 整数星星判断
      for (let i = 0; i < integer; i++) {
        // 整数星星使用on
        result.push("on"); // 一个整数星星就push一个CLS_ON到数组
      }
      if (hasDecimal) {
        // 非整数星星使用half
        result.push("half"); // 类似
      }
      while (result.length < 5) {
        // 余下的用无星星补全,使用off
        result.push("off");
      }
      return result;
    },
  },
};
</script>
<style lang="scss">
.star-item {
  display: inline-block;
  background-repeat: no-repeat;
  width: 0.293333rem;
  height: 0.293333rem;
  margin-left: 0.106667rem;
  background-size: 100%;
}
.star-item.on {
  background-image: url(../assets/img/profile/wujiaoxingxingxing.png);
}
.star-item.half {
  background-image: url(../assets/img/profile/wjx_half.png);
}
.star-item.off {
  background-image: url(../assets/img/profile/wujiaoxingxingxing_kong.png);
}
</style>