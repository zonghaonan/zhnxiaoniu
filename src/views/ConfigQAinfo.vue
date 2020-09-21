<template>
    <div>
        <!-- header -->
        <div class="comm-chat-header">
                <div class="title">
                <i class="arr-left" @click="$router.back(-1)">
                    <img src="../assets/img/chat/btn-back.png" alt />
                </i>
                返回
                </div>
        </div>
       
    
       <br>
       
        <mt-field label="问答价格" @change="ChangePrice"  placeholder="请输入价格" type="number" v-model="price"></mt-field>
        
        <mt-field label="问答库存" @change="ChangeNormalStock" placeholder="请输入库存" type="number" v-model="normalstock"></mt-field>
        <br>
        <mt-field label="免费问答库存" ><mt-switch @change="turn" v-model="radioValue"></mt-switch></mt-field>
        <mt-field label="免费问答库存" @change="ChangeFreeStock" placeholder="请输入数字" type="number" v-model="freestock"></mt-field>
       
       
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    name: 'ConfigQAinfo',
    data () {
        return {
          radioValue:false,
          normalstock:0,
          freestock:0,
          price:0,
          userInfo:'',
        }  
    },
    created:function(){

        var uid = JSON.parse(sessionStorage.getItem("userInfo")).userId;
        this.$http.get("/api4/ucenter/getSelfUserInfoDetail",{params:{userId:uid}}).then(resp=>{
            console.log(resp.data)
            this.userInfo=resp.data.data
            this.radioValue = this.userInfo.enableFree;
            this.price = this.userInfo.price;
            this.freestock = this.userInfo.freeStock;
            this.normalstock = this.userInfo.stock;
            this.ajax_ok=true;
        }).catch(err=>{
            console.log(err);
        });

    },
    methods:{
        turn: function(){
            console.log(this.radioValue)
            this.UpdateData();
        },
        ChangePrice:function(){
             console.log("price changed.");
             this.UpdateData();
        },
        ChangeFreeStock:function(){
             console.log("changed.");
             this.UpdateData();
        },
        ChangeNormalStock:function(){
             console.log("narmal changed.");
             this.UpdateData();
        },
        UpdateData:function(){
            var uid = JSON.parse(sessionStorage.getItem("userInfo")).userId;
            var qs_obj = {
                enableFree: this.radioValue,
                freeStock: this.freestock,
                price: this.price,
                stock: this.normalstock,
                userId: uid,
            };
            console.log(qs_obj);
            this.$http
                .post("/api1/qa/setPrice", qs_obj)
                .then(resp => {
                console.log(resp.data);
                if (resp.data.success == true) {
                    Toast(resp.data.message);
                  
                } else {
                    Toast(resp.data.message);
                }
                })
                .catch(err => {
                console.log(err);
                });
        }
    
    }
}
</script>


<style lang="scss">

.user-list {
  width: 9.2rem;
  margin: 0 auto;
  margin-top: 0.4rem;
  border-radius: 0.213333rem;
  li {
    height: 1.173333rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding: 0 0.266667rem;
    color: #282828;
    &:active {
      background-color: rgba(0, 0, 0, 0.1);
    }
    .title {
      img {
        width: 0.426667rem;
        margin-right: 0.133333rem;
      }
    }
    .arrow {
      color: #999999;
      img {
        width: 0.16rem;
        margin-left: 0.266667rem;
      }
    }
  }
}
</style>

