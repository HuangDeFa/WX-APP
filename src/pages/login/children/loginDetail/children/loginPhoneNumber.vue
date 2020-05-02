<template>
    <div class="page">
        <header-view backText=""></header-view>
         <div class="content">
            <label class="login-label">手机号登录</label>
            <div class="phone-number">
                 <label>手机号</label>
                 <span>{{phoneNumber2}}</span>
            </div>
            <div v-show="loginByPassWord" class="password">
                 <label>密码</label>
                 <input-view class="input" v-model="password" placeholder="请填写微信密码"/>
            </div>
            <div v-show="!loginByPassWord" class="validate-code">
                 <label>验证码</label>
                 <input-view class="input" v-model="validateCode" size="13" placeholder="请填写验证码"/>
                 <span @click="getValidateCode" class="validate-btn" :class="{'validate-btn-waiting':waitingValidateCode}">{{validatBtnLabel}}</span>
            </div>
            <div @click="toggleLoginway" class="login-way">
                {{ loginByPassWord? "用短信验证码登录":"用密码登录"}}
            </div>
            <div class="login-btn" @click="login">
                登录
            </div>
             <div class="footer">
                <router-link :to="{name:'getbackPassword3'}">找回密码</router-link>
               <a>紧急冻结</a>
               <router-link :to="{name:'securityCenter3'}">微信安全中心</router-link>
            </div>
         </div>
          <transition name="page-slide" :appear=" true ">
            <router-view></router-view>
          </transition>
    </div>
</template>
<script>
import headerView from '../../../../../components/header';
import inputView from '../../../../../components/input';
import {loginByPhoneNumber} from '../../../../../service/service';
import {mapMutations} from 'vuex';
import {SETUSER,SETLOGIN} from '../../../../../store/mutation';
export default {
    props:{
        phoneNumber:{
            type:String,
            default:''
        }
    },
    components:{
        headerView,
        inputView
    },
    data() {
        return {
            loginByPassWord:true,
            phoneNumber2:'',
            password:'',
            validateCode:'',
            validatBtnLabel:'获取验证码',
            waitingValidateCode:0
        }
    },
    created() {
        this.phoneNumber2 =  this.phoneNumber || this.$route.params.phoneNumber;
    },
    destroyed() {
        if(this.waitingValidateCode)
            clearInterval(this.waitingValidateCode);
    },
    methods: {
        ...mapMutations([
            SETUSER,
            SETLOGIN
        ]),
        toggleLoginway(){
            this.loginByPassWord = !this.loginByPassWord;
            this.password='';
            this.validateCode='';
             if(this.waitingValidateCode)
              clearInterval(this.waitingValidateCode);
            this.waitingValidateCode=0;
            this.validatBtnLabel='获取验证码';
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
        login(){
            loginByPhoneNumber(this.phoneNumber2,this.password).then(data=>{
                const {user,msg}=data;
                if(!user){
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
    },
}
</script>
<style lang="scss" scoped>
    .page{
        @include page();
    }
    .content{
        @include page_container();
        background:white;
        padding: 1.5vh;
        box-sizing: border-box;
    }
    .login-label{
       font-size: x-large;
       margin-top:8vh;
       margin-bottom:6vh;
       display: inline-block;
     }
     .phone-number,
     .password,
     .validate-code
     {
         display: flex;
         font-size: larger;
         padding: 2vh 0;
         position: relative;
         align-items: center;
         span:first-of-type,.input{
             position: absolute;
             margin-left: 25vw;
         }
     }
     
     .phone-number span{
        color:$sub_title_color;
     }
     .validate-code .validate-btn{
        margin-left: 0;
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
     
     .phone-number:after{
         @include divider(#d3d3d38c,0,unset,0,0);
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
    }
    .login-btn:active{
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
</style>