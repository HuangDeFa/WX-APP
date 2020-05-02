<template>
    <div class="footer">
            <tab-control
            :tabs="tabs"
            :defaultSelected="tabIndex"
             @tabChange="tabChange"
            >
            </tab-control>
       </div>
</template>
<script>
import tabControl from '../components/TabControl'
export default {
    props:{
        tabIndex:{
            type:Number,
            default:0
        }
    },
    components:{
        tabControl
    },
    data() {
        return {
            tabs:[
                { name:'微信',icon:'message',showNotification:true},
                { name:'通讯录',icon:'contact',showNotification:false,notificationCount:0},
                { name:'发现',icon:'discover',showNotification:true },
                { name:'我',icon:'me',showNotification:false,notificationCount:0},
            ],
        }
    },
    created() {
        Object.defineProperties(this.tabs[0],
         {
            'notificationCount':{
                 get:()=>{
                    return this.messageCount;
                 }
             },
             'showNotification':{
                 get:()=>{
                     return this.messageCount > 0;
                 }
             }
         }
        );
         Object.defineProperties(this.tabs[2],
         {
            'notificationCount':{
                 get:()=>{
                    return this.discoverCount;
                 }
             },
             'showNotification':{
                 get:()=>{
                     return this.discoverCount > 0;
                 }
             }
         }
        );
    },
   computed: {
       messageCount(){
          return this.$store.state.notifications.filter(x=>x.unread).reduce((pre,curr)=>{
                 if(curr && curr.messageCount)
                    pre+=curr.messageCount;
                return pre;
           },0);
       },
       discoverCount(){
           return 10;
       }
   },
    methods: {
        tabChange(name,index){
            switch(index){
                case 0:
                    this.$router.push({name:'message'});
                    //this.currentComponent = message;
                break;
                case 1:
                    this.$router.push({name:'contact'});
                    //this.currentComponent = contact;
                break;
                case 2:
                      this.$router.push({name:'discover'});
                    //this.currentComponent = discover;
                break;
                case 3:
                      this.$router.push({name:'mine'});
                    //this.currentComponent = mine;
                break;
            }
        }
    },
}
</script>
<style lang="scss" scoped>
 .footer{
        height: $footer;
    }
</style>