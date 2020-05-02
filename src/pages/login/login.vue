<template>
    <div class="login">
      <div class="content">
         <template v-if="lastLoginUser">
          <div class="user-avatar">
              <img :src="lastLoginUser.avatar"/>
              <span>{{ loginByPassword ? lastLoginUser.linkAccount : lastLoginUser.phoneNumber}}</span>
          </div>
          <div v-show="loginByPassword" class="password">
              <label>密码</label>
              <input-view class="input" v-model="password" placeholder="请填写QQ密码"/>
          </div>
          <div v-show="!loginByPassword" class="validate-code">
              <label>验证码</label>
              <input-view  class="input" v-model="validateCode" size="13" placeholder="请填写验证码"/>
              <span @click="getValidateCode" class="validate-btn" :class="{'validate-btn-waiting':waitingValidateCode}">{{validatBtnLabel}}</span>
          </div>
           <div class="login-way" @click="toggleLoginway">
                {{toggleMessage}}
            </div>
            <div @click="login" class="login-btn" :class="{'login-btn-enable':loginEnable}">
                登录
            </div>
         <div class="footer">
             <router-link :to="{name:'getbackPassword'}">找回密码</router-link>
             <a>紧急冻结</a>
             <a @click="openMore">更多</a>
         </div>
         <div class="more-menus" :class="{'more-menus-open':showMoreMenu}" @click.prevent="openMore($event)">
             <div class="menus">
                 <router-link :to="{name:'logindetail'}">登录其他账号</router-link>
                 <router-link :to="{name:'register'}">注册</router-link>
                 <router-link :to="{name:'securityCenter'}">微信安全中心</router-link>
             </div>
         </div>
         </template>
         <template v-else>
            <login-detail :showCloseBtn=" false "></login-detail>
        </template>
      </div>
     <transition name="page-slide" :appear=" true ">
         <router-view></router-view>
    </transition>
    </div>
</template>
<script>
const loginDetail =()=>import(/*webpackChunkName:"loginDetail"*/'@/pages/login/children/loginDetail/loginDetail');
import inputView from '../../components/input';
import {loginByPhoneNumber,loginByAccount} from '../../service/service';
import {mapGetters,mapMutations} from 'vuex';
import {SETUSER,SETLOGIN} from '../../store/mutation';
export default {
    name:'login-page',
    components:{
        loginDetail,
        inputView
    },
    data() {
        return {
            lastLoginUser:null,
            loginByPassword:false,
            password:'',
            validateCode:'',
            toggleMessage:'用密码登录',
            showMoreMenu:false,
            validatBtnLabel:'获取验证码',
            waitingValidateCode:0
        }
    },
    computed: {
        ...mapGetters([
            "getCurrentUser"
        ]),
        loginEnable(){
           return this.password || this.validateCode;
        }
    },
    methods: {
        ...mapMutations([
            SETUSER,
            SETLOGIN
        ]),
        toggleLoginway(){
            this.loginByPassword=!this.loginByPassword;
            this.password='';
            this.validateCode='';
            if(this.waitingValidateCode)
              clearInterval(this.waitingValidateCode);
            this.waitingValidateCode=0;
            this.validatBtnLabel='获取验证码';
            this.toggleMessage = this.loginByPassword ? '用短信验证码登录':'用密码登录';
        },
        mockLastloginUser(){
            return{
                linkAccount:'123456789',
                phoneNumber:'13823411439',
                avatar:'http://ww1.sinaimg.cn/large/0065oQSqly1g2pquqlp0nj30n00yiq8u.jpg'
            }
        },
        openMore(e){
            this.showMoreMenu = !this.showMoreMenu;
        },
        getValidateCode(){
            if(this.waitingValidateCode)return;
            //TODO:获取验证码 ,60s 倒计时
           let total = 60;
           this.validatBtnLabel=`${total}s 后重试`;
           this.waitingValidateCode = setInterval(() => { 
                total--;
                this.validatBtnLabel=`${total}s 后重试`;
                if(total==0){
                  clearInterval(this.waitingValidateCode);
                  this.waitingValidateCode=0;
                  this.validatBtnLabel='获取验证码';
                }
            },1000);
        },
        getLastloginUser(){
            const user = this.getCurrentUser;
            if(user.code && user.phoneNumber)
               return user;
            return null;
        },
        login(){
            //TODO: login
            if(this.loginByPassword){
                loginByAccount(this.lastLoginUser.account,this.password).then(data=>{
                    const {user,msg} = data;
                    if(!user){
                        //login failded
                        console.log(msg);
                    }else{
                        this[SETUSER](user);
                        this[SETLOGIN](true);
                    }
                }).catch(error=>{
                    //login error
                });
            }else{
                loginByPhoneNumber(this.lastLoginUser.phoneNumber,this.validateCode).then(data=>{
                    const {user,msg} = data;
                    if(!user){
                        //login failded
                         console.log(msg);
                    }else{
                        this[SETUSER](user);
                        this[SETLOGIN](true);
                        this.$router.replace({name:'message'});
                    }
                }).catch(error=>{
                    //login error
                });
            }
        }
    },
    created(){
        this.lastLoginUser=this.getLastloginUser();
    },
    destroyed() {
        if(this.waitingValidateCode)
            clearInterval(this.waitingValidateCode);
    },
}
</script>
<style lang="scss" scoped>
    .login{
        @include page();
    }
    .content{
        @include page_container();
        padding: 1.5vh;
        box-sizing: border-box;
    }
    .user-avatar{
        margin-top: 12vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: large;
        margin-bottom: 3vh;
        img{
            width: 8vh;
            height: 8vh;
            margin-bottom: 2vh;
        }
    }
     .password,
     .validate-code
     {
         display: flex;
         font-size: larger;
         padding: 2vh 0;
         position: relative;
         align-items: center;
         .input{
             position: absolute;
             margin-left: 25vw;
         }
     }
     .validate-code .validate-btn{
        position: absolute;
        right: 5vw;
        font-size: medium;
        padding: .8vh;
        border: 1px solid black;
        border-radius: 3px;
     }
     .validate-code .validate-btn-waiting,
     .validate-code .validate-btn:active{
          color:$sub_title_color;
          border: 1px solid $sub_title_color;
     }
     
     .password:after,
     .validate-code::after{
         @include divider(#00c900,0,unset,0,0);
     }

    .login-way{
         margin: 3vh 0;
         font-size: large;
         color: #4169e1c4;
     }
     .login-way:active{
         color:#4169e18a
     }
    .login-btn{
    font-size: large;
    display: flex;
    margin: 3vh 0;
    justify-content: center;
    align-items: center;
    padding: 2vh;
    color:white;
    background: #00c900;
    border-radius:5px;
    opacity:0.4;
    }
    .login-btn-enable{
        opacity:1;
    }
    .login-btn-enable:active{
      background:#00b800;
    }
    .footer{
        display: flex;
        position: absolute;
        bottom: 2vh;
        width:calc(100% - 3vh);
        font-size: medium;
        justify-content: center;
        color: #4169e1c4;
        a{
             padding:0 3vw;
        }
        a+a{
            border-left: 1px solid $sub_title_color;
        }
    }
    .more-menus{
         @include page();
         background:$sub_title_color;
         height: 0;
         display: flex;
         flex-direction: column;;
         justify-content: flex-end;
         overflow: hidden;
         .menus{
             padding: 0 2vh;
             background: white;
             color: black;
             display: flex;
             flex-direction: column;
             transition: all .5s ease-in-out;
             transform: translateY(100%);
             a{
                padding: 1.5vh 0;
             }
         }
    }
     .more-menus-open{
       height: 100%;
       .menus{
           transform: translateY(0%);
       }
     }
    
</style>