import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Password from '@/components/password'
import authentication from '@/components/authentication'
import result from '@/components/result'
import register from '@/components/register'
import index from '@/components/index'
import tabbarBox from '@/components/tabbarBox'
// import text from '@/components/text'
import notice from '@/components/index/notice'
import noticeDetails from '@/components/index/noticeDetails'
import earnings from '@/components/index/earnings'
import earningsList from '@/components/index/earningsList'
import wallet from '@/components/index/wallet'
import usdt from '@/components/index/usdt'
import charge from '@/components/index/charge'
import extract from '@/components/index/extract'
import transfer from '@/components/index/transfer'
import ofc from '@/components/index/ofc'
import exchange from '@/components/index/exchange'
import ofcTransfer from '@/components/index/ofcTransfer'
import fund from '@/components/index/fund'
import fundTransfer from '@/components/index/fundTransfer'
import ofcRecord from '@/components/index/ofcRecord'
import transferRecord from '@/components/index/transferRecord'
import conversion from '@/components/index/conversion'
import topUp from '@/components/index/topUp'
import address from '@/components/index/address'
import mall from '@/components/mall'
import extractRecord from '@/components/index/extractRecord'
import mydingdan from '@/components/transaction/myDingdan'
import maiRuDing from '@/components/transaction/maiRuDing'
import myGuadan from '@/components/transaction/myGuadan'


// import charge from '@/components/index/'
import settingRoutes from './setting-pay-method.js'
Vue.use(Router)

export default new Router({
  routes: [
    ...settingRoutes,

    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/password',
      name: 'Password',
      component: Password
    },
    {
      path: '/maiRuDing',
      name: 'maiRuDing',
      component: maiRuDing
    },
    {
      path: '/myGuadan',
      name: 'myGuadan',
      component: myGuadan
    },
    {
      path: '/authentication',
      name: 'authentication',
      component: authentication
    },
    {
      path: '/mydingdan',
      name: 'mydingdan',
      component: mydingdan
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/result',
      name: 'result',
      component: result
    },
    {
      path: '/notice',
      name: 'notice',
      component: notice
    },
    {
      path: '/noticeDetails',
      name: 'noticeDetails',
      component: noticeDetails
    },
    {
      path: '/earnings',
      name: 'earnings',
      component: earnings
    },
    {
      path: '/earningsList',
      name: 'earningsList',
      component: earningsList
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: wallet
    },
    {
      path: '/usdt',
      name: 'usdt',
      component: usdt
    },
    {
      path: '/charge',
      name: 'charge',
      component: charge
    },
    {
      path: '/extract',
      name: 'extract',
      component: extract
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: transfer
    },
    {
      path: '/ofc',
      name: 'ofc',
      component: ofc
    },
    {
      path: '/exchange',
      name: 'exchange',
      component: exchange
    },
    {
      path: '/ofcTransfer',
      name: 'ofcTransfer',
      component: ofcTransfer
    },
    {
      path: '/fund',
      name: 'fund',
      component: fund
    },
    {
      path: '/fundTransfer',
      name: 'fundTransfer',
      component: fundTransfer
    },
    {
      path: '/ofcRecord',
      name: 'ofcRecord',
      component: ofcRecord
    },
    {
      path: '/transferRecord',
      name: 'transferRecord',
      component: transferRecord
    },
    {
      path: '/conversion',
      name: 'conversion',
      component: conversion
    },
    {
      path: '/topUp',
      name: 'topUp',
      component: topUp
    },
    {
      path: '/address',
      name: 'address',
      component: address
    },
    {
      path: '/extractRecord',
      name: 'extractRecord',
      component: extractRecord
    },
    {
      path: '/',
      redirect: '/Login'
    },
    {
      path: '/index',
      name: 'tabbarBox',
      component: tabbarBox,
      children: [
        {
          path: '/',
          name: 'index',
          component: index
        },
        {
          path: '/mall',
          name: 'mall',
          component: mall
        },
        {
          path: '/transaction',
          name: 'transaction',
          component: resolve => require(['@/components/transaction/tran_center'], resolve),
          meta: {
            title: '交易中心'
          }
        },
        {
          path: '/myIndex',
          name: 'myIndex',
          component: resolve => require(['@/components/personalCenter/myIndex'], resolve),
          meta: {
            title: '我的'
          }
        }
      ]
    },
    {
      path: '/transmarket',
      name: 'transmarket',
      component: resolve => require(['@/components/transaction/tran_market'], resolve),
      meta: {
        title: '交易市场',
      }
    },

    {
      path: '/marketxq',
      name: 'marketxq',
      component: resolve => require(['@/components/transaction/marketxq'], resolve),
      meta: {
        title: '交易详情'
      }
    },
    {
      path: '/payment',
      name: 'payment',
      component: resolve => require(['@/components/transaction/payment'], resolve),
      meta: {
        title: '付款'
      }
    },
    {
      path: '/tousu',
      name: 'tousu',
      component: resolve => require(['@/components/transaction/tousu'], resolve),
      meta: {
        title: '投诉'
      }
    },
    {
      path: '/hangon',
      name: 'hangon',
      component: resolve => require(['@/components/transaction/hangon'], resolve),
      meta: {
        title: '挂买'
      }
    },
    
    {
      path: '/my_Mill',
      name: 'my_Mill',
      component: resolve => require(['@/components/personalCenter/my_Mill'], resolve),
      meta: {
        title: '我的矿机'
      }
    },
    {
      path: '/my_recommend',
      name: 'my_recommend',
      component: resolve => require(['@/components/personalCenter/my_recommend'], resolve),
      meta: {
        title: '我的推荐'
      }
    },
    {
      path: '/my_team',
      name: 'my_team',
      component: resolve => require(['@/components/personalCenter/my_team'], resolve),
      meta: {
        title: '我的团队'
      }
    },
    {
      path: '/my_Address',
      name: 'my_Address',
      component: resolve => require(['@/components/personalCenter/my_Address'], resolve),
      meta: {
        title: '我的地址'
      }
    },
    {
      path: '/newAddress',
      name: 'newAddress',
      component: resolve => require(['@/components/personalCenter/newAddress'], resolve),
      meta: {
        title: '添加地址'
      }
    },
    {
      path: '/mytrans',
      name: 'mytrans',
      component: resolve => require(['@/components/transaction/mytrans'], resolve),
      meta: {
        title: '我的交易'
      }
    },
    {
      path: '/inviteFriends',
      name: 'inviteFriends',
      component: resolve => require(['@/components/personalCenter/inviteFriends'], resolve),
      meta: {
        title: '邀请好友'
      }
    },
    {
      path: '/contactUs',
      name: 'contactUs',
      component: resolve => require(['@/components/personalCenter/contactUs'], resolve),
      meta: {
        title: '联系我们'
      }
    },
    {
      path: '/turntable',
      name: 'turntable',
      component: resolve => require(['@/components/personalCenter/turntable'], resolve),
      meta: {
        title: '抽奖转盘'
      }
    },
    {
      path: '/safeCenter',
      name: 'safeCenter',
      component: resolve => require(['@/components/personalCenter/safeCenter'], resolve),
      meta: {
        title: '账户与安全'
      }
    },
    {
      path: '/fix_login',
      name: 'fix_login',
      component: resolve => require(['@/components/personalCenter/fix_login'], resolve),
      meta: {
        title: '修改登录密码'
      }
    },
    {
      path: '/fix_deal',
      name: 'fix_deal',
      component: resolve => require(['@/components/personalCenter/fix_deal'], resolve),
      meta: {
        title: '修改支付密码'
      }
    }
  ]
})
