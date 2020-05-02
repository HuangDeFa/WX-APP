import {
    ADDTODO
} from './mutation'
export default {
    addTodoAsync({commit,state},payload){
       Promise.resolve().then(()=>
       commit(ADDTODO,payload.todo)
       );
    }
}