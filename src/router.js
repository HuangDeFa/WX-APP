//import VueRouter from 'vue-router';
//new VueRouter()
//
//const index = ()=> import(/*webpackChunkName:"index"*/'@/pages/index/index');

const login = ()=> import(/*webpackChunkName:"login"*/'@/pages/login/login');
const setting =()=>import(/*webpackChunkName:"setting"*/'@/pages/setting/setting');
const wallet =()=>import(/*webpackChunkName:"wallet"*/'@/pages/wallet/wallet');
const conversation=()=>import(/*webpackChunkName:"conversation"*/'@/pages/conversation/conversation');
const conversation_setting=()=>import(/*webpackChunkName:"conversation-setting"*/'@/pages/conversation/children/conversationSetting');

const message = ()=>import(/*webpackChunkName:"message"*/'@/pages/message/message');
const contact = ()=>import(/*webpackChunkName:"contact"*/'@/pages/contact/contact');
const discover = ()=>import(/*webpackChunkName:"discover"*/'@/pages/discover/discover');
const mine = ()=>import(/*webpackChunkName:"mine"*/'@/pages/mine/mine');

// discover children pages
const friendcircle = ()=>import(/*webpackChunkName:"discoverChildren"*/'@/pages/discover/children/friendcircle');

const user =()=>import(/*webpackChunkName:"userPage"*/'@/pages/user/user');
//const login =()=>import(/*webpackChunkName:"loginPage"*/'@/pages/login/login');
const register=()=>import(/*webpackChunkName:"registerPage"*/'@/pages/register/register');
const loginDetail =()=>import(/*webpackChunkName:"loginDetail"*/'@/pages/login/children/loginDetail/loginDetail');
const loginByPhoneNumber =()=>import(/*webpackChunkName:"loginDetail"*/'@/pages/login/children/loginDetail/children/loginPhoneNumber');

//security
const getbackPassword = ()=>import(/*webpackChunkName:"getbackpassword"*/'@/pages/security/getbackpassword');
const securityCenter =()=>import(/*webpackChunkName:"securitycenter"*/'@/pages/security/securitycenter');

const mode="hash";
const routes=[
      {
        path:'/',
        redirect:'/message'
      },
      {
        path:'/message',
        name:'message',
        meta:{keepAlive:true},
        component:message,
        children:[]
      },
      {
        path:'/contact',
        name:'contact',
        meta:{keepAlive:true},
        component:contact,
        children:[]
      },
      {
        path:'/discover',
        name:'discover',
        meta:{keepAlive:true},
        component:discover,
        children:[
          {
            path:'friendcircle',
            name:'friendcircle',
            component:friendcircle
          }
        ]
      },
      {
        path:'/mine',
        name:'mine',
        meta:{keepAlive:true},
        component:mine,
        children:[]
      },
      {
        path:'/login',
        name:'login',
        component:login,
        meta:{annoymous:true},
        children:[
          {
            path:'register',
            name:'register',
            component:register,
            meta:{annoymous:true},
          },
          {
            path:'detail',
            name:'logindetail',
            component:loginDetail,
            meta:{annoymous:true},
            children:[
              {
                path:'loginPhoneNumber',
                name:'loginPhoneNumber',
                component:loginByPhoneNumber,
                meta:{annoymous:true},
                children:[
                  {
                    path:'getbackPassword',
                    name:'getbackPassword3',
                    component:getbackPassword,
                    meta:{annoymous:true},
                  },
                  {
                    path:'securityCenter',
                    name:'securityCenter3',
                    component:securityCenter,
                    meta:{annoymous:true},
                  }
                ]
              },
              {
                path:'register',
                name:'register2',
                component:register,
                meta:{annoymous:true},
              },
              {
                path:'getbackPassword',
                name:'getbackPassword2',
                component:getbackPassword,
                meta:{annoymous:true},
              },
              {
                path:'securityCenter',
                name:'securityCenter2',
                component:securityCenter,
                meta:{annoymous:true},
              }
            ]
          },
          {
            path:'getbackPassword',
            name:'getbackPassword',
            component:getbackPassword,
            meta:{annoymous:true},
          },
          {
            path:'securityCenter',
            name:'securityCenter',
            component:securityCenter,
            meta:{annoymous:true},
          }
        ]
      },
      {
        path:'/user',
        name:'user',
        meta:{keepAlive:true},
        component:user,
        children:[

        ]
      },
      {
        path:'/setting',
        name:'setting',
        component:setting
      },
      {
        path:'/wallet',
        name:'wallet',
        component:wallet
      },
      {
        path:'/conversation',
        name:'conversation',
        component:conversation,
        children:[
          {
            path:'setting',
            name:'conversation_set',
            component:conversation_setting
          }
        ]
      },
];
export {
       mode,
       routes
}