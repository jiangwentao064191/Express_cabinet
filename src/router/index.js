import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/page/login'
import expressDelive from '@/components/page/expressDelive'
import scanGet from '@/components/page/user/scanGet'
import openAgainScan from '@/components/page/user/openAgainScan'
import expressSend from '@/components/page/expressSend'
import addBill from '@/components/page/addBill'
import userInfo from '@/components/page/userInfo'
import mywallet from '@/components/page/mywallet'
import mywalletDetail from '@/components/page/mywalletDetail'
import chooseIdentity from '@/components/page/chooseIdentity'
import quickRecord from '@/components/page/quickRecord'
import offerDetail from '@/components/page/offerDetail'
import getCode from '@/components/page/user/getCode'
import recordSearch from '@/components/page/recordSearch'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'chooseIdentity',
      component: chooseIdentity,
      meta: {
        auth: true // 如果此路由需要微信授权请设置为true,默认为false
      }
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/expressDelive',
      name: 'expressDelive',
      component: expressDelive
    },
    {
      path: '/scanGet',
      name: 'scanGet',
      component: scanGet
    },
    {
      path: '/getCode',
      name: 'getCode',
      component: getCode
    },
    {
      path: '/openAgainScan',
      name: 'openAgainScan',
      component: openAgainScan
    },
    {
      path: '/expressSend',
      name: 'expressSend',
      component: expressSend
    },
    {
      path: '/addBill',
      name: 'addBill',
      component: addBill
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: userInfo
    },
    {
      path: '/mywallet',
      name: 'mywallet',
      component: mywallet
    },
    {
      path: '/recordSearch',
      name: 'recordSearch',
      component: recordSearch
    },
    {
      path: '/mywalletDetail',
      name: 'mywalletDetail',
      component: mywalletDetail
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/quickRecord',
      name: 'quickRecord',
      component: quickRecord
    },
    {
      path: '/offerDetail',
      name: 'offerDetail',
      component: offerDetail
    }
  ]
})
