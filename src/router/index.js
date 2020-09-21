import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "@/views/Home/Home.vue"; //首页
import Qa from "@/views/Qa/Qa.vue"; //问答
import Questions from "@/views/Questions.vue"; //提问
import Member from "@/views/Member/Member.vue"; //会员
import Profile from "@/views/Profile/Profile.vue"; // 我的
import Search from '../views/Search/Search.vue' //搜索页面
import Chat from '../views/Chat.vue' //具体交流
import VipServiceDetail from '../views/VipServiceDetail.vue' //回答人信息
import Consult from '../views/Consult.vue' //我要咨询
import VipChat from '../views/VipChat.vue' // vip交流
import UserDetails from '../views/UserDetails.vue' // 用户详情页
import Payment from '../views/Payment.vue' // 支付页面
import QaDisplay from '../views/QaDisplay.vue' // 问答展示
import Askgivenone from '../views/Askgivenone.vue' // 问答展示
import Login from "../views/Login" //登录页面
import Logout from "../views/Logout" //退出页面
import Editinfo from "../views/Editinfo" // 资料编辑
import VipAddGoods from "../views/VipAddGoods"
import Register from "@/views/Register"; // 添加VIP服务商品
import ConfigQAinfo from "../views/ConfigQAinfo"; // 配置QA
import Wallet from "../views/Wallet"; // 钱包管理
import OrderMan from "../views/OrderMan"; // 钱包管理
import Recommend from "../views/Recommend"; // 加入推广
import RecommendDetail from "../views/RecommendDetail"; // 推广详情
import WorkOrder from "../views/WorkOrder"; // 我的工单
import OrderChat from '../views/OrderChat' // 工单交流
import AddWorkOrder from '@/views/AddWorkOrder' //添加工单


Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  // 首页
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  // 问答
  {
    path: '/qa',
    name: 'Qa',
    component: Qa
  },
  // 提问页面
  {
    path: '/questions',
    name: 'Questions',
    component: Questions
  },
  // 向指定人员提问
  {
    path: '/askgivenone/:toid',
    name: 'Askgivenone',
    component: Askgivenone
  },
  // 会员
  {
    path: '/member',
    name: 'Member',
    component: Member
  },
  // 我的
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  // 资料编辑
  {
    path: '/editinfo/:userid',
    name: 'Editinfo',
    component: Editinfo
  },

  // 配置问答服务信息
  {
    path: '/configQAinfo',
    name: 'ConfigQAinfo',
    component: ConfigQAinfo
  },
  // 钱包
  {
    path: '/wallet',
    name: 'Wallet',
    component: Wallet
  },
  //推广
  {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend
  },
  //推广详情
  {
    path: '/recommendDetail',
    name: 'RecommendDetail',
    component: RecommendDetail
  },
  //工单
  {
    path: '/workorder',
    name: 'WorkOrder',
    component: WorkOrder
  },
  //添加工单
  {
    path: '/addWorkOrder',
    name: 'AddWorkOrder',
    component: AddWorkOrder
  },
  //工单交流
  {
    path: '/orderChat/:wkId/:status/:wkTitle',
    name: 'OrderChat',
    component: OrderChat
  },
  // 订单管理
  {
    path: '/orderman',
    name: 'OrderMan',
    component: OrderMan
  },


  // 搜索页面
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  // 具体交流
  {
    path: '/chat/:id',
    name: 'Chat',
    component: Chat
  },
  // 回答人信息
  {
    path: '/vipservicedetail/:serviceid/:answerid',
    name: 'VipServiceDetail',
    component: VipServiceDetail
  },
  // 我要咨询
  {
    path: '/consult',
    name: 'Consult',
    component: Consult
  },
  // vip交流页面
  {
    path: '/vipChat/:id',
    name: 'VipChat',
    component: VipChat
  },
  // 用户详情
  {
    path: '/userDetails/:id',
    name: 'UserDetails',
    component: UserDetails
  },
  // 支付页面
  {
    path: '/payment',
    name: 'Payment',
    component: Payment
  },
  // 问答展示
  {
    path: '/qaDisplay/:id',
    name: 'QaDisplay',
    component: QaDisplay
  },
  //    登录页面
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/vipaddgoods',
    name: 'VipAddGoods',
    component: VipAddGoods
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },


]

const router = new VueRouter({
  routes
})

export default router



//路由守卫, 解决登录问题跳转
router.beforeEach((to, from, next) => {
  //路由中设置的needLogin字段就在to当中
  if (window.sessionStorage.isUserGet) {
    console.log(window.sessionStorage);
    // console.log(to.path) //每次跳转的路径
    if (to.path === '/login') {
      //登录状态下 访问login.vue页面 会跳到index.vue
      next({
        path: '/home'
      });
    } else {
      next();
    }
  } else {
    // 如果没有session ,访问任何页面。都会进入到 登录页
    if (to.path === '/login') { // 如果是登录页面的话，直接next() -->解决注销后的循环执行bug
      next();
    } else if (to.path === "/register") { // 否则 跳转到登录页面
      next();
    } else {
      next({
        path: '/login'
      });
    }
  }
})