<template>
    <div class="page">
        <header-view backText='微信安全中心'></header-view>
        <div class="content">
            <div class="item" v-for="(item, index) in menus" :key="index">
                <label>{{item.title}}</label>
                <label class="sub-title">{{item.sub_title}}</label>
            </div>
            <a>进入帮助中心</a>
        </div>
    </div>
</template>
<script>
import headerView from '../../components/header'
export default {
     components:{
        headerView
    },
    data() {
        return {
            menus:[
                {title:'找回账号密码',sub_title:'申诉找回微信账号密码'},
                {title:'解封账号',sub_title:'账号因违规或其它原因被限制登录，申请解封'},
                {title:'冻结账号',sub_title:'自己或朋友的账号被盗、手机丢失、可以冻结微信'},
                {title:'解冻账号',sub_title:'解除安全风险后，你可以解冻微信帐号'},
                {title:'投诉维权',sub_title:'了解如何投诉违规或侵权行为'},
                {title:'注销帐号',sub_title:'提交申请，删除所有数据，永久注销微信帐号'}
            ]
        }
    },
}
</script> 
<style lang="scss" scoped>
 .page{
    @include page();
 }
 .content{
      @include page_container();
       height: 93vh;
      background-color: whitesmoke;
 }
  .item{
        display: flex;
        padding: 1.5vh 2vh;
        flex-direction: column;
        background: white;
        position: relative;
        font-size: large;
        .sub-title{
            margin-top: 1vh;
            color: $sub_title_color;
            font-size: medium;
        }
    }
   .item:active{
        background: #d3d3d38c;
   }
    .item+.item{
         ::after{
           @include divider(#d3d3d38c,2vh,0,0,unset);
         }
     }
     a{
       color: #4169e1c4;
       display: block;
       text-align: center;
       margin-top: 3vh;
     }
</style>