<template>
  <div>
    <div class="comm-chat-header">
      <div class="title">
        <i class="arr-left" @click="$router.back(-1)">
          <img src="../assets/img/chat/btn-back.png" alt />
        </i>
        推广详情
      </div>
    </div>
    <div v-if="ajax_ok">
      <ul class="user-list">
        <li>
          <div class="title">
            <img src="../assets/img/profile/vip.png" alt />
            推广人昵称
          </div>
          <div class="arrow">
            {{userInfo.nickname}}
          </div>
        </li>
        <li>
          <div class="title">
            <img src="../assets/img/profile/vip.png" alt />
            被推广人昵称
          </div>
          <div class="arrow">
            {{userInfo.nickname}}
          </div>
        </li>
        <li>
          <div class="title">
            <img src="../assets/img/profile/vip.png" alt />
            被推广人id
          </div>
          <div class="arrow">
            {{promotedId}}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        ajax_ok: true,
        userInfo:"",
        promotedId:'',
        promoteDetail:{}
      }
    },
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      this.promotedId=this.$route.params.promotedId
      this.$http
        .get("" + this.promotedId)
        .then(resp => {
          console.log(resp.data);
          this.promoteDetail = resp.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    methods: {
      
    }
  }
</script>
<style scoped>

</style>