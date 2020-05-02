<template>
    <div class="header">
        <div class="back-area">
            <div class="back-icon" @click="handleBack">
                <svgIcon name='back'></svgIcon>
            </div>
            <span>{{backText}}</span>
        </div>
        <div class="custom-area">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import svgIcon from './Svg'
export default {
    name:'header-view',
    components:{
        svgIcon
    },
    props:{
        backText:{
            type:String,
            default:'返回'
        },
        backTap:{
            type:Function,
            default:null
        }
    },
    data() {
        return {
            
        }
    },
    computed: {
        
    },
    methods: {
        handleBack(e){
            if(this.backTap){
                this.backTap();
            }else{
                this.$router.go(-1);
            }
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
    .back-area{
    height: 100%;
    align-items: center;
    display: flex;
    }
    .back-icon{
        height: 100%;
        align-items: center;
        justify-content: center;
        display: flex;
        padding-right: 2vw;
        svg{
            height: 4vh;
            fill: white;
            width: 4vh;
        }
    }
    .back-icon:active{
         background: #3f3b3b;
    }
    .custom-area{
        flex: 1;
        height: 100%;
        position: relative;
    }
</style>