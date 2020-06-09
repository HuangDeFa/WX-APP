## WX-APP
Vue learning App 仿微信单6.0 UI 页面 Vue project

## 技术栈 
Vue , VueX ,Vue-Roter , Axios, Webpack

## 功能实现
- [x] 登陆注册页面
- [x] 消息主页面
- [x] 通信录页面
- [x] 发现页面
- [x] 朋友圈页面(UI)
- [x] 我的页面
- [x] 对话子页面
- [x] 设置页面 
- [x] 钱包页面 
- [x] 用户信息页面

**以上功能均是静态页面的实现，后续还将采用egg.js建立后台应用实现可交互的完整WX应用**

## 项目结构
```
.
├── build
│   ├── webpack.config.js
│   ├── webpack.dev.js
│   └── webpack.prod.js
├── dist
├── public
│   └── index.html
├── screenshots
├── src
│   ├── components
│   │   ├── Popver.vue
│   │   ├── SlideLetter.vue
│   │   ├── Svg.vue
│   │   ├── Tab.vue
│   │   ├── TabControl.vue
│   │   ├── footer.vue
│   │   ├── header.vue
│   │   ├── homeHeader.vue
│   │   └── input.vue
│   ├── directives
│   │   └── popever-directive.js
│   ├── icon
│   │   ├── img
│   │   │   └── default-user.svg
│   │   └── svg
│   │       ├── wallet
│   │       │   ├── bank-card.svg
│   │       │   ├── beike.svg
│   │       │   ├── charge-Q.svg
│   │       │   ├── charge-phone.svg
│   │       │   ├── city-service.svg
│   │       │   ├── credit-card.svg
│   │       │   ├── dazhongdianping.svg
│   │       │   ├── didi.svg
│   │       │   ├── health.svg
│   │       │   ├── hotel.svg
│   │       │   ├── insurance-service.svg
│   │       │   ├── jidong.svg
│   │       │   ├── licaitong.svg
│   │       │   ├── maoyan.svg
│   │       │   ├── meituan.svg
│   │       │   ├── menu.svg
│   │       │   ├── mogujie.svg
│   │       │   ├── money.svg
│   │       │   ├── pinduoduo.svg
│   │       │   ├── sale.svg
│   │       │   ├── shenghuojiaofei.svg
│   │       │   ├── tencent-welfare.svg
│   │       │   ├── train-ticket.svg
│   │       │   └── weilidai.svg
│   │       ├── add-friend.svg
│   │       ├── add.svg
│   │       ├── add2.svg
│   │       ├── album.svg
│   │       ├── back.svg
│   │       ├── camera.svg
│   │       ├── chat-group.svg
│   │       ├── comment.svg
│   │       ├── contact.svg
│   │       ├── delete.svg
│   │       ├── dingyuehao.svg
│   │       ├── discover.svg
│   │       ├── emoji.svg
│   │       ├── emoji2.svg
│   │       ├── favorite.svg
│   │       ├── feedback.svg
│   │       ├── float-bottle.svg
│   │       ├── game.svg
│   │       ├── like.svg
│   │       ├── look-look.svg
│   │       ├── me.svg
│   │       ├── message.svg
│   │       ├── mini-program.svg
│   │       ├── more.svg
│   │       ├── new-friend.svg
│   │       ├── package.svg
│   │       ├── pay-receive.svg
│   │       ├── people-near.svg
│   │       ├── publisher.svg
│   │       ├── qrcode.svg
│   │       ├── scan-scan.svg
│   │       ├── search-bit.svg
│   │       ├── search.svg
│   │       ├── setting.svg
│   │       ├── shake.svg
│   │       ├── shop.svg
│   │       ├── tag.svg
│   │       ├── transferhelper.svg
│   │       ├── tribe.svg
│   │       ├── voice.svg
│   │       ├── voice2.svg
│   │       ├── wallet.svg
│   │       ├── weixin.svg
│   │       └── weixin_pay.svg
│   ├── pages
│   │   ├── contact
│   │   │   └── contact.vue
│   │   ├── conversation
│   │   │   ├── children
│   │   │   │   └── conversationSetting.vue
│   │   │   └── conversation.vue
│   │   ├── discover
│   │   │   ├── children
│   │   │   │   └── friendcircle.vue
│   │   │   └── discover.vue
│   │   ├── groupchat
│   │   │   └── groupchat.vue
│   │   ├── index
│   │   │   ├── children
│   │   │   └── index.vue
│   │   ├── login
│   │   │   ├── children
│   │   │   │   └── loginDetail
│   │   │   │       ├── children
│   │   │   │       │   └── loginPhoneNumber.vue
│   │   │   │       └── loginDetail.vue
│   │   │   └── login.vue
│   │   ├── message
│   │   │   └── message.vue
│   │   ├── mine
│   │   │   └── mine.vue
│   │   ├── newfriends
│   │   │   └── newfriends.vue
│   │   ├── publishers
│   │   │   └── publisher.vue
│   │   ├── register
│   │   │   └── register.vue
│   │   ├── security
│   │   │   ├── getbackpassword.vue
│   │   │   └── securitycenter.vue
│   │   ├── setting
│   │   │   └── setting.vue
│   │   ├── tags
│   │   │   └── tags.vue
│   │   ├── user
│   │   │   ├── children
│   │   │   └── user.vue
│   │   └── wallet
│   │       └── wallet.vue
│   ├── service
│   │   └── service.js
│   ├── store
│   │   ├── actions.js
│   │   ├── getter.js
│   │   ├── mutation.js
│   │   └── store.js
│   ├── util
│   │   ├── pinyin.js
│   │   └── util.js
│   ├── App.vue
│   ├── app.scss
│   ├── main.js
│   └── router.js
├── LICENSE
├── README.md
├── package-lock.json
└── package.json

38 directories, 119 files
```