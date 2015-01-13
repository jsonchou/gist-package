var moment = require('moment');

//jsonchou util
exports.log = function (msg) {
    console.log('####################---时间：' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds());
    console.log(msg);
    console.log('####################');
}

//过滤危险字符
exports.saveWords = function (content) {
    jc.log(content);
    if (!content) {
        return '';
    }
    return content;
}

//日期格式
exports.dateFormat = function (dt) {
    return moment(dt).format('YYYY年MM月DD日 hh:mm');
}

//简单数组去重
exports.arrayUnique = function (arr) {
    if (arr && arr.length > 1) {
        //数组去重
        var res = [];
        var json = {};
        for (var i = 0; i < arr.length; i++) {
            if (!json[arr[i]]) {
                res.push(arr[i]);
                json[arr[i]] = 1;
            }
        }
        return res;
    }
    return arr;
}
