"use strict";
var config = {
    db: {},
    email: {},
    tab: {},
    site: {}
}

//db配置
config.db = {
    email: 'jsonchou329@gmail.com',
    user: 'root',
    pass: 'password',
    host: 'mongodb://127.0.0.1:27017/test'
}

//邮箱配置
config.email = {
    host: 'smtp.163.com',
    email: 'onlyone_329@163.com',
    pass: 'amwewihcv128'
}

//分类
config.tab = {
    share: '分享',
    ask: '问答',
    job: '招聘'
}

//站点配置
config.site = {
    cookieAge: 7,//cookie 过期，默认7天
    debug: true,
    port: 3000,
    avatorPath: './public/files/avator',
    imgType: ['jpg', 'gif', 'png'],
    url: 'http://127.0.0.1:3000',
    admin: ['jsonchou', 'lulisheng', 'xiali', 'chimeihuan', 'hewen', 'wuqiping', 'food']
}

module.exports = config;