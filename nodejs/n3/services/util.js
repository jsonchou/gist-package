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
    dt = moment(dt);
    var second = 1000;
    var minutes = second * 60;
    var hours = minutes * 60;
    var days = hours * 24;
    var months = days * 30;
    var twomonths = days * 365;
    var myDate = new Date(Date.parse(dt));
    if (isNaN(myDate)) {
        myDate = new Date(dt.replace(/-/g, "/"));
    }
    var nowtime = new Date();
    var longtime = nowtime.getTime() - myDate.getTime();
    var showtime = 0;
    if (longtime > months * 2) {
        return dt.format('YYYY年MM月DD日 hh:mm');
    }
    else if (longtime > months) {
        return "1个月前";
    }
    else if (longtime > days * 7) {
        return ("1周前");
    }
    else if (longtime > days) {
        return (Math.floor(longtime / days) + "天前");
    }
    else if (longtime > hours) {
        return (Math.floor(longtime / hours) + "小时前");
    }
    else if (longtime > minutes) {
        return (Math.floor(longtime / minutes) + "分钟前");
    }
    else if (longtime > second) {
        return (Math.floor(longtime / second) + "秒前");
    } else {
        return "";
    }
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
