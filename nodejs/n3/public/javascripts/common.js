$(function () {
    checkUser();
});

function checkUser() {
    var ck = $.cookie('user');
    var box = $('#j_userPanel');
    if (ck) {
        box.html("您好<a href='/userinfo'>" + ck.split('|')[0] + "</a>，<a href='/signout'>退出</a>");
    } else {
        box.html("您可以<a href='/signin'>登录</a>或<a href='/signup'>注册</a>");
    }
}