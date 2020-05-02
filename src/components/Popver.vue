<template>
    <div :popver-host="host" class="popver-content" :style="style">
        <slot>
             <span>{{content}}</span>
        </slot>
    </div>
</template>
<script>
export default {
    name:'popver',
    props:{
        host:{
            type:String,
            default:undefined,
        },
        content:{
            type:String,
            default:''
        },
        width:{
            type:String,
            default:'45vw'
        },
        //top bottom right left
        placement:{
            type:String,
            default:'bottom'
        },
        //trigger event name
        trigger:{
            type:String,
            default:'click'
        }
    },
    data() {
        return {
            style:{width:this.width},
        }
    },
}
</script>
<style lang="scss" scoped>
    .popver-content{
        position: absolute;
        background-color: $primary_dark_color;
        color: white;
        height: fit-content;
    }
   .item{
       width: 100%;
       height: 4.5vh;
       display: flex;
       align-items: center;
   }
   .item+.item{
       border-bottom: 1px solid black;
   }
</style>