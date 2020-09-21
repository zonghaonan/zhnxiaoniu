<template>
    <div id = "login">
        <h3> 用户登录</h3>

        <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>

        <mt-button type="primary" @click="submit">登录</mt-button>
    </div>

</template>

<script>
    import { Toast } from 'mint-ui';
    let Base64 = require('js-base64').Base64;
    export default {
        name: 'login',
        data () {
            return {
                username:'zhangsan',
                password:'123456'
            }
        },
        methods:{
            submit: function() {
                // parameters
                var params = new URLSearchParams();
                params.append('username', this.username);
                params.append('password', this.password);
                console.log("connecting");
                //axios
                this.$http.post("/api2/auth/formLogin", params).then(resp=>{
                    console.log(resp.data)
                    if(resp.data.success == true)
                    {
                        //alert("success");
                        // 获取用户真实id
                        this.$http.get("/api2/auth/userjwt").then(resp=>{
                            console.log(resp.data)
                            // 解析jwt数据，用到base64编码
                            var str = resp.data.jwt.match(/\.(\S*)\./)[1];
                            var res =Base64.decode(str);
                            console.log("****");
                            console.log(JSON.parse(res));
                            var aa = JSON.parse(res);
                            sessionStorage.setItem('userInfo',JSON.stringify(aa));
                            sessionStorage.setItem('isUserGet', true);
                            Toast('登录成功！跳转中')
                            // 跳转
                            this.$router.push({name: 'Home'})
                        }).catch(err=>{
                            console.log(err);
                        });
                    }
                    else
                    {
                        Toast(resp.data.message)
                    }
                }).catch(err=>{
                    console.log(err);
                    Toast('请检查您的网络')
                });
            },
        }
    }
</script>
