<template>
<transition name="page-slide" :appear=" true ">
    <div class="setting">
        <headerView backText="设置" style="position:fixed;z-index:1"></headerView>
        <div class="setting-content">
        <template v-for="(group,index) in menuGroup">
           <template v-for="(item, index2) in group" >
               <div :key=" index+''+index2" class="item"  :class="{'item-secondary':index2>0}" >
                   <span class="item-desc">{{item.name}}</span>
               </div>
           </template>
        </template>
      </div>
    </div>
</transition>
</template>
<script>
import headerView from '../../components/header';

export default {
    name:'setting-page',
    components:{
        headerView
    },
    data() {
        return {
            menuGroup:[
                [
                    {name:'账号与安全'}
                ],
                [
                    {name:'新消息提醒'},
                    {name:'勿扰模式'},
                    {name:'聊天'},
                    {name:'隐私'},
                    {name:'通用'}
                ],
                [
                   {name:'关于W信'},
                   {name:'帮助与反馈'}
                ],
                [
                    {name:'插件'}
                ],
                [
                   {name:'切换帐号'},
                   {name:'退出'}
                ]

            ]
        }
    },
    computed: {
        
    },
    methods: {
        
    },
}
</script>
<style lang="scss" scoped>
    .setting{
       position: absolute;
       top: 0;
       left: 0;
       bottom: 0;
       right: 0;
       padding: 0;
    }
   .setting-content{
        @include page_container();
        padding-top: 7vh;
    }
    .item{
     @include default_item();
    }
    .item:active{
        background-color:$primary_background_color;
    }
    .item-secondary{
        margin: 0;
        padding-top: 1px;
    }
    .item-secondary::before{
     @include default_item_divider();
    }
    .item-desc{
        margin-left: 0vw;
    }
</style>