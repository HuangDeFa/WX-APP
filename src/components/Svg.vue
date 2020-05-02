<template>
    <svg v-on="$listeners" :class="getClass" :style="getStyle" aria-hidden="true">
      <use :xlink:href="iconName"></use>
   </svg>
</template>
<script>
export default {
    name:'svg-icon',
    props:{
        'iconStyle':{
            type:Object,
            default:null
        },
        'name':{
            type:String,
            default:''
        }
    },
    computed: {
        iconName(){
            return `#icon-${this.name}`;
        },
        getClass(){
           // if(this.iconStyle && typeof this.iconStyle==='string')
           // return this.style
        },
        getStyle(){
            if(this.iconStyle && typeof this.iconStyle==='object')
               return this.iconStyle;
        }
    },
}
</script>