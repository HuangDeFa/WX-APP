import Vue from 'vue'
import App from './App'
import VueAxios from 'vue-axios'
import axios from 'axios'
import VueRouter from 'vue-router'
import {mode,routes} from './router'
import VueX from 'vuex'
import store from './store/store'

Vue.use(VueRouter);
Vue.use(VueAxios,axios);
Vue.use(VueX);
let storeObject=null;
const router = new VueRouter({
    mode:mode,
    routes:routes});
router.beforeEach((to,from,next)=>{
    //若允许匿名访问则直接 pass,否则校验 token
    if(to.meta && to.meta.annoymous){
        next();
    }else{
        if(storeObject && storeObject.state.isLogin) next();
        else{
            // redirect to login
            next({name:'login',query:{redirect:to.fullPath}});
        }
    }
});
//const svg = r => require.ensure([],()=>r(require('@/common_component/Svg')),'common_component');
//相当于 import(/* webpackChunkName: "common_component" */'@/common_component/msg')
//Vue.component('svg-icon',svg);

const requireAll = requireContext=>requireContext.keys().map(requireContext);
const req = require.context('./icon/svg',true,/.svg$/);
requireAll(req);    

new Vue({
    router:router,
    store:storeObject = store(),
    render:h=>h(App)
}).$mount("#app");