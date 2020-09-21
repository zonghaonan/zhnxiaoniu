<template>
    <div id = "logout">
        {{msg}}
    </div>
</template>

<script>
    export default {
        name: 'logout',
        data () {
            return {
                msg:''
            }
        },
        created:function(){
            this.$http.post("/api2/auth/userlogout").then(resp=>{
                console.log(resp.data)
                this.msg=resp.data.message
            }).catch(err=>{
                console.log(err);
            });
            sessionStorage.removeItem("isUserGet");
            sessionStorage.removeItem("userInfo");
        }
    }
</script>
