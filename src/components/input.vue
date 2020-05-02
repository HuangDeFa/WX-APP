<template>
    <div class="inputWrapper">
        <input v-on="inputListener" v-bind="$attrs" v-bind:value="value"/>
        <svg-icon class="clear" @click="clear" v-show="showClearIcon" name='delete' :iconStyle="{'width':'2vh',height:'2vh'}"></svg-icon>
    </div>
</template>
<script>
import svgIcon from './Svg';
export default {
    inheritAttrs:false,
    props:['value'],
    components:{
        svgIcon
    },
    data(){
        return{
           showClearIcon:false
        }
    },
    computed:{
        inputListener(){
            const vm = this;
            return Object.assign({},this.$listeners,{
                input:function(event){
                    const value = event.target.value;
                    vm.$emit('input',value);
                    vm.showClearIcon= value!='';
                },
                focus:function(event){
                     vm.showClearIcon = vm.value!='';
                     vm.$emit('focus',event);
                },
                blur:function(event){
                     vm.$emit('blur',event);
                     setTimeout(() => {
                         vm.showClearIcon= false;
                     }, 0);
                }
            });
        }
    },
    created() {
      
    },
    methods:{
        clear(){
           this.$emit('input','');
           this.showClearIcon= false;
        }
    }
}
</script>
<style lang="scss" scoped>
    .inputWrapper{
        display: flex;
        align-items: center;
    }
    .clear{
        margin-left: 3vw;
    }
</style>
