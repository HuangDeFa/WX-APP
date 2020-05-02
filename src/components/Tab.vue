<template>
    <div class="tab" @click.stop="handleClick">
        <SvgIcon :name="iconName" :iconStyle="getIconStyle"></SvgIcon>
        <span :style="getTextStyle">{{tabName}}</span>
        <span v-show="showNotification" class="notification" :class="{'notification-with-num':notificationCount>0}">{{ notificationCount>99 ? 
            `${notificationCount}+`:notificationCount>0 ? notificationCount:''  }}</span>
    </div>
</template>
<script>
import SvgIcon from './Svg'
export default {
    name:'tab-item',
    components:{
      SvgIcon
    },
    props:{
        tabName:{
            type:String,
            default:''
        },
        iconName:{
            type:String,
            default:''
        },
        isSelected:{
            type:Boolean,
            default:false
        },
        selectedColor:{
            type:String,
            default:'#1afa29'
        },
        unSelectedColor:{
            type:String,
            default:'#938d8d'
        },
        slidePercent:{
            type:Number,
            default:0
        },
        tabIndex:{
            type:Number,
            default:0
        },
        showNotification:{
            type:Boolean,
            default:false
        },
        notificationCount:{
            type:Number,
            default:0
        }
    },
    data() {
        return {
            
        }
    },
    computed: {
        getIconStyle(){
            let style ={
               width: "3vh",
               height: "3vh"
            };
            if(this.isSelected){
                style.fill=this.selectedColor;
                style.stroke = this.selectedColor;
            }else{
                style.fill='none';
                style.stroke=this.unSelectedColor;
                style['stroke-width']='20px';
            }
            return style;
        },
        getTextStyle(){
            let style ={};
            if(this.isSelected){
                style['color']=this.selectedColor;
            }else{
                style['color']=this.unSelectedColor;
            }
            return style;
        },
        selectedColorAsRgb(){
            return this.parseColor(this.selectedColor);
        },
        unSelectedColorAsRgb(){
            return this.parseColor(this.unSelectedColor);
        },
        getCurrentColorAsRgb(){
            if(this.isSelected){

            }
        },
        
    },
    methods: {
        parseColor(color){
            if(color){
                if(color.startsWith("#")){
                    //will return r , g , b , a
                 let colors = Array.from(color.substring(1));
                 if(colors.length==3){
                     //rgb
                     return {
                         r:parseInt(colors[0]),
                         g:parseInt(colors[1]),
                         b:parseInt(colors[2]),
                     }
                 }else if(colors.length==6 || colors.length==8){
                     //0xrrggbb
                      return {
                         r:parseInt(`0x${colors[0]}${colors[1]}`),
                         g:parseInt(`0x${colors[2]}${colors[3]}`),
                         b:parseInt(`0x${colors[4]}${colors[5]}`),
                     }
                 }
                }else if(color.startsWith('rgb')|| color.startsWith('rgba')){
                    color = color.replace(/[rgba?|()]/g,"");
                    const array = color.split(",");
                    return{
                         r:parseInt(array[0]),
                         g:parseInt(array[1]),
                         b:parseInt(array[2]),
                    }
                }
            }
        },
        handleClick(e){
            this.$emit("tabSelect",this.tabName,this.tabIndex);
        }
    },
}
</script>
<style lang="scss" scoped>
    .tab{
        height: 100%;
        display: flex;
        position: relative;
        flex-direction: column;
        @include center_flex();
        font-size: x-small;
    }
    .notification{
       position: absolute;
       color: white;
       display: inline-block;
       top: 1.2vh;
       right: -0.3vh;
       background-color: red;
       border-radius: 50%;
       width: 1vh;
       height: 1vh;
       line-height: 1vh;
      text-align: center;
    }
    .notification-with-num{
        width: 2.3vh;
        height: 2.3vh;
        line-height: unset;
        right: -1.6vh;
        top: 0.45vh;
        font-family: 'Courier New', Courier, monospace;
        font-weight: 600;
        display: inline-flex;
       justify-content: center;
       align-items: center;
    }
</style>