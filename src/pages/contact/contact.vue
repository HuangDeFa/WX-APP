<template>
    <div class="contact">
    <header-view></header-view>
    <div class="content">
     <div class="contact-content">
          <template v-for="(group, index) in contactList">
          <div v-if="index>0" :key=" 'g_'+index " style="padding-left:3vw">{{group.name}}</div>
          <template v-for="(item, index2) in group.list">
              <template v-if="index==0">
                <div class="item" @click="openUserDetail(item)" :style="{'margin':0}" :class="{'item-secondary':index2>0}" :key=" index+''+index2">
                   <svgIcon :name="item.avatar.icon" class="item-img"></svgIcon>
                   <span class="item-desc">{{item.displayName}}</span>
                </div>
              </template>
              <template v-else>
                  <div class="item" @click="openUserDetail(item)" :style="{'margin':0}" :class="{'item-secondary':index2>0}" :key=" index+''+index2">
                      <img v-if="item.avatar.isUrl" :src="item.avatar.icon" class="item-img"/>
                      <svgIcon v-else :name="item.avatar.icon" class="item-img"></svgIcon>
                      <span class="item-desc">{{item.displayName}}</span>
                  </div>
              </template>
          </template>
      </template>
      <div class="item-footer">
          {{`${getContactNum}位联系人`}}
      </div>
     </div>
      <sliderLetter class="side-letter"></sliderLetter>
    </div>
    <footer-view :tabIndex="1"></footer-view>  
    </div>
</template>
<script>
import svgIcon from '../../components/Svg';
import sliderLetter from '../../components/SlideLetter';
import headerView from '../../components/homeHeader';
import footerView from '../../components/footer';
import {getContacts} from '../../service/service';
import {groupNames} from '../../util/util';
export default {
    name:'page-contact',
    components:{
        svgIcon,
        sliderLetter,
        headerView,
        footerView
    },
    data() {
        return {
            contactList:[],
        }
    },
    created() {
       this.getContactList();
    },
    computed: {
        getContactNum(){
            return this.contactList.reduce((pre,curr)=>{
                   if(curr && curr.list)
                     pre+=curr.list.length;
                   return pre;  
            },0);
        }
    },
    methods: {
        getContactList(){
          
            let contactList =[];
            contactList.push({name:'default'});
            contactList[0].list=[
            {
                name:'new-friend',
                displayName:'新的朋友',
            },
            {
                name:'chat-group',
                displayName:'群聊',
            },
            {
                name:'tag',
                displayName:'标签',
            },
            {
                name:'publisher',
                displayName:'公众号',
            }];
            getContacts().then(result=>{
              contactList.push(...this.mergeContactToGroup(result.data));
              contactList.forEach(g=>{
                     g.list.forEach(item=>{
                        item.avatar = this.parseAvatar(item);
                     });
              });
              this.contactList = contactList;
            }).catch(error=>{
                console.log('getContacts error',error);
            });
        },
        openUserDetail(item){
            this.$router.push({name:'user',params:item});
        },
        mergeContactToGroup(data){
            const contacts = data;
            if(contacts && contacts.length){
              const groups = groupNames(contacts.map(x=>x.displayName));
              // {key:'A',values:['阿宁',...]}
              var result=[];
              groups.forEach(g=>{
                  let item = result.find(r=>r.name == g.key);
                  if(!item)
                  {
                      item = {name:g.key,list:[]};
                      result.push(item);
                  }
                  g.values.forEach(name=>{
                      const contact = contacts.find(x=>x.displayName == name);
                      if(contact) item.list.push(contact);
                  });
              });
              return result;
            }
            return [];
        },
        parseAvatar(item){
            const avatar = {icon:'',isUrl:true};
            switch(item.name){
                case 'new-friend':
                    avatar.icon='new-friend';
                    avatar.isUrl = false;
                    break;
                case 'chat-group':
                    avatar.icon='chat-group';
                    avatar.isUrl = false;
                    break;
                 case 'tag':
                    avatar.icon='tag';
                    avatar.isUrl = false;
                    break;
                case 'publisher':
                    avatar.icon='publisher';
                    avatar.isUrl = false;
                    break;
                default:
                    avatar.icon = item.avatar ||
                    'http://ww1.sinaimg.cn/large/0065oQSqly1g2pquqlp0nj30n00yiq8u.jpg'
                    break;
            }
            return avatar;
        }
    },
}
</script>
<style lang="scss" scoped>
    .contact{
       @include page();
    }
    .content{
       @include page_container();
       height: $content;
       position: relative;
    }
    .contact-content{
       height: 100%;
       overflow-y: auto;
       position: relative;
    }
   .item{
     @include default_item();
    }
   .item:active{
        background-color:$primary_background_color;
    }
    .item-secondary{
        margin: 0;
        padding-top: 1px;
    }
    .item-secondary::before{
     @include default_item_divider();
     right: 6vw;
    }
    .item-desc{
        margin-left: 5vw;
    }
    .item-img{
        width: 5vh;
        height: 5vh;
    }
    .item-footer{
    text-align: center;
    padding-top: 3vh;
    color: darkgrey;
    }
    .side-letter{
        position: absolute;
        top: 0;
        right: 0;
    }
</style>