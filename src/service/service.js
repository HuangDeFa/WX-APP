import Axios from 'axios'
import store  from '../store/store';
Axios.defaults.baseURL = "/api";

Axios.interceptors.request.use(function(config){
      if(store().state.isLogin){
        config.headers['user-name'] =  store().state.currentUser.name;
      }
      console.log('start request ',config);
      return config;
},error=>{
    Promise.reject(error);
});
Axios.interceptors.response.use(response=>{
    return response;
},error=>{
    Promise.reject(error);
})

export async function register(userName,phoneNumber,password,avatar){
   try{
     const response =  await Axios.post("/register",{userName,phoneNumber,password});
     return response.status==200 
   }catch(error){
       console.log('register error',error);
      return false;
   }
}

export async function loginByPhoneNumber(phoneNumber,password){
    try{
      const response =  await Axios.post("/loginByPhoneNumber",{phoneNumber,password});
      return response.data
    }catch(error){
        console.log('loginByPhoneNumber error',error);
       return null;
    }
 }

 export async function loginByAccount(userName,password){
    try{
      const response =  await Axios.post("/loginByAccount",{userName,password});
      return response.data
    }catch(error){
        console.log('loginByAccount error',error);
       return null;
    }
 }
 export async function getNotifications(){
     try{
       const response = await Axios.get("/getNotification");
       return response.data;
     }catch(error){
      console.log('getNotification error',error);
      return null;
     }
 }
 export async function getContacts(){
  try{
    const response = await Axios.get("/getContacts");
    return response.data;
  }catch(error){
   console.log('getContacts error',error);
   return null;
  }
}