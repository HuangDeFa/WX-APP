<template>
    <div class="register">
        <header-view backText="填写手机号码"></header-view>
        <div class="content">
            <div class="nick-name-wrapper">
                <div class="nick-name">
                  <label>昵称</label>
                  <input-view @focus="toggleDividerColor($event,'nick-name-focus')" @blur="toggleDividerColor($event,'nick-name-focus')" v-model="nickName" class="input" placeholder="例如：王尼玛"/>
                </div>
                <div class="add-avatar">
                    <input @change="addAvatar" type="file" accept="image/png,image/jpeg" />
                     <img v-show="avatarFile"/>
                    <svg-icon v-show="!avatarFile" name="camera" :style="{width:'3vh',height:'3vh',fill:'white'}"></svg-icon>
                </div>
            </div>
            <div class="region">
                <label>国际/地区</label>
                <span>中国(+86)</span>
            </div>
             <div class="phone-number">
                <label>手机号</label>
               <input-view @focus="toggleDividerColor($event,'phone-number-focus')" @blur="toggleDividerColor($event,'phone-number-focus')" v-model="phoneNumber" class="input" placeholder="请填写手机号码"/>
            </div>
             <div class="password">
                <label>密码</label>
               <input-view @focus="toggleDividerColor($event,'password-focus')" @blur="toggleDividerColor($event,'password-focus')" v-model="password" class="input" type="password" placeholder="填写密码"/>
            </div>
            <div class="register-btn" @click="register" :class="{'register-btn-enable':registerEnable}">
                注册
            </div>
            <p class="note">
                点击上面的“注册”按钮，即表示你同意<a href="#">《xXX软件许可及服务协议》</a>
                和<a href="#">《xXX隐私保护指引》</a>
            </p>
        </div>
    </div>
</template>
<script>
import headerView from '../../components/header';
import inputView from '../../components/input';
import svgIcon from '../../components/Svg';
import {register } from '../../service/service';

export default {
    name:'rgister-page',
    components:{
        headerView,
        inputView,
        svgIcon,
    },
    data() {
        return {
            nickName:'',
            region:'中国(+86)',
            phoneNumber:'',
            password:'',
            avatarFile:null
        }
    },
    computed: {
        registerEnable(){
            return this.nickName && this.region && this.phoneNumber && this.password;
        }
    },
    methods: {
         toggleDividerColor(event,clsName){
            const eventType = event.type;
            const parent = event.target.parentElement.parentElement;
            if(eventType=='focus'){
                parent.classList.add(clsName);
            }else{
                parent.classList.remove(clsName);
            }
        },
        addAvatar(e){
            //TODO: open picture abulm to add avatar
            const files = e.currentTarget.files;
            const img = e.currentTarget.nextSibling;
            if(files && files.length){
              console.log(this.avatarFile =files[0]);  
              img.src = URL.createObjectURL(files[0]);
            }
        },
        register(){
            //TODO: register new account
            //go to login page
            register(this.nickName,this.phoneNumber,this.password).then(result=>{
                    if(result)
                      this.$router.replace({name:'login'});
                    else
                       console.log('register fail');  
                }).catch(error=>{
                    console.log('login error',ex);
            });
               
        }
    },
}
</script>
<style lang="scss" scoped>
    .register{
        @include page();
    }
    .content{
        @include page_container();
        background:white;
        padding: 1.5vh;
        box-sizing: border-box;
    }

    .nick-name-wrapper{
        display: flex;
        align-items:flex-end;
        .nick-name{
            flex: 1;
            margin-right: 3vw;
        }
    }
    .nick-name,
    .region,
    .phone-number,
    .password{
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
    .region span{
        position: absolute;
        right: 5vw;
        color:#00c900;
    }
    .nick-name-wrapper .add-avatar{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 9vh;
        width: 9vh;
        background: $primary_background_color;
        position: relative;
        input{
            width: 100%;
            position: absolute;
            height: 100%;
            text-align: center;
            opacity: 0;
        }
        img{
            height: 100%;
            width: 100%;
        }
    }
    .nick-name-wrapper .add-avatar:active{
        background:#00c900bf;
    }
      .nick-name::after,
     .region::after,
     .phone-number::after,
     .password::after{
          @include divider(#d3d3d38c,0,unset,0,0);
     }
   
     .phone-number-focus::after,
     .password-focus::after,
     .nick-name-focus::after{
         background: #00c900;
     }
    .register-btn{
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
    .register-btn-enable{
        opacity:1;
    }
    .register-btn-enable:active{
      background:#00b800;
    }
</style>