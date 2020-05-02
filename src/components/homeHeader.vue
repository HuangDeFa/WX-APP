<template>
    <div class="header">
            <span class="message-num">微信({{mCount}})</span>
            <div class="icon-wrapper search-wrapper">
                <svgIcon name="search" :iconStyle="headerIconStyle"></svgIcon>
            </div>
            <div class="icon-wrapper add-wrapper">
                <svgIcon name="add" :iconStyle="headerIconStyle"></svgIcon>
            </div>
    </div>
</template>
<script>
import svgIcon from './Svg';
export default {
    name:'home-header',
    props:{
        messageCount:{
            type:Number,
            default:0
        }
    },
    components:{
        svgIcon
    },
    computed: {
        headerIconStyle(){
             return{
                 width:'3vh',
                 height: '3vh',
                 fill:'white'
             }
         },
         mCount(){
             return this.messageCount || this.$store.state.notifications.filter(x=>x.unread).reduce((pre,curr)=>{
                 if(curr && curr.messageCount)
                    pre+=curr.messageCount;
                return pre;
           },0);
         }
    },
}
</script>
<style lang="scss" scoped>
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
</style>