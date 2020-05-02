<template>
    <div class="login-detail">
        <div class="content">
            <svg-icon name="delete" :style="{width:'3.3vh',height:'3.3vh',display:'block'}" @click="$router.go(-1)" class="close-btn" v-if="showCloseBtn"></svg-icon>
            <label class="login-label">{{loginLabel}}</label>
            <div v-show="loginByPhoneNumber">
                <div class="region">
                    <label>国际/地区</label>
                    <span>中国(+86)</span>
                </div>
                <div class="phone-number">
                      <label>手机号</label>
                      <input-view class="input" v-model="phoneNumber" type="number" placeholder="请输入手机号"/>
                </div>
            </div>
            <div v-show="!loginByPhoneNumber">
                <div class="account">
                      <label>账号</label>
                      <input-view @focus="toggleDividerColor($event,'account-focus')" @blur="toggleDividerColor($event,'account-focus')" class="input" v-model="account" size="26" placeholder="请填写微信号/QQ号/邮箱"/>
                </div>
                <div class="password">
                     <label>密码</label>
                    <input-view @focus="toggleDividerColor($event,'password-focus')" @blur="toggleDividerColor($event,'password-focus')" class="input" v-model="password" placeholder="请填写密码"/>
                </div>
            </div>
            <div class="login-way" @click="toggleLoginway">
                {{toggleMessage}}
            </div>
            <div @click="login" class="login-btn" :class="{'login-btn-enable':loginEnable}">
                {{ loginByPhoneNumber? "下一步":"登录" }}
            </div>
            <div class="footer">
               <router-link :to="{name:'getbackPassword2'}">找回密码</router-link>
               <a>紧急冻结</a>
               <router-link :to="{name:'securityCenter2'}" v-if="showCloseBtn">微信安全中心</router-link>
               <router-link :to="{name:'register2'}" v-else>注册</router-link>
            </div>
        </div>
        <transition name="page-slide" :appear=" true ">
         <router-view></router-view>
        </transition>
    </div>
</template>
<script>
import inputView from '../../../../components/input';
import svgIcon from '../../../../components/Svg';
import {loginByAccount} from '../../../../service/service';
import {mapMutations} from 'vuex';
import {SETUSER,SETLOGIN} from '../../../../store/mutation';
export default {
    name:'login-detail',
    props:{
        showCloseBtn:{
            type:Boolean,
            default:true
        }
    },
    components:{
        inputView,
        svgIcon
    },
    data(){
        return {
            loginByPhoneNumber:true,
            phoneNumber:'',
            account:'',
            password:''
        }
    },
    computed: {
        toggleMessage(){
            if(this.loginByPhoneNumber){
                return "用微信号/QQ号/邮箱登录";
            }else{
                return "用手机号登录";
            }
        },
        loginLabel(){
            if(this.loginByPhoneNumber){
                return "手机号登录";
            }else{
                return "微信号/QQ号/邮箱登录";
            }
        },
        loginEnable(){
             return this.phoneNumber || (this.account && this.password);
        }
    },
    methods: {
        ...mapMutations([
            SETUSER,
            SETLOGIN
        ]),
        toggleLoginway(){
            this.loginByPhoneNumber=!this.loginByPhoneNumber;
            this.phoneNumber='';
            this.password='';
            this.account='';
        },
        login(){
            if(this.loginEnable){
              if(this.loginByPhoneNumber){
                  //TODO: check phoneNumber
                  this.$router.push({name:'loginPhoneNumber',params:{phoneNumber:this.phoneNumber}})
              }else{
                  //TODO: login 
                  loginByAccount(this.account,this.password).then(data=>{
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

        toggleDividerColor(event,clsName){
            const eventType = event.type;
            const parent = event.target.parentElement.parentElement;
            if(eventType=='focus'){
                parent.classList.add(clsName);
            }else{
                parent.classList.remove(clsName);
            }
            console.log(event);
        }
    },

}
</script>
<style lang="scss" scoped>
    .login-detail{
        @include page();
        background: white;
    }
    .content{
        @include page_container();
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
     .region,
     .account,
     .password
     {
         display: flex;
         font-size: larger;
         padding: 2vh 0;
         position: relative;
         align-items: center;
         span,.input{
             position: absolute;
             margin-left: 25vw;
         }
         span{
             color:#00c900;
         }
     }
     .phone-number::after{
         @include divider(#00c900,0,unset,0,0);
     }
     .region::after,
     .account::after,
     .password::after{
          @include divider(#d3d3d38c,0,unset,0,0);
     }
     .password-focus::after,
     .account-focus::after{
         background: #00c900;
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
</style>