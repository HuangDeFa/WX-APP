<template>
     <transition name="page-slide" :appear=" true ">
         <div class="conversation-setting">
             <headerView :backText="title" style="position:fixed;z-index:1">
             </headerView>
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
import headerView from '../../../components/header';
export default {
    name:'conversation-setting-page',
    components:{
        headerView,
    },
    data() {
        return {
            title:'聊天信息',
            menuGroup:[],
        }
    },
    created() {
        this.getMenuGroup();
    },
    methods: {
        getMenuGroup(){
          let type = this.$route.params.conversationType;
          if(type.toLowerCase()=='group'){
               this.menuGroup.push([
                   {name:'群聊名称',page:''},
                   {name:'群二维码',page:''},
                   {name:'群公告',page:''}
               ])
          }
          this.menuGroup.push([
                    {name:'查找聊天记录',page:''}
                ]);
          this.menuGroup.push([
                   {name:'消息免打扰',page:''},
                   {name:'置顶聊天',page:''},
                   type.toLowerCase()=='group' ? {name:'保存到通讯录',page:''} :{name:'强提醒',page:''}
            ]);
          if(type.toLowerCase()=='group'){
              this.menuGroup.push([
                    {name:'我在本群的昵称',page:''},
                    {name:'显示群成员昵称',page:''},
                ]);
              this.menuGroup.push([
                    {name:'设置当前聊天背景',page:''},
                    {name:'投诉',page:''},
                ]);
              this.menuGroup.push(   
                [
                    {name:'清空聊天记录',page:''}
                ]);  
          }else{
              this.menuGroup.push([
                    {name:'设置当前聊天背景',page:''}
                ]);
              this.menuGroup.push(   
                [
                    {name:'清空聊天记录',page:''}
                ]);
              this.menuGroup.push(   
                [
                    {name:'投诉',page:''}
                ]);   
          }
        }
    },
}
</script>
<style lang="scss" scoped>
    .conversation-setting{
        @include page();
        z-index: 5;
    }
    .setting-content{
        @include page_container();
        padding-top: 7vh;
        height: 93vh;
        background-color: #d3d3d3;
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