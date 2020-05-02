<template>
    <transition name="page-slide" :appear=" true ">
        <div class="conversation">
             <headerView :backText="userName">
                 <template v-slot:default>
                     <div class="more-setting">
                         <div class="more-icon-wrapper" @click="enterSetting()">
                            <svgIcon name="more" class="more-icon"/>
                         </div>
                     </div>
                 </template>
             </headerView>
             <div class="content" ref="content" :style="{'height':showExternalInput ? '66vh':'86vh'}">
                 <template v-for="(item,index) in dataList">
                     <div :key="index" class="item" :class=" item.from.name== getCurrentUser.name ? 'my-item' :'other-item'">
                         <img :src="item.icon"/>
                         <span v-if="item.content.type=='text'" class="item-text">{{item.content.text}}</span>
                         <span v-if="item.content.type =='voice'">{{item.content.text}}</span>
                         <span v-if="item.content.type =='video'">{{item.content.text}}</span>
                         <span v-if="item.content.type=='picture'">{{item.content.text}}</span>
                         <span v-if="item.content.type=='file'">[文件]</span>
                     </div>
                 </template>
             </div>
             <div class="footer">
                 <template v-if="conversationType=='Friend' || conversationType=='Group'">
                   <div class="input-area">
                      <svg-icon name="voice2"/>
                      <input v-model="inputMessage"/>
                      <svg-icon @click="showEmoji" name="emoji2"/>
                      <svg-icon @click="externalInput" v-show="!inputMessage" name="add2"/>
                      <span @click="sendMessage" class="send-message" v-show="inputMessage">发送</span>
                   </div>
                 </template>
                 <div v-show="showExternalInput" class="external-input">

                 </div>
             </div>
            <router-view></router-view> 
        </div>
    </transition>
</template>
<script>
import headerView from '../../components/header';
import svgIcon from '../../components/Svg';
import {mapGetters} from 'vuex';
export default {
    name:'conversation-page',
    components:{
        headerView,
        svgIcon
    },
    data() {
        return {
            userName:'',
            userCode:'',
            conversationType:'', //单聊，群聊，订阅后，公众号，微信运动。。。
            dataList:[],
            inputMessage:"",
            showExternalInput:false,
            receiver:null,
        }
    },
    computed: {
        ...mapGetters([
            'getCurrentUser'
        ]),
    },
    created() {
        this.receiver = this.$route.params;
        this.userName = this.receiver.displayName;
        this.userCode = this.receiver.name;
        this.conversationType = this.receiver.isGroup ? 'Group':'Friend';
        this.dataList.push(this.mockData('你好，我是王尼玛，欢迎来到暴走大事件',true));
        this.dataList.push(this.mockData('你好，我是王尼玛，欢迎来到暴走大事件',true));
    },
    methods: {
        enterSetting(){
            this.$router.push({ name:'conversation_set',params:{userName:this.userName,conversationType:this.conversationType}});
        },
        sendMessage(){
             this.dataList.push(this.mockData(this.inputMessage));
             this.inputMessage='';
             this.showExternalInput =false;
             //scroll to the latest message
             this.scrollMessageToLatest();

             //模拟回复
             setTimeout(()=>{
                 this.mockResponseData();
                 this.scrollMessageToLatest();
             },500)
        },
        mockData(content,response){
            let u1=this.getCurrentUser;
            let u2= this.receiver;
            return{
            id:'',
            sessionId:'1024',
            sendTime:'',
            content:{
                //text voice video picture file 
                type:'text',
                file:'',
                text:content
            },
            from:response ? u2:u1,
            to:response ? u1:u2,
            icon:'http://ww1.sinaimg.cn/large/0065oQSqly1g2pquqlp0nj30n00yiq8u.jpg'
            }
        },
        mockResponseData(){
            const contents=[
                '哈哈哈，你也是个人才',
                '卧槽牛逼😄，惹不起',
                '啦啦啦啦啦，你也看一下龙岭迷窟啊',
                '欢迎准时收看暴走大事件',
                '荆轲刺秦王',
                '穿山甲啥都没有说'
            ];
           const index = Math.ceil(Math.random() * (contents.length-1));
           this.dataList.push(this.mockData(contents[index],true));
        },
        //scroll to the latest message
        scrollMessageToLatest(){
            this.$nextTick().then(()=>{
                const ele = this.$refs.content;
                const offset = ele.scrollHeight -
                 ele.clientHeight;
                ele.scrollTop = offset;
             });
        },
        externalInput(){
            this.showExternalInput = !this.showExternalInput;
            this.scrollMessageToLatest();
        },
        showEmoji(){
            console.log("show emoji");
        }
    },
    
}
</script>
<style lang="scss" scoped>
    .conversation{
       @include page();
    }
   .more-setting{
       height: 100%;
       align-items: center;
       display: flex;
       justify-content: flex-end;
       .more-icon-wrapper{
         height: 100%;
         display: flex;
         align-items: center;
         width: 7vh;
         justify-content: center;
       }
       .more-icon-wrapper:active{
        background-color: #3f3b3b;
       }
       svg{
        height: 3.5vh;
        width: 3.5vh;
        fill: white;
       }
   }
   .content{
       //height:calc(100% - 7vh - 7vh);
       width: 100%;
       background: #d3d3d38c;
       overflow-y: auto;
   }
   .footer{
       min-height: $footer;
   }
   .item{
        padding-top: 1vh;
        padding-bottom: 1vh;
        display: flex;
        img{
            height: 5vh;
            width: 5vh;
        }
        .item-text{
            display: inline-flex;
            //max-width: 100%;
            background: white;
            word-break: break-all;
            font-size: small;
            padding: 0 7px;
            border-radius: 3px;
            align-items: center;
            position: relative;
            margin-left: 1.5vh;
       }
   }
   .my-item{
    padding-left: 7vh;
    padding-right: 1vh;
    flex-direction: row-reverse;
      .item-text{
          margin-right: 1.5vh;
          background-color: rgb(0, 201, 0);
      }
     .item-text::after{
          content: '';
          position: absolute;
          right: -2.5vh;
          top: 1vh;
          border-top: solid 1.5vh transparent;
          border-bottom: solid 1.5vh transparent;
          border-left: solid 1.5vh rgb(0, 201, 0);
          border-right: solid 1.5vh transparent;
     }
   }
   .other-item{
    padding-left: 1vh;
    padding-right: 7vh;
       .item-text::after{
            content: '';
            position: absolute;
            left: -2.5vh;
            top: 1vh;
            border-top: solid 1.5vh transparent;
            border-bottom: solid 1.5vh transparent;
            border-left: solid 1.5vh transparent;
            border-right: solid 1.5vh white;
       }
   }
   .input-area{
       height: 7vh;
       display: flex;
       align-items: center;
       padding: 0 4vw;
       background: #8080802b;
       input{
           height: 3vh;
           width: 100%;
           border-radius: 3px;
           border-color: transparent;
           margin: 0 3vw;
           flex: 1;
       }
       input:focus{
           outline:none;
       }
       svg:nth-of-type(n-2){
           width: 3.3vh;
           height: 3.3vh;
       }
       svg:nth-of-type(3){
           width: 3.6vh;
           height: 3.6vh;
           margin-left: 1.2vw;
       }
   }
   .external-input{
       height: 20vh;
   }
   .send-message{
    padding: .5vh;
    color: white;
    background: #00c900;
    font-size: small;
    border-radius: 4px;
    margin-left: 1.2vw;
   }
</style>