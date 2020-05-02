<template>
 <transition name="page-slide" :appear=" true ">
    <div class="user">
        <div class="content">
            <header-view backText="详细资料"></header-view>
            <div class="user-info">
                <img :src="userInfo.avatar.icon" class="avatar"/>
                <div class="description">
                    <span class="display-name">{{userInfo.displayName}}</span>
                    <span class="name">微信号：{{userInfo.name}}</span>
                </div>
            </div>
            <div class="setting">设置备注和标签</div>
           <div class="region">
                <span>地区</span>
                <div class="content">{{userInfo.region}}</div>
            </div>
            <div class="album"> <!--相册,最多显示三张图片-->
                <span>个人相册</span>
                <div class="content">
                  <img :src="item.src" v-for="(item, index) in userInfo.albums" :key="index"/>
                </div>
            </div>
            <div class="more">更多</div>
            <router-link :to="{name:'conversation',params:{userName:userInfo.name,conversationType:'Friend',userCode:userInfo.name}}" tag="div" class="send-message">
                 发送消息
            </router-link>
        </div>
        <router-view></router-view>
    </div>
 </transition>  
</template>
<script>
import headerView from '../../components/header'
export default {
    components:{
        headerView,
    },
    data() {
        return {
            userInfo:{},
        }
    },
    created() {
        this.userInfo = this.$route.params;
        this.userInfo.albums=[{src:`${this.userInfo.avatar.icon}`},{src:`${this.userInfo.avatar.icon}`},{src:`${this.userInfo.avatar.icon}`}];
        this.userInfo.region="广东广州";
    }
}
</script>
<style lang='scss' scoped>
    .user{
        @include page();
    }
    .content{
        @include page_container()
    }
    @mixin common{
        display: flex;
        align-items: center;
        padding: 1.5vh;
        background: white;
        margin-top: 2vh;
        font-size: larger;
        position: relative;
    }
    @mixin img_size{
        width:8vh;
        height:8vh;
    }
    .user-info{
      @include common();
        .avatar{
         @include img_size();
         border-radius: 8%;
         margin-right: 6vw;
        }
        .description{
            display: flex;
            flex-direction: column;
            flex: 1;
            height: 100%;
            span{
                display: flex;
                padding-bottom: .5vh;
            }
            .name{
                font-size: small;
                color:$sub_title_color;
            }
        }
    }
    
    .setting,
    .region,
     .album ,
     .more{
         @include common();
     }
     .user-info:active,
    .setting:active,
    .region:active,
     .album:active,
     .more:active{
         @include default_item_active();
     }
    .album,.more{
        position: relative;
        margin-top: 0;
    }
    .album::after,
    .more::after{
        @include default_item_divider();
        left: 1.5vh;
        right: 0;
    }
    .album img{
        @include img_size();
    }
    .region,.album{
         span:first-of-type{
             width: 22vw;
         }
        .content{
            flex: 1;
            background: transparent;
            font-size: small;
            color:$sub_title_color;
            img+img{
                margin-left: 3vw;
            }
        }
    }
    .send-message{
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 700;
        background: #00c900;
        margin:2vh;
        padding: 2vh;
        cursor: pointer;
        border-radius: 6px;
    }
    .send-message:focus{
        outline: none;
    }
</style>