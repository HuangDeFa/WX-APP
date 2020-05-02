<template>
    <transition name="page-slide" appear >
    <div class="my-wallet">
        <headerView backText="我的钱包" style="position:fixed;z-index:1">
            <template v-slot:default>
                <div class="header-area">
                    <svgIcon name="menu"></svgIcon>
                </div>
            </template>
        </headerView>
        <div class="content">
            <div class="content-header">
                <div class="header-item">
                    <svgIcon name="pay-receive"></svgIcon>
                    <span>收付款</span>
                </div>
                <div class="header-item">
                    <svgIcon name="money"></svgIcon>
                    <span>零钱</span>
                </div>
                <div class="header-item">
                    <svgIcon name="bank-card"></svgIcon>
                    <span>银行卡</span>
                </div>
            </div>
            <template v-for="(group, index) in menusGroup">
            <div class="group-header" :key=" 'g_'+index">{{group.name}}</div>
            <template v-for="(row,rowIndex) in  Array.apply(null,{length: Math.ceil(group.list.length/columnCount)})">
                <div :key=" `row_${index}_`+rowIndex " class="row">
                    <div v-for="(item, columnIndex) in Array.apply(null,{length:getColumnCount(rowIndex,group)})" :key=" `col_${rowIndex}_${columnIndex}` " class="item">
                        <template v-if="group.list[rowIndex*columnCount+columnIndex]">
                            <svgIcon :name="group.list[rowIndex*columnCount+columnIndex].icon"></svgIcon>
                            <span>{{group.list[rowIndex*columnCount+columnIndex].name}}</span>
                        </template>
                    </div>
                </div>
            </template>
           </template>
        </div>
    </div>
    </transition>
</template>
<script>
import svgIcon from '../../components/Svg'
import headerView from  '../../components/header'
export default {
    name:'wallet-page',
    components:{
        svgIcon,
        headerView
    },
    data() {
        return {
            menusGroup:[],
            columnCount:3
        }
    },
    created() {
        this.menusGroup = this.getWalletMenus();
    },
    methods: {
        getWalletMenus(){
            let group=[];
            group.push({name:'腾讯服务',list:[{name:'行用卡还款',icon:'credit-card'},{name:'微粒贷借钱',icon:'weilidai'},{name:'手机充值',icon:'charge-phone'},
            {name:'理财通',icon:'licaitong'},{name:'生活缴费',icon:'shenghuojiaofei'},{name:'Q币充值',icon:'charge-Q'},
            {name:'城市服务',icon:'city-service'},{name:'腾讯公益',icon:'tencent-welfare'},{name:'保险服务',icon:'insurance-service'},{name:'医疗健康',icon:'health'}
            ]});
            group.push({name:'第三方服务',list:[{name:'火车票机票',icon:'train-ticket'},{name:'滴滴出行',icon:'didi'},{name:'京东购物',icon:'jidong'},
            {name:'美团外卖',icon:'meituan'},{name:'电影演出赛事',icon:'maoyan'},{name:'吃喝玩乐',icon:'dazhongdianping'},
            {name:'酒店',icon:'hotel'},{name:'拼多多',icon:'pinduoduo'},{name:'蘑菇街女装',icon:'mogujie'},
            {name:'唯品会特卖',icon:'sale'},{name:'转转二手',icon:'sale'},{name:'贝壳找房',icon:'beike'}
            ]});
            return group;
        },
        getColumnCount(row,group){
            return this.columnCount*(row+1)<=group.list.length ? this.columnCount:
            group.list.length - this.columnCount*row;
        }
    },
}
</script>
<style lang="scss" scoped>
  .my-wallet{
      @include page();
  }
  .header-area{
    display: flex;
    justify-content: flex-end;
    padding-right: 4vw;
    height: 100%;
    align-items: center;
    svg{
        height: 3.5vh;
        width: 3.5vh;
        fill: white;
    }
  }
  .content-header{
      margin-top: $header;
      display: flex;
      width: 100%;
      height: 20vh;
      justify-content: space-around;
      align-items: center;
      background-color: $primary_dark_color;
  }
  .content{
      height: 100%;
      overflow-y: scroll;
  }
  .header-item{
      display: flex;
      color: white;
      font-size: small;
      height: 100%;
      width: 100%;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      svg{
          width: 5vh;
          height: 5vh;
          fill: white;
          margin-bottom: 2vh;
      }
  }
  .group-header{
    border-top: 1vh solid #d3d3d38c;
    padding: 1.5vh 0 1vh 2vw;
    font-size: small;
  }
  .row{
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    height: 20vh;
    font-size: small;
  }
  .item{
     display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    svg{
        height: 4vh;
        width: 4vh;
        margin-bottom: 2vh;
    }
  }
  .item:active{
      background-color: #d3d3d38c;
  }
  .item:nth-child(3n+1),.item:nth-child(3n+2){
      border-top: 1px solid #d3d3d38c;
     border-right: 1px solid #d3d3d38c;
  }
  .item:nth-child(3n){
       border-top: 1px solid #d3d3d38c;
  }
  .row-border-bottom{
      border-bottom: 1px solid #d3d3d38c;
  }
</style>