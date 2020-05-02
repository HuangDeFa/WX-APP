<template>
    <div class="mine">
        <header-view></header-view>
        <div class="content">
        <template v-for="(group,index) in menuGroup">
           <template v-for="(item, index2) in group" >
               <div :key=" index+''+index2" class="item" @click="handleMenuClick(item)"  :class="{'item-secondary':index2>0,'item-footer':index==menuGroup.length-1,'item-profile':index==0}" >
                   <template v-if="index==0">
                       <img class="profile-img" v-if="getCurrentUser.avatar" :src="getCurrentUser.avatar" alt="头像"/>
                       <img class="profile-img" v-else src="../../icon/img/default-user.svg" alt="头像"/>
                       <div class='profile-account'>
                            <span>{{getCurrentUser.displayName}}</span>
                            <span>微信号:{{getCurrentUser.name}}</span>
                       </div>
                       <svgIcon class="profile-qrcode" name="qrcode"></svgIcon>
                   </template>
                   <template v-else>
                    <svgIcon v-if="index>0" :name="item.icon" :iconStyle="getIconStyle(item)"></svgIcon>
                    <span class="item-desc">{{item.name}}</span>
                   </template>
               </div>
           </template>
        </template>
        </div>
        <footer-view :tabIndex="3"></footer-view>
    </div>
</template>
<script>
import svgIcon from '../../components/Svg'
import headerView from '../../components/homeHeader';
import footerView from '../../components/footer';
import { mapGetters,mapActions, mapMutations } from 'vuex';
export default {
    name:'page-mine',
    components:{
       svgIcon,
       headerView,
       footerView
    },
    data() {
        return {
              menuGroup:[
                [
                    {name:'详情',icon:'',route:'profile-account'},
                ],
                [
                    {name:'钱包',icon:'wallet',route:'wallet'},
                ],
                [
                    {name:'收藏',icon:'favorite',route:'favorite'},
                    {name:'相册',icon:'album',route:'album'},
                    {name:'卡包',icon:'package',route:'package'},
                    {name:'表情',icon:'emoji',route:'emoji-manage'},
                ],
                [
                    {name:'设置',icon:'setting',route:'setting'},
                ]
            ]
        }
    },
    computed: {
        ...mapGetters([
            "getCurrentUser"
        ])
    },
    methods: {
        getIconStyle(item){
           if(item.icon=='setting' || item.icon=='favorite' || item.icon=='package'){
               return{
                    width:'4vh',
                    height:'3vh'
               }
           }else if(item.icon=='emoji'){
               return{
                 width:'4vh',
                 height:'3.5vh'
               }
           }
           return {
               width:'4vh',
               height:'4vh'
           };
        },
        handleMenuClick(item){
          if(item.route=='setting' || item.route=='wallet'){
              this.$router.push(item.route);
          }
        },
        ...mapMutations([
            "setUser"
        ])  
    },
}
</script>
<style lang="scss" scoped>
  .mine{
      @include page();
    }
    .content{
        @include page_container();
        height: $content;
    }
    .item{
     @include default_item();
    }
    .item:active{
        background-color: #d3d3d38c;
    }
    .item-profile{
        height:10vh;
    }
    .item-secondary{
        margin: 0;
        padding-top: 1px;
    }
    .item-secondary::before{
     @include default_item_divider();
    }
    .item-footer{
         //border-bottom: solid 2.6vh #d3d3d38c;
    }
    .item-desc{
        margin-left: 5vw;
    }
    .profile-img{
        width:8vh;
        height:8vh;
    }
    .profile-account{
        display:flex;
        height:100%;
        flex-direction:column;
        flex:1;
        margin-left: 3vw;
        margin-right: 3vw;
       justify-content: center;
    }
    .profile-account span:nth-child(2){
        margin-top: 1vh;
        color: #6e6c6c80;
    }
    .profile-qrcode{
        width:3vh;
        height:3vh;
        margin-right: 3vw;
    }
</style>