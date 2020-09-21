<template>
  <div id="app">
    <Tabbar v-if="$route.path!=='/login' && $route.path!=='/register'" :selected="selected"></Tabbar>
    <div class="page-main">
      <!-- <keep-alive :exclude="/Chat/"> -->
        <router-view></router-view>
      <!-- </keep-alive> -->
    </div>
  </div>
</template>
<script>
import Tabbar from "./components/Tabbar.vue";

export default {
  components: {
    Tabbar,
  },
  data() {
    return {
      selected: "home",
    };
  },
};

</script>
<style lang="scss">
@import "./assets/css/base.css";

body,
html {
  height: 100%;
  background-color: #fdf5f6;
}

#app {
  height: 100%;
  max-width: 768px;
  margin: 0 auto;
  padding-bottom: 1.306667rem;
}

.page-main {
  height: 100%;
  overflow: auto;
}
</style>
