<template>
    <div class="discover">
        <header-view></header-view>
        <div class="content">
        <template v-for="(group,index) in menuGroup">
           <template v-for="(item, index2) in group" >
               <router-link :to="{name:item.route}" tag="div" :key=" index+''+index2" class="item" @click="handleItemClick(item)"  :class="{'item-secondary':index2>0,'item-footer':index==menuGroup.length-1}" >
                  <svgIcon :name="item.icon" :iconStyle="getIconStyle(item)"></svgIcon>
                   <span class="item-desc">{{item.name}}</span>
                   <span class="item-notification" v-if="item.msgCount">{{item.msgCount}}</span>
                   <img class="item-notify-img" v-if="item.notifyUrl" :src="item.notifyUrl" />
                   <span class="item-notify-img-banner" v-if="item.notifyUrl"></span>
               </router-link>
           </template>
        </template>
        </div>
        <footer-view :tabIndex="2"></footer-view>
     <router-view></router-view>
    </div>
</template>
<script>
import svgIcon from '../../components/Svg'
import headerView from '../../components/homeHeader';
import footerView from '../../components/footer';

export default {
    name:'page-discover',
    components:{
       svgIcon,
       headerView,
       footerView
    },
    data() {
        return {
            menuGroup:[
                [
                    {name:'朋友圈',icon:'tribe',route:'friendcircle',msgCount:10,notifyUrl:'http://ww1.sinaimg.cn/large/0065oQSqly1g2pquqlp0nj30n00yiq8u.jpg'},
                ],
                [
                    {name:'扫一扫',icon:'scan-scan',route:'scans'},
                    {name:'摇一摇',icon:'shake',route:'shakes'},
                ],
                [
                    {name:'看一看',icon:'look-look',route:'looks'},
                    {name:'搜一搜',icon:'search-bit',route:'search-bit'},
                ],
                [
                    {name:'附近的人',icon:'people-near',route:'peoper-near'},
                    {name:'漂流瓶',icon:'float-bottle',route:'float-bottle'},
                ],
                [
                    {name:'购物',icon:'shop',route:'shop'},
                    {name:'游戏',icon:'game',route:'game'},
                ],
                [
                    {name:'小程序',icon:'mini-program',route:'mini-program'},
                ]
            ]
        }
    },
    methods:{
        getIconStyle(item){
            if(item.icon=='tribe' || item.icon=='scan-scan'){
             let style = {
               width:'4vh',
               height:'3vh'
              };
              if(item.icon=='scan-scan'){
                  style.fill="#1296db"
              }
              return style;
            }else if(item.icon=='shake' || item.icon=='look-look' || item.icon=='search-bit'|| item.icon=='game' || item.icon=='mini-program'){
                return {
               width:'4vh',
               height:'3.5vh'
              };
            }
           return {
               width:'4vh',
               height:'4vh'
           };
        },
        handleItemClick(item){
           // this.$router.push({name:'friendcircle'});
        }
    }
}
</script>
<style lang="scss" scoped>
    .discover{
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
        background-color:$primary_background_color;
    }
    .item-secondary{
        margin: 0;
        padding-top: 1px;
    }
    .item-secondary::before{
     @include default_item_divider();
    }
    .item-footer{
        
    }
    .item-desc{
        margin-left: 5vw;
    }
    .item-notification{
    background-color: red;
    border-radius: 50%;
    margin-left: 6vw;
    color: white;
    display: inline-flex;
    height: 2.5vh;
    width: 2.5vh;
    justify-content: center;
    align-items: center;
    font-size: x-small;
    }
 .item-notify-img{
    display: inline-flex;
    height: 5vh;
    width: 5vh;
    border-radius: 12%;
    position: absolute;
    right: 5vw;
    }
  .item-notify-img-banner  {
    border-radius: 50%;
    background: red;
    height: 1.3vh;
    width: 1.3vh;
    display: block;
    position: absolute;
    right: 4vw;
    top: .2vh;
  }
</style>