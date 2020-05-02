/*eslint disable*/
export default {
    bind:function(el,binding,vnode,oldVnode){
        const host = binding.arg || '';
        const popvernode = vnode.context.$children.find(child=>{
           return child.$options.name==='popver' && child.host && child.host===host;
        });
        console.log("bind",popvernode);
    },
    inserted(el,binding,vnode,oldVnode){
        const host = binding.arg || '';
        const popvernode = vnode.context.$children.find(child=>{
            return child.$options.name==='popver' && child.host && child.host===host;
        });
        if(popvernode){
            //popvernode.trigger
            const rect  = el.getBoundingClientRect();
            const style = popvernode.$el.style||{};
            const width = window.innerWidth;
            //style.height='20vh';
            if(popvernode.placement=='bottom'){
                style.top = rect.bottom+'px';
                style.right= (width - rect.right)+'px';
            }else if(popvernode.placement=='top'){
                style.bottom = rect.top+'px';
                style.right= (width - rect.right)+'px';
            }else if(popvernode.placement=='left'){
                style.top = rect.top+'px';
                style.right= (width - rect.left)+'px';
            }else if(popvernode.placement=='right'){
                style.top = rect.top+'px';
                style.left= rect.right+'px';
            }
            style.display='none';
            //popvernode.$el.style = style;
            el.addEventListener(popvernode.trigger,()=>{
                if(popvernode.$el.style.display=='block'){
                    popvernode.$el.style.display='none'
                }else{
                    popvernode.$el.style.display='block'
                }
            });
        }
        console.log("inserted",popvernode);
    },
    update(el,binding,vnode,oldVnode){
        console.log("update");
    },
    componentUpdated(el,binding,vnode,oldVnode){
        console.log("componentUpdated");
    },
    unbind(el,binding,vnode,oldVnode){
        console.log("unbind");
    }
}