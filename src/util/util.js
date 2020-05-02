import { convertToPinyin } from './pinyin';

export function groupNames(names){
    if(names && names.length){
        const reg = /[a-zA-Z]/;
        const englistNames =  names.filter(x=>reg.test(x.charAt(0)));
        const zhNames = names.filter(x=>englistNames.indexOf(x)==-1);
        const letterCompare = Intl.Collator('en').compare;
        const enNamesGroup = englistNames.sort(letterCompare).map(x=>{ 
            return {key:x.charAt(0), value:x};
        }).reduce((pre,curr)=>{
            if(curr){ 
               let item = pre.find(v=>v['key']==curr.key.toUpperCase());
               if(item) {
                   item.values.push(curr.value);
               }else{
                   item = {key:curr.key.toUpperCase(),values:[]};
                   item.values.push(curr.value);
                   pre.push(item);
               }
            }
            return pre;  
        },[]);

       const zhNamesGroup = zhNames.sort(Intl.Collator('Zh').compare).map(x=>{
            return {key:x.charAt(0), value:x};
        }).reduce((pre,curr)=>{
            if(curr){
                const pinYin = convertToPinyin(curr.key);
                const key = pinYin.charAt(0).toUpperCase();
                let item = pre.find(v=>v['key']== key.toUpperCase());
                if(item) {
                    item.values.push(curr.value);
                }else{
                    item = {key:key.toUpperCase(),values:[]};
                    item.values.push(curr.value);
                    pre.push(item);
                }
             }
             return pre;  
        },[]);
        
        const result = enNamesGroup;
        zhNamesGroup.forEach(g=>{
            let item = result.find(x=>x.key==g.key);
            if(item) item.values.push(...g.values);
            else{
                item = {key:g.key,values:g.values};
                result.push(item);
            }
        });
        return result.sort((a,b)=>letterCompare(a.key,b.key));
    }
}
