<template>
  <!-- 搜索 -->
  <div class="page-search-btn">
<!--    @click.native="toSeachPage"-->
    <mt-search  v-model="value" placeholder="搜索问题和答案"   @keyup.enter.native = "toSearchPage" ></mt-search>
  </div>
</template>

<script>
export default {
  name: "SearchBtn",
  data() {
    return {
      // search
      value: "",
    };
  },
  props:['searchString'],
  methods: {
    // 跳转到搜索页面
    toSearchPage() {
      // console.log(this.value);
      this.$emit("searchAgain",this.value)
      this.$router.push({name:'Search',params:{value: this.value}});
    },
  },
  mounted() {
    if(this.searchString){
      this.value = this.searchString;  
    }
  }
};
</script>
<style lang="scss">
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

.page-search-btn {

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
        height: auto; width: 100%;
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
</style>
