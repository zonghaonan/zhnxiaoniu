module.exports = {
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 8080,
        https: false,
        //以上的ip和端口是我们本机的;下面为需要跨域的
        proxy: {//配置跨域
            //问答APi
            '^/api1': {
                // target: 'http://192.168.0.4:50002',
                target: 'http://10.166.33.141:50002',
                ws: true,
                changOrigin: true,//允许跨域
                pathRewrite: {
                    '^/api1': ''//请求的时候使用这个api就可以
                }
            },
            //文件系统APi
            '^/api3': {
                target: 'http://10.166.33.141:50003',
                ws: true,
                changOrigin: true,//允许跨域
                pathRewrite: {
                    '^/api3': ''//请求的时候使用这个api就可以
                }
            },
            //用户中心APi
            '^/api4': {
                target: 'http://10.166.33.141:50001',//这里后台的地址模拟的;应该填写你们真实的后台接口
                ws: true,
                changOrigin: true,//允许跨域
                pathRewrite: {
                    '^/api4': ''//请求的时候使用这个api就可以
                }
            },
            //支付APi
            '^/api5': {
                target: 'http://10.166.33.141:50004',     //'http://10.166.33.141:50004',
                ws: true,
                changOrigin: true,//允许跨域
                pathRewrite: {
                    '^/api5': ''//请求的时候使用这个api就可以
                }
            },
            //认证中心APi
            '^/api2': {
                target: 'http://10.166.33.141:40400',
                // target: 'http://192.168.0.4:40400',
                ws: true,
                changOrigin: true,//允许跨域
                pathRewrite: {
                    '^/api2': ''//请求的时候使用这个api就可以
                }
            },
        //    搜索中心APi
            '^/api6':{
                target: "http://10.166.33.141:50005",
                changOrigin:true,
                pathRewrite:{
                    '^/api6':""
                }
            },
            //    服务中心APi
            '^/api7':{
                target: "http://10.166.33.141:50006",
                changOrigin:true,
                pathRewrite:{
                    '^/api7':""
                }
            },
        }
    }
}
