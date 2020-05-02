<template>
    <div class="message">
        <header-view></header-view>
        <div class="content">
        <div v-if="loginPC!='none'">
            <!--Windows or Mac 微信已登录-->
            <span>{{ `${loginPC=='Windows' ? 'Windows':'Mac'} 微信已登录` }}</span>
        </div>
        <template v-for="(item,index) in messagesEntities">
            <div class="item" :class="{'item-secondary':index>0}" :key="index" @click="enterConversation(item)">
                <img v-if="item.avatar.isUrl" :src="item.avatar.icon" class="item-img"/>
                <svgIcon v-else :name="item.avatar.icon" class="item-img"></svgIcon>
                <span v-if="item.unread && item.messageCount>0" :class="item.enableNotify ? 'item-notify-count':'item-notify-dot'">{{item.enableNotify?item.messageCount+'':''}}</span>
                <div class="item-content-wrapper">
                  <span class="item-name" :class="{'item-name-secondary':item.name=='GongZhongHao'||item.name=='WXPay'}">{{item.from.displayName}}</span>
                  <span class="item-content" :style="adjustContentStyle(item)">{{parseEntityMsgContent(item)}}</span>
                </div>
                <span class="item-time">{{parseDateToFriendly(item.sendTime)}}</span>
            </div>
        </template>
        </div>
        <footer-view :tabIndex=" 0 "></footer-view>
        <router-view></router-view>
    </div>
</template>
<script>
import svgIcon from '../../components/Svg';
import headerView from '../../components/homeHeader';
import footerView from '../../components/footer';
import {getNotifications} from '../../service/service';
import {mapMutations} from 'vuex';
import {SETNOTIFICATION} from '../../store/mutation';
export default {
    name:'page-message',
    components:{
        svgIcon,
        headerView,
        footerView
    },
    data() {
        return {
            loginPC:'none',
            messagesEntities:[],
        }
    },
    computed: {
       
    },
    created() {
        /**
         * msg Type:
         * 1.Friend 2.Group 3.GongZhongHao 4.DingYueHao 5.WXExercise 6.TransferHelper 7.WXPay
         * contentType:
         * 1.text 2.voice 3.video 4 tel 5 tel_video 6 picture 7 file 8 application
         */
        getNotifications().then(data=>{
            console.log('notification',data);
            const unreadActive = (entity)=>{
                return{
                 get:()=>{
                     return entity.unread;
                 },
                 set:value=>{
                     entity.unread = value;
                 },
                };
            };
            this.messagesEntities = data.data.map(entity=>{
                const obj = Object.assign({},entity,{
                       avatar:this.parseAvatar(entity.from),
                       enableNotify:true
                });
                Object.defineProperty(obj,'unread',unreadActive(entity));
                return obj;
            });
            this[SETNOTIFICATION](data.data)
        }).catch(error=>{
            console.log('get notification error',error);
        })
    },
    methods: {
         ...mapMutations([
            SETNOTIFICATION
        ]),
        parseDateToFriendly(time){
            const now = new Date();
            const date = new Date(time);
            const fixNumber=num=>num>9? num.toString():`0${num}`;

            if(now.getFullYear() > date.getFullYear()){
                return `${date.getFullYear()} 年 ${date.getMonth()} 月 ${date.getDate()}日`;
            }
            if(now.getMonth()>date.getMonth()){
                  return `${date.getMonth()} 月 ${date.getDate()}日`;
            }
            const dayOffset = now.getDate()>date.getDate();
            if(dayOffset>0){
                if(dayOffset>7){
                    return `${date.getMonth()} 月 ${date.getDate()}日`;
                }else if(dayOffset==1){
                    return "昨日";
                }
                else{
                    return `周${dayOffset}`;
                }
            }
            return `${fixNumber(date.getHours())}:${fixNumber(date.getMinutes())}`;
        },
        parseEntityMsgContent(entity){
            if(entity.enableNotify){
                if(entity.msgType=='Group' || entity.msgType=='DingYueHao'){
                    return `${entity.member}:${this.fridenlyContent(entity)}`
                }
                return this.fridenlyContent(entity);
            }else{
                if(entity.msgType=='Group' || entity.msgType=='DingYueHao'){
                    if(entity.notificationCount && entity.unread){
                        if(entity.msgType=='DingYueHao')
                            return `［${entity.notificationCount}条通知］${entity.member}:${this.fridenlyContent(entity)}`
                         return `［${entity.notificationCount}条］${entity.member}:${this.fridenlyContent(entity)}`
                    }
                    return `${entity.member}:${this.fridenlyContent(entity)}`
                }else{
                    return this.fridenlyContent(entity);
                }
            }
        },
        adjustContentStyle(entity){
            if(!entity.enableNotify && (entity.isGroup || entity.name=='DingYueHao')
            && entity.unread && entity.messageCount ||(entity.contentType=='voice' || entity.contentType=='video'|| entity.contentType=='application'
            ||entity.contentType=='tel' || entity.contentType=='tel_video' || entity.contentType=='picture' || entity.contentType=='file')){
               return {transform:'translateX(-6px)'};
            }
            return {};
        },
        fridenlyContent(entity){
            switch(entity.contentType){
                case 'text':
                return entity.content;
                case 'voice':
                    return '［语音］'
                case 'video':
                    return '［视频］'
                case 'tel':
                    return '［语音通话］'
                case 'tel_video':
                    return '［视频通话］'
                case 'picture':
                    return '［图片］'
                case 'file':
                    return '［文件］'
                case 'application':
                 return '［应用消息］'
            }
        },
        parseAvatar(entity){
            const avatar={ icon:'',isUrl:false};
            switch(entity.name){
                    case "WXPay":
                    avatar.icon = 'weixin_pay'
                    break;
                    case "WXExercise":
                    avatar.icon = 'weixin'
                    break;
                    case "DingYueHao":
                    avatar.icon = 'dingyuehao'
                    break;
                    case "TransferHelper":
                    avatar.icon = 'transferhelper'
                    break;
                    case "GongZhongHao":
                    avatar.icon = 'dingyuehao'
                    break;
                    default:
                        avatar.isUrl =true;
                        avatar.icon =entity.avatar || 'http://ww1.sinaimg.cn/large/0065oQSqly1g2pquqlp0nj30n00yiq8u.jpg';
                }
         return avatar;
        },
        enterConversation(item){
            if(item.unread){
                item.unread = false;
            }
            this.$router.push({name:'conversation',params:item.from});
        }
    },
}
</script>
<style lang="scss" scoped>
    .message{
        @include page();
    }
    .content{
        @include page_container();
        height: $content;
    }
    .item{
     @include default_item();
      margin: 0;
    }
    .item:active{
        background-color:$primary_background_color;
    }
    .item-secondary{
        padding-top: 1px;
    }
    .item-secondary::before{
     @include default_item_divider();
    }
    .item-img{
        width: 5vh;
        height: 5vh;
    }
    .item-content-wrapper{
        display: flex;
       flex-direction: column;
       margin-left: 2.5vw;
       overflow: hidden;
       flex: 1;
    }
    .item-name{
       align-self: flex-start;
       margin-top: .5vh;
    }
    .item-name-secondary{
        color: #3F51B5;
    }
    .item-content{
        font-size: x-small;
        color: darkgrey;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-right: 10vw;
    }
    .item-notify-count{
    background-color: red;
    border-radius: 50%;
    color: white;
    display: -webkit-inline-box;
    display: inline-flex;
    height: 2vh;
    width: 2vh;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    font-size: x-small;
    position: absolute;
    left: 5.5vh;
    top: .3vh;
    }
    .item-notify-dot{
    position: absolute;
    color: white;
    display: inline-block;
    top: .4vh;
    left: 6vh;
    background-color: red;
    border-radius: 50%;
    width: 1.2vh;
    height: 1.2vh;
    line-height: 1vh;
    text-align: center;
    }
    .item-time{
    align-self: flex-start;
    position: absolute;
    right: 3vw;
    margin-top: .5vh;
    color: darkgray;
    }
</style>