import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import nav from "../components/nav_row";
import form1 from "../components/aside5/form1"
import form2 from "../components/aside5/form2"
import form3 from "../components/aside5/form3"
import form4 from "../components/aside5/form4"
import testindex from "../components/testindex";

//爷爷の登录
import login from '../components/loding'
import banben from '../components/banben'
//------------------------------君爸爸的路由开始--------------------------------------
//君爸爸的路由开始
//君爸爸写的竖向导航条切换的菜单的路由
import aside1 from "../components/asides/aside1";
import aside2 from "../components/asides/aside2";
import aside3 from "../components/asides/aside3";
import aside4 from "../components/asides/aside4";
import aside5 from "../components/asides/aside5";
import aside6 from "../components/asides/aside6";
//君爸爸写的竖向导航条切换的菜单的路由结束的位置

//君爸爸的借贷管理界面的子路由
import list1 from "../components/aside2/list1";
import list2 from "../components/aside2/list2";
import list3 from "../components/aside2/list3";
import list4 from "../components/aside2/list4";
import list5 from "../components/aside2/list5";
import list6 from "../components/aside2/list6";
import list7 from "../components/aside2/list7";
import list8 from "../components/aside2/list8";
import list9 from "../components/aside2/list9";
import list10 from "../components/aside2/list10";
import list11 from "../components/aside2/list11";
import auditpage from "../components/aside2/auditpage";  //君爸爸的借款审核详情页面
import markon from "../components/aside2/markon";        //君爸爸的上架维护页面
import addBorrow from "../components/aside2/addBorrow";//君爸爸的编辑新增借款页面
//君爸爸的借贷管理界面的子路由结束的地方
//------------------------------------君爸爸的路由结束------------------------------------------------
import recharge from "../components/aside3/recharge";
import cashsh from "../components/aside3/cashsh";
import shxqy from "../components/aside3/shxqy";
import userfund from "../components/aside3/userfund";
import funddaily from "../components/aside3/funddaily";
import ptfund from "../components/aside3/ptfund";
import cashrecords from "../components/aside3/cashrecords";

//用户管理
import Investmentusers from "../components/aside6/Investmentusers"
import Borrower from "../components/aside6/Borrower"
import addMember from "../components/aside6/addMemberqy"
//内容管理界面的路由
import articleM from "../components/aside5/articleM"
import wenzhangM from "../components/aside5/wenzhangM"
import xieyi from "../components/aside5/xieyi"
import yijian from "../components/aside5/yijian"
import add from "../components/aside5/add"

//运营活动路由
import tyj from "../components/active/tyj"
import tyj1 from "../components/active/tyj1"
import hb from "../components/active/hb"
import hbjl from "../components/active/hbjl"
import xrhd from "../components/active/xrhd"
import qdhd from "../components/active/qdhd"
import yqhd from "../components/active/yqhd"
import xxts from "../components/active/xxts"
import ffjl from "../components/active/ffjl"



Vue.use(Router);

export default new Router({
  routes: [
    //君爸爸书写的路由的开始
    {
      path: '/',
      name: 'login',
      redirect: '/login',
      component: login
    },//左侧导航的开始
    {//登录页面
      path: '/login',
      name: 'login',
      component: login
    },
    {//登陆成功
      path: '/banben',
      name: 'banben',
      redirect: '/banben/aside1',
      component: banben,
      beforeEnter:(to,from,next)=>{
        // console.log(this);
        // console.log(to);
        // console.log(from);
        // console.log(next);
        if (sessionStorage.getItem('token')){
          next()
        } else {
          next('login')
        }
        // next()
      },
      children:[
        {
          path: 'aside1',
          name: 'aside1',
          component: aside1,
        },
        {
          path: 'aside2',
          name: 'aside2',
          component: aside2,
          redirect: {path:'/banben/aside2/list1',query:{name:"新增借款"}},
          children:[
            {//第一个子页面
              path: 'list1',
              name: 'list1',
              component: list1,
            },
            {//编辑新增借款页面
              path:'addBorrow',
              name:'addBorrow',
              component:addBorrow
            },
            {//第二个子页面
              path: 'list2',
              name: 'list2',
              component: list2,
            },
            {//第三个子页面
              path: 'list3',
              name: 'list3',
              component: list3,
            },
            {//借款详情页面
              path: 'auditpage',
              name: 'auditpage',
              component:auditpage
            },
            {//第四个子页面
              path: 'list4',
              name: 'list4',
              component: list4,
            },
            {//上架维护页面
              path: 'markon',
              name: 'markon',
              component:markon
            },
            {//第五个子页面
              path: 'list5',
              name: 'list5',
              component: list5,
            },
            {//第六个子页面
              path: 'list6',
              name: 'list6',
              component: list6,
            },{//第七子个页面
              path: 'list7',
              name: 'list7',
              component: list7,
            },
            {//第八个子页面
              path: 'list8',
              name: 'list8',
              component: list8,
            },
            {//第九个子页面
              path: 'list9',
              name: 'list9',
              component: list9,
            },
            {//第十个子页面
              path: 'list10',
              name: 'list10',
              component: list10,
            },
            {//第十一个子页面
              path: 'list11',
              name: 'list11',
              component: list11,
            }
          ]
        },
        {
          path: 'aside3',
          name: 'aside3',
          component: aside3,
          redirect: {path:'/banben/aside3/recharge',query:{name:"充值记录"}},
          children:[
            {
              path: 'recharge',
              name: 'recharge',
              component: recharge,
            },
            {
              path: 'cashsh',
              name: 'cashsh',
              component: cashsh,
            },
            {
              path: 'userfund',
              name: 'userfund',
              component: userfund,
            },
            {
              path: 'funddaily',
              name: 'funddaily',
              component: funddaily,
            },
            {
              path: 'ptfund',
              name: 'ptfund',
              component: ptfund,
            },
            {
              path: 'cashrecords',
              name: 'cashrecords',
              component: cashrecords,
            },
          ]
        },
        {
          path: 'aside4',
          name: 'aside4',
          component: aside4,
          redirect: {path:'/banben/aside4/tyj1',query:{name:"体验金配置"}},
          children:[
            {
              path: 'tyj',
              name: 'tyj',
              component: tyj,
            },
            {
              path: 'tyj1',
              name: 'tyj1',
              component: tyj1,
            },
            {
              path: 'hb',
              name: 'hb',
              component: hb,
            },
            {
              path: 'hbjl',
              name: 'hbjl',
              component: hbjl,
            },
            {
              path: 'xrhd',
              name: 'xrhd',
              component: xrhd,
            },
            {
              path: 'qdhd',
              name: 'qdhd',
              component: qdhd,
            },
            {
              path: 'yqhd',
              name: 'yqhd',
              component: yqhd,
            },
            {
              path: 'xxts',
              name: 'xxts',
              component: xxts,
            },
            {
              path: 'ffjl',
              name: 'ffjl',
              component: ffjl,
            },
          ]
        },
        {
          path: 'aside5',
          name: 'aside5',
          redirect: {path:'/banben/aside5/articleM',query:{name:"轮播管理"}},
          component: aside5,
          children:[
            {
              path: 'articleM',
              name: 'articleM',
              component: articleM,
            },
            {
              path: 'wenzhangM',
              name: 'wenzhangM',
              component: wenzhangM,
            },
            {
              path: 'xieyi',
              name: 'xieyi',
              component: xieyi,
            },
            {
              path: 'yijian',
              name: 'yijian',
              component: yijian,
            },
            {
              path: 'add',
              name: 'add',
              component: add,
            },
            {
              path:'/form1',
              name:'form1',
              component:form1,
            },
            {
              path:'/form2',
              name:'form2',
              component:form2,
            },
            {
              path:'/form3',
              name:'form3',
              component:form3,
            },
            {
              path:'/form4',
              name:'form4',
              component:form4,
            }
          ]
        } ,
        {
          path: 'aside6',
          name: 'aside6',
          redirect: {path:'/banben/aside6/Investmentusers',query:{name:"用户管理"}},
          component: aside6,
          children:[
            {
              path:'addMember',
              name:'addMember',
              component:addMember,
            },
            {
              path:'Investmentusers',
              name:'Investmentusers',
              component: Investmentusers,
            },
            {
              path:'Borrower',
              name:'Borrower',
              component:Borrower,
            }
          ]
        },
      ]
    },
    // {
    //   path: '/aside1',
    //   name: 'aside1',
    //   component: aside1,
    // },
    // {//这是定向到君爸爸侧边栏的路由
    //   path: '/aside2',
    //   name: 'aside2',
    //   redirect: {path:'/aside2/list1',query:{name:"新增借款"}},//如果想要点开横向导航条默认打开侧边导航条就这样写重定向
    //   component: aside2,
    //   children:[
    //     {//第一个子页面
    //       path: 'list1',
    //       name: 'list1',
    //       component: list1,
    //     },
    //     {//编辑新增借款页面
    //       path:'addBorrow',
    //       name:'addBorrow',
    //       component:addBorrow
    //     },
    //     {//第二个子页面
    //       path: 'list2',
    //       name: 'list2',
    //       component: list2,
    //     },
    //     {//第三个子页面
    //       path: 'list3',
    //       name: 'list3',
    //       component: list3,
    //     },
    //     {//借款详情页面
    //       path: 'auditpage',
    //       name: 'auditpage',
    //       component:auditpage
    //     },
    //     {//第四个子页面
    //       path: 'list4',
    //       name: 'list4',
    //       component: list4,
    //     },
    //     {//上架维护页面
    //       path: 'markon',
    //       name: 'markon',
    //       component:markon
    //     },
    //     {//第五个子页面
    //       path: 'list5',
    //       name: 'list5',
    //       component: list5,
    //     },
    //     {//第六个子页面
    //       path: 'list6',
    //       name: 'list6',
    //       component: list6,
    //     },{//第七子个页面
    //       path: 'list7',
    //       name: 'list7',
    //       component: list7,
    //     },
    //     {//第八个子页面
    //       path: 'list8',
    //       name: 'list8',
    //       component: list8,
    //     },
    //     {//第九个子页面
    //       path: 'list9',
    //       name: 'list9',
    //       component: list9,
    //     },
    //     {//第十个子页面
    //       path: 'list10',
    //       name: 'list10',
    //       component: list10,
    //     },
    //     {//第十一个子页面
    //       path: 'list11',
    //       name: 'list11',
    //       component: list11,
    //     }
    //   ]
    // },
    // //君爸爸的路由结束的位置
    // {
    //   path: '/aside3',
    //   name: 'aside3',
    //   redirect: {path:'/aside3/recharge',query:{name:"充值记录"}},//如果想要点开横向导航条默认打开侧边导航条就这样写重定向
    //   component: aside3,
    //   children:[
    //     {
    //       path: 'recharge',
    //       name: 'recharge',
    //       component: recharge,
    //     },
    //     {
    //       path: 'cashsh',
    //       name: 'cashsh',
    //       component: cashsh,
    //     },
    //     {
    //       path: 'userfund',
    //       name: 'userfund',
    //       component: userfund,
    //     },
    //     {
    //       path: 'funddaily',
    //       name: 'funddaily',
    //       component: funddaily,
    //     },
    //     {
    //       path: 'ptfund',
    //       name: 'ptfund',
    //       component: ptfund,
    //     },
    //     {
    //       path: 'cashrecords',
    //       name: 'cashrecords',
    //       component: cashrecords,
    //     },
    //     ]
    // } ,
    // {
    //   path: '/aside4',
    //   name: 'aside4',
    //   component: aside4,
    //   redirect: {path:'/aside4/tyj1',query:{name:"体验金配置"}},
    //   children:[
    //     {
    //       path: 'tyj',
    //       name: 'tyj',
    //       component: tyj,
    //     },
    //     {
    //       path: 'tyj1',
    //       name: 'tyj1',
    //       component: tyj1,
    //     },
    //     {
    //       path: 'hb',
    //       name: 'hb',
    //       component: hb,
    //     },
    //     {
    //       path: 'hbjl',
    //       name: 'hbjl',
    //       component: hbjl,
    //     },
    //     {
    //       path: 'xrhd',
    //       name: 'xrhd',
    //       component: xrhd,
    //     },
    //     {
    //       path: 'qdhd',
    //       name: 'qdhd',
    //       component: qdhd,
    //     },
    //     {
    //       path: 'yqhd',
    //       name: 'yqhd',
    //       component: yqhd,
    //     },
    //     {
    //       path: 'xxts',
    //       name: 'xxts',
    //       component: xxts,
    //     },
    //     {
    //       path: 'ffjl',
    //       name: 'ffjl',
    //       component: ffjl,
    //     },
    //   ]
    // },
    // {
    //   path: '/aside5',
    //   name: 'aside5',
    //   redirect: {path:'/aside5/articleM',query:{name:"轮播管理"}},
    //   component: aside5,
    //   children:[
    //     {
    //       path: 'articleM',
    //       name: 'articleM',
    //       component: articleM,
    //     },
    //     {
    //       path: 'wenzhangM',
    //       name: 'wenzhangM',
    //       component: wenzhangM,
    //     },
    //     {
    //       path: 'xieyi',
    //       name: 'xieyi',
    //       component: xieyi,
    //     },
    //     {
    //       path: 'yijian',
    //       name: 'yijian',
    //       component: yijian,
    //     },
    //     {
    //       path: 'add',
    //       name: 'add',
    //       component: add,
    //     },
    //     {
    //       path:'/form1',
    //       name:'form1',
    //       component:form1,
    //     },
    //     {
    //       path:'/form2',
    //       name:'form2',
    //       component:form2,
    //     },
    //     {
    //       path:'/form3',
    //       name:'form3',
    //       component:form3,
    //     },
    //     {
    //       path:'/form4',
    //       name:'form4',
    //       component:form4,
    //     }
    //   ]
    // } ,
    // {
    //   path: '/aside6',
    //   name: 'aside6',
    //   redirect: {path:'/aside6/Investmentusers',query:{name:"用户管理"}},
    //   component: aside6,
    //   children:[
    //     {
    //       path:'addMember',
    //       name:'addMember',
    //       component:addMember,
    //     },
    //     {
    //       path:'Investmentusers',
    //       name:'Investmentusers',
    //       component: Investmentusers,
    //     },
    //     {
    //     path:'Borrower',
    //       name:'Borrower',
    //       component:Borrower,
    //     }
    //   ]
    // },
    // {
    //   path: '/aside7',
    //   name: 'aside7',
    //   component: aside7,
    // } ,
    // {
    //   path: '/aside8',
    //   name: 'aside8',
    //   component: aside8,
    // },
    // 左侧导航的结束
    {
      path: '/shxqy',
      name: 'shxqy',
      component: shxqy,
    },



  ]
})
