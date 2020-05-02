export default {
    doneTodo:(state)=>{
        return state.todos.filter(t=>t.done);
    },
    getMessageEntity:(state)=>(id)=>{
        return state.messages.find(x=>x.id==id);
    },
    getCurrentUser:(state)=>{
        return state.currentUser;
    },
    isLogin:(state)=>state.isLogin
}