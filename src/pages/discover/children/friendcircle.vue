<template>
<transition name="page-slide" :appear=" true ">
    <div class="friend-circle">
        <header-view backText="朋友圈" style="position:fixed;z-index:1"></header-view>
        <div class="content" ref="content">
              <!--Cover image -->
              <section> 
                  <img v-if="businessData.converUrl" :src="businessData.converUrl" class="cover-img"/>
                  <div v-else class="cover-block">
                      <span>轻触更换封面照片</span>
                  </div>
              </section>
              <!--Avatar -->
              <template>
                  <div class="avatar">
                      {{businessData.userName}}
                      <img v-if="businessData.avatarUrl" class="avatar-img" :src="businessData.avatarUrl"/>
                      <img v-else class="avatar-img" src="../../../icon/img/default-user.svg" alt="头像"/>
                  </div>
              </template>
              <template>
                   <svgIcon :class="refreshImageClass" name="tribe" :iconStyle="getIconStyle()"></svgIcon>
              </template>
              <!--content list-->
              <section>
                  <div class="content-list">
                      <div class="item" v-for="(item, index) in businessData.list" :key="index">
                          <img class="item-avatar" :src="item.avatarUrl"/>
                          <div class="item-content">
                              <span class="user-name">{{item.userName}}</span>
                              <div class="item-text" v-if="item.content">
                                  {{item.content}}
                              </div>
                              <div class="item-pics" v-if="item.pictures && item.pictures.length">

                              </div>
                              <div class="item-videos" v-if="item.pictures && item.pictures.length">

                              </div>
                              <span v-if="item.location" class="item-address">{{item.location}}</span>
                              <div class="item-time">
                                  {{item.editedTime}}
                                  <span v-if="item.reference" class="item-reference">
                                      {{item.reference.description}}
                                  </span>
                                  <div class="item-add-comment" @click.stop="toggleAddCommentMenu(item,$event)">
                                      <span class="dot"></span>
                                      <span class="dot"></span>
                                  </div>
                              </div>
                              <div v-if="item.likes.length || item.comments.length" class="item-comment">
                                  <div v-if="item.likes.length" class="like-section">
                                      <svg-icon name="like" :iconStyle="{width:'16px',height:'16px',fill:'rgba(3, 67, 96, 0.82)'}" />{{item.likes|likes}}
                                  </div>
                                  <div v-if="item.comments.length" :style="{'border-top':item.likes.length? 'solid 1px #8080804a':''}"  class="comment-section">
                                      <div v-for="(comment, index) in item.comments" :key="index">
                                          <span class="comment-author">{{comment.author.name+":"}}</span>{{comment.content}}
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
             </section>
             <section>
               <div class="comment-menu" ref="comment_menus">
                  <div class="menu-content" :class="{'menu-content-show':addCommentData.showMenu}">
                     <div class="like" @click="toggleLike">
                       <svg-icon name="like" :iconStyle="{width:'16px',height:'16px',fill:'white'}"/>{{addCommentData.toggleLike}}
                    </div>
                    <div class="comment">
                       <svg-icon name="comment" :iconStyle="{width:'16px',height:'16px',fill:'white'}"/>评论
                    </div>
                  </div>
              </div>
            </section>
        </div>
    </div>
</transition>   
</template>
<script>
import headerView from '../../../components/header'
import svgIcon from '../../../components/Svg'
export default {
    components:{
        headerView,
        svgIcon
    },
    filters:{
        likes:function(items){
            if(items && items.length){
               return items.map((value,index)=>{
                    return value.author.name;
                }).toString();
            }
            return "";
        }
    },
    data() {
        return {
            businessData:{},
            _refreshImageClass:'refresh-img-rotate',
            addCommentData:{showMenu:false,receiver:null,toggleLike:'赞'}
        }
    },
    computed: {
        refreshImageClass(){
            return this.$data._refreshImageClass;
        },
        currentUser(){
            return {
                name:'假的朋友圈',
            }
        }
    },
    created() {
        this.businessData = this.getBusinessData();
    },
    mounted() {
         this.$refs.content.addEventListener("touchstart",(s,e)=>{
            console.log("touchstart",s,e);
        });
        this.$refs.content.addEventListener("touchmove",(s,e)=>{
            console.log("touchmove",s,e);
        });
        this.$refs.content.addEventListener("touchend",(s,e)=>{
            console.log("touchend",s,e);
            //this.showCommentMenu =!this.showCommentMenu;
        });
        // mock refresh time
        setTimeout(()=>{
            this.$data._refreshImageClass='refresh-img-noraml';
        },3000)
    },
    methods: {
        getBusinessData(){
            return{
                converUrl:'',
                avatarUrl:'http://ww1.sinaimg.cn/large/0065oQSqly1g2pquqlp0nj30n00yiq8u.jpg',
                userName:'假的朋友圈',
                list:[
                    {
                        userName:'韩梅梅',
                        avatarUrl:'https://ww1.sinaimg.cn/large/0065oQSqly1g2hekfwnd7j30sg0x4djy.jpg',
                        editedTime:'10分钟前',
                        location:'广州塔',
                        content:`哈哈哈~！鬼吹灯龙岭迷窟开播咯鬼吹灯龙岭迷窟开播咯鬼吹灯龙岭迷窟开播咯
                        鬼吹灯龙岭迷窟开播咯鬼吹灯龙岭迷窟开播咯`,
                        reference:{description:'腾讯视频'},
                        pictures:[],
                        videos:[],
                        likes:[
                            {author:{name:'路人甲'}},
                            {author:{name:'陈瞎子'}},
                            {author:{name:'鹧鸪哨'}},
                            {author:{name:'胡八一'}}
                        ],
                        comments:[
                            {author:{name:'小A'},content:'哈哈😄'},
                            {author:{name:'小B'},content:'哈哈😄'},
                            {author:{name:'路人甲'},content:'哈哈😄'},
                            {author:{name:'王胖纸'},content:'哈哈😄'}
                        ],
                    },
                    {
                        userName:'张大佛爷',
                        avatarUrl:'https://ww1.sinaimg.cn/large/0065oQSqly1g2hekfwnd7j30sg0x4djy.jpg',
                        editedTime:'半小时前',
                        location:'广州塔',
                        content:`哈哈哈~！鬼吹灯龙岭迷窟开播咯鬼吹灯龙岭迷窟开播咯鬼吹灯龙岭迷窟开播咯
                        鬼吹灯龙岭迷窟开播咯鬼吹灯龙岭迷窟开播咯`,
                        pictures:[],
                        videos:[],
                        likes:[
                            {author:{name:'路人甲'}},
                            {author:{name:'陈瞎子'}},
                            {author:{name:'鹧鸪哨'}},
                            {author:{name:'胡八一'}}
                        ],
                        comments:[
                            {author:{name:'小A'},content:'哈哈😄'},
                            {author:{name:'小B'},content:'哈哈😄'},
                            {author:{name:'路人甲'},content:'哈哈😄'},
                            {author:{name:'王胖纸'},content:'哈哈😄'}
                        ],
                    },
                    {
                        userName:'渣渣辉',
                        avatarUrl:'https://ww1.sinaimg.cn/large/0065oQSqly1g2hekfwnd7j30sg0x4djy.jpg',
                        editedTime:'昨天',
                        location:'北京',
                        content:`哈哈哈~！鬼吹灯龙岭迷窟开播咯鬼吹灯龙岭迷窟开播咯鬼吹灯龙岭迷窟开播咯
                        鬼吹灯龙岭迷窟开播咯鬼吹灯龙岭迷窟开播咯`,
                        pictures:[],
                        videos:[],
                        likes:[
                           
                        ],
                        comments:[
                            {author:{name:'王胖纸'},content:'哈哈😄'}
                        ],
                    }
                ]
            }
        },
        getIconStyle(){
           let style = {
             width:'4vh',
             height:'3vh'
            };
            return style;
        },
        toggleAddCommentMenu(s,e){
            if(!this.addCommentData.showMenu){
                const rect = e.currentTarget.getBoundingClientRect();
                this.addCommentData.receiver=s;
                this.displayAddCommentMenu(rect);
            }else{
                 const rect = e.currentTarget.getBoundingClientRect();
                 this.addCommentData.showMenu = false;
                 const receiver = this.addCommentData.receiver;
                 if(receiver && receiver.userName==s.userName){
                     return;
                 }
                 this.addCommentData.receiver=s;
                 this.$nextTick().then(()=>{
                 this.displayAddCommentMenu(rect);
               });
            }
            //this.$refs.comment_menus.style= style;
           console.log(s,e);
        },
        displayAddCommentMenu(rect){
             const receiver = this.addCommentData.receiver
             if(receiver.likes && receiver.likes.findIndex(x=>x.author.name==this.currentUser.name)!=-1){
                this.addCommentData.toggleLike='取消';
              }else{
                this.addCommentData.toggleLike='赞';
             }
             const right = window.innerWidth - rect.left;
             const style = this.$refs.comment_menus.style;
             style.right = (right+5)+'px';
             style.top = `${this.$refs.content.scrollTop+ rect.bottom - rect.height/2 -this.$refs.comment_menus.clientHeight/2 }px`;
             this.addCommentData.showMenu = true;
        },
        toggleLike(e){
            const receiver = this.addCommentData.receiver;
            const index = receiver.likes.findIndex(x=>x.author.name==this.currentUser.name)
            if(receiver.likes && index!=-1){
                receiver.likes.splice(index,1)
            }else{
               receiver.likes.push({
                   author:{name:this.currentUser.name}
               });
            }
            this.addCommentData.showMenu = false;
        }
    },
}
</script>
<style lang="scss" scoped>
     $cover-height:38vh;

    .friend-circle{
        @include page();
        background: rgb(77, 74, 74);
        overflow-y: auto;
    } 
    .content{
        position: relative;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        background: white;
    }
    .cover-img{
        height: $cover-height;
        width: 100%;
    }
    .cover-block{
        height: $cover-height;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        background: rgb(77, 74, 74);
    }
   
    .avatar{
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: flex-end;
        color: white;
        position: absolute;
        top: 32vh;
        font-family: 'Courier New', Courier, monospace;
        font-weight: bold;
        .avatar-img{
         margin-left: 5vw;
         margin-right: 5vw;
         width:8vh;
         height:8vh;
         border-radius: 8%;
      }
    }
    @keyframes rotate {
        0%{
            transform:rotate(0deg);
        }
        25%{
            transform:rotate(90deg);
        }
        50%{
             transform:rotate(180deg);
        }
        75%{
             transform:rotate(270deg);
        }
        100%{
             transform:rotate(360deg);
        }
    }
    @keyframes finish {
         0%{
            transform: translateY(-2vh);
        }
        25%{
            transform: translateY(-6vh);
        }
        50%{
             transform: translateY(-10vh);
        }
        75%{
             transform: translateY(-12vh);
        }
        100%{
             transform: translateY(-16vh);
        }
    }
    .refresh-img-noraml{
        position: absolute;
        left: 16vw;
        top: -5vh; 
        animation: rotate .8s ease-in-out 0s 6;
        transition: all 1.5s ease-in-out;
    }
    .refresh-img-rotate{
        position: absolute;
        left: 16vw;
        top: 16vh; 
        animation: rotate .5s ease-in-out infinite;
    }
   .content-list{
        margin-top: 5vh;
        width: 100%;
        .item{
            padding: 2vh;
            display: flex;
        }
        .item+.item{
            border-top: solid 1px #8080804a;
        }
        .item-avatar{
        width: 6vh;
        height: 6vh;
        border-radius: 8%;
        margin-right: 3vw;
       }
       .item-content{
           flex: 1;
           .user-name{
               color: rgba(3, 67, 96, 0.82);
               cursor: pointer;
           }
           .item-text{
               margin-bottom: 1vh;
           }
           .item-address{
               color: rgba(3, 67, 96, 0.82);
               font-size: small;
               display: block;
               margin-top: .6vh;
           }
           .item-time{
               font-size: small;
               color: #808080b8;
               font-family: monospace;
               display: flex;
               align-items: center;
               margin-top: 1.2vh;
               margin-bottom: 2.2vh;
               position: relative;
               .item-reference{
                   margin-left: 8vw;
               }
               .item-add-comment{
                   position: absolute;
                   right: 0vw;
                   width: 6vw;
                   display: flex;
                   justify-content: center;
                   align-items: center;
                   height: 100%;
                   border-radius: 8%;
                   background: #d3d3d37a;
                   display: flex;
                   align-items: center;
                   cursor: pointer;
                   .dot{
                       border-radius: 50%;
                       width: 5px;
                       height: 5px;
                       background: rgba(3, 67, 96, 0.82);
                   }
                   .dot+.dot{
                       margin-left: 3px;
                   }
               }
               .item-add-comment:active{
                   background:#d3d3d3bd;
               }
           }
           .item-comment{
               background: #d3d3d37a;
               position: relative;
               .like-section{
                   position: relative;
                   padding: 3px;
                   display: flex;
                   align-items: center;
                   color: rgba(3, 67, 96, 0.82);
                   svg:first-of-type{
                       margin-top: 4px;
                       margin-right: 3px;
                   }
               }
                .comment-section{
                   position: relative;
                   padding: 3px;
                }
               .comment-author{
                   color: rgba(3, 67, 96, 0.82);
                   cursor: pointer;
               }
           }
           .item-comment::before{
                content: '';
                border-top: 8px solid transparent;
                border-bottom: 8px solid #d3d3d37a;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                position: absolute;
                top: -16px;
                left:16px;
           }
       }
    }
    
    .comment-menu{
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        overflow: hidden;
        padding-right: 8px;
    }
    .comment-menu .menu-content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        background: #0f0d0d;
        padding: 8px;
        color: white;
        font-size: small;
        border-radius: 5%;
        transform: translateX(110%);
        .like,.comment{
            display: flex;
            align-items: flex-end;
            justify-content: center;
            height: 100%;
            padding: 2px;
            cursor: pointer;
            svg{
                margin-right: 5px;
            }
        }
        .like{
            flex: 1;
            margin-right: 8px;
        }
    }
   .comment-menu .menu-content-show{
         transition: all .6s ease-in-out;
         transform: translateX(0%);
    }
    .menu-content::after{
        content: '';
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 8px solid #0f0d0d;
        border-right: 8px solid transparent;
        position: absolute;
        right: -16px;
        }

</style>