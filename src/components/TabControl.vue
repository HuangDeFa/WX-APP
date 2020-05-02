<template>
    <div class="tab-control">
         <tab :tabName=" item.name ? item.name : item " :tabIndex="index" :isSelected=" index===defaultSelected " 
         :iconName="item.icon?item.icon:item" :showNotification="item.showNotification" :notificationCount="item.notificationCount" @tabSelect="tabSelect" v-for="(item, index) in tabs" :key="index"></tab>
    </div>
</template>
<script>
import tab from './Tab'
export default {
    name:'tab-control',
    components:{tab},
    props:{
        tabs:{
            type:Array,
            default:[]
        },
        defaultSelected:{
            type:Number,
            default:0
        }
    },
    data() {
        return {
            selectedIndex:this.defaultSelected,
        }
    },
    methods: {
        tabSelect(name,index){
           if(index==this.defaultSelected)return;
           this.selectedIndex = index;
           this.$emit("tabChange",name,index);
        }
    },
}
</script>
<style lang="scss" scoped>
 .tab-control{
      height: 7vh;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      border-top: solid 1px gainsboro;
 }
</style>