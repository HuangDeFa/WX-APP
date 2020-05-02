import {Store} from 'vuex'
import getters from './getter';
import actions from './actions';
import {
     ADDTODO,
     SETUSER,
     SETLOGIN,
     SETNOTIFICATION
} from './mutation'

const isObject=(obj)=>{
      return obj && Object.prototype.toString.call(obj) === 'object';
}
const setProperty=(sourceObj,targetObj)=>{
    Object.keys(sourceObj).forEach(key=>{
        if(targetObj.hasOwnProperty(key)){
           if(isObject(targetObj[key])){
            setProperty(sourceObj[key],targetObj[key]);
           }else{
             sourceObj[key]=targetObj[key];
           }
        }
 });
}
let instance = null;
export default ()=> instance !==null? instance:instance =  new Store({
        state:{
           todos:[
               {event:'App开发学习',done:true},
               {event:'Js开发学习',done:true}
           ],
           currentUser:{
               id:0,
               code:'',
               name:'',
               displayName:'',
               gender:'Male',
               //default url
               avatar:'http://ww1.sinaimg.cn/large/0065oQSqly1g2pquqlp0nj30n00yiq8u.jpg',
               address:{
                   country:'China',
                   province:'GuangDong',
                   city:'GuangZhou',
                   street:''
               },
               region:'',
               phoneNumber:'',
               email:'',
               linkAccount:''
           },
           setting:{
               
           },
           isLogin:false,
           notifications:[],
           contactNotifications:[],
           discoverNotifications:[],
           mineNotifications:[],
       },
       getters,
       actions,
       mutations:{
        [ADDTODO](state,payload){
            state.todos.push(payload.todo);
        },
        [SETUSER](state,user){
            if(user){
                setProperty(state.currentUser,user);
            }
        },
        [SETLOGIN](state,login){
            state.isLogin = login;
        },
        [SETNOTIFICATION](state,notifications){
            state.notifications = notifications;
        }
       }
});