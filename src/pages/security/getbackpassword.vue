<template>
    <div class="password-back">
        <header-view backText='找回账号密码'></header-view>
        <div class="content">
            <div class="item">
                <label>已绑定手机号</label>
                <label class="sub-title">可通过手机号+短信验证码登录</label>
            </div>
            <div class="item">
                <label>已绑定QQ号</label>
                <label class="sub-title">可通过QQ号+QQ密码登录</label>
            </div>
            <div class="item">
                <label>已绑定邮箱</label>
                <label class="sub-title">可通过邮箱地址重设密码</label>
            </div>
            <p class="sub-title">无法通过以上方式找回账号密码</p>
            <div class="item2">
                <label>申诉找回微信账号密码</label>
            </div>
        </div>
    </div>
</template>
<script>
import headerView from '../../components/header'
export default {
    components:{
        headerView
    }
}
</script>
<style lang="scss" scoped>
    .password-back{
        @include page();
    }
    .content{
        @include page_container();
        height: 93vh;
        background-color: whitesmoke;
    }
    .item2,
    .item{
        display: flex;
        padding: 1.5vh 2vh;
        flex-direction: column;
        background: white;
        position: relative;
        font-size: large;
        .sub-title{
            margin-top: 1vh;
        }
    }
   .item:active,
   .item2:active{
        background: #d3d3d38c;
   }
    p{
        padding-left: 2vh;
    }
   .sub-title{
        color: $sub_title_color;
        font-size: medium;
    }
     .item+.item{
         ::after{
           @include divider(#d3d3d38c,2vh,0,0,unset);
         }
     }
</style>