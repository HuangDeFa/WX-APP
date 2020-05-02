
<template>
    <div class="index">
        <div class="header">
            <span class="message-num">微信({{messageCount}})</span>
            <div class="icon-wrapper search-wrapper">
                <svgIcon name="search" :iconStyle="headerIconStyle"></svgIcon>
            </div>
            <div v-popver:popver_add class="icon-wrapper add-wrapper">
                <svgIcon name="add" :iconStyle="headerIconStyle"></svgIcon>
            </div>
        </div>
        <div class="content">
            <keep-alive v-if="$route.meta.keepAlive">
                <router-view></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
        <div class="footer">
            <tabControl
            :tabs="tabs"
            :defaultSelected="0"
            @tabChange="tabChange"
            >
            </tabControl>
       </div>
       <section popver section> 
           <popveControl host="popver_add">
               <div class="popver-item">
                   <svgIcon name="message" :iconStyle="headerIconStyle"></svgIcon>
                    <span>发起群聊</span>
               </div>
               <div class="popver-item">
                   <svgIcon name="add-friend" :iconStyle="headerIconStyle"></svgIcon>
                     <span>添加朋友</span>
               </div>
               <div class="popver-item">
                   <svgIcon name="scan-scan" :iconStyle="headerIconStyle"></svgIcon>
                    <span>扫一扫</span>
               </div>
               <div class="popver-item">
                   <svgIcon name="pay-receive" :iconStyle="headerIconStyle"></svgIcon>
                    <span>收付款</span>
               </div>
               <div class="popver-item">
                   <svgIcon name="feedback" :iconStyle="headerIconStyle"></svgIcon>
                    <span>帮助与反馈</span>
               </div>  
           </popveControl>
       </section>
    </div>
</template>
<script>
// const message = ()=>import(/*webpackChunkName:"indexChildren"*/'@/pages/index/children/message');
// const contact = ()=>import(/*webpackChunkName:"indexChildren"*/'@/pages/index/children/contact');
// const discover = ()=>import(/*webpackChunkName:"indexChildren"*/'@/pages/discover/index');
// const mine = ()=>import(/*webpackChunkName:"indexChildren"*/'@/pages/index/children/mine');
import tabControl from '../../components/TabControl'
import svgIcon from '../../components/Svg'
import popver from '../../directives/popever-directive'
import popveControl from '../../components/Popver'
export default {
    name:"index-page",
    components:{
        tabControl,
        svgIcon,
        popveControl
    },
    directives:{
        popver
    },
    provide:{
       index:this
    },
    data() {
        return {
            tabs:[
                { name:'微信',icon:'message' },
                { name:'通讯录',icon:'contact' },
                { name:'发现',icon:'discover' },
                { name:'我',icon:'me' },
            ],
            messageCount:20,
        }
    },
    computed:{
         headerIconStyle(){
             return{
                 width:'3vh',
                 height: '3vh',
                 fill:'white'
             }
         }
    },
    methods: {
        tabChange(name,index){
            switch(index){
                case 0:
                    this.$router.push({name:'message'});
                    //this.currentComponent = message;
                break;
                case 1:
                    this.$router.push({name:'contact'});
                    //this.currentComponent = contact;
                break;
                case 2:
                      this.$router.push({name:'discover'});
                    //this.currentComponent = discover;
                break;
                case 3:
                      this.$router.push({name:'mine'});
                    //this.currentComponent = mine;
                break;
            }
        }
    },
}
</script>
<style lang="scss" scoped>
    .index{
       position: absolute;
       top: 0;
       left: 0;
       bottom: 0;
       right: 0;
       padding: 0;
    }
    .header{
        height: $header;
        width: 100%;
        background-color: $primary_dark_color;
        display:flex;
        align-items:center;
        color:white;
        justify-content: flex-end;
        position: relative;
    }
    .message-num{
    margin-left: 3vw;
    font-size: large;
    position: absolute;
    left: 0;
    }

    .icon-wrapper{
    height: 100%;
    display: flex;
    align-items: center;
    width: 7vh;
    justify-content: center;
    }
    .icon-wrapper:active {
    background: #3f3b3b;
   }
    .content{
        height: $content;
        width: 100%;
    }
    .footer{
        height: $footer;
    }
    .popver-item{
    height: 5vh;
    align-items: center;
    display: flex;
    padding: 0 3vw;
    span{
        margin-left: 3vw;
    }
    }
     .popver-item+.popver-item{
         border-top: 1px solid #1e1d1d3b;
     }
    .popver-item:active{
        background-color:#4d4a4a;
    } 
</style>
